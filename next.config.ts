import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for durable hosts that don't need a Vercel account
  // (Netlify, Cloudflare Pages, deed.page, GitHub Pages).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
