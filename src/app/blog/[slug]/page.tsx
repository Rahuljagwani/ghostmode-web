import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate, SITE_URL } from "@/lib/blog";
import { postContent } from "@/content/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
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
  if (!post || !content) notFound();

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
    ...(content.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  const { Body } = content;

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
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-8 md:p-12 border border-gray-200 shadow-sm">
          <div className="article">
            <Body />
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
