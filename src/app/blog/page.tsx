import { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate, SITE_URL } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Honest comparisons, interview tips and product news from the team behind Ghost, the invisible AI interview copilot.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-gray-500 text-lg mb-12">
          Honest comparisons, interview tips and product news from the Ghost team.
        </p>

        <div className="space-y-5">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="bg-sky-50 text-sky-700 font-semibold px-2.5 py-1 rounded-full">{p.tag}</span>
                <time dateTime={p.published}>{formatDate(p.published)}</time>
                <span>· {p.readingMinutes} min read</span>
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
