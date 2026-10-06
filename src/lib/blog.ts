export const SITE_URL = "https://renekin.com";

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
  published: string;
  updated: string;
  readingMinutes: number;
}

// Newest first.
export const posts: BlogPost[] = [
  {
    slug: "how-to-prepare-for-ai-interview",
    title: "AI interviewers are here: how to prepare when an AI interviews you",
    seoTitle: "How to Prepare for an AI Interview (2026 Guide + 10 Tips)",
    description:
      "More first-round interviews are now run by AI, by voice, chat or recorded video. Here's how AI interviews work, what they score, and 10 practical tips to prepare.",
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
    seoTitle: "Best AI Interview Copilot 2026: Ghost vs Cluely, Final Round AI, LockedIn AI & More",
    description:
      "We compared 6 AI interview copilots on real prices, screen-share stealth and lock-in. Most cost $25 to $299 a month. Ghost costs about $2 per interview, with no subscription.",
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

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
