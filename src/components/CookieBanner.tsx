"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { Consent, getConsent, onConsentSettingsOpen, setConsent } from "@/lib/consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Consent | null>(null);

  useEffect(() => {
    const c = getConsent();
    setCurrent(c);
    setOpen(c === null);
    return onConsentSettingsOpen(() => {
      setCurrent(getConsent());
      setOpen(true);
    });
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    setOpen(false);
    setCurrent(value);
    setConsent(value);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-50 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md animate-[fadeInUp_0.4s_ease-out_both]"
    >
      <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl shadow-sky-900/10">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50">
            <Cookie className="h-5 w-5 text-sky-600" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Cookies on Renekin</h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              We&apos;d like to use analytics cookies (Google Analytics and PostHog) to understand how the site is used.
              Essential storage, like keeping you signed in, is always on.{" "}
              <Link href="/privacy#cookies" className="font-medium text-sky-600 hover:underline">
                Learn more
              </Link>
            </p>
            {current && (
              <p className="mt-2 text-xs text-gray-500">
                Current choice: {current === "granted" ? "analytics allowed" : "analytics off"}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:border-gray-400"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sky-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
