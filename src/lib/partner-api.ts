/**
 * Partner interest API base — reuse Stripe Node host when set, else same-origin.
 * Static deed has no /api; form still saves to localStorage + WhatsApp.
 */
export function partnerInterestApiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_STRIPE_API_BASE ?? "")
    .trim()
    .replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
