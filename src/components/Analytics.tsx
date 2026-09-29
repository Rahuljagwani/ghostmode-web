"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { clearAnalyticsStorage, getConsent, onConsentChange } from "@/lib/consent";
import { initPostHog } from "@/providers/PostHogProvider";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Loads Google Analytics and PostHog only once the visitor has accepted analytics cookies.
export default function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent === "denied") clearAnalyticsStorage();
    setGranted(consent === "granted");
    return onConsentChange((v) => setGranted(v === "granted"));
  }, []);

  useEffect(() => {
    if (granted) initPostHog();
  }, [granted]);

  if (!granted || !GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
