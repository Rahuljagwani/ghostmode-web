import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLivePosts, getPost, formatDate, isScheduled, BlogPost, SITE_URL } from "@/lib/blog";
import { renderPostBody } from "@/lib/markdown";
import { FREE_TOOLS } from "@/lib/freeTools";
import { postContent } from "@/content/blog";

// Scheduled posts aren't built until they go live, so check for newly published ones every 10 minutes.
export const revalidate = 600;

export function generateStaticParams() {
  return getLivePosts().map((p) => ({ slug: p.slug }));
}

function ToolBox({ href }: { href: string }) {
  const tool = FREE_TOOLS.find((t) => t.href === href);
  if (!tool) return null;
  return (
    <div className="rounded-2xl border border-sky-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-900">Try the free {tool.name}</p>
        <p className="text-sm text-gray-600 mt-1">{tool.desc} No sign-up.</p>
      </div>
      <Link
        href={tool.href}
        className="shrink-0 inline-flex justify-center rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold !text-white !no-underline hover:bg-sky-600"
      >
        Try it free
      </Link>
    </div>
  );
}

function MarkdownBody({ post }: { post: BlogPost }) {
  const [intro, ...rest] = renderPostBody(post.markdown ?? "");
  return (
    <>
      {post.tldr?.length ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-2">TL;DR</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-gray-800 leading-relaxed">
            {post.tldr.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="md-body" dangerouslySetInnerHTML={{ __html: intro }} />
      {post.tool && <ToolBox href={post.tool} />}
      {rest.length > 0 && <div className="md-body" dangerouslySetInnerHTML={{ __html: rest.join("") }} />}
      {post.faqs?.length ? (
        <div className="md-body">
          <h2 id="faq">Frequently asked questions</h2>
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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: { absolute: post.seoTitle },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: ["Renekin AI"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const content = postContent[params.slug];
  if (!post || (!content && !post.markdown)) notFound();
  const faqs = post.faqs ?? content?.faqs;

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      image: `${url}/opengraph-image`,
      datePublished: post.published,
      dateModified: post.updated,
      mainEntityOfPage: url,
      keywords: post.keywords.join(", "),
      author: { "@type": "Organization", name: "Renekin AI", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Renekin AI",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/renekin-logo-blue.svg` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    ...(faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
          <Link href="/blog" className="hover:text-sky-600">Blog</Link>
          <span className="mx-2">/</span>
          <span>{post.tag}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-[1.15] text-balance">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-5 mb-10">
          <span className="font-medium text-gray-700">Team Renekin</span>
          <span>·</span>
          <time dateTime={post.published}>{formatDate(post.published)}</time>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
          {isScheduled(post) && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              Scheduled: goes live {formatDate(post.published)}, 5pm IST
            </span>
          )}
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-12 border border-gray-200 shadow-sm">
          <div className="article">
            {content ? <content.Body /> : <MarkdownBody post={post} />}
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Try Ghost free</h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            20 free credits, every feature unlocked, hidden from screen share. No card, no subscription.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 bg-white text-gray-800 px-7 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            Download Ghost
          </Link>
        </div>
      </article>
    </div>
  );
}
