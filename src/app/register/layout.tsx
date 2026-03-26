import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a free Renekin AI account and get 5 credits to try Ghost — the invisible AI interview copilot.",
  alternates: { canonical: "https://renekin.com/register" },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
