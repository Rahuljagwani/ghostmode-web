"use client";

import { useEffect, useRef, useState } from "react";
import { capturePayPalOrder, createPayPalOrder, loadPayPal } from "@/lib/payments";

/**
 * PayPal's own buttons for one plan: "PayPal" and "Debit or Credit Card" (no PayPal account needed).
 * Credits are added by our server after it captures the payment and checks the amount with PayPal.
 */
export default function PayPalCheckout({
  clientId,
  planName,
  onSuccess,
  onError,
}: {
  clientId: string;
  planName: string;
  onSuccess: (creditsAdded: number) => void;
  onError: (message: string) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  // Keep the latest callbacks without re-rendering PayPal's buttons on every parent render.
  const handlers = useRef({ onSuccess, onError });
  handlers.current = { onSuccess, onError };

  useEffect(() => {
    let buttons: { render: (el: HTMLElement) => Promise<void>; close?: () => void } | null = null;
    let cancelled = false;
    setLoading(true);
    loadPayPal(clientId)
      .then(() => {
        if (cancelled || !box.current) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const paypal = (window as any).paypal;
        buttons = paypal.Buttons({
          style: { layout: "vertical", shape: "rect", color: "gold", label: "pay", height: 45 },
          createOrder: () => createPayPalOrder(planName),
          onApprove: async (data: { orderID: string }) => {
            try {
              const result = await capturePayPalOrder(data.orderID);
              handlers.current.onSuccess(result.credits_added);
            } catch (err) {
              handlers.current.onError(err instanceof Error ? err.message : "Payment failed");
            }
          },
          onError: () => handlers.current.onError("PayPal couldn't complete the payment. You haven't been charged; please try again."),
        });
        box.current.innerHTML = "";
        return buttons!.render(box.current);
      })
      .catch((err) => handlers.current.onError(err instanceof Error ? err.message : "Couldn't load PayPal"))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
      buttons?.close?.();
    };
  }, [clientId, planName]);

  return (
    <div className="w-full max-w-sm">
      {loading && <p className="text-sm text-gray-400 py-3">Loading PayPal…</p>}
      <div ref={box} />
    </div>
  );
}
