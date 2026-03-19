import { apiFetch } from "./api";

export type PaymentProvider = "razorpay" | "stripe";

/**
 * Auto-detect whether to show Razorpay (India) or Stripe (international).
 * User can override manually.
 */
export function detectPaymentProvider(): PaymentProvider {
  if (typeof navigator === "undefined") return "stripe";
  const lang = navigator.language || "";
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  if (lang.startsWith("hi") || lang.endsWith("-IN") || tz.includes("Kolkata")) {
    return "razorpay";
  }
  return "stripe";
}

// ── Razorpay ──

interface RazorpayOrder {
  order_id: string;
  amount: number;
  currency: string;
  razorpay_key_id: string;
  plan_name: string;
  credits: number;
}

interface RazorpayPaymentResult {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Create Razorpay order via backend, then open Razorpay checkout popup.
 * Returns when payment is verified and credits are added.
 */
export async function payWithRazorpay(planName: string): Promise<{ credits_added: number }> {
  // 1. Create order on backend
  const order = await apiFetch<RazorpayOrder>("/payments/create-order", {
    method: "POST",
    body: JSON.stringify({ plan_name: planName }),
  });

  // 2. Open Razorpay checkout
  const result = await new Promise<RazorpayPaymentResult>((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Razorpay = (window as any).Razorpay;
    if (!Razorpay) {
      reject(new Error("Razorpay SDK not loaded. Please refresh and try again."));
      return;
    }

    const rzp = new Razorpay({
      key: order.razorpay_key_id,
      amount: order.amount,
      currency: order.currency,
      name: "Ghost",
      description: `${order.plan_name} — ${order.credits} credits`,
      order_id: order.order_id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handler: (response: any) => {
        resolve({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled")),
      },
      theme: { color: "#7c3aed" },
    });

    rzp.open();
  });

  // 3. Verify on backend
  const verified = await apiFetch<{ credits_added: number; remaining_credits: number }>(
    "/payments/verify-razorpay",
    {
      method: "POST",
      body: JSON.stringify({
        ...result,
        plan_name: planName,
      }),
    }
  );

  return { credits_added: verified.credits_added };
}

// ── Stripe ──

/**
 * Create Stripe Checkout session and redirect to Stripe-hosted page.
 */
export async function payWithStripe(planName: string): Promise<void> {
  const { checkout_url } = await apiFetch<{ checkout_url: string }>(
    "/payments/create-checkout",
    {
      method: "POST",
      body: JSON.stringify({
        plan_name: planName,
        success_url: `${window.location.origin}/dashboard/billing?payment=success`,
        cancel_url: `${window.location.origin}/dashboard/billing?payment=cancelled`,
      }),
    }
  );

  // Redirect to Stripe checkout
  window.location.href = checkout_url;
}
