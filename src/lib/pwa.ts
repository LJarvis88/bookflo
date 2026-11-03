import { SITE_URL } from "@/lib/site";

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
  /** Absolute URL — Safari A2HS is unreliable with relative + query-bust paths. */
  appleTouchIcon: string;
  icons: { src: string; sizes: string }[];
}

/**
 * New filename every time Toni still sees BOOKFLO B — iOS often ignores
 * ?query cache-bust on apple-touch-icon and keeps a poisoned WebClip cache.
 */
const OMS_A2HS_FILE = "oms-a2hs-v54.png";
const OMS_APPLE_TOUCH = `${SITE_URL}/tenants/oh-my-social-media/icons/${OMS_A2HS_FILE}`;
const OMS_ICONS: { src: string; sizes: string }[] = [
  {
    src: `${SITE_URL}/tenants/oh-my-social-media/icons/icon-192.png?v54`,
    sizes: "192x192",
  },
  {
    src: `${SITE_URL}/tenants/oh-my-social-media/icons/icon-512.png?v54`,
    sizes: "512x512",
  },
];

/**
 * Public booking PWA — for OMS *clients* only.
 * Toni’s Home Screen icon is the admin path (OMS_ADMIN_PWA), not this.
 */
export const OMS_BOOKING_PWA: TenantPwaConfig = {
  slug: "oh-my-social-media",
  name: "Oh My Social Media",
  shortName: "OMS",
  description:
    "Bold content days for beauty brands who want to be seen — book with OMS.",
  startUrl: "/book/oh-my-social-media",
  scope: "/book/oh-my-social-media",
  themeColor: "#EB0E7F",
  backgroundColor: "#F01787",
  manifestPath: `${SITE_URL}/tenants/oh-my-social-media/manifest.webmanifest`,
  appleTouchIcon: OMS_APPLE_TOUCH,
  icons: OMS_ICONS,
};

/**
 * Toni’s ONE Home Screen icon — admin diary.
 * Apply from /login and /dashboard. start_url → login; after sign-in she lands
 * on /dashboard (appointments). Scope is site-root so standalone can move
 * login ↔ dashboard. Do not dual-install the public book WebClip.
 */
export const OMS_ADMIN_PWA: TenantPwaConfig = {
  slug: "oh-my-social-media-admin",
  name: "Oh My Social Media",
  shortName: "OMS",
  description: "Oh My Social Media admin — calendar, clients, and bookings.",
  startUrl: `${SITE_URL}/login`,
  scope: `${SITE_URL}/`,
  themeColor: "#EB0E7F",
  backgroundColor: "#F01787",
  manifestPath: `${SITE_URL}/tenants/oh-my-social-media/admin-manifest-v58.webmanifest`,
  appleTouchIcon: OMS_APPLE_TOUCH,
  icons: OMS_ICONS,
};

export function getBookingPwa(slug: string): TenantPwaConfig | undefined {
  if (slug === "oh-my-social-media") return OMS_BOOKING_PWA;
  return undefined;
}

export function getAdminPwa(slug: string): TenantPwaConfig | undefined {
  if (slug === "oh-my-social-media") return OMS_ADMIN_PWA;
  return undefined;
}
