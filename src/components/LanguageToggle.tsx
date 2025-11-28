
"use client";
import { useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  return (
    <div
      onClick={() => setLang(lang === "en" ? "np" : "en")}
      className="w-15 h-8 border-t-2 shadow-2xl bg-gray-600/50 rounded-full flex items-center cursor-pointer transition"
    >
      <div
        className={`w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center text-sm font-medium shadow transition-all duration-300
          ${lang === "en" ? "translate-x-7" : "translate-x-0"}
        `}
      >
        {lang === "en" ? "En" : "Ne"}
      </div>

      {/* left text */}
      <span
        className={`absolute ml-2 text-xs font-bold transition-opacity ${
          lang === "np" ? "opacity-0 text-gray-300" : "opacity-100"
        }`}
      >
        Ne
      </span>

      {/* right text */}
      <span
        className={`absolute ml-10 text-xs font-bold transition-opacity ${
          lang === "en" ? "opacity-0 text-red-900" : "opacity-100"
        }`}
      >
        En
      </span>
    </div>
  );
}
