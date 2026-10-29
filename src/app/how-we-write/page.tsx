import { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://renekin.com";
const URL = `${SITE_URL}/how-we-write`;

export const metadata: Metadata = {
  title: "How We Write and Review Our Guides",
  description:
    "How Team Renekin researches, fact-checks, reviews and updates the interview guides on the Renekin AI blog, including how we use AI and handle corrections.",
  alternates: { canonical: URL },
  openGraph: { url: URL, title: "How we write and review our guides", images: ["/opengraph-image"] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: URL,
  name: "How we write and review our guides",
  about: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  dateModified: "2026-10-30",
};

const sections: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "who",
    title: "Who writes our guides",
    body: (
      <>
        <p>
          Every guide on the <Link href="/blog">Renekin AI blog</Link> is written by Team Renekin, the team that builds{" "}
          <Link href="/ai-interview-assistant">Ghost</Link>. We work with large language models, backend services and
          cloud infrastructure every day, which is the same ground our technical interview guides cover.
        </p>
        <p>We publish as a team rather than under individual names, and the team stands behind every article.</p>
      </>
    ),
  },
  {
    id: "topics",
    title: "How we choose topics",
    body: (
      <p>
        We write about the questions candidates actually face: what appears in current job descriptions, what candidates
        report from real interviews, and what people ask us. We favour realistic scenarios, such as debugging a failing
        system or weighing two designs, over definitions you can find anywhere.
      </p>
    ),
  },
  {
    id: "research",
    title: "Research and sources",
    body: (
      <ul>
        <li>We check technical claims against official documentation and primary sources wherever possible.</li>
        <li>We link the sources behind specific facts, figures and prices, so you can verify them yourself.</li>
        <li>Figures that change over time, such as prices or provider limits, carry an &quot;as of&quot; date.</li>
        <li>We never invent statistics, quotes or reviews. If we can&apos;t verify a number, we leave it out.</li>
      </ul>
    ),
  },
  {
    id: "review",
    title: "Review before publishing",
    body: (
      <p>
        Every article is reviewed and edited by the team before it goes live. We check that each technical step is
        correct, that examples work as described, and that the advice is something we would follow ourselves.
      </p>
    ),
  },
  {
    id: "ai",
    title: "How we use AI",
    body: (
      <p>
        We build AI products, and we use AI tools to help with research and first drafts. AI never publishes on its own:
        a person on our team reviews, edits and fact-checks every article before it&apos;s published, and we take
        responsibility for everything on this site.
      </p>
    ),
  },
  {
    id: "comparisons",
    title: "Comparisons and conflicts of interest",
    body: (
      <p>
        We make Ghost, so we have an interest in how it compares with other tools. When we compare products, we say so
        clearly, use each company&apos;s own public pricing and feature pages, date every price, and review comparison
        pages regularly because competitors change their plans. We don&apos;t accept payment for placements or
        rankings.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Updates and corrections",
    body: (
      <>
        <p>
          Each guide shows when it was last updated. When something changes, such as a tool&apos;s pricing or best
          practice in an area, we revise the article and update that date.
        </p>
        <p>
          Spotted a mistake? Email <a href="mailto:socials@renekin.com">socials@renekin.com</a> with the page and the
          correction. We review every report and fix confirmed errors promptly.
        </p>
      </>
    ),
  },
];

export default function HowWeWritePage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/about" className="hover:text-sky-600">About</Link>
          <span className="mx-2">/</span>
          <span>Editorial policy</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-5">How we write and review our guides</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-12">
          Our interview guides help people prepare for decisions that matter to their careers, so we hold them to a
          clear standard. This page explains how we choose topics, research and check them, and keep them up to date.
        </p>

        <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-12 border border-gray-200 shadow-sm">
          <div className="article">
            {sections.map((s, i) => (
              <section key={s.id}>
                <h2 id={s.id} className={i === 0 ? "!mt-0" : undefined}>
                  {s.title}
                </h2>
                <div className="md-body mt-5">{s.body}</div>
              </section>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">Last updated October 30, 2026.</p>
      </div>
    </div>
  );
}
