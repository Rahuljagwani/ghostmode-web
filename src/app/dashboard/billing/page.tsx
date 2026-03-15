"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { CreditCard, Clock, IndianRupee, DollarSign } from "lucide-react";

interface PaymentItem {
  id: string;
  plan_name: string | null;
  credits_added: number;
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
  const [history, setHistory] = useState<PaymentItem[]>([]);

  useEffect(() => {
    apiFetch<PaymentItem[]>("/credits/history")
      .then(setHistory)
      .catch(() => {});
  }, []);

  const handleBuy = (plan: (typeof plans)[0]) => {
    // Payment integration will be implemented in Phase 2
    alert(
      `Payment integration coming soon! Plan: ${plan.name} ($${plan.price} for ${plan.credits} credits)`
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Billing</h1>
      <p className="text-gray-400 text-sm mb-8">
        Buy credits and view your payment history.
      </p>

      {/* Buy credits */}
      <h2 className="text-lg font-semibold mb-4">Buy Credits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {plans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => handleBuy(plan)}
            className="bg-white/5 border border-white/10 rounded-xl p-5 text-left hover:border-purple-500/30 transition"
          >
            <p className="text-white font-semibold">{plan.name}</p>
            <p className="text-2xl font-bold text-purple-400 mt-1">
              ${plan.price}
            </p>
            <p className="text-gray-500 text-sm mt-1">{plan.credits} credits</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
              <DollarSign className="w-3 h-3" />
              Stripe
              <span className="mx-1">|</span>
              <IndianRupee className="w-3 h-3" />
              UPI
            </div>
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
                <th className="text-left text-gray-400 font-medium px-5 py-3">
                  Date
                </th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">
                  Plan
                </th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">
                  Credits
                </th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">
                  Amount
                </th>
                <th className="text-left text-gray-400 font-medium px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} className="border-b border-white/5 last:border-0">
                  <td className="px-5 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-white">
                    {item.plan_name || "—"}
                  </td>
                  <td className="px-5 py-3 text-purple-400">
                    +{item.credits_added}
                  </td>
                  <td className="px-5 py-3 text-gray-300">
                    ${item.money_paid_in_dollars}
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
