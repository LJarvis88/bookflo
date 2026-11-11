/** First 50 founding cohort — quiz free for demo. Cap is hard; no public admin accounts. */

export const FOUNDING_50_PATH = "/join/first-50";
export const FOUNDING_50_CAP = 50;

/**
 * Soft counter for the landing page. Luke (or Bob) bumps this as WhatsApp claims land.
 * Not a live database — placeholder until allowlist tooling exists.
 */
export const FOUNDING_50_SPOTS_CLAIMED = 0;

export const FOUNDING_50_TAG = "founding-50";

export const FOUNDING_50_LADDER = [
  {
    step: "01",
    title: "First 50 · quiz free",
    body: "Claim a founding spot and get the booking quiz free for the demo period — case-study cohort only.",
  },
  {
    step: "02",
    title: "After 50 · quiz unlock",
    body: "Once the 50 are filled, the quiz stays in every dashboard — unlock to use is a paid account upgrade.",
  },
  {
    step: "03",
    title: "SMS · costs more",
    body: "Text reminders sit above quiz as a higher paid add-on. Email reminders stay included on every plan.",
  },
] as const;

export function founding50SpotsLeft(
  claimed: number = FOUNDING_50_SPOTS_CLAIMED,
): number {
  return Math.max(0, FOUNDING_50_CAP - claimed);
}
