/**
 * Founding 30 entitlements scaffolding — modular and separate from
 * `saas-billing.ts` (Tee free-for-life / Liv ambassador) and public trial copy.
 *
 * v1: preference + approve/code only. No live activation, no Stripe Billing hooks fired.
 * January+: bind to real tenants without changing Solo/Salon/Pro pricing paths.
 */

import type { FoundingThemeId } from "@/data/founding-themes";
import { FOUNDING30_CORE_MONTHS } from "@/data/founding30";

export interface Founding30EntitlementDraft {
  programme: "founding-30";
  /** Set only after January activation — null in apply/admin phase. */
  tenantSlug: string | null;
  coreComplimentaryMonths: number;
  coreStartsAt: string | null;
  coreExpiresAt: string | null;
  quizUnlocked: boolean;
  smsUnlocked: boolean;
  themePreset: FoundingThemeId | "";
  /** Access code stored for later redeem — not redeemable in v1. */
  accessCode: string | null;
  activationReady: false;
}

export function draftEntitlementFromApplication(input: {
  themePreset: FoundingThemeId | "";
  addonQuiz: boolean;
  addonSms: boolean;
  accessCode: string | null;
}): Founding30EntitlementDraft {
  return {
    programme: "founding-30",
    tenantSlug: null,
    coreComplimentaryMonths: FOUNDING30_CORE_MONTHS,
    coreStartsAt: null,
    coreExpiresAt: null,
    // Interest in add-ons is recorded; unlock waits for paid Billing + activation.
    quizUnlocked: false,
    smsUnlocked: false,
    themePreset: input.themePreset,
    accessCode: input.accessCode,
    activationReady: false,
  };
}

/** Explicit guard — Founding 30 never mutates public plan trial days. */
export function founding30TouchesPublicTrial(): false {
  return false;
}

/** Explicit guard — Founding 30 never bills Tee/Liv via this module. */
export function founding30OverridesSaasExemption(): false {
  return false;
}
