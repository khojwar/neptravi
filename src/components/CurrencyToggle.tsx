
"use client";
import { useState } from "react";

export default function CurrencyToggle() {
  const [currency, setCurrency] = useState("$");



  return (
    <div
      onClick={() => setCurrency(currency === "$" ? "रु" : "$")}
      className="w-15 h-8 border-t-2 shadow-2xl bg-gray-600/50 rounded-full flex items-center cursor-pointer transition text-white relative"
    >
      <div
        className={`w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center text-sm font-medium shadow transition-all duration-300
          ${currency === "$" ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {currency === "$" ? "$" : "रु"}
      </div>
      {/* left text */}
      <span
        className={`absolute ml-2 text-xs font-bold transition-opacity ${
          currency === "रु" ? "opacity-0 text-gray-300" : "opacity-100"
        }`}
      >
        रु
      </span>

      {/* right text */}
      <span
        className={`absolute ml-10 text-xs font-bold transition-opacity ${
          currency === "$" ? "opacity-0 text-red-900" : "opacity-100"
        }`}
      >
        $
      </span>
    </div>
  );
}
