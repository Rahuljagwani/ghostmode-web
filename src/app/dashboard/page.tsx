"use client";

import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import {
  Zap,
  Camera,
  Mic,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

interface CreditDetails {
  total_credits: number;
  used_credits: number;
  remaining_credits: number;
  free_credits_remaining: number;
  total_screenshots: number;
  total_voice_queries: number;
  total_text_queries: number;
}

export default function DashboardPage() {
  const { user, refreshProfile } = useAuth();
  const [credits, setCredits] = useState<CreditDetails | null>(null);

  useEffect(() => {
    refreshProfile();
    apiFetch<CreditDetails>("/credits/details").then(setCredits).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const usagePercent = credits
    ? Math.min(
        100,
        ((credits.used_credits / Math.max(credits.total_credits, 1)) * 100)
      )
    : 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Welcome back, {user?.name || "there"}
      </h1>
      <p className="text-gray-500 text-sm mb-8">{user?.email}</p>

      {/* Credits overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 col-span-2 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-500">
              Credits Balance
            </h2>
            <Zap className="w-4 h-4 text-violet-500" />
          </div>
          <p className="text-4xl font-bold text-gray-900">
            {credits?.remaining_credits?.toFixed(0) ?? user?.remaining_credits?.toFixed(0) ?? "\u2014"}
          </p>
          <p className="text-sm text-gray-400 mt-1">credits remaining</p>

          {/* Usage bar */}
          <div className="mt-5">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>Used: {credits?.used_credits?.toFixed(0) ?? 0}</span>
              <span>Total: {credits?.total_credits?.toFixed(0) ?? 0}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/billing"
          className="bg-violet-50 border border-violet-100 rounded-xl p-6 hover:border-violet-200 transition-colors flex flex-col justify-between shadow-sm"
        >
          <div>
            <h2 className="text-sm font-medium text-violet-700">
              Need more credits?
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Top up your balance to keep using Ghost.
            </p>
          </div>
          <div className="flex items-center gap-1 text-violet-600 text-sm font-medium mt-4">
            Buy Credits <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Usage breakdown */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Usage Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Camera className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-sm text-gray-500">Screenshots</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {credits?.total_screenshots ?? 0}
          </p>
          <p className="text-xs text-gray-400 mt-1">2 credits each</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <Mic className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-sm text-gray-500">Voice Queries</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {credits?.total_voice_queries ?? 0}
          </p>
          <p className="text-xs text-gray-400 mt-1">3 credits each</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-sm text-gray-500">Text Queries</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {credits?.total_text_queries ?? 0}
          </p>
          <p className="text-xs text-gray-400 mt-1">1 credit each</p>
        </div>
      </div>
    </div>
  );
}
