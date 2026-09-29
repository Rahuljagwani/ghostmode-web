import posthog from "posthog-js";

// Visitor's analytics-cookie choice. The choice itself is essential storage,
// so it's kept regardless of the answer.

export type Consent = "granted" | "denied";

const KEY = "renekin_consent";
const CHANGE_EVENT = "renekin:consent-change";
const OPEN_EVENT = "renekin:consent-open";

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  const previous = getConsent();
  try {
    localStorage.setItem(KEY, value);
  } catch {}
  if (previous === "granted" && value === "denied") {
    // Stop PostHog writing its state back to storage while the page unloads.
    if (posthog.__loaded) posthog.set_config({ disable_persistence: true });
    clearAnalyticsStorage();
    // Loaded analytics scripts can't be unloaded; a reload starts a clean page without them.
    window.location.reload();
    return;
  }
  window.dispatchEvent(new CustomEvent<Consent>(CHANGE_EVENT, { detail: value }));
}

export function onConsentChange(cb: (value: Consent) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(cb: () => void) {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}

export function clearAnalyticsStorage() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("ph_")) {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      }
    }
  }
  try {
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith("ph_") || k.startsWith("__ph")) localStorage.removeItem(k);
    }
  } catch {}
}
