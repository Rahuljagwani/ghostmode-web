// The referral code from a ?ref= link, kept for 30 days so it survives browsing
// around before sign-up. The last link clicked wins.

const KEY = "renekin_ref";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const CODE_PATTERN = /^[a-z0-9][a-z0-9-]{2,31}$/;

export function captureReferral(raw: string | null) {
  const code = raw?.trim().toLowerCase();
  if (!code || !CODE_PATTERN.test(code)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ code, ts: Date.now() }));
  } catch {}
}

export function getReferral(): string | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const { code, ts } = JSON.parse(raw) as { code: string; ts: number };
    if (Date.now() - ts > MAX_AGE_MS) {
      localStorage.removeItem(KEY);
      return null;
    }
    return code;
  } catch {
    return null;
  }
}

export function clearReferral() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
