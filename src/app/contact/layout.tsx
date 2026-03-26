import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Renekin AI team. We'd love to hear from you — questions, feedback, or partnership inquiries.",
  alternates: { canonical: "https://renekin.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
