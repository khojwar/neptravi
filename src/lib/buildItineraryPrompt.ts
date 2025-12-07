export function buildItineraryPrompt({
  userQuery,
  weatherData,
}: {
  userQuery: any;
  weatherData: any;
}) {
  // Extract coordinates safely
  const lat = weatherData.city?.coord?.lat ?? userQuery.lat;
  const lon = weatherData.city?.coord?.lon ?? userQuery.lon;

  // Convert 3-hour forecast into daily summaries (one per day)
  const dailyForecasts: any[] = [];
  const seenDates = new Set<string>();

  if (Array.isArray(weatherData.list)) {
    for (const item of weatherData.list) {
      const date = item.dt_txt.split(" ")[0]; // YYYY-MM-DD
      if (!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecasts.push({
          date,
          temp: Math.round(item.main.temp),
          feels_like: Math.round(item.main.feels_like),
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
        });

        if (dailyForecasts.length >= (userQuery.trip_length || 7)) break;
      }
    }
  }

  // Fallback if no forecast data
  if (dailyForecasts.length === 0) {
    dailyForecasts.push(
      ...Array.from({ length: userQuery.trip_length || 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 864000).toISOString().split("T")[0],
        temp: 25,
        feels_like: 27,
        description: "partly cloudy",
        icon: "02d",
      }))
    );
  }

  return `
You are a world-class travel planner. Generate a complete, realistic travel itinerary.

Destination: ${userQuery.destination}
Trip Length: ${userQuery.trip_length || 7} days
Start Date: ${userQuery.start_date || "flexible"}
Travelers: ${userQuery.travelers || 2} ${userQuery.travelers_type ? `(${userQuery.travelers_type})` : ""}
Style: ${userQuery.travel_style || "balanced"}
Budget: ${userQuery.budget ? "$" + userQuery.budget : "flexible"}
Interests: ${userQuery.activities?.join(", ") || "sightseeing, food, culture"}

Use this weather forecast (one summary per day, metric units: °C):
${JSON.stringify(dailyForecasts, null, 2)}

Coordinates: lat ${lat}, lon ${lon}

Return ONLY valid JSON in this EXACT structure (no markdown, no extra text):

{
  "destination": "${userQuery.destination}",
  "trip_length": ${userQuery.trip_length || 7},
  "location": { "lat": ${lat}, "lon": ${lon} },
  "overview_weather_summary": "Short 1-sentence weather overview for the trip",
  "itinerary": [
    {
      "day": 1,
      "date": "2025-06-15",
      "weather": {
        "temp": 24,
        "feels_like": 26,
        "description": "light rain",
        "icon": "10d"
      },
      "morning": "Activity description...",
      "afternoon": "Activity description...",
      "evening": "Dinner or relaxation...",
      "hotel_suggestion": {
        "name": "Hotel Pokhara Grande",
        "address": "Lakeside, Pokhara",
        "price_per_night_usd": 85,
        "contact": "+977 61-460123"
      }
    }
    // ... more days
  ],
  "recommended_attractions": [
    { "name": "Phewa Lake", "why": "Stunning views and boating", "approx_price": "Free - $15" }
  ],
  "recommended_restaurants": [
    { "name": "Moondance Restaurant", "cuisine": "Nepali/International", "approx_cost_usd": 12 }
  ],
  "recommended_hotels": {
    "budget": { "name": "Hotel Lake View", "price": 35 },
    "mid": { "name": "Temple Tree Resort", "price": 90 },
    "luxury": { "name": "The Pavilions Himalayas", "price": 250 }
  }
}

Rules:
- Use REAL hotels, restaurants, and attractions that exist in ${userQuery.destination} in 2025
- Prices in USD, realistic for 2025
- Adapt activities to weather, season, and user interests
- Never invent coordinates — use only the ones above
- Output ONLY the JSON object, nothing else
`.trim();
}