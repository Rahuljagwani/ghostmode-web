"use client";

import { Check } from "lucide-react";

interface PricingCardProps {
  name: string;
  price: number;
  credits: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  onBuy?: () => void;
}

export default function PricingCard({
  name,
  price,
  credits,
  description,
  features,
  highlighted,
  onBuy,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col transition-all backdrop-blur-md ${
        highlighted
          ? "bg-white/45 border-2 border-white/60 shadow-xl scale-[1.02]"
          : "bg-white/30 border border-white/45 hover:bg-white/40 hover:border-white/55 shadow-lg"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-gray-500 text-sm mt-1">{description}</p>

      <div className="mt-5">
        <span className="text-4xl font-bold text-gray-900">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        {price > 0 && (
          <span className="text-gray-500 text-sm ml-1">one-time</span>
        )}
      </div>

      <p className="text-gray-700 text-sm font-semibold mt-1">
        {credits} credits
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-gray-700 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onBuy}
        className={`mt-6 w-full py-3 rounded-xl font-medium transition-colors text-sm cursor-pointer ${
          highlighted
            ? "bg-white hover:bg-white/90 text-gray-800 shadow-sm"
            : price === 0
            ? "bg-white/25 hover:bg-white/35 text-gray-700 border border-white/40"
            : "bg-white/90 hover:bg-white text-gray-800"
        }`}
      >
        {price === 0 ? "Get Started" : "Buy Credits"}
      </button>
    </div>
  );
}
