"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureReferral } from "@/lib/referral";
import { captureSignupSource } from "@/lib/signupSource";

export default function ReferralCapture() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const ref = searchParams.get("ref");
  useEffect(() => {
    captureReferral(ref);
  }, [ref]);
  useEffect(() => {
    captureSignupSource(searchParams, pathname);
  }, [searchParams, pathname]);
  return null;
}
