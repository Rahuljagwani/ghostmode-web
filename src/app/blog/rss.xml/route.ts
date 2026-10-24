import { getLivePosts, publishTime, SITE_URL } from "@/lib/blog";
import { renderPostBody } from "@/lib/markdown";

// Picks up scheduled posts as they go live.
export const revalidate = 600;

function escape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** RSS feed, so posts can be imported into dev.to, Medium and newsletters automatically. */
export function GET() {
  const items = getLivePosts()
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const body = p.markdown ? `<content:encoded><![CDATA[${renderPostBody(p.markdown).join("")}]]></content:encoded>` : "";
      return `<item>
  <title>${escape(p.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${publishTime(p).toUTCString()}</pubDate>
  <category>${escape(p.tag)}</category>
  <description>${escape(p.description)}</description>
  ${body}
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Renekin AI Blog</title>
  <link>${SITE_URL}/blog</link>
  <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
  <description>Interview tips, AI engineer interview prep and honest comparisons from Team Renekin.</description>
  <language>en</language>
${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
