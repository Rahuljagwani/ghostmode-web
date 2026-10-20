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
