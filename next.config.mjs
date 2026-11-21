/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Only frame-ancestors: a full CSP would need allowlists for Google sign-in, Razorpay, Stripe and PostHog.
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Allows sign-in and payment popups while isolating the page from other windows.
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
        ],
      },
      // Translated pages (src/lib/i18n.ts). Bing reads Content-Language; Google detects the language from the text.
      { source: "/es/:path*", headers: [{ key: "Content-Language", value: "es" }] },
      { source: "/fr/:path*", headers: [{ key: "Content-Language", value: "fr" }] },
      { source: "/pt/:path*", headers: [{ key: "Content-Language", value: "pt" }] },
    ];
  },
  webpack(config) {
    // Blog posts are Markdown files bundled as plain strings, so they work in serverless functions too.
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    return config;
  },
};

export default nextConfig;
