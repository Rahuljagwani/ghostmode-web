import { MetadataRoute } from "next";
import { getLivePosts, publishTime, SITE_URL } from "@/lib/blog";

// Picks up scheduled blog posts as they go live.
export const revalidate = 600;

async function getBlogPosts(): Promise<{ slug: string; lastModified: Date }[]> {
  return getLivePosts().map((p) => ({
    slug: p.slug,
    lastModified: p.updated > p.published ? new Date(`${p.updated}T00:00:00Z`) : publishTime(p),
  }));
}

// When the static pages last changed. Update this when you edit them, so lastmod stays an honest signal.
const PAGES_UPDATED = new Date("2026-10-30T00:00:00Z");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const newestPost = posts.reduce((d, p) => (p.lastModified > d ? p.lastModified : d), new Date(0));
  // The homepage lists the latest guides, so it changes when a new post goes live.
  const homeUpdated = newestPost > PAGES_UPDATED ? newestPost : PAGES_UPDATED;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: homeUpdated,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/ai-interview-assistant`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ai-coding-interview-assistant`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools/ats-resume-checker`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/interview-question-predictor`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/tell-me-about-yourself-generator`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/resume-bullet-point-generator`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/star-method-answer-generator`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/cluely-alternative`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/how-we-write`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/download`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: PAGES_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // If you have a blog index page, include it too
  const blogIndex: MetadataRoute.Sitemap = posts.length > 0
    ? [{
        url: `${SITE_URL}/blog`,
        lastModified: newestPost,
        changeFrequency: "weekly",
        priority: 0.8,
      }]
    : [];

  return [...staticPages, ...blogIndex, ...blogPages];
}
