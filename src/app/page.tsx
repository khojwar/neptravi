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

  return (
    <>
      <HeroSection onItineraryGenerated={handleItineraryGenerated} />
      {finalItinerary && <ResultDisplay data={finalItinerary} />}
      <BestLocation />
      <HowItWorks />
      <TouristDestination />
      <Testimonial />
      <TravelMemories />
      <Footer />
    </>
  );
}
