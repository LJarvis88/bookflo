/** Marketing FAQ copy — shared by UI accordion + FAQPage JSON-LD. */
export const MARKETING_FAQS = [
  {
    q: "Is BOOKFLO really zero commission?",
    a: "Yes. You pay a flat monthly subscription. We don’t take a cut of your bookings. Client payments stay between you and your clients (pay at venue in this prototype; Stripe Connect arrives later).",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — every plan includes a 14-day free trial. No card required in this prototype; subscription billing is stubbed for Phase 3.",
  },
  {
    q: "Will my booking page look like BOOKFLO?",
    a: "No. Your booking page uses your logo, colours, fonts, and copy. BOOKFLO’s identity stays on the platform shell — onboarding, dashboard, and marketing — never over your client-facing brand.",
  },
  {
    q: "What is AI brand match?",
    a: "In production it will read your website and suggest brand tokens. This prototype shows a clearly labelled demo that fills Contour Preston’s sample palette — always fully overridable.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most salons can publish a shareable booking link in under fifteen minutes: account, business details, branding, services, hours, preview, publish.",
  },
  {
    q: "How do I contact BOOKFLO?",
    a: "Email hello@bookflo.app — that’s our dedicated inbox for product questions, demos, and support.",
  },
] as const;
