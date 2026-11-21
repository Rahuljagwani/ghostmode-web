"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

// Blog index with search, category filter and pagination.
// SEO: the server renders every post card, so every post link is in the HTML Google crawls. Search, filters and
// pages only hide cards in the browser. The controls are buttons, not links, so they create no new URLs to index.

export type BlogListItem = {
  href: string;
  title: string;
  excerpt: string;
  tag: string;
  keywords: string[];
  published: string;
  dateLabel: string;
  readingMinutes: number;
  scheduled: boolean;
};

const PAGE_SIZE = 10;

function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const listTop = useRef<HTMLDivElement>(null);

  // Categories, most posts first.
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    posts.forEach((p) => counts.set(p.tag, (counts.get(p.tag) ?? 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const searchIndex = useMemo(
    () => posts.map((p) => normalize([p.title, p.excerpt, p.tag, ...p.keywords].join(" "))),
    [posts],
  );

  const matches = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return posts
      .map((p, i) => ({ p, i }))
      .filter(({ p, i }) => (category === "All" || p.tag === category) && words.every((w) => searchIndex[i].includes(w)))
      .map(({ i }) => i);
  }, [posts, query, category, searchIndex]);

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = new Set(matches.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE));

  // Reset to page 1 when the search or category changes.
  useEffect(() => setPage(1), [query, category]);

  function goTo(n: number) {
    setPage(n);
    listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium border transition-colors ${
      active ? "bg-sky-500 border-sky-500 text-white" : "bg-white border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-700"
    }`;

  return (
    <div>
      <div ref={listTop} className="scroll-mt-24 space-y-4 mb-8">
        <label className="block">
          <span className="sr-only">Search the blog</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts: system design, RAG, resume..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button type="button" className={chip(category === "All")} aria-pressed={category === "All"} onClick={() => setCategory("All")}>
            All <span className="opacity-70">({posts.length})</span>
          </button>
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              className={chip(category === name)}
              aria-pressed={category === name}
              onClick={() => setCategory(category === name ? "All" : name)}
            >
              {name} <span className="opacity-70">({count})</span>
            </button>
          ))}
        </div>
      </div>

      {matches.length === 0 && (
        <p className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
          No posts match that search. Try another word or{" "}
          <button
            type="button"
            className="text-sky-600 underline underline-offset-2"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            clear the filters
          </button>
          .
        </p>
      )}

      <div className="space-y-5">
        {posts.map((p, i) => (
          <Link
            key={p.href}
            href={p.href}
            className={`${visible.has(i) ? "block" : "hidden"} bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all`}
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
              <span className="bg-sky-50 text-sky-700 font-semibold px-2.5 py-1 rounded-full">{p.tag}</span>
              <time dateTime={p.published}>{p.dateLabel}</time>
              <span>· {p.readingMinutes} min read</span>
              {p.scheduled && (
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 font-semibold text-amber-800">Scheduled</span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-2">{p.title}</h2>
            <p className="text-gray-600 leading-relaxed">{p.excerpt}</p>
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <nav aria-label="Blog pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={current === 1}
            onClick={() => goTo(current - 1)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-40 hover:border-sky-300"
          >
            Previous
          </button>
          {Array.from({ length: pageCount }, (_, k) => k + 1).map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === current ? "page" : undefined}
              onClick={() => goTo(n)}
              className={`h-9 min-w-9 rounded-full px-3 text-sm font-semibold ${
                n === current ? "bg-sky-500 text-white" : "border border-gray-200 bg-white text-gray-700 hover:border-sky-300"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={current === pageCount}
            onClick={() => goTo(current + 1)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-40 hover:border-sky-300"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
