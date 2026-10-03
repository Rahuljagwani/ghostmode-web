"use client";

import { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon, GiftIcon } from "@hugeicons/core-free-icons";
import { apiFetch } from "@/lib/api";

interface ReferralSummary {
  code: string;
  link: string;
  reward_per_paid_user: number;
  signed_up: number;
  paid: number;
  credits_earned: number;
}

export default function ReferralCard() {
  const [data, setData] = useState<ReferralSummary | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    apiFetch<ReferralSummary>("/referrals/me").then(setData).catch(() => {});
  }, []);

  if (!data) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(data.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-9 h-9 shrink-0 rounded-lg bg-sky-50 flex items-center justify-center">
          <HugeiconsIcon icon={GiftIcon} size={18} className="text-sky-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Refer &amp; earn</h2>
          <p className="text-sm text-gray-500">
            Get {data.reward_per_paid_user.toFixed(0)} credits for every friend who signs up with your link and buys a pack.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="referral-link"
          readOnly
          value={data.link}
          onFocus={(e) => e.currentTarget.select()}
          className="min-w-0 flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 font-mono"
        />
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} size={16} />
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>

      <dl className="grid grid-cols-3 gap-3 mt-5 text-center">
        {[
          ["Signed up", data.signed_up],
          ["Bought a pack", data.paid],
          ["Credits earned", data.credits_earned.toFixed(0)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-gray-50 py-3">
            <dd className="text-xl font-bold text-gray-900 tabular-nums">{value}</dd>
            <dt className="text-xs text-gray-500 mt-0.5">{label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
