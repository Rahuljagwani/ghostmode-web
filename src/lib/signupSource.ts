// How a visitor first found us (UTM tags, referring site, landing page), kept in this
// browser for 90 days and sent only with the sign-up request. The first visit wins, so
// the channel that found them gets the credit. No network call is made here.
// It is deliberately not cleared after sign-up: clearing made the next page (/verify-email)
// count as a fresh "first visit" for any later account from the same browser.

const KEY = "renekin_src";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export type SignupSource = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_path?: string;
};

type Stored = SignupSource & { ts: number };

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Stored;
    if (Date.now() - stored.ts > MAX_AGE_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return stored;
  } catch {
    return null;
  }
}

function clip(value: string | null | undefined, max = 200): string | undefined {
  const v = value?.trim();
  return v ? v.slice(0, max) : undefined;
}

export function captureSignupSource(params: URLSearchParams, pathname: string) {
  if (read()) return;

  // Only the referring site's host is kept; the rest of its URL can hold private details.
  let referrer: string | undefined;
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : "";
    if (host && host !== window.location.hostname) referrer = host;
  } catch {}

  const stored: Stored = {
    utm_source: clip(params.get("utm_source")),
    utm_medium: clip(params.get("utm_medium")),
    utm_campaign: clip(params.get("utm_campaign")),
    referrer,
    landing_path: clip(pathname, 255),
    ts: Date.now(),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(stored));
  } catch {}
}

export function getSignupSource(): SignupSource {
  const stored = read();
  if (!stored) return {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ts, ...source } = stored;
  return source;
}
