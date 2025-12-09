"use client";

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";

// import { generateFullItineraryWithLLM } from "@/lib/generateFullItineraryWithLLM";
import { streamFullItineraryWithLLM } from "@/lib/generateFullItineraryWithLLM";
import { extractTripDetailsWithLLM } from "@/lib/extractTripDetailsWithLLM";

import Link from "next/link";


const userQuerySchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(4000),
});

type userQueryData = z.infer<typeof userQuerySchema>;

interface UserQueryProps {
  onItineraryGenerated?: (itinerary: any) => void;
}

const UserQuery = ({ onItineraryGenerated }: UserQueryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const form = useForm<userQueryData>({
    resolver: zodResolver(userQuerySchema),
    defaultValues: { message: "" },
  });

  const onSubmit = async (values: userQueryData) => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    setStatus("Understanding your destination…");

    console.log("Submitted:", values.message);

    try {
      // 1) LLM → Extract destination, dates, style, etc.
      const userQuery = await extractTripDetailsWithLLM(values.message);
      console.log("userQuery: ", userQuery);
      
      if (userQuery.error) {
        console.error("Error extracting trip details:", userQuery.error);
        setError("Could not understand your destination. Please provide a valid location or city name.");
        setIsLoading(false);
        return;
      }


      // 2) Weather + coordinates in one API call
      setStatus("Fetching real-time weather data…");
      let lat = userQuery.lat;
      let lon = userQuery.lon;

      if (!lat || !lon) {
        // Fallback: use OpenWeather Geocoding API
        const geoRes = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(userQuery.destination)}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}`
        );
        const geoData = await geoRes.json();

        if (geoData?.[0]) {
          lat = geoData[0].lat;
          lon = geoData[0].lon;
        } else {
          // Location not found
          setError(`Location "${userQuery.destination}" could not be found. Please try another destination or check the spelling.`);
          setIsLoading(false);
          return;
        }
      }

      // Current + 7-day forecast (recommended)
      const weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_KEY}&units=metric`
      ).then(r => {
        if (!r.ok) throw new Error("Weather fetch failed");
        return r.json();
      });

      console.log("weatherData: ", weatherData);

      
      // 3) LLM → Generate full final itinerary
      setStatus("Generating itinerary…");
      const stream = await streamFullItineraryWithLLM({
        userQuery,
        weatherData,
      });


      let fullText = "";

      for await (const chunk of stream.stream) {
        const text = chunk.text();
        fullText += text;

        // Dynamic status updates
        if (text.includes('"day": 1')) setStatus("Creating Day 1 itinerary…");
        if (text.includes('"day": 2')) setStatus("Creating Day 2 itinerary…");
        if (text.includes('"recommended_hotels"'))
          setStatus("Finding best hotels…");
        if (text.includes('"recommended_restaurants"'))
          setStatus("Listing restaurants…");
        if (text.includes('"recommended_attractions"'))
          setStatus("Highlighting must-see attractions…");
      }

      // Remove markdown code blocks if present
      let jsonText = fullText.trim();
      if (jsonText.startsWith("```json")) {
        jsonText = jsonText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
      } else if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```\n?/, "").replace(/\n?```$/, "");
      }

      // Validate and parse JSON with better error handling
      let finalItinerary;
      try {
        finalItinerary = JSON.parse(jsonText);
      } catch (parseErr) {
        console.error("JSON Parse Error:", parseErr);
        console.error("Invalid JSON text (first 500 chars):", jsonText.substring(0, 500));
        
        // Try to find and fix common issues
        let cleanedText = jsonText
          .replace(/\n/g, " ") // Replace newlines with spaces
          .replace(/\t/g, " ") // Replace tabs with spaces
          .replace(/\\([^"\\/bfnrtu])/g, "$1"); // Remove invalid escape sequences
        
        try {
          finalItinerary = JSON.parse(cleanedText);
        } catch (retryErr) {
          setError("Failed to parse generated itinerary. The response may be incomplete. Please try again.");
          setIsLoading(false);
          return;
        }
      }
      
      console.log("finalItinerary: ", finalItinerary);


      // Send finalItinerary to parent component (if needed)
      if (onItineraryGenerated) {
        onItineraryGenerated(finalItinerary);
      }

      setGeneratedData(finalItinerary); 
      form.reset();
    } catch (err) {
      console.error("Error generating itinerary:", err);
      setError("Failed to generate itinerary. Please try again with a different location or description.");
    } finally {
      setIsLoading(false);
    }
  };

  // Enter = submit, Shift+Enter = newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-lg mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Textarea
                    className="text-sm md:text-lg h-16 md:h-20"
                    placeholder="Eg. I want to go to Chitwan for a romantic getaway with a budget of $2000..."
                    disabled={isLoading}
                    {...field}
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 🚀 Loading Spinner */}
          {isLoading && (
            <div className="mt-3 text-blue-600 animate-pulse text-sm">
              {status}
            </div>
          )}

          {/* ⚠️ Error Message */}
          {error && (
            <p className="mt-3 text-red-600 text-sm">{error}</p>
          )}

          {/* ✅ Success Link */}
          {generatedData && (
            <Link 
              href="#ItinerarySection"
              className="mt-4 inline-block px-4 py-2 bg-gray-700/30 text-white rounded hover:bg-gray-600/30 transition"
            >
              View Generated Itinerary
            </Link>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserQuery