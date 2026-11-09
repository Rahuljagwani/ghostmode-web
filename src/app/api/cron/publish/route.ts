import { revalidatePath } from "next/cache";
import { getLivePosts, publishTime, SITE_URL } from "@/lib/blog";
import sitemap from "@/app/sitemap";

export const dynamic = "force-dynamic";

// IndexNow tells Bing (which ChatGPT search uses), Yandex and others about new pages right away.
// The key is public by design; it must match the file public/<key>.txt.
const INDEXNOW_KEY = "f6e6413ee12769aaa9a9a4bc0e01504c";

async function submitToIndexNow(urlList: string[]): Promise<number | string> {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  }).catch(() => null);
  return res ? res.status : "failed";
}

/**
 * Runs daily from Vercel Cron shortly after 5pm IST: refreshes the blog pages so the day's post shows up
 * immediately, then submits it to IndexNow. On Mondays it also submits every sitemap page whose lastModified
 * changed in the past week, so edited pages (comparison pages, tools, the homepage) get recrawled. Unchanged
 * pages are never resubmitted: the IndexNow protocol is only for added, updated or deleted URLs.
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

  const isMonday = new Date(now).getUTCDay() === 1;
  let urlList: string[] = [];
  if (isMonday) {
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    urlList = (await sitemap())
      .filter((entry) => entry.lastModified && new Date(entry.lastModified).getTime() >= weekAgo)
      .map((entry) => entry.url);
  } else if (fresh.length) {
    urlList = [...fresh.map((p) => `${SITE_URL}/blog/${p.slug}`), `${SITE_URL}/blog`];
  }

  const indexnow = urlList.length ? await submitToIndexNow(urlList) : "skipped";

  return Response.json({
    published: fresh.map((p) => p.slug),
    indexnow,
    submitted: urlList.length,
    fullSitemap: isMonday,
  });
}
