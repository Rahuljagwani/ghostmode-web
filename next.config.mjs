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
  webpack(config) {
    // Blog posts are Markdown files bundled as plain strings, so they work in serverless functions too.
    config.module.rules.push({ test: /\.md$/, type: "asset/source" });
    return config;
  },
};

export default nextConfig;
