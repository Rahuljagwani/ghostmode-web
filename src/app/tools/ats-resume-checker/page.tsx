import { Metadata } from "next";
import Link from "next/link";
import AtsChecker from "@/components/tools/AtsChecker";
import FaqSection, { type Faq } from "@/components/FaqSection";

const URL = "https://renekin.com/tools/ats-resume-checker";

export const metadata: Metadata = {
  title: { absolute: "Free ATS Resume Checker: Score Your Resume vs a Job | Ghost" },
  description:
    "Upload your resume and a job description to get a free ATS match score, missing keywords, format checks and tips to improve. No sign-up needed.",
  keywords: [
    "ATS resume checker",
    "free ATS checker",
    "resume ATS score",
    "resume keyword checker",
    "ATS friendly resume check",
    "resume job description match",
  ],
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: "Free ATS Resume Checker",
    description: "Get an ATS match score, missing keywords and format checks for your resume. Free.",
    images: ["/opengraph-image"],
  },
};

const faqs: Faq[] = [
  {
    q: "How does the ATS resume checker work?",
    a: "Our AI picks out the keywords a recruiter would search for in the job description, such as skills, tools and qualifications, and checks which ones appear in your resume. It also runs format checks an ATS cares about, like readable text, contact details and standard section headings.",
  },
  {
    q: "How is the score calculated?",
    a: "70% of the score comes from keyword match (required keywords count double) and 30% from format checks. Above 75 is a strong match, 50–75 is decent, and below 50 means your resume needs tailoring for this job.",
  },
  {
    q: "Is it free?",
    a: "Yes. You can check your resume 3 times a day without an account, or more with a free account.",
  },
  {
    q: "Which file types are supported?",
    a: "PDF, DOCX and TXT, up to 2 MB. If your PDF is a scanned image, paste the text instead, and consider re-exporting it as a text-based PDF, since an ATS can't read images either.",
  },
  {
    q: "Do you store my resume?",
    a: "No. Your resume is only used to run the check and isn't saved to your account.",
  },
  {
    q: "Should I add every missing keyword?",
    a: "Only the ones that are true for you. Add them to your skills section and, where you can, to an experience or project bullet that shows you used them. Never add skills you don't have.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://renekin.com" },
    { "@type": "ListItem", position: 2, name: "Free tools", item: "https://renekin.com/tools" },
    { "@type": "ListItem", position: 3, name: "ATS Resume Checker", item: URL },
  ],
};

export default function AtsResumeCheckerPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/tools" className="hover:text-sky-600">Free tools</Link>
          <span className="mx-2">/</span>
          <span>ATS Resume Checker</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Free ATS Resume Checker
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          See how well your resume matches a job before you apply. Get an ATS match score, the keywords you&apos;re
          missing, format checks and specific tips to improve. Free, no sign-up needed.
        </p>

        <div className="mt-10">
          <AtsChecker />
        </div>

        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What the checker looks at</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
            <li>
              <strong>Keywords:</strong> the skills, tools and qualifications from the job description that a recruiter
              is likely to search for.
            </li>
            <li>
              <strong>Readability:</strong> whether an ATS can read your text at all. Scanned or image-only PDFs fail.
            </li>
            <li>
              <strong>Contact details and headings:</strong> email, phone, and standard sections like Experience,
              Education and Skills.
            </li>
            <li>
              <strong>Impact:</strong> whether your bullets include numbers that show results.
            </li>
          </ul>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Want the full picture? Read our guide on{" "}
            <Link href="/blog/how-to-beat-ats-resume" className="text-sky-600 underline underline-offset-2">
              how to beat ATS in 2026
            </Link>
            , then predict your questions with the free{" "}
            <Link href="/tools/interview-question-predictor" className="text-sky-600 underline underline-offset-2">
              interview question predictor
            </Link>
            .
          </p>
        </section>

        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
