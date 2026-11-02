/**
 * BOOKFLO SaaS subscription exemptions — never bill these tenants.
 * Separate from Stripe Connect (client → tenant booking payments).
 */

export type SaasExemptionReason = "free_for_life" | "ambassador_12mo";

export interface SaasBillingExemption {
  tenantSlug: string;
  reason: SaasExemptionReason;
  label: string;
  detail: string;
  contactEmail?: string;
}

const EXEMPTIONS: Record<string, SaasBillingExemption> = {
  "oh-my-social-media": {
    tenantSlug: "oh-my-social-media",
    reason: "free_for_life",
    label: "Free for life",
    detail:
      "Tee / Oh My Social Media is complimentary for life on BOOKFLO SaaS. Never create a Stripe Billing subscription for this tenant.",
    contactEmail: "tee@ohmysocialmedia.com",
  },
  "contour-preston": {
    tenantSlug: "contour-preston",
    reason: "ambassador_12mo",
    label: "Ambassador — 12 months complimentary Pro",
    detail:
      "Liv / Contour Preston founding ambassador: 12 months complimentary Pro in exchange for promoting BOOKFLO.",
    contactEmail: "liv@contourpreston.com",
  },
};

export function getSaasBillingExemption(
  tenantSlug: string,
): SaasBillingExemption | null {
  return EXEMPTIONS[tenantSlug] ?? null;
}

export function isSaasBillingExempt(tenantSlug: string): boolean {
  return Boolean(EXEMPTIONS[tenantSlug]);
}

/** True when BOOKFLO must never charge SaaS subscription for this tenant. */
export function isFreeForLifeTenant(tenantSlug: string): boolean {
  return EXEMPTIONS[tenantSlug]?.reason === "free_for_life";
}
