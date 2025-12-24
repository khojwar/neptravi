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
import { useRef } from "react";
import { Plus } from "lucide-react";


const userQuerySchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(4000),
  file: z.any().optional(),
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    console.log("Message:", values.message);
    console.log("File:", selectedFile);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const triggerFilePicker = () => {
  fileInputRef.current?.click();
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
                    {/* Main Input Container - Improved ChatGPT-like styling with better background and contrast */}
                    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background/95 backdrop-blur-sm p-4 shadow-md ring-1 ring-border/50">
                      
                      {/* 📎 File/Image Preview - Inside the input box, above the + button and textarea */}
                      {selectedFile && (
                        <div className="flex flex-wrap gap-3 -mb-2">
                          {selectedFile.type.startsWith('image/') ? (
                            // Image preview
                            <div className="relative group inline-block">
                              <img
                                src={URL.createObjectURL(selectedFile)}
                                alt={selectedFile.name}
                                className="max-h-32 rounded-lg object-cover border border-border bg-background shadow-sm"
                              />
                              <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                                className="absolute -top-2 -right-2 bg-background/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                              >
                                <svg className="h-4 w-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            // Document/file preview
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm">
                              <svg className="h-8 w-8 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
                              </svg>
                              <span className="truncate max-w-xs text-foreground">{selectedFile.name}</span>
                              <button
                                type="button"
                                onClick={() => setSelectedFile(null)}
                                className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bottom row: + button + Textarea */}
                      <div className="flex justify-center items-center gap-3">
                        {/* ➕ Upload Button */}
                        <button
                          type="button"
                          onClick={triggerFilePicker}
                          disabled={isLoading}
                          className="p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Upload file"
                        >
                          <Plus className="h-6 w-6 text-muted-foreground" />
                        </button>

                        {/* Hidden file input */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleFileSelect}
                          accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
                        />

                        {/* Textarea */}
                        <Textarea
                          className="flex-1 min-h-12 max-h-48 border-0 bg-transparent resize-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground shadow-none outline-none"
                          placeholder="Eg. I want to go to Chitwan for a romantic getaway..."
                          disabled={isLoading}
                          {...field}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                    </div>
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
          {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

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