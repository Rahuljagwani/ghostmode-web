import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Ghost by Renekin AI. Start free with 5 credits, then choose a plan that fits your needs.",
  alternates: { canonical: "https://renekin.com/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
