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

<<<<<<< HEAD
/**
 * Stripe Connect Checkout / Account Links need Node route handlers.
 * Pure static deed publishes set BOOKFLO_STATIC_EXPORT=1 (see scripts/prepare-build.mjs).
 * Default: Node-capable build so OMS payments work locally and on Fly/Vercel/Render.
 */
const useStaticExport = process.env.BOOKFLO_STATIC_EXPORT === "1";
=======
/** Local/dev: skip remote assetPrefix so hydration uses this server's JS. */
const assetPrefix =
  process.env.NODE_ENV === "production" ? DEEDPAGE_ASSET_ORIGIN : undefined;
>>>>>>> cursor/demo-login-lockdown-0b90

const nextConfig: NextConfig = {
  ...(useStaticExport ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  assetPrefix,
  // Local/dev agents often hit 127.0.0.1 — allow HMR/hydration there.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
