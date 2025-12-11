"use client";

import { useState, useEffect } from "react";

export default function useCurrency(baseUsdPrice: number) {
    const [currency, setCurrency] = useState("USD");
    const [rate, setRate] = useState(145); 

     // Load exchange rate (with caching)
    useEffect(() => {
        const cachedRate = localStorage.getItem("usd_to_npr_rate");

        if (cachedRate) {
            setRate(parseFloat(cachedRate));
            return;
        }

        async function fetchRate() {
            try {
                const res = await fetch('/api/rate');
                const data = await res.json();
                setRate(data.rate);
                
                // Cache in localStorage
                localStorage.setItem("usd_to_npr_rate", data.rate);
                
            } catch (err) {
                console.error("Rate fetch error:", err);
            }
        }

    }, []);

    const toggleCurrency = () => {
        setCurrency((prev) => (prev === "USD" ? "NPR" : "USD"));
    };

    const convertedPrice = currency === "USD" ? baseUsdPrice : baseUsdPrice * rate;

    return { 
        currency, 
        price: convertedPrice, 
        rate, 
        toggleCurrency 
    };
}