"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import {
  detectPaymentProvider,
  payWithRazorpay,
  payWithStripe,
  PaymentProvider,
} from "@/lib/payments";
import {
  CreditCard,
  Clock,
  IndianRupee,
  DollarSign,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface PaymentItem {
  id: string;
  plan_name: string | null;
  no_of_credits_bought: number;
  money_paid_in_dollars: number;
  payment_vendor: string;
  status: string;
  created_at: string;
}

const plans = [
  { name: "Starter", price: 5, credits: 100 },
  { name: "Pro", price: 10, credits: 250 },
  { name: "Power", price: 25, credits: 750 },
  { name: "Unlimited", price: 50, credits: 2000 },
];

export default function BillingPage() {
  const { refreshProfile } = useAuth();
  const searchParams = useSearchParams();
  const [history, setHistory] = useState<PaymentItem[]>([]);
  const [provider, setProvider] = useState<PaymentProvider>("stripe");
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setProvider(detectPaymentProvider());
  }, []);

  useEffect(() => {
    apiFetch<PaymentItem[]>("/credits/history")
      .then(setHistory)
      .catch(() => {});
  }, [message]); // Re-fetch after payment

  // Handle Stripe redirect back
  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      setMessage({ type: "success", text: "Payment successful! Credits have been added to your account." });
      refreshProfile();
    } else if (payment === "cancelled") {
      setMessage({ type: "error", text: "Payment was cancelled." });
    }
  }, [searchParams, refreshProfile]);

  const handleBuy = async (plan: (typeof plans)[0]) => {
    setMessage(null);
    setBuying(plan.name);

    try {
      if (provider === "razorpay") {
        const result = await payWithRazorpay(plan.name);
        setMessage({
          type: "success",
          text: `Payment successful! ${result.credits_added} credits added to your account.`,
        });
        await refreshProfile();
      } else {
        // Stripe redirects away, so no need to handle response here
        await payWithStripe(plan.name);
      }
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
      <h1 className="text-2xl font-bold mb-1">Billing</h1>
      <p className="text-gray-400 text-sm mb-6">
        Buy credits and view your payment history.
      </p>

      {/* Status message */}
      {message && (
        <div
          className={`flex items-center gap-2 px-4 py-3 rounded-lg mb-6 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle className="w-4 h-4 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 shrink-0" />
          )}
          {message.text}
        </div>
      )}

      {/* Payment provider toggle */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-400">Pay with:</span>
        <div className="flex bg-white/5 rounded-lg p-0.5 border border-white/10">
          <button
            onClick={() => setProvider("stripe")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition ${
              provider === "stripe"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            Stripe (International)
          </button>
          <button
            onClick={() => setProvider("razorpay")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition ${
              provider === "razorpay"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            Razorpay (India)
          </button>
        </div>
      </div>

      {/* Buy credits */}
      <h2 className="text-lg font-semibold mb-4">Buy Credits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {plans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => handleBuy(plan)}
            disabled={buying !== null}
            className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:border-purple-500/30 transition disabled:opacity-50"
          >
            <p className="text-white font-semibold">{plan.name}</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">
              ${plan.price}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {plan.credits} credits
            </p>
            {buying === plan.name ? (
              <div className="flex items-center gap-2 mt-3 text-xs text-purple-400">
                <Loader2 className="w-3 h-3 animate-spin" />
                Processing...
              </div>
            ) : (
              <p className="text-xs text-gray-600 mt-3">
                {provider === "razorpay" ? "UPI / Cards / Netbanking" : "Card (Visa, Mastercard, etc.)"}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Payment history */}
      <h2 className="text-lg font-semibold mb-4">Payment History</h2>
      {history.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <CreditCard className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No payments yet.</p>
          <p className="text-gray-500 text-sm mt-1">
            Purchase credits above to get started.
          </p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-400 font-medium px-5 py-3">Date</th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">Credits</th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">Amount</th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">Provider</th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/5 last:border-0"
                >
                  <td className="px-5 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-purple-400">
                    +{item.no_of_credits_bought}
                  </td>
                  <td className="px-5 py-3 text-gray-300">
                    ${item.money_paid_in_dollars}
                  </td>
                  <td className="px-5 py-3 text-gray-400 capitalize">
                    {item.payment_vendor}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
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
