import Link from "next/link";
import type { ReactNode } from "react";
import DemoVideo from "@/components/DemoVideo";
import Icon from "@/components/Icon";
import {
  ArrowRight02Icon,
  Mic01Icon,
  EyeIcon,
  Brain01Icon,
  ViewOffIcon,
  LanguageSkillIcon,
  FlashIcon,
} from "@hugeicons/core-free-icons";
import { ASSISTANT_PAGES, BLOG_STRINGS, type AssistantLang } from "@/lib/i18n";
import { getLivePosts, postPath } from "@/lib/blog";

// Shared layout for the translated versions of /ai-interview-assistant (src/app/{es,fr,pt}/...).
// Each language page passes its own text; the layout, icons and order stay the same everywhere.

export type Faq = { q: string; a: string };

export type AssistantPageContent = {
  lang: Exclude<AssistantLang, "en">;
  url: string;
  breadcrumb: { home: string; page: string };
  hero: { h1: string; sub: string; cta: string; pricing: string; badges: string; englishLink: string };
  whatIs: { h2: string; paragraphs: ReactNode[] };
  english: { h2: string; paragraphs: ReactNode[] };
  how: { h2: string; steps: [string, string][] };
  capabilities: { h2: string; sub: string; items: { title: string; desc: string }[] };
  useCases: { h2: string; items: { title: string; desc: string }[]; note: ReactNode };
  pricing: { h2: string; paragraphs: ReactNode[] };
  faq: { h2: string; items: Faq[] };
  cta: { h2: string; sub: string; button: string };
};

const CAPABILITY_STYLE = [
  { icon: Mic01Icon, color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: EyeIcon, color: "text-sky-600", bg: "bg-sky-50" },
  { icon: Brain01Icon, color: "text-violet-600", bg: "bg-violet-50" },
  { icon: ViewOffIcon, color: "text-rose-600", bg: "bg-rose-50" },
  { icon: LanguageSkillIcon, color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: FlashIcon, color: "text-amber-600", bg: "bg-amber-50" },
];

export const linkClass = "text-sky-600 underline underline-offset-2 hover:text-sky-700";

export default function LocalizedAssistantPage({ c }: { c: AssistantPageContent }) {
  const guides = getLivePosts(new Date(), c.lang).slice(0, 6);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: c.lang,
      mainEntity: c.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: c.breadcrumb.home, item: "https://renekin.com" },
        { "@type": "ListItem", position: 2, name: c.breadcrumb.page, item: c.url },
      ],
    },
  ];

  return (
    // The site's <html> is English; lang here marks this page's content for browsers and screen readers.
    // Google detects the language from the text itself, and next.config.mjs sends Content-Language.
    <div lang={c.lang} className="-mt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 pb-12 sm:pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-sm text-balance">
            {c.hero.h1}
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">{c.hero.sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 py-3.5 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              {c.hero.cta}
              <Icon icon={ArrowRight02Icon} size={20} />
            </Link>
            <Link href="/pricing" className="text-white/90 hover:text-white font-medium transition-colors">
              {c.hero.pricing}
            </Link>
          </div>
          <p className="mt-5 text-sm font-medium text-white/85">{c.hero.badges}</p>
          <p className="mt-3 text-xs text-white/80">
            <Link href={ASSISTANT_PAGES.en} hrefLang="en" lang="en" className="underline underline-offset-2 hover:text-white">
              {c.hero.englishLink}
            </Link>
          </p>
        </div>
      </section>

      {/* What it is */}
      <section className="bg-gradient-to-b from-sky-100 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <DemoVideo />
          <div className="max-w-3xl mx-auto mt-14 sm:mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">{c.whatIs.h2}</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              {c.whatIs.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      </section>

      {/* Interviews in English */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">{c.english.h2}</h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            {c.english.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">{c.how.h2}</h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {c.how.steps.map(([title, desc], i) => (
              <li key={title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-sky-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-5 shadow-md">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-gradient-to-b from-sky-50 via-sky-100 to-sky-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">{c.capabilities.h2}</h2>
          <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">{c.capabilities.sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {c.capabilities.items.map((item, i) => {
              const s = CAPABILITY_STYLE[i % CAPABILITY_STYLE.length];
              return (
                <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                    <Icon icon={s.icon} size={20} className={s.color} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">{c.useCases.h2}</h2>
          <div className="space-y-8">
            {c.useCases.items.map((u) => (
              <div key={u.title}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{u.title}</h3>
                <p className="text-gray-600 leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-gray-600 leading-relaxed">{c.useCases.note}</p>
        </div>
      </section>

      {/* Latest guides in this language: the main internal link into /<lang>/blog. */}
      {guides.length > 0 && (
        <section className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{BLOG_STRINGS[c.lang].guidesHeading}</h2>
            <ul className="space-y-3">
              {guides.map((p) => (
                <li key={p.slug}>
                  <Link href={postPath(p)} className={`${linkClass} text-lg`}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5">
              <Link href={`/${c.lang}/blog`} className="text-sm font-semibold text-sky-600 hover:text-sky-700">
                {BLOG_STRINGS[c.lang].blogTitle} →
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">{c.pricing.h2}</h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            {c.pricing.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">{c.faq.h2}</h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {c.faq.items.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-gray-900">
                  <h3>{f.q}</h3>
                  <span className="text-sky-500 text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-400 to-sky-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{c.cta.h2}</h2>
          <p className="text-white/85 mb-8 max-w-lg mx-auto">{c.cta.sub}</p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            {c.cta.button}
            <Icon icon={ArrowRight02Icon} size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
