import { Marked } from "marked";
import { getLivePosts, SITE_URL } from "./blog";

function slugify(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      return `<h${depth} id="${slugify(text)}">${text}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      // A link to a post that isn't live yet would be a 404, so show plain text until it goes live.
      const blogSlug = href.match(/^\/blog\/([a-z0-9-]+)/)?.[1];
      if (blogSlug && !getLivePosts().some((p) => p.slug === blogSlug)) return text;
      const titleAttr = title ? ` title="${title}"` : "";
      const external = /^https?:\/\//.test(href) && !href.startsWith(SITE_URL);
      return external
        ? `<a href="${href}"${titleAttr} target="_blank" rel="nofollow noopener noreferrer">${text}</a>`
        : `<a href="${href}"${titleAttr}>${text}</a>`;
    },
  },
});

/**
 * Renders a post's Markdown to HTML. A `<!-- cta -->` line in the post marks where the free-tool box goes,
 * so the result is split into the parts before and after it.
 */
export function renderPostBody(markdown: string): string[] {
  const html = (marked.parse(markdown, { async: false }) as string)
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, "</table></div>");
  return html.split(/<!--\s*cta\s*-->/);
}
