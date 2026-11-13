/** Stripe / Connect config helpers. Never log secret key values. */

export const OMS_TENANT_SLUG = "oh-my-social-media";

/** Temporary £1 live smoke service (full £1 / deposit 50p). */
export const OMS_LIVE_SMOKE_SERVICE_ID = "oms_svc_live_smoke";
export const OMS_LIVE_SMOKE_PRICE_PENCE = 100;

/** OMS is the only tenant with Connect booking payments in this phase. */
export function connectsPaymentsEnabled(tenantSlug: string): boolean {
  return tenantSlug === OMS_TENANT_SLUG;
}

export type StripeMode = "test" | "live";

/**
 * Explicit STRIPE_MODE wins. Otherwise infer from key prefixes.
 * Mixed test/live keys always throw — never half-cutover.
 */
export function getStripeMode(): StripeMode {
  const forced = process.env.STRIPE_MODE?.trim().toLowerCase();
  if (forced === "live" || forced === "test") {
    return forced;
  }
  const secret = process.env.STRIPE_SECRET_KEY?.trim() ?? "";
  if (secret.startsWith("sk_live_")) return "live";
  return "test";
}

export function isStripeLiveMode(): boolean {
  return getStripeMode() === "live";
}

function requireKey(
  value: string,
  envName: string,
  mode: StripeMode,
  kind: "secret" | "publishable",
): string {
  if (!value) {
    throw new Error(`${envName} is not set`);
  }
  const livePrefix = kind === "secret" ? "sk_live_" : "pk_live_";
  const testPrefix = kind === "secret" ? "sk_test_" : "pk_test_";
  if (mode === "live") {
    if (!value.startsWith(livePrefix)) {
      throw new Error(
        `${envName} must be a LIVE ${kind} key (${livePrefix}) when STRIPE_MODE=live`,
      );
    }
  } else if (!value.startsWith(testPrefix)) {
    throw new Error(
      `${envName} must be a TEST ${kind} key (${testPrefix}) when STRIPE_MODE=test`,
    );
  }
  return value;
}

export function getStripeSecretKey(): string {
  const mode = getStripeMode();
  return requireKey(
    process.env.STRIPE_SECRET_KEY?.trim() ?? "",
    "STRIPE_SECRET_KEY",
    mode,
    "secret",
  );
}

export function getStripePublishableKey(): string {
  const mode = getStripeMode();
  return requireKey(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() ?? "",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    mode,
    "publishable",
  );
}

export function getAppUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Optional absolute origin for Stripe API when UI is on static deed
 * and /api/stripe runs on a Node host (e.g. Vercel).
 * Empty → same-origin `/api/stripe/...`.
 */
export function getStripeApiBase(): string {
  const fromEnv = process.env.NEXT_PUBLIC_STRIPE_API_BASE?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "";
}

export function stripeApiUrl(path: string): string {
  const base = getStripeApiBase();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

/** Validate keys for the active mode (test or live). */
export function assertStripeKeys(): void {
  getStripeSecretKey();
  getStripePublishableKey();
}

/** @deprecated Prefer assertStripeKeys — kept for existing route imports. */
export function assertTestModeKeys(): void {
  assertStripeKeys();
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
