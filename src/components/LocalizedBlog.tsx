import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLivePosts, getPost, formatDate, isScheduled, postPath, BlogPost, SITE_URL } from "@/lib/blog";
import { renderPostBody, postImages } from "@/lib/markdown";
import { ASSISTANT_PAGES, BLOG_STRINGS, type LocalLang } from "@/lib/i18n";

// Blogs in other languages, at /<lang>/blog and /<lang>/blog/<slug>. Posts are Markdown files in
// src/content/posts/<lang>/ with `lang: <code>` in the front matter. The English blog (src/app/blog) is separate
// and only lists English posts. Each translated post links to its language's landing page (ASSISTANT_PAGES).

export function localizedPostParams(lang: LocalLang) {
  return getLivePosts(new Date(), lang).map((p) => ({ slug: p.slug }));
}

export function localizedBlogMetadata(lang: LocalLang): Metadata {
  const t = BLOG_STRINGS[lang];
  const url = `${SITE_URL}/${lang}/blog`;
  return {
    title: { absolute: t.blogSeoTitle },
    description: t.blogDescription,
    alternates: { canonical: url },
    openGraph: { url, locale: t.ogLocale, title: t.blogSeoTitle, description: t.blogDescription, images: ["/opengraph-image"] },
  };
}

export function localizedPostMetadata(lang: LocalLang, slug: string): Metadata {
  const post = getPost(slug, lang);
  if (!post) return {};
  const url = `${SITE_URL}${postPath(post)}`;
  return {
    title: { absolute: post.seoTitle },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      locale: BLOG_STRINGS[lang].ogLocale,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: ["Renekin AI"],
      images: [...postImages(post.markdown ?? ""), "/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export function LocalizedBlogIndex({ lang }: { lang: LocalLang }) {
  const t = BLOG_STRINGS[lang];
  return (
    <div lang={lang} className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.blogTitle}</h1>
        <p className="text-gray-500 text-lg mb-12">{t.blogIntro}</p>
        <div className="space-y-5">
          {getLivePosts(new Date(), lang).map((p) => (
            <Link
              key={p.slug}
              href={postPath(p)}
              className="block bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="bg-sky-50 text-sky-700 font-semibold px-2.5 py-1 rounded-full">{p.tag}</span>
                <time dateTime={p.published}>{formatDate(p.published, t.dateLocale)}</time>
                <span>
                  · {p.readingMinutes} {t.minRead}
                </span>
                {isScheduled(p) && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-800">Scheduled</span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-2">{p.title}</h2>
              <p className="text-gray-600 leading-relaxed">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingBox({ lang }: { lang: LocalLang }) {
  const t = BLOG_STRINGS[lang];
  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-900">{t.ctaBoxTitle}</p>
        <p className="text-sm text-gray-600 mt-1">{t.ctaBoxText}</p>
      </div>
      <Link
        href={ASSISTANT_PAGES[lang]}
        className="shrink-0 inline-flex justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold !text-white !no-underline hover:bg-sky-600"
      >
        {t.ctaBoxButton}
      </Link>
    </div>
  );
}

function Body({ post, lang }: { post: BlogPost; lang: LocalLang }) {
  const t = BLOG_STRINGS[lang];
  const [intro, ...rest] = renderPostBody(post.markdown ?? "");
  return (
    <>
      {post.tldr?.length ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">{t.tldr}</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-gray-800 leading-relaxed">
            {post.tldr.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="md-body" dangerouslySetInnerHTML={{ __html: intro }} />
      <LandingBox lang={lang} />
      {rest.length > 0 && <div className="md-body" dangerouslySetInnerHTML={{ __html: rest.join("") }} />}
      {post.faqs?.length ? (
        <div className="md-body">
          <h2 id="faq">{t.faq}</h2>
          {post.faqs.map((f) => (
            <div key={f.q}>
              <h3>{f.q}</h3>
              <p className="mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export function LocalizedBlogPost({ lang, slug }: { lang: LocalLang; slug: string }) {
  const post = getPost(slug, lang);
  if (!post || !post.markdown) notFound();
  const t = BLOG_STRINGS[lang];
  const url = `${SITE_URL}${postPath(post)}`;
  const blogUrl = `${SITE_URL}/${lang}/blog`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      inLanguage: lang,
      headline: post.title,
      description: post.description,
      image: [`${SITE_URL}/opengraph-image`, ...postImages(post.markdown)],
      datePublished: post.published,
      dateModified: post.updated,
      mainEntityOfPage: url,
      keywords: post.keywords.join(", "),
      author: { "@type": "Organization", name: "Renekin AI", url: `${SITE_URL}/how-we-write` },
      publisher: {
        "@type": "Organization",
        name: "Renekin AI",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/renekin-logo-512.png`, width: 512, height: 512 },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: t.home, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: t.blogTitle, item: blogUrl },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    ...(post.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: lang,
            mainEntity: post.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <div lang={lang} className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href={`/${lang}/blog`} className="hover:text-sky-600">
            {t.blogTitle}
          </Link>
          <span className="mx-2">/</span>
          <span>{post.tag}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] text-balance">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-5 mb-10">
          <Link href="/how-we-write" className="font-medium text-gray-700 hover:text-sky-600">
            {t.author}
          </Link>
          <span>·</span>
          <span>
            {t.lastUpdated} <time dateTime={post.updated}>{formatDate(post.updated, t.dateLocale)}</time>
          </span>
          <span>·</span>
          <span>
            {post.readingMinutes} {t.minRead}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-12 border border-gray-200 shadow-sm">
          <div className="article">
            <Body post={post} lang={lang} />
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{t.ctaTitle}</h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">{t.ctaText}</p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            {t.ctaButton}
          </Link>
        </div>
      </article>
    </div>
  );
}
