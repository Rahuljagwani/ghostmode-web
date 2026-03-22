"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import PricingCard from "@/components/PricingCard";
import { Zap, Eye, Mic } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: 0,
    credits: 20,
    description: "Try Ghost risk-free",
    features: [
      "20 credits on signup",
      "AI-powered answers",
      "Voice transcription",
      "Screenshot analysis",
    ],
  },
  {
    name: "Starter",
    price: 10,
    credits: 100,
    description: "For a single interview",
    features: [
      "100 credits",
      "~1-2 full interviews",
      "All features included",
      "Email support",
    ],
  },
  {
    name: "Popular",
    price: 19,
    credits: 220,
    description: "For active job seekers",
    features: [
      "220 credits",
      "~3-4 full interviews",
      "Best value for most users",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Best Value",
    price: 28,
    credits: 400,
    description: "Maximum credits per dollar",
    features: [
      "400 credits",
      "~6-7 full interviews",
      "Lowest cost per credit ($0.07)",
      "Priority support",
    ],
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleBuy = (plan: (typeof plans)[0]) => {
    if (!user) {
      router.push("/register");
      return;
    }
    if (plan.price === 0) {
      router.push("/dashboard");
      return;
    }
    router.push(`/dashboard/billing`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Simple, credit-based pricing
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Buy credits when you need them. No subscriptions, no hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            {...plan}
            onBuy={() => handleBuy(plan)}
          />
        ))}
      </div>

      {/* Credit costs breakdown */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Text query</p>
            <p className="text-xs text-gray-400">1 credit</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
            <Eye className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Screenshot</p>
            <p className="text-xs text-gray-400">2 credits</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-5 py-4">
          <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
            <Mic className="w-4 h-4 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Voice query</p>
            <p className="text-xs text-gray-400">3 credits</p>
          </div>
        </div>
      </div>

      {/* BYOK */}
      <div className="mt-12 text-center bg-gray-50 border border-gray-100 rounded-2xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Bring Your Own Key (BYOK)
        </h3>
        <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Already have a Claude API key? Toggle BYOK mode in the desktop app settings to
          use your own key, no credits needed. You pay Anthropic directly.
        </p>
      </div>
    </div>
  );
}
