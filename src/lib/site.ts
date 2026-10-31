/** Canonical public origin for BOOKFLO marketing + legal surfaces. */
export const SITE_URL = "https://bookflo.app";

export const SITE_NAME = "BOOKFLO";

export const SITE_TAGLINE =
  "Your brand. Your bookings. Beautifully connected.";

export const SITE_DESCRIPTION =
  "Premium zero-commission white-label beauty booking. Brand craft, calendar-first admin, and a 14-day free trial — no marketplace skin.";

/** Default social / Open Graph image (1200×630). Served from /public. */
export const OG_IMAGE_PATH = "/marketing/og-bookflo.png";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
