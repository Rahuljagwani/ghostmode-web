"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { fetchPlans, PlanData } from "@/lib/api";
import PricingCard from "@/components/PricingCard";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { HugeiconsIcon } from "@hugeicons/react";
import { FlashIcon, EyeIcon, Mic01Icon, Loading03Icon } from "@hugeicons/core-free-icons";

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

const PRICING_FAQS: Faq[] = [
  {
    q: "How do credits work?",
    a: "You spend credits only when you ask Ghost something: a text question costs 1 credit, a screenshot 2 credits and a voice question 3 credits. A typical interview uses about 50 to 60 credits.",
  },
  {
    q: "Is there a subscription?",
    a: "No. Ghost uses one-time credit packs, so you pay once and use the credits when you need them. Nothing renews automatically.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Every new account gets 20 free credits with every feature unlocked, including voice, screenshots and screen-share stealth.",
  },
  {
    q: "Which pack should I choose?",
    a: "Starter ($10, 200 credits) covers about 3 to 4 interviews. Popular ($19, 450 credits) suits an active job search. Best Value ($28, 750 credits) covers about 12 to 15 interviews and has the lowest cost per credit.",
  },
  {
    q: "How can I pay?",
    a: "Prices are listed in US dollars. Customers in India pay in rupees through Razorpay (UPI, cards and net banking), and international customers pay by card through Stripe.",
  },
  {
    q: "Can I get a refund?",
    a: "Credits are non-refundable and non-transferable unless required by law. Start with the 20 free credits to make sure Ghost works for you before buying.",
  },
];

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
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, credit-based pricing
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Buy credits when you need them. No subscriptions, no hidden fees.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <HugeiconsIcon icon={Loading03Icon} size={32} className="text-sky-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <PricingCard {...FREE_PLAN} onBuy={() => handleBuy(0)} />
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

        <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 sm:px-5 py-4 border border-gray-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <HugeiconsIcon icon={FlashIcon} size={16} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Text query</p>
              <p className="text-xs text-gray-500">1 credit</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 sm:px-5 py-4 border border-gray-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
              <HugeiconsIcon icon={EyeIcon} size={16} className="text-sky-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Screenshot</p>
              <p className="text-xs text-gray-500">2 credits</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 sm:px-5 py-4 border border-gray-200 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <HugeiconsIcon icon={Mic01Icon} size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Voice query</p>
              <p className="text-xs text-gray-500">3 credits</p>
            </div>
          </div>
        </div>

        <FaqSection faqs={PRICING_FAQS} />
      </div>
    </div>
  );
}
