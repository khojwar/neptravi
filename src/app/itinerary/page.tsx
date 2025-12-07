"use client";

import { useSearchParams } from "next/navigation";
import ResultDisplay from "@/components/ResultDisplay";

export default function ItineraryPage() {
  const searchParams = useSearchParams();
  const dataParam = searchParams.get("data");

  if (!dataParam) {
    return <div>No itinerary data found.</div>;
  }

  let data;
  try {
    data = JSON.parse(decodeURIComponent(dataParam));
  } catch (error) {
    return <div>Invalid itinerary data.</div>;
  }

  return <ResultDisplay data={data} />;
}
