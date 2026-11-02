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

export function bookfloWhatsAppUrl(
  text: string = BOOKFLO_WHATSAPP_PREFILL,
): string {
  return `https://wa.me/${BOOKFLO_WHATSAPP_E164}?text=${encodeURIComponent(text)}`;
}

export function bookfloWaitlistWhatsAppUrl(): string {
  return bookfloWhatsAppUrl(BOOKFLO_WAITLIST_PREFILL);
}
