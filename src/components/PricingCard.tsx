"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";

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
      className={`relative rounded-2xl p-6 flex flex-col transition-all ${
        highlighted
          ? "bg-white border-2 border-sky-400 shadow-lg scale-[1.02]"
          : "bg-white border border-gray-200 hover:border-sky-200 hover:shadow-md shadow-sm"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
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
          <span className="text-gray-400 text-sm ml-1">one-time</span>
        )}
      </div>

      <p className="text-sky-600 text-sm font-semibold mt-1">
        {credits} credits
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <HugeiconsIcon icon={Tick01Icon} size={16} className="text-sky-500 mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onBuy}
        className={`mt-6 w-full py-3 rounded-xl font-medium transition-colors text-sm cursor-pointer ${
          highlighted
            ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
            : price === 0
            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
            : "bg-sky-500 hover:bg-sky-600 text-white"
        }`}
      >
        {price === 0 ? "Get Started" : "Buy Credits"}
      </button>
    </div>
  );
}
