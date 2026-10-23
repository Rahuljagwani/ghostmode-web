import { Metadata } from "next";
import Link from "next/link";
import StarBuilder from "@/components/tools/StarBuilder";
import ToolPageShell from "@/components/tools/ToolPageShell";
import type { Faq } from "@/components/FaqSection";

const URL = "https://renekin.com/tools/star-method-answer-generator";

export const metadata: Metadata = {
  title: { absolute: "Free STAR Method Answer Generator (AI) | Ghost by Renekin AI" },
  description:
    "Turn a rough story into a structured STAR answer (Situation, Task, Action, Result) for behavioral interview questions. Free AI generator, no sign-up.",
  keywords: [
    "STAR method answer generator",
    "STAR method examples",
    "STAR interview answers",
    "behavioral interview answers",
    "tell me about a time you faced a challenge",
  ],
  alternates: { canonical: URL },
  openGraph: { url: URL, title: "Free STAR Method Answer Generator", images: ["/opengraph-image"] },
};

const faqs: Faq[] = [
  {
    q: "What is the STAR method?",
    a: "STAR stands for Situation, Task, Action and Result. It's a simple structure for answering behavioral interview questions like \"Tell me about a time you faced a challenge\", so your answer is clear and shows your impact.",
  },
  {
    q: "How long should a STAR answer be?",
    a: "About 1 to 2 minutes, roughly 120 to 180 words. Spend most of the time on the Action, since that's where you show what you did.",
  },
  {
    q: "What questions should I prepare STAR answers for?",
    a: "Common ones are a challenge you faced, working under pressure, a conflict with a teammate, showing leadership, a mistake you learned from, and a time you went above and beyond. 4 or 5 good stories can cover most of them.",
  },
  {
    q: "Can freshers use the STAR method?",
    a: "Yes. College projects, internships, hackathons, clubs, events and part-time jobs all make great STAR stories.",
  },
  {
    q: "Is this generator free?",
    a: "Yes. 3 answers a day without an account, or more with a free account. It only uses the facts in your story.",
  },
];

export default function Page() {
  return (
    <ToolPageShell
      url={URL}
      name="STAR Method Answer Generator"
      title="Free STAR Method Answer Generator"
      intro="Describe what happened in a few rough lines and get a clear STAR answer (Situation, Task, Action, Result) for any behavioral interview question. Free, no sign-up needed."
      tool={<StarBuilder />}
      faqs={faqs}
      guide={
        <>
          <h2>The STAR method, explained</h2>
          <ul>
            <li>
              <strong>Situation:</strong> set the scene in one or two sentences. Where were you, and what was going on?
            </li>
            <li>
              <strong>Task:</strong> what were you responsible for, or what needed to happen?
            </li>
            <li>
              <strong>Action:</strong> what did <em>you</em> do? Say &quot;I&quot;, not &quot;we&quot;. This is the
              most important part.
            </li>
            <li>
              <strong>Result:</strong> what happened because of it, with a number if possible, and what you learned.
            </li>
          </ul>
          <h3>Tips that make STAR answers stand out</h3>
          <ul>
            <li>Prepare 4–5 stories you can adapt to many questions.</li>
            <li>Keep the situation short; interviewers care most about your actions.</li>
            <li>End with what you learned. It shows self-awareness.</li>
          </ul>
          <p>
            Want to know which behavioral questions you&apos;ll get? Try the{" "}
            <Link href="/tools/interview-question-predictor">free interview question predictor</Link>.
          </p>
        </>
      }
    />
  );
}
