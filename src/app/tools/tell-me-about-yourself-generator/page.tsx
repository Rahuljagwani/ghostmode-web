import { Metadata } from "next";
import Link from "next/link";
import TmayGenerator from "@/components/tools/TmayGenerator";
import ToolPageShell from "@/components/tools/ToolPageShell";
import type { Faq } from "@/components/FaqSection";

const URL = "https://renekin.com/tools/tell-me-about-yourself-generator";

export const metadata: Metadata = {
  title: { absolute: "\"Tell Me About Yourself\" Answer Generator (Free) | Ghost" },
  description:
    "Turn your resume into a natural 60–90 second answer to \"Tell me about yourself\", tailored to the role. Free for freshers and experienced, no sign-up.",
  keywords: [
    "tell me about yourself answer",
    "tell me about yourself generator",
    "tell me about yourself for freshers",
    "self introduction for interview",
    "how to answer tell me about yourself",
  ],
  alternates: { canonical: URL },
  openGraph: { url: URL, title: "Free \"Tell Me About Yourself\" Answer Generator", images: ["/opengraph-image"] },
};

const faqs: Faq[] = [
  {
    q: "How long should my answer to \"Tell me about yourself\" be?",
    a: "Aim for 60 to 90 seconds, about 120 to 170 words. Long enough to cover who you are, your best example and why you want the role, short enough that the interviewer stays engaged.",
  },
  {
    q: "What is the best structure for \"Tell me about yourself\"?",
    a: "Present, past, future: start with who you are now, give one or two achievements that are most relevant to the role, then explain why this role is the right next step.",
  },
  {
    q: "How should a fresher answer \"Tell me about yourself\"?",
    a: "Lead with your degree and what you enjoy building or studying, use a project, internship or competition as your proof, and finish with why this company and role fit what you want to learn next.",
  },
  {
    q: "Should I memorise the answer word for word?",
    a: "No. Learn the three key points and your example, then say it in your own words. A memorised script sounds robotic; a practised structure sounds confident.",
  },
  {
    q: "Is this generator free?",
    a: "Yes. Use it 3 times a day without an account, or more with a free account. It only uses facts you give it and never invents achievements.",
  },
];

export default function Page() {
  return (
    <ToolPageShell
      url={URL}
      name="Tell Me About Yourself Generator"
      title={"Free \"Tell Me About Yourself\" Answer Generator"}
      intro="Paste your resume and the role, and get a natural, 60–90 second answer to the question every interview starts with, written in your voice. Free, no sign-up needed."
      tool={<TmayGenerator />}
      faqs={faqs}
      guide={
        <>
          <h2>How to answer &quot;Tell me about yourself&quot;</h2>
          <p>
            This question isn&apos;t asking for your life story. The interviewer wants a quick reason to believe you fit
            the role. The simplest structure that works is <strong>present, past, future</strong>:
          </p>
          <ol>
            <li>
              <strong>Present:</strong> who you are now. &quot;I&apos;m a final-year computer science student who
              enjoys building backend systems.&quot;
            </li>
            <li>
              <strong>Past:</strong> one or two achievements that prove it, with a number if you can. &quot;I built our
              college placement portal, now used by over 1,200 students.&quot;
            </li>
            <li>
              <strong>Future:</strong> why this role. &quot;I&apos;m looking for a team where I can work on systems at
              scale, which is why this role stood out.&quot;
            </li>
          </ol>
          <h3>Common mistakes</h3>
          <ul>
            <li>Reading your resume line by line.</li>
            <li>Starting with personal details like your hometown or family.</li>
            <li>Using empty words like &quot;passionate&quot; and &quot;hardworking&quot; instead of proof.</li>
            <li>Going over 2 minutes.</li>
          </ul>
          <p>
            Next, predict the rest of your interview with the{" "}
            <Link href="/tools/interview-question-predictor">free interview question predictor</Link>, or read{" "}
            <Link href="/blog/how-to-prepare-for-ai-interview">how to prepare for an AI interview</Link>.
          </p>
        </>
      }
    />
  );
}
