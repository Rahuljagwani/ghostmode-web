"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { fetchPlans, PlanData } from "@/lib/api";
import PricingCard from "@/components/PricingCard";
import { Zap, Eye, Mic, Loader2 } from "lucide-react";

// Free tier is always shown (not in DB)
const FREE_PLAN = {
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
};

// Feature lists per plan name (enriches API data)
const PLAN_FEATURES: Record<string, (credits: number) => string[]> = {
  Starter: (cr) => [
    `${cr} credits`,
    `~${Math.floor(cr / 60)}-${Math.ceil(cr / 50)} full interviews`,
    "All features included",
    "Email support",
  ],
  Popular: (cr) => [
    `${cr} credits`,
    `~${Math.floor(cr / 60)}-${Math.ceil(cr / 50)} full interviews`,
    "Best value for most users",
    "Priority support",
  ],
  "Best Value": (cr) => [
    `${cr} credits`,
    `~${Math.floor(cr / 60)}-${Math.ceil(cr / 50)} full interviews`,
    `Lowest cost per credit ($${(cr > 0 ? (28 / cr) : 0).toFixed(2)})`,
    "Priority support",
  ],
};

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans()
      .then(setPlans)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleBuy = (price: number) => {
    if (!user) {
      router.push("/register");
      return;
    }
    if (price === 0) {
      router.push("/dashboard");
      return;
    }
    router.push("/dashboard/billing");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Simple, credit-based pricing
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Buy credits when you need them. No subscriptions, no hidden fees.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-gray-700 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Free tier */}
          <PricingCard
            {...FREE_PLAN}
            onBuy={() => handleBuy(0)}
          />

          {/* Dynamic plans from API */}
          {plans.map((plan) => {
            const featureFn = PLAN_FEATURES[plan.name];
            const features = featureFn
              ? featureFn(plan.credits)
              : [`${plan.credits} credits`, "All features included"];

            return (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                credits={plan.credits}
                description={plan.description || ""}
                features={features}
                highlighted={plan.name === "Popular"}
                onBuy={() => handleBuy(plan.price)}
              />
            );
          })}
        </div>
      )}

      {/* Credit costs breakdown */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 bg-white/35 backdrop-blur-md border border-white/50 rounded-xl px-5 py-4 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Text query</p>
            <p className="text-xs text-gray-500">1 credit</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/35 backdrop-blur-md border border-white/50 rounded-xl px-5 py-4 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
            <Eye className="w-4 h-4 text-gray-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Screenshot</p>
            <p className="text-xs text-gray-500">2 credits</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/35 backdrop-blur-md border border-white/50 rounded-xl px-5 py-4 shadow-lg">
          <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
            <Mic className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Voice query</p>
            <p className="text-xs text-gray-500">3 credits</p>
          </div>
        </div>
      </div>

    </div>
  );
}
