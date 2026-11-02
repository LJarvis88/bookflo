/** Stripe / Connect config helpers. Never log secret key values. */

export const OMS_TENANT_SLUG = "oh-my-social-media";

/** OMS is the only tenant with Connect booking payments in this phase. */
export function connectsPaymentsEnabled(tenantSlug: string): boolean {
  return tenantSlug === OMS_TENANT_SLUG;
}

export function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!key.startsWith("sk_test_")) {
    throw new Error("Only Stripe TEST secret keys (sk_test_) are allowed");
  }
  return key;
}

export function getStripePublishableKey(): string {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "";
  if (!key) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set");
  }
  if (!key.startsWith("pk_test_")) {
    throw new Error("Only Stripe TEST publishable keys (pk_test_) are allowed");
  }
  return key;
}

export function getAppUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function assertTestModeKeys(): void {
  getStripeSecretKey();
  getStripePublishableKey();
}

export type PaymentChoice = "full" | "deposit";

export function amountForPaymentChoice(
  pricePence: number,
  choice: PaymentChoice,
): number {
  if (pricePence <= 0) return 0;
  if (choice === "deposit") return Math.round(pricePence / 2);
  return pricePence;
}
