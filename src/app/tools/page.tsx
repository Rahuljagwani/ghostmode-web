import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Interview & Resume Tools",
  description:
    "Free AI tools for job seekers from Renekin AI: predict your interview questions from a job description and check your resume against ATS.",
  alternates: { canonical: "https://renekin.com/tools" },
};

const tools = [
  {
    href: "/tools/interview-question-predictor",
    name: "Interview Question Predictor",
    desc: "Paste a job description, get the 10 questions you're most likely to be asked, with answer tips.",
  },
  {
    href: "/tools/ats-resume-checker",
    name: "ATS Resume Checker",
    desc: "Get an ATS match score, missing keywords and format checks for your resume against any job.",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Free tools</h1>
        <p className="text-gray-500 text-lg mb-12">
          Free AI tools to help you land the interview and prepare for it. No sign-up needed.
        </p>
        <div className="space-y-5">
          {tools.map((t) => (
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
      </div>
    </div>
  );
}
