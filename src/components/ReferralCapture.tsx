"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { captureReferral } from "@/lib/referral";

export default function ReferralCapture() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");
  useEffect(() => {
    captureReferral(ref);
  }, [ref]);
  return null;
}
