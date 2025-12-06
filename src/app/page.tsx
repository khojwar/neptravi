"use client";

import { useState } from "react";
import BestLocation from "@/components/BestLocation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonial from "@/components/Testimonial";
import TouristDestination from "@/components/TouristDestination";
import TravelMemories from "@/components/TravelMemories";
import ResultDisplay from "@/components/ResultDisplay";


export default function Home() {
  const [finalItinerary, setFinalItinerary] = useState<any>(null);

  const handleItineraryGenerated = (itinerary: any) => {
    setFinalItinerary(itinerary);
  };

  // console.log("finalItinerary: ", finalItinerary);

  const sampleItinerary = {
  "destination": "Muktinath, Nepal",
  "trip_length": 7,
  "location": {
    "lat": 28.7944,
    "lon": 83.8767
  },
  "overview_weather_summary": "This adventure and pilgrimage trip to Muktinath in early December will experience consistently cold, clear winter weather with sub-zero temperatures, making proper warm trekking gear essential for comfortable exploration.",
  "itinerary": [
    {
      "day": 1,
      "date": "2025-12-05",
      "weather": {
        "temp": -4,
        "feels_like": -8,
        "description": "clear sky",
        "icon": "01n"
      },
      "morning": "Arrive at Tribhuvan International Airport (KTM) in Kathmandu, then take a scenic domestic flight to Pokhara (PKR). Check into your hotel and settle in, allowing for initial relaxation after travel.",
      "afternoon": "Take a leisurely stroll around Lakeside Pokhara. Enjoy the serene views of Phewa Lake and the surrounding mountains. Consider a short boat ride on the lake for panoramic vistas.",
      "evening": "Enjoy a comforting dinner at a popular lakeside restaurant in Pokhara. Take time to mentally prepare for the high-altitude journey ahead.",
      "hotel_suggestion": {
        "name": "Temple Tree Resort & Spa",
        "address": "Lakeside, Pokhara",
        "price_per_night_usd": 110,
        "contact": "+977 61-460010"
      }
    },
    {
      "day": 2,
      "date": "2025-12-06",
      "weather": {},
      "morning": "Take an early morning mountain flight from Pokhara to Jomsom, then begin your journey toward Kagbeni (approx. 3-4 hours trek or 1-hour jeep drive).",
      "afternoon": "Explore the ancient village of Kagbeni (2800m), the gateway to Upper Mustang. Wander its narrow lanes and observe the Tibetan-influenced settlement. Begin acclimatization to the altitude.",
      "evening": "Relax at a teahouse in Kagbeni and enjoy local Nepali and Tibetan-style dishes such as Thukpa or Dal Bhat."
    },
    {
      "day": 3,
      "date": "2025-12-07",
      "weather": {},
      "morning": "Continue your journey from Kagbeni to Muktinath (approx. 4–5 hours trek or 1.5-hour jeep ride). Enjoy breathtaking views of Dhaulagiri and Nilgiri peaks as you ascend.",
      "afternoon": "Upon arrival at Ranipauwa (3710m), the village close to Muktinath Temple, begin sightseeing. Visit the temple complex, including the 108 waterspouts and the eternal flame shrine (Jwala Mai Temple).",
      "evening": "Rest and acclimatize. Enjoy warm meals and prepare for the next day's exploration of the sacred valley."
    },
    {
      "day": 4,
      "date": "2025-12-08",
      "weather": {},
      "morning": "Further explore the sacred Muktinath valley. Consider visiting the nearby monasteries and viewpoints for panoramic Himalayan views. Visit other smaller monasteries in the area.",
      "afternoon": "Spend the afternoon immersing yourself in the spiritual ambiance and take time for personal reflection and photography.",
      "evening": "Relax in your lodge and enjoy the peaceful mountain atmosphere under clear winter skies."
    },
    {
      "day": 5,
      "date": "2025-12-09",
      "weather": {},
      "morning": "Begin your descent from Muktinath, trekking or taking a jeep back toward Jomsom. Enjoy beautiful landscapes and different perspectives of the Kali Gandaki valley.",
      "afternoon": "Explore Jomsom Bazaar upon arrival. Visit the Mustang Eco Museum and learn about the local culture and history of the Mustang region. Shop for local crafts and souvenirs.",
      "evening": "Enjoy a warm dinner at your lodge and rest after the descent."
    },
    {
      "day": 6,
      "date": "2025-12-10",
      "weather": {},
      "morning": "Take an early morning mountain flight from Jomsom back to Pokhara. Morning flights are usually scheduled early due to afternoon winds.",
      "afternoon": "Relax and rejuvenate in Pokhara after your high-altitude journey. Spend time at cafés, explore the lakeside area, or enjoy a peaceful walk by the lake. This is a perfect day for unwinding.",
      "evening": "Treat yourself to a good meal at a lakeside restaurant while reflecting on your journey."
    },
    {
      "day": 7,
      "date": "2025-12-11",
      "weather": {},
      "morning": "Enjoy a final Nepali breakfast. Depending on your schedule, visit a nearby viewpoint for final mountain glances.",
      "afternoon": "Fly from Pokhara back to Kathmandu. From Kathmandu, continue your international travel plans, marking the end of your incredible Muktinath adventure.",
      "evening": "Free time or departure."
    }
  ],
  "recommended_attractions": [
    {
      "name": "Muktinath Temple Complex",
      "why": "A sacred pilgrimage site for Hindus and Buddhists, featuring 108 waterspouts, the eternal flame shrine (Jwala Mai), and stunning high-Himalayan views.",
      "approx_price": "Free"
    },
    {
      "name": "Kagbeni Village",
      "why": "An ancient, medieval-style village that serves as the gateway to Upper Mustang and is home to Kag Chode Thupten Samphel Ling Monastery.",
      "approx_price": "Free"
    },
    {
      "name": "Dhumba Lake (Dzong Lake)",
      "why": "A serene, sacred lake near Jomsom, offering peaceful surroundings and beautiful views of the mountains, ideal for a short hike and relaxation.",
      "approx_price": "Free"
    },
    {
      "name": "Jomsom Mustang Eco Museum",
      "why": "Provides insights into the culture, history, flora, and fauna of the Mustang region with educational artifacts and information on local customs.",
      "approx_price": "2 USD"
    },
    {
      "name": "Phewa Lake, Pokhara",
      "why": "A tranquil lake offering boating opportunities, stunning sunset views, and a vibrant lakeside atmosphere (a key transit point).",
      "approx_price": "Free - 15 USD (for boating)"
    }
  ],
  "recommended_hotels": {
    "budget": {
      "name": "Hotel Lake View",
      "price": 45
    },
    "mid": {
      "name": "Hotel Barahi, Pokhara",
      "price": 95
    },
    "luxury": {
      "name": "The Pavilions Himalayas, Pokhara",
      "price": 280
    }
  },
  "recommended_restaurants": [
    {
      "name": "Hotel Bob Marley Restaurant",
      "cuisine": "Nepali/Tibetan/Indian",
      "approx_cost_usd": 10
    },
    {
      "name": "Om's Home Restaurant",
      "cuisine": "Nepali/Tibetan/Continental",
      "approx_cost_usd": 12
    },
    {
      "name": "Moondance Restaurant, Pokhara",
      "cuisine": "Nepali/International (Continental, Indian)",
      "approx_cost_usd": 18
    }
  ]
}
  

  return (
    <>
      <HeroSection onItineraryGenerated={handleItineraryGenerated} />
      {sampleItinerary && <ResultDisplay data={sampleItinerary} />}
      <BestLocation />
      <HowItWorks />
      <TouristDestination />
      <Testimonial />
      <TravelMemories />
      <Footer />
    </>
  );
}
