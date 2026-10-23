import { Metadata } from "next";
import Link from "next/link";
import BulletRewriter from "@/components/tools/BulletRewriter";
import ToolPageShell from "@/components/tools/ToolPageShell";
import type { Faq } from "@/components/FaqSection";

const URL = "https://renekin.com/tools/resume-bullet-point-generator";

export const metadata: Metadata = {
  title: { absolute: "Free AI Resume Bullet Point Generator | Ghost by Renekin AI" },
  description:
    "Rewrite a weak resume line into 3 strong, ATS-friendly bullet points with action verbs and impact. Free AI resume bullet generator, no sign-up.",
  keywords: [
    "resume bullet point generator",
    "resume bullet points",
    "rewrite resume bullet",
    "resume action verbs",
    "AI resume line writer",
  ],
  alternates: { canonical: URL },
  openGraph: { url: URL, title: "Free AI Resume Bullet Point Generator", images: ["/opengraph-image"] },
};

const faqs: Faq[] = [
  {
    q: "What makes a good resume bullet point?",
    a: "It starts with a strong action verb, says what you did, and shows the result, ideally with a number: \"Built X using Y, which improved Z by N%.\" Keep it to one or two lines.",
  },
  {
    q: "Why does the generator add [placeholders]?",
    a: "Because it never invents facts. Where a number or detail would make your bullet stronger, it leaves a placeholder like [X%] or [N users] for you to fill in with the real figure.",
  },
  {
    q: "Are these bullet points ATS-friendly?",
    a: "Yes. They're plain text with standard wording, and if you add the target role, they include relevant keywords. Check the whole resume with our free ATS resume checker.",
  },
  {
    q: "How many bullet points should each job or project have?",
    a: "Usually 2 to 4. Put the most impressive, most relevant one first.",
  },
  {
    q: "Is it free?",
    a: "Yes. 3 rewrites a day without an account, or more with a free account.",
  },
];

export default function Page() {
  return (
    <ToolPageShell
      url={URL}
      name="Resume Bullet Point Generator"
      title="Free Resume Bullet Point Generator"
      intro="Paste a weak line from your resume and get 3 stronger, ATS-friendly versions with action verbs and impact. Free, no sign-up needed."
      tool={<BulletRewriter />}
      faqs={faqs}
      guide={
        <>
          <h2>The formula for a strong bullet point</h2>
          <p>
            <strong>Action verb + what you did + how + result.</strong> Compare:
          </p>
          <ul>
            <li>
              <strong>Weak:</strong> &quot;Worked on the college placement website.&quot;
            </li>
            <li>
              <strong>Strong:</strong> &quot;Built the college placement portal in React and Node.js, used by 1,200+
              students across 3 placement drives.&quot;
            </li>
          </ul>
          <h3>Strong action verbs to start with</h3>
          <p>
            Built, Designed, Led, Launched, Automated, Reduced, Increased, Improved, Analysed, Optimised, Delivered,
            Migrated, Resolved, Trained, Negotiated.
          </p>
          <h3>Where to find your numbers</h3>
          <ul>
            <li>How many people used it, or how many you helped</li>
            <li>Time or money saved, or speed improved</li>
            <li>Team size, deadlines met, rankings or grades</li>
          </ul>
          <p>
            Once your bullets are strong, check the whole resume against a job with the{" "}
            <Link href="/tools/ats-resume-checker">free ATS resume checker</Link>, or read{" "}
            <Link href="/blog/how-to-beat-ats-resume">how to beat ATS in 2026</Link>.
          </p>
        </>
      }
    />
  );
}
