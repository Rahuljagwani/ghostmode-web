"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch, fetchPlans, PlanData } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import {
  payWithRazorpay,
  // payWithStripe,
  // detectPaymentProvider,
  // PaymentProvider,
} from "@/lib/payments";
import { HugeiconsIcon } from "@hugeicons/react";
import { CreditCardIcon, Clock01Icon, Loading03Icon, CheckmarkCircle02Icon, CancelCircleIcon } from "@hugeicons/core-free-icons";

interface PaymentItem {
  id: string;
  plan_name: string | null;
  no_of_credits_bought: number;
  money_paid_in_dollars: number;
  payment_vendor: string;
  status: string;
  created_at: string;
}

export default function BillingPage() {
  return (
    <Suspense>
      <BillingContent />
    </Suspense>
  );
}

function BillingContent() {
  const { refreshProfile } = useAuth();
  const searchParams = useSearchParams();
  const [plans, setPlans] = useState<PlanData[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [history, setHistory] = useState<PaymentItem[]>([]);
  // Stripe disabled for now — Razorpay only
  // const [provider, setProvider] = useState<PaymentProvider>("stripe");
  // const provider = "razorpay" as const;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // setProvider(detectPaymentProvider());
    fetchPlans()
      .then(setPlans)
      .catch(() => {})
      .finally(() => setPlansLoading(false));
  }, []);

  useEffect(() => {
    apiFetch<PaymentItem[]>("/credits/history")
      .then(setHistory)
      .catch(() => {});
  }, [message]);

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setMessage({ type: "success", text: "Payment successful! Credits have been added to your account." });
      refreshProfile();
    } else if (payment === "cancelled") {
      setMessage({ type: "error", text: "Payment was cancelled." });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleBuy = async (plan: PlanData) => {
    setMessage(null);
    setBuying(plan.name);

    try {
      const result = await payWithRazorpay(plan.name);
      setMessage({
        type: "success",
        text: `Payment successful! ${result.credits_added} credits added to your account.`,
      });
      await refreshProfile();
      // Stripe disabled for now
      // if (provider === "stripe") {
      //   await payWithStripe(plan.name);
      // }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      if (msg !== "Payment cancelled") {
        setMessage({ type: "error", text: msg });
      }
    } finally {
      setBuying(null);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing</h1>
      <p className="text-gray-500 text-sm mb-6">
        Buy credits and view your payment history.
      </p>

      {/* Status message */}
      {message && (
        <div
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl mb-6 text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="shrink-0" />
          ) : (
            <HugeiconsIcon icon={CancelCircleIcon} size={16} className="shrink-0" />
          )}
          {message.text}
        </div>
      )}

      {/* Payment provider toggle — Stripe disabled for now, Razorpay only */}

      {/* Buy credits */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Buy Credits</h2>
      {plansLoading ? (
        <div className="flex justify-center py-10">
          <HugeiconsIcon icon={Loading03Icon} size={24} className="text-sky-500 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.name;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.name)}
                  disabled={buying !== null}
                  className={`relative rounded-xl p-6 text-left transition-all disabled:opacity-50 cursor-pointer ${
                    isSelected
                      ? "bg-sky-50 border-2 border-sky-500 shadow-sm"
                      : "bg-white border border-gray-200 hover:border-sky-300 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-2.5 left-4 bg-sky-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      Selected
                    </span>
                  )}
                  <p className="text-gray-900 font-semibold">{plan.name}</p>
                  <p className="text-3xl font-bold text-sky-600 mt-2">
                    ${plan.price}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {plan.credits} credits
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{plan.description}</p>
                </button>
              );
            })}
          </div>

          {/* Buy button */}
          <button
            onClick={() => {
              const plan = plans.find((p) => p.name === selectedPlan);
              if (plan) handleBuy(plan);
            }}
            disabled={!selectedPlan || buying !== null}
            className="w-full sm:w-auto px-8 py-3 bg-sky-600 text-white font-medium rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-10 flex items-center justify-center gap-2"
          >
            {buying ? (
              <>
                <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin" />
                Processing...
              </>
            ) : selectedPlan ? (
              `Buy ${selectedPlan} Plan`
            ) : (
              "Select a plan"
            )}
          </button>
        </>
      )}

      {/* Payment history */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
      {history.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <HugeiconsIcon icon={CreditCardIcon} size={32} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No payments yet.</p>
          <p className="text-gray-400 text-sm mt-1">
            Purchase credits above to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-gray-500 font-medium px-5 py-3">Date</th>
                <th className="text-left text-gray-500 font-medium px-5 py-3">Credits</th>
                <th className="text-left text-gray-500 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-gray-500 font-medium px-5 py-3">Provider</th>
                <th className="text-left text-gray-500 font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-5 py-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <HugeiconsIcon icon={Clock01Icon} size={12} className="text-gray-400" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sky-600 font-medium">
                    +{item.no_of_credits_bought}
                  </td>
                  <td className="px-5 py-3 text-gray-600">
                    ${item.money_paid_in_dollars}
                  </td>
                  <td className="px-5 py-3 text-gray-500 capitalize">
                    {item.payment_vendor}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        item.status === "completed"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
