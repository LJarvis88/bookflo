import type { BrandTokens } from "@/lib/types";

export interface TenantPwaConfig {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  startUrl: string;
  scope: string;
  themeColor: string;
  backgroundColor: string;
  /** Static path for demo seeds; blob: or data: for client uploads. */
  manifestPath: string;
  appleTouchIcon: string;
  icons: { src: string; sizes: string }[];
  /** True when Contour / OMS demo seed assets are used. */
  isDemoSeed?: boolean;
}

/** Platform BOOKFLO owner install (login / dashboard). */
export const BOOKFLO_PWA: TenantPwaConfig = {
  slug: "bookflo",
  name: "BOOKFLO",
  shortName: "BOOKFLO",
  description: "Your brand. Your bookings. Beautifully connected.",
  startUrl: "/login",
  scope: "/",
  themeColor: "#0E1420",
  backgroundColor: "#0E1420",
  manifestPath: "/manifest.webmanifest",
  appleTouchIcon: "/icons/apple-touch-icon.png",
  icons: [
    { src: "/icons/icon-192.png", sizes: "192x192" },
    { src: "/icons/icon-512.png", sizes: "512x512" },
  ],
};

/**
 * Demo-only PWA seeds for Contour + OMS testers.
 * Real product: each client uploads a mark at signup → that becomes their icon
 * via `buildClientPwa()` — never hardcode only these paths for new tenants.
 */
export const DEMO_TENANT_PWA_SEEDS: Record<string, TenantPwaConfig> = {
  "contour-preston": {
    slug: "contour-preston",
    name: "Contour Preston",
    shortName: "Contour",
    description: "Quiet luxury aesthetics in the heart of Preston — book with Contour.",
    startUrl: "/book/contour-preston",
    scope: "/book/contour-preston",
    themeColor: "#0C111B",
    backgroundColor: "#C8A36C",
    manifestPath: "/tenants/contour-preston/manifest.webmanifest",
    appleTouchIcon: "/tenants/contour-preston/icons/apple-touch-icon.png",
    icons: [
      { src: "/tenants/contour-preston/icons/icon-192.png", sizes: "192x192" },
      { src: "/tenants/contour-preston/icons/icon-512.png", sizes: "512x512" },
    ],
    isDemoSeed: true,
  },
  "oh-my-social-media": {
    slug: "oh-my-social-media",
    name: "Oh My Social Media",
    shortName: "OMS",
    description: "Bold content days for beauty brands who want to be seen — book with OMS.",
    startUrl: "/book/oh-my-social-media",
    scope: "/book/oh-my-social-media",
    themeColor: "#EB0E7F",
    backgroundColor: "#0A0A0A",
    manifestPath: "/tenants/oh-my-social-media/manifest.webmanifest",
    appleTouchIcon: "/tenants/oh-my-social-media/icons/apple-touch-icon.png",
    icons: [
      { src: "/tenants/oh-my-social-media/icons/icon-192.png", sizes: "192x192" },
      { src: "/tenants/oh-my-social-media/icons/icon-512.png", sizes: "512x512" },
    ],
    isDemoSeed: true,
  },
};

/** @deprecated Prefer DEMO_TENANT_PWA_SEEDS — kept for existing imports. */
export const TENANT_PWA = DEMO_TENANT_PWA_SEEDS;

export function getTenantPwa(slug: string): TenantPwaConfig | undefined {
  return DEMO_TENANT_PWA_SEEDS[slug];
}

function shortNameFromBrand(brand: BrandTokens): string {
  if (brand.logoText?.trim()) return brand.logoText.trim().slice(0, 12);
  return brand.displayName.trim().slice(0, 12) || "Booking";
}

/**
 * Build PWA config for a real client from their uploaded brand mark.
 * Prefer `appIconUrl` (square) then `logoUrl`. Demo seeds are NOT used here.
 */
export function buildClientPwa(
  slug: string,
  brand: BrandTokens,
  opts?: { startUrl?: string; scope?: string; manifestPath?: string },
): TenantPwaConfig {
  const icon = brand.appIconUrl || brand.logoUrl || BOOKFLO_PWA.appleTouchIcon;
  const startUrl = opts?.startUrl ?? `/book/${slug}`;
  return {
    slug,
    name: brand.displayName || "Booking",
    shortName: shortNameFromBrand(brand),
    description: brand.tagline || "Book with us",
    startUrl,
    scope: opts?.scope ?? startUrl,
    themeColor: brand.primary,
    backgroundColor: brand.background,
    manifestPath: opts?.manifestPath ?? "",
    appleTouchIcon: icon,
    icons: [
      { src: icon, sizes: "192x192" },
      { src: icon, sizes: "512x512" },
    ],
    isDemoSeed: false,
  };
}

/** Resolve demo seed if known; otherwise build from brand (upload path). */
export function pwaFromBrand(
  slug: string,
  brand: BrandTokens,
  fallback?: TenantPwaConfig,
): TenantPwaConfig {
  const seed = getTenantPwa(slug);
  if (seed && !brand.appIconUrl) return seed;
  if (brand.appIconUrl || brand.logoUrl) return buildClientPwa(slug, brand);
  return fallback ?? buildClientPwa(slug, brand);
}

/** JSON body for a dynamic web app manifest (blob URL in the browser). */
export function manifestJsonFromPwa(pwa: TenantPwaConfig): string {
  return JSON.stringify({
    id: pwa.startUrl,
    name: pwa.name,
    short_name: pwa.shortName,
    description: pwa.description,
    start_url: pwa.startUrl,
    scope: pwa.scope,
    display: "standalone",
    orientation: "portrait-primary",
    background_color: pwa.backgroundColor,
    theme_color: pwa.themeColor,
    lang: "en-GB",
    icons: pwa.icons.map((icon) => ({
      src: icon.src,
      sizes: icon.sizes,
      type: "image/png",
      purpose: "any",
    })),
  });
}
