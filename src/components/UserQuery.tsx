"use client";

import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { generateFullItineraryWithLLM } from "@/lib/generateFullItineraryWithLLM";
import { extractTripDetailsWithLLM } from "@/lib/extractTripDetailsWithLLM";


const userQuerySchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(4000),
});

type userQueryData = z.infer<typeof userQuerySchema>;

const UserQuery = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<userQueryData>({
    resolver: zodResolver(userQuerySchema),
    defaultValues: { message: "" },
  });

  const onSubmit = async (values: userQueryData) => {
    if (isLoading) return;
    
    setIsLoading(true);

    console.log("Submitted:", values.message);

    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // 1) LLM → Extract destination, dates, style, etc.
    const userQuery = await extractTripDetailsWithLLM(values.message);
    console.log("userQuery: ", userQuery);
    

    if (userQuery.error) {
      console.error("Error extracting trip details:", userQuery.error);
      setIsLoading(false);
      return;
    }

    // 2) Weather + coordinates in one API call
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
    const finalItinerary = await generateFullItineraryWithLLM({
      userQuery,
      weatherData,
    });

    console.log("finalItinerary: ", finalItinerary);
    

    // router.push(`/itinerary?data=${encodeURIComponent(JSON.stringify(finalItinerary))}`);


    form.reset();
    setIsLoading(false);
  };

  // Enter = submit, Shift+Enter = newline
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };


  return (
    <div className="  w-full max-w-sm md:max-w-lg mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} >
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
        </form>
      </Form>
    </div>
  )
}

export default UserQuery