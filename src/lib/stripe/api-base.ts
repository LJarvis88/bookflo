/**
 * Client-safe Stripe API base (build-time public env).
 * When UI is on static deed and APIs are on a Node host, set
 * NEXT_PUBLIC_STRIPE_API_BASE to that origin (no trailing slash).
 */
export function clientStripeApiUrl(path: string): string {
  const base = (process.env.NEXT_PUBLIC_STRIPE_API_BASE ?? "")
    .trim()
    .replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}
