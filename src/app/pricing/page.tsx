"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import PricingCard from "@/components/PricingCard";

const plans = [
  {
    name: "Free",
    price: 0,
    credits: 20,
    description: "Try Ghost free",
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
      "Text: 1cr · Voice: 3cr · Screenshot: 2cr",
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
      "Text: 1cr · Voice: 3cr · Screenshot: 2cr",
    ],
    highlighted: true,
  },
  {
    name: "Best Value",
    price: 28,
    credits: 400,
    description: "Best credits per dollar",
    features: [
      "400 credits",
      "~6-7 full interviews",
      "Lowest cost per credit",
      "Text: 1cr · Voice: 3cr · Screenshot: 2cr",
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
          Buy credits when you need them. No subscriptions, no hidden fees.
          Text: 1 credit · Voice: 3 credits · Screenshot: 2 credits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
