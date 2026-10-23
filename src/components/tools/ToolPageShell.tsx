import Link from "next/link";
import FaqSection, { type Faq } from "@/components/FaqSection";
import MoreTools from "./MoreTools";

/** Common layout for a free tool page: breadcrumb, H1, intro, tool, guide, more tools, FAQ. */
export default function ToolPageShell({
  url,
  name,
  title,
  intro,
  tool,
  guide,
  faqs,
}: {
  url: string;
  name: string;
  title: string;
  intro: string;
  tool: React.ReactNode;
  guide: React.ReactNode;
  faqs: Faq[];
}) {
  const path = new URL(url).pathname;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://renekin.com" },
      { "@type": "ListItem", position: 2, name: "Free tools", item: "https://renekin.com/tools" },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/tools" className="hover:text-sky-600">Free tools</Link>
          <span className="mx-2">/</span>
          <span>{name}</span>
        </nav>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">{title}</h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">{intro}</p>
        <div className="mt-10">{tool}</div>
        <section className="mt-16 space-y-4 text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_a]:text-sky-600 [&_a]:underline [&_a]:underline-offset-2">
          {guide}
        </section>
        <MoreTools current={path} />
        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
