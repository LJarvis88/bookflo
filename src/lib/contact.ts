/** BOOKFLO public contact — live once bookflo.app MX points at the chosen mail provider. */
export const BOOKFLO_CONTACT_EMAIL = "hello@bookflo.app";
export const BOOKFLO_MAILTO = `mailto:${BOOKFLO_CONTACT_EMAIL}`;

/** UK WhatsApp for human handoff from the marketing chat widget (E.164 without +). */
export const BOOKFLO_WHATSAPP_E164 = "447581191119";
export const BOOKFLO_WHATSAPP_DISPLAY = "07581 191119";
export const BOOKFLO_WHATSAPP_PREFILL =
  "Hi, I'd like to chat about BOOKFLO";

/** Prefill when someone asks to join while public signup is closed (demo-only). */
export const BOOKFLO_WAITLIST_PREFILL =
  "Hi — I'd like to join the BOOKFLO waitlist for when signup opens.";

/** Prefill for First 50 founding cohort (quiz free for demo). */
export const BOOKFLO_FOUNDING50_PREFILL =
  "Hi — I'd like to claim a First 50 founding spot on BOOKFLO (founding-50 · quiz free for demo).";

/** Prefill for Christmas partner interest (6 months free core · Toni cohort). */
export const BOOKFLO_PARTNER_PREFILL =
  "Hi — I'd like to register interest as a BOOKFLO Christmas partner (6 months free core · quiz + SMS paid extras).";

export function bookfloWhatsAppUrl(
  text: string = BOOKFLO_WHATSAPP_PREFILL,
): string {
  return `https://wa.me/${BOOKFLO_WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}

export function bookfloWaitlistWhatsAppUrl(): string {
  return bookfloWhatsAppUrl(BOOKFLO_WAITLIST_PREFILL);
}

export function bookfloFounding50WhatsAppUrl(details?: string): string {
  const body = details?.trim()
    ? `${BOOKFLO_FOUNDING50_PREFILL}\n\n${details.trim()}`
    : BOOKFLO_FOUNDING50_PREFILL;
  return bookfloWhatsAppUrl(body);
}

export function bookfloPartnerWhatsAppUrl(details?: string): string {
  const body = details?.trim()
    ? `${BOOKFLO_PARTNER_PREFILL}\n\n${details.trim()}`
    : BOOKFLO_PARTNER_PREFILL;
  return bookfloWhatsAppUrl(body);
}

/** Prefill for BookFlo Founding 30 applications (apply + admin only until January). */
export const BOOKFLO_FOUNDING30_PREFILL =
  "Hi — I'd like to apply for BookFlo Founding 30 (6 months free core · founding-30).";

export function bookfloFounding30WhatsAppUrl(details?: string): string {
  const body = details?.trim()
    ? `${BOOKFLO_FOUNDING30_PREFILL}\n\n${details.trim()}`
    : BOOKFLO_FOUNDING30_PREFILL;
  return bookfloWhatsAppUrl(body);
}
