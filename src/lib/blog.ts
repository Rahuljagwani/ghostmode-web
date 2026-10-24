import matter from "gray-matter";
import { markdownSources } from "@/content/posts";

export const SITE_URL = "https://renekin.com";

/** Every post goes live at 5pm India time on its publish date. */
const PUBLISH_TIME_IST = "T17:00:00+05:30";

export interface Faq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  /** On-page headline (H1). */
  title: string;
  /** <title> tag, written for search. */
  seoTitle: string;
  description: string;
  excerpt: string;
  tag: string;
  keywords: string[];
  /** Publish date (YYYY-MM-DD). The post stays hidden until 5pm IST that day. */
  published: string;
  updated: string;
  readingMinutes: number;
  /** Markdown posts only. */
  markdown?: string;
  tldr?: string[];
  /** Path of a free tool to promote near the top, e.g. "/tools/ats-resume-checker". */
  tool?: string;
  faqs?: Faq[];
}

// Posts written as React components in src/content/blog.
const tsxPosts: BlogPost[] = [
  {
    slug: "how-to-beat-ats-resume",
    title: "How to get your resume past ATS in 2026: a checklist that actually works",
    seoTitle: "How to Beat ATS in 2026: ATS-Friendly Resume Checklist",
    description:
      "What an ATS really does, why the '75% rejected' stat is a myth, and a checklist to make your resume ATS-friendly: format, keywords and a 5-minute self-test.",
    excerpt:
      "The ATS isn't secretly rejecting 75% of resumes. Here's what actually filters you out, and a 20-minute checklist to fix it.",
    tag: "Resume",
    keywords: [
      "how to beat ATS",
      "ATS friendly resume",
      "ATS resume checklist",
      "applicant tracking system",
      "ATS resume format",
      "resume keywords",
      "ATS resume for freshers",
    ],
    published: "2026-10-17",
    updated: "2026-10-17",
    readingMinutes: 8,
  },
  {
    slug: "how-to-prepare-for-ai-interview",
    title: "AI interviewers are here: how to prepare when an AI interviews you",
    seoTitle: "How to Prepare for an AI Interview (2026 Guide + 10 Tips)",
    description:
      "More first-round interviews are now run by AI, by voice, chat or video. How AI interviews work, what they score, and 10 practical tips to prepare.",
    excerpt:
      "Your next interviewer might be an AI. The 3 types of AI interviews, what they actually score, and 10 practical ways to prepare.",
    tag: "Interview prep",
    keywords: [
      "how to prepare for an AI interview",
      "AI interview",
      "AI interviewer",
      "AI interview tips",
      "AI video interview",
      "HireVue interview tips",
      "one-way video interview",
      "AI interview questions",
    ],
    published: "2026-10-06",
    updated: "2026-10-06",
    readingMinutes: 7,
  },
  {
    slug: "best-ai-interview-copilot",
    title: "Cluely charges $149.99 a month to hide from screen share. Ghost does it on the free plan.",
    seoTitle: "Best AI Interview Copilot 2026: Ghost vs Cluely & More",
    description:
      "We compared 6 AI interview copilots on price, screen-share stealth and lock-in. Most cost $25 to $299 a month. Ghost costs about $2 an interview.",
    excerpt:
      "Six AI interview copilots, their real prices and the fine print they hope you skip. One of them costs about $2 an interview. The rest want a subscription.",
    tag: "Comparison",
    keywords: [
      "best AI interview copilot",
      "Cluely alternative",
      "Final Round AI alternative",
      "LockedIn AI alternative",
      "Parakeet AI alternative",
      "Interview Coder alternative",
      "AI interview assistant pricing",
      "invisible interview assistant",
      "cheap AI interview copilot",
    ],
    published: "2026-10-04",
    updated: "2026-10-04",
    readingMinutes: 8,
  },
];


// YAML turns unquoted dates into Date objects.
function isoDate(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

// Posts written in Markdown in src/content/posts.
const markdownPosts: BlogPost[] = markdownSources.map((source) => {
  const { data, content } = matter(source);
  const published = isoDate(data.date);
  return {
    slug: data.slug,
    title: data.title,
    seoTitle: data.seoTitle ?? data.title,
    description: data.description,
    excerpt: data.excerpt ?? data.description,
    tag: data.tag ?? "Interview prep",
    keywords: data.keywords ?? [],
    published,
    updated: data.updated ? isoDate(data.updated) : published,
    readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    markdown: content,
    tldr: data.tldr,
    tool: data.tool,
    faqs: data.faqs,
  };
});

// Every post, scheduled ones included. Newest first.
const allPosts = [...tsxPosts, ...markdownPosts].sort((a, b) => b.published.localeCompare(a.published));

const seen = new Set<string>();
for (const p of allPosts) {
  if (seen.has(p.slug)) throw new Error(`Duplicate blog slug: ${p.slug}`);
  seen.add(p.slug);
}

/** In local dev, scheduled posts are shown so they can be reviewed before they go live. */
const showScheduled = process.env.NODE_ENV === "development";

export function publishTime(post: BlogPost): Date {
  return new Date(`${post.published}${PUBLISH_TIME_IST}`);
}

export function isScheduled(post: BlogPost, now = new Date()): boolean {
  return publishTime(post) > now;
}

/** Posts visitors can see right now, newest first. */
export function getLivePosts(now = new Date()): BlogPost[] {
  return allPosts.filter((p) => showScheduled || !isScheduled(p, now));
}

export function getPost(slug: string): BlogPost | undefined {
  return getLivePosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
