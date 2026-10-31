import type { NextConfig } from "next";

/**
 * deed.page custom domains (bookflo.app) are served on Vercel’s edge.
 * Absolute `/_next/static/*` requests hit the *platform* Next.js asset
 * handler and 404 — while `{slug}.deed.page/_next/...` rewrites into the
 * published site files. Point assetPrefix at the slug origin so CSS/JS
 * load on both https://bookflo.app and the preview subdomain.
 */
const DEEDPAGE_ASSET_ORIGIN =
  process.env.NEXT_PUBLIC_ASSET_PREFIX?.replace(/\/$/, "") ||
  "https://bookflo-contour-3485.deed.page";

const nextConfig: NextConfig = {
  // Static export for durable hosts that don't need a Vercel account
  // (Netlify, Cloudflare Pages, deed.page, GitHub Pages).
  output: "export",
  images: { unoptimized: true },
  assetPrefix: DEEDPAGE_ASSET_ORIGIN,
};

export default nextConfig;
