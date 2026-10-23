"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth";

/** Shown when the visitor has used today's free uses. */
export function ToolLimitNotice({ what }: { what: string }) {
  const { user } = useAuth();
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
      {user ? (
        <>
          <p className="font-semibold text-gray-900">You&apos;ve reached today&apos;s free limit.</p>
          <p className="mt-1 text-gray-600">Come back tomorrow for more free {what}.</p>
        </>
      ) : (
        <>
          <p className="font-semibold text-gray-900">You&apos;ve used your 3 free {what} for today.</p>
          <p className="mt-1 text-gray-600">
            Create a free account for more every day, plus 20 free Ghost credits to use in a real interview.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-flex items-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600 transition-colors"
          >
            Sign up free
          </Link>
        </>
      )}
    </div>
  );
}

/** Shown under a result: invites the visitor to try Ghost in a real interview. */
export function GhostCta({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 p-6 sm:p-8 text-white">
      <p className="text-xl sm:text-2xl font-bold">{title}</p>
      <p className="mt-2 text-white/90 leading-relaxed">{text}</p>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Link
          href="/download"
          className="inline-flex items-center rounded-full bg-white px-6 py-2.5 font-semibold text-gray-800 shadow hover:shadow-md transition-all"
        >
          Try Ghost free
        </Link>
        <Link href="/ai-interview-assistant" className="text-white/90 hover:text-white font-medium">
          How Ghost works
        </Link>
      </div>
    </div>
  );
}
