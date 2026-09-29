"use client";

import { openConsentSettings } from "@/lib/consent";

export default function CookieSettingsLink() {
  return (
    <button type="button" onClick={openConsentSettings} className="text-left hover:text-sky-600 transition-colors">
      Cookie settings
    </button>
  );
}
