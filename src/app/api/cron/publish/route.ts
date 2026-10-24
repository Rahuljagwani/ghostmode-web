import { revalidatePath } from "next/cache";
import { getLivePosts, publishTime, SITE_URL } from "@/lib/blog";

export const dynamic = "force-dynamic";

// IndexNow tells Bing (which ChatGPT search uses), Yandex and others about new pages right away.
// The key is public by design; it must match the file public/<key>.txt.
const INDEXNOW_KEY = "f6e6413ee12769aaa9a9a4bc0e01504c";

/**
 * Runs daily from Vercel Cron shortly after 5pm IST: refreshes the blog pages so the day's post shows up
 * immediately, then submits it to IndexNow.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const now = Date.now();
  const fresh = getLivePosts().filter((p) => {
    const age = now - publishTime(p).getTime();
    return age >= 0 && age < 24 * 60 * 60 * 1000;
  });

  for (const path of ["/blog", "/sitemap.xml", "/llms.txt", "/blog/rss.xml"]) revalidatePath(path);
  for (const p of fresh) revalidatePath(`/blog/${p.slug}`);

  let indexnow: number | string = "skipped";
  if (fresh.length) {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: [...fresh.map((p) => `${SITE_URL}/blog/${p.slug}`), `${SITE_URL}/blog`],
      }),
    }).catch(() => null);
    indexnow = res ? res.status : "failed";
  }

  return Response.json({ published: fresh.map((p) => p.slug), indexnow });
}
