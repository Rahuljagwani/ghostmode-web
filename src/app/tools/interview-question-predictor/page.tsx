import { Metadata } from "next";
import Link from "next/link";
import QuestionPredictor from "@/components/tools/QuestionPredictor";
import FaqSection, { type Faq } from "@/components/FaqSection";
import MoreTools from "@/components/tools/MoreTools";

const URL = "https://renekin.com/tools/interview-question-predictor";

export const metadata: Metadata = {
  title: { absolute: "Free Interview Question Predictor (AI) | Ghost by Renekin AI" },
  description:
    "Paste a job description and get the 10 interview questions you're most likely to be asked, with tips to answer each. Free, no sign-up.",
  keywords: [
    "interview question predictor",
    "interview questions from job description",
    "AI interview question generator",
    "likely interview questions",
    "interview preparation tool",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Free AI Interview Question Predictor",
    description: "Paste a job description, get your 10 most likely interview questions with answer tips.",
    images: ["/opengraph-image"],
  },
};

const faqs: Faq[] = [
  {
    q: "How does the interview question predictor work?",
    a: "Paste the job description and our AI reads the role, responsibilities and requirements, then predicts the 10 questions an interviewer is most likely to ask, with a tip on how to answer each one.",
  },
  {
    q: "Is it free?",
    a: "Yes. You can use it 3 times a day without an account. Create a free account for more uses every day, plus 20 free Ghost credits.",
  },
  {
    q: "What kinds of questions does it predict?",
    a: "A mix of technical and role-specific questions based on the skills in the job description, behavioral questions about your past experience, and common HR questions.",
  },
  {
    q: "Will these be the exact questions in my interview?",
    a: "No tool can know the exact questions, but these are the ones the job description makes most likely. Preparing them covers most of what you'll be asked.",
  },
  {
    q: "How should I prepare once I have the questions?",
    a: "Write a short answer for each, use the STAR method (Situation, Task, Action, Result) for behavioral questions, and practise saying them out loud with a timer.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://renekin.com" },
    { "@type": "ListItem", position: 2, name: "Free tools", item: "https://renekin.com/tools" },
    { "@type": "ListItem", position: 3, name: "Interview Question Predictor", item: URL },
  ],
};

export default function InterviewQuestionPredictorPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/tools" className="hover:text-sky-600">Free tools</Link>
          <span className="mx-2">/</span>
          <span>Interview Question Predictor</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Free Interview Question Predictor
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Paste a job description and get the 10 questions you&apos;re most likely to be asked, with a tip on how to
          answer each. Free, no sign-up needed.
        </p>

        <div className="mt-10">
          <QuestionPredictor />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How to use your predicted questions</h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>Write a 3–5 line answer for each question, using real examples from your resume.</li>
            <li>For behavioral questions, use the STAR method: Situation, Task, Action, Result.</li>
            <li>For technical questions, practise explaining your thinking out loud, not just the final answer.</li>
            <li>Rehearse with a 90-second timer and record yourself once. You&apos;ll spot rambling immediately.</li>
          </ol>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Interviewing with an AI interviewer? Read{" "}
            <Link href="/blog/how-to-prepare-for-ai-interview" className="text-sky-600 underline underline-offset-2">
              how to prepare for an AI interview
            </Link>
            . Checking your resume first? Try the free{" "}
            <Link href="/tools/ats-resume-checker" className="text-sky-600 underline underline-offset-2">
              ATS resume checker
            </Link>
            .
          </p>
        </section>

        <MoreTools current="/tools/interview-question-predictor" />

        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
