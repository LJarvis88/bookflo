/** Christmas partner interest — Toni as BOOKFLO partner; recruit beauty founders. */

export const PARTNER_PATH = "/join/partner";
export const PARTNER_ALIAS_PATH = "/partner";
export const PARTNER_TAG = "christmas-partner";

/** Soft target for free-core cohort (Luke: aim 30 partners). */
export const PARTNER_FREE_TARGET = 30;

/**
 * Soft counter placeholder — bump as WhatsApp / form interests land.
 * Not a live database mirror; Luke/Bob update when reviewing the interests list.
 */
export const PARTNER_INTERESTS_CLAIMED = 0;

export const PARTNER_LADDER = [
  {
    step: "01",
    title: "6 months free core",
    body: "Branded booking page, diary, and email reminders — free for six months while you grow with BOOKFLO.",
  },
  {
    step: "02",
    title: "Quiz + SMS · paid extras",
    body: "Even on free core, the booking quiz and SMS reminders stay optional paid upgrades. Email stays included.",
  },
  {
    step: "03",
    title: "Convert when ready",
    body: "Around months 3–6, move onto Solo, Salon, or Pro — same ladder as the public pricing page.",
  },
] as const;

export function partnerSpotsLeft(
  claimed: number = PARTNER_INTERESTS_CLAIMED,
): number {
  return Math.max(0, PARTNER_FREE_TARGET - claimed);
}
