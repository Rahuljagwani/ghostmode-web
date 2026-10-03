import { ImageResponse } from "next/og";
import { posts, getPost } from "@/lib/blog";

export const alt = "Ghost by Renekin AI blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 55%, #0369a1 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, opacity: 0.95 }}>
          Ghost by Renekin AI
        </div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 }}>
          {post?.title ?? "Renekin AI Blog"}
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.9 }}>renekin.com/blog</div>
      </div>
    ),
    size,
  );
}
