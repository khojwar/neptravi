"use client"

import Date from "@/lib/Date"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import ItineraryCard from "./ItineraryCard"
import { object } from "zod"
import { useState, useMemo, useEffect } from "react"
import CurrencyToggle from "./CurrencyToggle"


const ResultDisplay = ({ data }: {data: any}) => {
    // console.log("data in ResultDisplay: ", data);
    const [searchQuery, setSearchQuery] = useState("")
    const [currency, setCurrency] = useState("USD")
    const [rate, setRate] = useState(1);

    // Currency toggle handler
    const toggleCurrency = () => {
        setCurrency((prevCurrency) => (prevCurrency === "USD" ? "NPR" : "USD"))
    }

    // Download JSON handler
    const handleDownloadJSON = () => {
        const jsonData = JSON.stringify(data, null, 2)
        const blob = new Blob([jsonData], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `itinerary-${data.destination}-${data.trip_length}days.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    // Filter itinerary based on search query
    const filteredItinerary = useMemo(() => {
        if (!searchQuery.trim()) return data.itinerary

        const query = searchQuery.toLowerCase()
        return data.itinerary.filter((item: any) => {
            const morning = item?.morning?.toLowerCase() || ""
            const afternoon = item?.afternoon?.toLowerCase() || ""
            const evening = item?.evening?.toLowerCase() || ""
            const hotelName = item?.hotel_suggestion?.name?.toLowerCase() || ""
            const hotelAddress = item?.hotel_suggestion?.address?.toLowerCase() || ""
            const day = item?.day?.toString().toLowerCase() || ""
            const date = item?.date?.toLowerCase() || ""

            return (
                morning.includes(query) ||
                afternoon.includes(query) ||
                evening.includes(query) ||
                hotelName.includes(query) ||
                hotelAddress.includes(query) ||
                day.includes(query) ||
                date.includes(query)
            )
        })
    }, [searchQuery, data.itinerary])

    // Filter attractions based on search query
    const filteredAttractions = useMemo(() => {
        if (!searchQuery.trim()) return data.recommended_attractions

        const query = searchQuery.toLowerCase()
        return data.recommended_attractions.filter((attraction: any) => {
            const name = attraction.name?.toLowerCase() || ""
            const why = attraction.why?.toLowerCase() || ""

            return name.includes(query) || why.includes(query)
        })
    }, [searchQuery, data.recommended_attractions])

    // Filter hotels based on search query
    const filteredHotels = useMemo(() => {
        if (!searchQuery.trim()) return data.recommended_hotels

        const query = searchQuery.toLowerCase()
        const filtered: any = {}

        Object.entries(data.recommended_hotels).forEach(([category, hotel]: [string, any]) => {
            const hotelName = hotel.name?.toLowerCase() || ""
            if (hotelName.includes(query)) {
                filtered[category] = hotel
            }
        })

        return filtered
    }, [searchQuery, data.recommended_hotels])

    useEffect(() => {
      async function loadRate() {
        if (currency === "USD") {
          setRate(1);
          return;
        }

        try {
          const res = await fetch("https://open.er-api.com/v6/latest/USD");
          const data = await res.json();
          setRate(data.rates.NPR);

        } catch (err) {
          console.error("Failed to fetch conversion rate:", err);
          setRate(1); // fallback
        }
      }

      loadRate();
    }, [currency]);

    console.log("Current rate: ", rate);

    const displayPrice = (usdPrice: number) => {
        if (currency === "USD") return `$${usdPrice}`;
            return `रू ${(usdPrice * rate).toFixed(2)}`;
        };

 
  return (
    <div id="ItinerarySection" className="md:max-w-3xl lg:max-w-7xl mx-auto mt-32">
        {/* header */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center my-4 px-4">
            <div className="flex flex-col">
                <h1 className="text-xl md:text-3xl font-bold">{data.destination} — {data.trip_length}-days Trip</h1>
                <p className="lead" id="dates"><Date dateString={data.itinerary[0].date} /> — <Date dateString={data.itinerary[data.itinerary.length - 1].date} /> </p>
            </div>
            <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between mt-4 lg:mt-0">
                <Button onClick={toggleCurrency}>
                {currency === "NPR" ? "Switch to USD" : "Switch to NPR"}
                </Button>
                <div> 
                    <Input 
                        placeholder="Search itinerary, places or restaurants..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64"
                    /> 
                </div>
                <div><Button variant={"default"} onClick={handleDownloadJSON}>Download JSON</Button></div>
            </div>
        </div>

        {/* main two col  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-2">
            {/* left col */}
            <div className="md:col-span-2 shadow-md p-4 rounded-lg">
                
                <h1 className="text-xl md:text-3xl font-semibold">Overview</h1>
                <p>{data.overview_weather_summary}</p>
                
                {/* days & location */}
                <div className="flex gap-4 pt-4">
                    <div className="bg-gray-100 rounded-full py-2 px-4">{data.trip_length} days</div>
                    <div className="bg-gray-100 rounded-full py-2 px-4">Lat {data.location.lat}, Lon {data.location.lon}</div>
                </div>

                {
                    <div className="md:overflow-y-auto md:max-h-96 text-sm">
                        {filteredItinerary.length > 0 ? (
                            filteredItinerary.map((i:any) => (
                                <ItineraryCard key={i.day} days={i?.day} date={i?.date} temp={i?.weather?.temp} feels_like = {i?.weather?.feels_like} description= {i?.weather?.description}  morning = {i?.morning} afternoon={i?.afternoon} evening={i?.evening} name={i?.hotel_suggestion?.name} address={i?.hotel_suggestion?.address} price_per_night_usd={i?.hotel_suggestion?.price_per_night_usd} contact={i?.hotel_suggestion?.contact} rate={rate} currency={currency} />
                            ))
                        ) : (
                            <p className="text-center py-4 text-gray-500">No itineraries match your search</p>
                        )}
                    </div>
                }
            </div>

            {/* right col */}
            <div className="shadow-md p-4 rounded-lg bg-gray-50 ">

                {/* recommended attractions */}
                <div className="md:text-xl lg:text-2xl mb-4">Recommended — Attractions</div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:max-h-60 md:overflow-y-auto">
                    {
                        filteredAttractions.length > 0 ? (
                            filteredAttractions.map((ra: any) => (
                                <div key={ra.name} className="text-sm flex flex-col gap-2 mb-4">
                                    <h1 className="font-bold">{ra.name}</h1>
                                    <p>{ra.why}</p>
                                    <p>{ra.approx_price}</p>
                                </div> 
                            ))
                        ) : (
                            <p className="text-gray-500">No attractions match your search</p>
                        )
                    }

                </div>

                {/* Hotels by budget */}
                <div className="text-2xl mb-4">Hotels by budget</div>
                <div className="flex flex-col gap-2">
                    {
                        Object.entries(filteredHotels).length > 0 ? (
                            Object.entries(filteredHotels).map(([category, hotel]: [string, any]) => (
                                <div key={category} className="text-sm flex flex-col mb-2">
                                    <div className="flex justify-between font-bold ">
                                        <h1 className="capitalize">{category}</h1>
                                        <p>{displayPrice(hotel.price)} per night</p>
                                    </div>
                                    <p>{hotel.name}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No hotels match your search</p>
                        )
                    }

                </div>  
            </div>
        </div>

    </div>
  )
}

export default ResultDisplay