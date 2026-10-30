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
  manifestPath: string;
  appleTouchIcon: string;
  icons: { src: string; sizes: string }[];
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

const TENANT_PWA: Record<string, TenantPwaConfig> = {
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
  },
};

export function getTenantPwa(slug: string): TenantPwaConfig | undefined {
  return TENANT_PWA[slug];
}

export function pwaFromBrand(
  slug: string,
  brand: BrandTokens,
  fallback?: TenantPwaConfig,
): TenantPwaConfig {
  const known = getTenantPwa(slug);
  if (known) return known;
  return (
    fallback ?? {
      slug,
      name: brand.displayName,
      shortName: brand.logoText || brand.displayName.slice(0, 12),
      description: brand.tagline,
      startUrl: `/book/${slug}`,
      scope: `/book/${slug}`,
      themeColor: brand.primary,
      backgroundColor: brand.background,
      manifestPath: BOOKFLO_PWA.manifestPath,
      appleTouchIcon: brand.logoUrl || BOOKFLO_PWA.appleTouchIcon,
      icons: BOOKFLO_PWA.icons,
    }
  );
}
