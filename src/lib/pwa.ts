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

const OMS_APPLE_TOUCH =
  "/tenants/oh-my-social-media/icons/apple-touch-icon.png";
const OMS_ICONS: { src: string; sizes: string }[] = [
  { src: "/tenants/oh-my-social-media/icons/icon-192.png", sizes: "192x192" },
  { src: "/tenants/oh-my-social-media/icons/icon-512.png", sizes: "512x512" },
];

/** Public booking PWA — Add to Home Screen from /book/oh-my-social-media. */
export const OMS_BOOKING_PWA: TenantPwaConfig = {
  slug: "oh-my-social-media",
  name: "Oh My Social Media",
  shortName: "OMS",
  description: "Bold content days for beauty brands who want to be seen — book with OMS.",
  startUrl: "/book/oh-my-social-media",
  scope: "/book/oh-my-social-media",
  themeColor: "#EB0E7F",
  backgroundColor: "#F01787",
  manifestPath: "/tenants/oh-my-social-media/manifest.webmanifest",
  appleTouchIcon: OMS_APPLE_TOUCH,
  icons: OMS_ICONS,
};

/** Admin PWA — Tee Add to Home Screen from /dashboard. */
export const OMS_ADMIN_PWA: TenantPwaConfig = {
  slug: "oh-my-social-media-admin",
  name: "Oh My Social Media",
  shortName: "OMS",
  description: "Oh My Social Media admin — calendar, clients, and bookings.",
  startUrl: "/dashboard",
  scope: "/dashboard",
  themeColor: "#EB0E7F",
  backgroundColor: "#F01787",
  manifestPath: "/tenants/oh-my-social-media/admin-manifest.webmanifest",
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
