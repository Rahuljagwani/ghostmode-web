"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import PricingCard from "@/components/PricingCard";

const plans = [
  {
    name: "Free",
    price: 0,
    credits: 50,
    description: "Get started with Ghost",
    features: [
      "50 credits on signup",
      "AI-powered answers",
      "Voice transcription",
      "Screenshot analysis",
    ],
  },
  {
    name: "Starter",
    price: 5,
    credits: 100,
    description: "For occasional interviews",
    features: [
      "100 credits",
      "All free features",
      "Priority processing",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 10,
    credits: 250,
    description: "For active job seekers",
    features: [
      "250 credits",
      "All Starter features",
      "Best value per credit",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Power",
    price: 25,
    credits: 750,
    description: "For heavy usage",
    features: [
      "750 credits",
      "All Pro features",
      "Bulk discount",
      "Priority support",
    ],
  },
  {
    name: "Unlimited",
    price: 50,
    credits: 2000,
    description: "Maximum preparation",
    features: [
      "2000 credits",
      "All Power features",
      "Lowest cost per credit",
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
    <div className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Credit-Based Pricing
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Buy credits when you need them. No subscriptions, no hidden fees. Each
          AI request costs 1-2 credits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {plans.map((plan) => (
          <PricingCard
            key={plan.name}
            {...plan}
            onBuy={() => handleBuy(plan)}
          />
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Bring Your Own Key (BYOK)
        </h3>
        <p className="text-gray-400 max-w-lg mx-auto">
          Already have a Claude API key? Toggle BYOK mode in the app settings to
          use your own key — no credits needed. You only pay Anthropic directly.
        </p>
      </div>
    </div>
  );
}
