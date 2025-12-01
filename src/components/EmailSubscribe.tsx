"use client";
import { Mail } from "lucide-react";

export default function EmailSubscribe() {
  return (
    <div className="w-full flex justify-start mt-10">
      <div className="flex items-center w-full max-w-3xl border border-white/40 rounded-full px-2 py-2 md:px-4 md:py-2 bg-black/40">
        
        {/* Mail Icon */}
        <Mail className="text-white w-5 h-5" />

        {/* Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-transparent outline-none text-white placeholder-white/70 px-3"
        />

        {/* Button */}
        <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-5 py-2 rounded-full transition">
          Subscribe
        </button>
      </div>
    </div>
  );
}
