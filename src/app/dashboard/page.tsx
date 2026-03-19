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
      <h1 className="text-2xl font-bold mb-1">
        Welcome back, {user?.name || "there"}
      </h1>
      <p className="text-gray-400 text-sm mb-8">{user?.email}</p>

      {/* Credits overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-400">
              Credits Balance
            </h2>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-4xl font-bold text-white">
            {credits?.remaining_credits?.toFixed(0) ?? user?.remaining_credits?.toFixed(0) ?? "—"}
          </p>
          <p className="text-sm text-gray-500 mt-1">credits remaining</p>

          {/* Usage bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Used: {credits?.used_credits?.toFixed(0) ?? 0}</span>
              <span>Total: {credits?.total_credits?.toFixed(0) ?? 0}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/billing"
          className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition flex flex-col justify-between"
        >
          <div>
            <h2 className="text-sm font-medium text-purple-400">
              Need more credits?
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Top up your balance to keep using GhostMode.
            </p>
          </div>
          <div className="flex items-center gap-1 text-purple-400 text-sm mt-4">
            Buy Credits <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Usage breakdown */}
      <h2 className="text-lg font-semibold mb-4">Usage Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Camera className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Screenshots</span>
          </div>
          <p className="text-2xl font-bold">
            {credits?.total_screenshots ?? 0}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Voice Queries</span>
          </div>
          <p className="text-2xl font-bold">
            {credits?.total_voice_queries ?? 0}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Text Queries</span>
          </div>
          <p className="text-2xl font-bold">
            {credits?.total_text_queries ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
