import { MetadataRoute } from "next";
import { posts as blogPosts } from "@/lib/blog";

const SITE_URL = "https://renekin.com";

async function getBlogPosts(): Promise<{ slug: string; lastModified: Date }[]> {
  return blogPosts.map((p) => ({ slug: p.slug, lastModified: new Date(`${p.updated}T00:00:00Z`) }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/download`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const posts = await getBlogPosts();
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
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }]
    : [];

  return [...staticPages, ...blogIndex, ...blogPages];
}
