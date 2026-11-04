// Cloudflare Turnstile human check for email sign-up and the free tools. It is usually
// invisible; a small checkbox card appears only when Cloudflare wants an interaction.
// Nothing loads until a visitor submits, and nothing runs without a site key (local dev).

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TIMEOUT_MS = 2 * 60 * 1000;

type Turnstile = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

let scriptPromise: Promise<Turnstile> | null = null;

function loadScript(): Promise<Turnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no turnstile")));
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("load failed"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

const LOAD_FAILED =
  "The security check couldn't load. If you use an ad or script blocker, allow renekin.com and try again.";
// Cloudflare's error code is shown so a screenshot is enough to diagnose a problem.
const checkFailed = (code?: string) =>
  new Error(`We couldn't confirm you're human. Please try again.${code ? ` (error ${code})` : ""}`);

/** A fresh single-use token, or null when Turnstile isn't configured. */
export async function getTurnstileToken(action: string): Promise<string | null> {
  if (!SITE_KEY || typeof window === "undefined") return null;

  let turnstile: Turnstile;
  try {
    turnstile = await loadScript();
  } catch {
    throw new Error(LOAD_FAILED);
  }

  // Bottom-centre holder for the widget. Never hide the widget with CSS (opacity, visibility):
  // Cloudflare treats a hidden widget as a bot and the check fails. "interaction-only" keeps it
  // out of sight by itself; the card styling and label are added only when a click is needed.
  const card = document.createElement("div");
  card.setAttribute("role", "dialog");
  card.setAttribute("aria-label", "Security check");
  card.style.cssText =
    "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:60;max-width:calc(100vw - 32px)";
  const label = document.createElement("p");
  label.textContent = "Quick check that you're human";
  label.style.cssText = "display:none;margin:0 0 8px;font-size:14px;color:#374151;font-family:inherit";
  const slot = document.createElement("div");
  card.append(label, slot);
  document.body.appendChild(card);
  const showCard = () => {
    card.style.cssText +=
      ";background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:12px;box-shadow:0 10px 30px rgba(0,0,0,.12)";
    label.style.display = "block";
  };

  return new Promise<string>((resolve, reject) => {
    let widgetId: string | undefined;
    const done = (fn: () => void) => {
      clearTimeout(timer);
      try {
        if (widgetId) turnstile.remove(widgetId);
      } catch {}
      card.remove();
      fn();
    };
    const timer = setTimeout(() => done(() => reject(checkFailed("timeout"))), TIMEOUT_MS);
    try {
      widgetId = turnstile.render(slot, {
        sitekey: SITE_KEY,
        action,
        appearance: "interaction-only",
        theme: "light", // the site has no dark mode
        callback: (token: string) => done(() => resolve(token)),
        "error-callback": (code: string) => {
          console.warn("Turnstile error", code);
          done(() => reject(checkFailed(String(code))));
          return true; // handled: stops Cloudflare's own retry loop and console error
        },
        "expired-callback": () => done(() => reject(checkFailed("expired"))),
        "before-interactive-callback": showCard,
      });
    } catch {
      done(() => reject(new Error(LOAD_FAILED)));
    }
  });
}

/** Header carrying a Turnstile token, or nothing when Turnstile isn't configured. */
export async function turnstileHeader(action: string): Promise<Record<string, string>> {
  const token = await getTurnstileToken(action);
  return token ? { "X-Turnstile-Token": token } : {};
}
