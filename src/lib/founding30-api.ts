/**
 * Founding 30 API base — reuse Stripe Node host when set, else same-origin.
 * Static deed has no /api; forms still save to localStorage + WhatsApp/email.
 */
export function founding30ApiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_STRIPE_API_BASE ?? "")
    .trim()
    .replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
