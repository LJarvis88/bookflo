/** BookFlo Founding 30 — modular programme constants (does not alter public plans/trial). */

export const FOUNDING30_PATH = "/founding-30";
export const FOUNDING30_APPLY_PATH = "/founding-30/apply";
export const FOUNDING30_SUCCESS_PATH = "/founding-30/success";
export const FOUNDING30_ADMIN_PATH = "/dashboard/founding-30";

export const FOUNDING30_CAP = 30;
export const FOUNDING30_TAG = "founding-30";
export const FOUNDING30_CORE_MONTHS = 6;

/** Soft counter placeholder until admin/API count is preferred on the lander. */
export const FOUNDING30_SPOTS_CLAIMED = 0;

export const FOUNDING30_ADDONS = {
  sms: {
    id: "sms" as const,
    name: "SMS reminders",
    priceMonthly: 19.99,
    blurb: "Optional text reminders — priced to cover real message costs. Never required.",
  },
  quiz: {
    id: "quiz" as const,
    name: "Consultation / Quiz Builder",
    priceMonthly: 29.99,
    blurb: "Optional booking quiz unlock. Never required for diary or guest booking.",
  },
} as const;

export const FOUNDING30_LADDER = [
  {
    step: "01",
    title: "6 months free core",
    body: "Branded booking page, diary, and email reminders — complimentary for six months.",
  },
  {
    step: "02",
    title: "Quiz + SMS · optional paid",
    body: "Add-ons stay optional and never preselected. Email reminders stay included.",
  },
  {
    step: "03",
    title: "Shortlist · codes later",
    body: "We review applications, approve the Founding 30, and share access codes when January onboarding opens.",
  },
] as const;

export function founding30SpotsLeft(
  claimed: number = FOUNDING30_SPOTS_CLAIMED,
): number {
  return Math.max(0, FOUNDING30_CAP - claimed);
}
