import { Metadata } from "next";
import Link from "next/link";
import FaqSection, { type Faq } from "@/components/FaqSection";
import { FREE_TOOLS } from "@/lib/freeTools";

export const metadata: Metadata = {
  title: { absolute: "Free AI Interview & Resume Tools | Ghost by Renekin AI" },
  description:
    "Free AI tools for job seekers: ATS resume checker, interview question predictor, self-introduction generator, resume bullet rewriter and STAR answers.",
  alternates: { canonical: "https://renekin.com/tools" },
};

const faqs: Faq[] = [
  {
    q: "Are these tools really free?",
    a: "Yes. Each tool can be used 3 times a day without an account, and more with a free account. No card needed.",
  },
  {
    q: "Do you store my resume or answers?",
    a: "No. What you paste is only used to generate your result and isn't saved to your account.",
  },
  {
    q: "Which tool should I start with?",
    a: "Start with the ATS resume checker to get past the first filter, then use the interview question predictor and the STAR answer generator to prepare for the interview itself.",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free interview &amp; resume tools</h1>
        <p className="text-gray-500 text-lg mb-12">
          Free AI tools to help you get shortlisted and prepare for the interview. No sign-up needed.
        </p>
        <div className="space-y-5">
          {FREE_TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="block bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{t.name}</h2>
              <p className="text-gray-600 leading-relaxed">{t.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-sky-600">Try it free →</span>
            </Link>
          ))}
        </div>
        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
