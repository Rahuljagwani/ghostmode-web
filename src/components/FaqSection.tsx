export interface Faq {
  q: string;
  a: string;
}

/** FAQ list with matching FAQPage structured data. */
export default function FaqSection({ title = "Frequently asked questions", faqs }: { title?: string; faqs: Faq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="max-w-3xl mx-auto mt-16 sm:mt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">{title}</h2>
      <div className="divide-y divide-gray-200 border-y border-gray-200">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-900">
              <h3>{f.q}</h3>
              <span className="text-sky-500 text-2xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-gray-600 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
