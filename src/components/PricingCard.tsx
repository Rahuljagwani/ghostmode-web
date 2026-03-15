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
      className={`relative rounded-2xl p-6 flex flex-col ${
        highlighted
          ? "bg-purple-600/20 border-2 border-purple-500 shadow-lg shadow-purple-500/10"
          : "bg-white/5 border border-white/10"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-gray-400 text-sm mt-1">{description}</p>

      <div className="mt-4">
        <span className="text-4xl font-bold text-white">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        {price > 0 && (
          <span className="text-gray-400 text-sm ml-1">one-time</span>
        )}
      </div>

      <p className="text-purple-400 text-sm font-medium mt-1">
        {credits} credits
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <Check className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onBuy}
        className={`mt-6 w-full py-3 rounded-lg font-medium transition text-sm ${
          highlighted
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : price === 0
            ? "bg-white/10 hover:bg-white/20 text-white"
            : "bg-white/10 hover:bg-white/20 text-white"
        }`}
      >
        {price === 0 ? "Get Started" : "Buy Credits"}
      </button>
    </div>
  );
}
