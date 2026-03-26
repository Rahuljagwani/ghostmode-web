import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Renekin AI account to manage credits and access Ghost.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://renekin.com/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
