/**
 * Zero-cost marketing chat knowledge for BOOKFLO.
 *
 * Approach (V1): client-side keyword matching against scripted intents —
 * no LLM SaaS, no Intercom/Crisp, no server calls. Unmatched questions and
 * “talk to a human” intents deep-link to WhatsApp.
 */

export type ChatIntent = {
  id: string;
  /** Chips shown under the welcome message */
  label?: string;
  keywords: string[];
  answer: string;
};

export const CHAT_WELCOME =
  "Hi — I’m the BOOKFLO helper. Ask about pricing, the trial, branding, or commission. Want a person? I can open WhatsApp.";

export const CHAT_FALLBACK =
  "I’m not sure on that one yet. Email hello@bookflo.app, or tap WhatsApp below and a human will help.";

export const CHAT_HUMAN_ANSWER =
  "Happy to connect you with a human on WhatsApp — tap the button below and we’ll pick it up from there.";

/** Phrases that mean “escalate to a person”. */
export const HUMAN_KEYWORDS = [
  "human",
  "person",
  "someone",
  "whatsapp",
  "whats app",
  "wa.me",
  "call me",
  "phone",
  "speak to",
  "talk to",
  "real person",
  "support agent",
  "chat with you",
  "live chat",
  "contact you",
  "contact sales",
  "sales team",
];

export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: "pricing",
    label: "Pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "how much",
      "plans",
      "plan",
      "subscription",
      "solo",
      "salon",
      "pro",
      "£19",
      "£39",
      "£59",
      "19",
      "39",
      "59",
      "monthly",
      "per month",
      "annual",
      "yearly",
      "independent",
      "team",
      "studio",
    ],
    answer:
      "Plans are Solo £19, Salon £39, and Pro £59 per month (shown on the site as Independent / Team / Studio). Annual billing is two months free: Solo £190, Salon £390, Pro £590 a year. Staff seats are the only paid upsell — branding stays included on every plan.",
  },
  {
    id: "commission",
    label: "Commission?",
    keywords: [
      "commission",
      "cut",
      "percentage",
      "fee per booking",
      "take a cut",
      "0%",
      "zero commission",
      "marketplace fee",
    ],
    answer:
      "Yes — 0% booking commission. You pay a flat monthly subscription; client payments stay between you and your clients. (If BOOKFLO ever ships a marketplace, that would be separate — booking itself stays zero commission.)",
  },
  {
    id: "trial",
    label: "Free trial",
    keywords: [
      "trial",
      "free trial",
      "14",
      "fourteen",
      "try",
      "demo account",
      "card required",
      "credit card",
    ],
    answer:
      "Every plan includes a 14-day free trial. Start from the homepage signup — no marketplace skin, just your branded booking page.",
  },
  {
    id: "branding",
    label: "White-label",
    keywords: [
      "white label",
      "white-label",
      "whitelabel",
      "brand",
      "branding",
      "logo",
      "colours",
      "colors",
      "look like bookflo",
      "own brand",
      "ai brand",
      "brand match",
    ],
    answer:
      "Your booking page uses your logo, colours, fonts, and copy — BOOKFLO stays on the platform shell, not over your client-facing brand. Branding editor and AI brand match are included on all plans; we don’t lock brand tools behind a higher tier.",
  },
  {
    id: "consent",
    label: "Consent forms",
    keywords: [
      "consent",
      "forms",
      "waiver",
      "intake form",
      "medical form",
      "faces consent",
    ],
    answer:
      "Consent forms are coming in a later phase — planned free on every plan (value-first pricing). Soft caps only if someone abuses the system; not a paid upsell.",
  },
  {
    id: "ambassadors",
    label: "Ambassadors",
    keywords: [
      "ambassador",
      "ambassadors",
      "founding",
      "liv",
      "contour",
      "tee",
      "oh my",
      "oms",
      "free year",
      "12 months free",
      "complimentary",
    ],
    answer:
      "Founding ambassadors get 12 months of complimentary Pro in exchange for promoting BOOKFLO. Current ambassadors: Liv (Contour Preston) and Tee (Oh My Social Media). Luke adds more as we grow.",
  },
  {
    id: "what-is",
    label: "What is BOOKFLO?",
    keywords: [
      "what is",
      "what's bookflo",
      "who are you",
      "about",
      "explain",
      "booking software",
      "salon software",
      "fresha",
    ],
    answer:
      "BOOKFLO is premium white-label beauty booking — your brand on the client page, calendar-first admin for your team, zero commission, and a 14-day free trial on every plan.",
  },
  {
    id: "onboarding",
    label: "How long to set up?",
    keywords: [
      "onboarding",
      "setup",
      "set up",
      "how long",
      "getting started",
      "publish",
      "go live",
    ],
    answer:
      "Most salons can publish a shareable booking link in under fifteen minutes: account, business details, branding, services, hours, preview, publish.",
  },
  {
    id: "email",
    label: "Email us",
    keywords: ["email", "hello@", "inbox", "mail"],
    answer:
      "Email hello@bookflo.app for product questions, demos, and support — or use WhatsApp below if you’d rather message.",
  },
  {
    id: "payments",
    label: "Payments / Stripe",
    keywords: [
      "stripe",
      "payment",
      "payments",
      "pay online",
      "take payment",
      "card machine",
    ],
    answer:
      "Client payments stay between you and your clients for now (pay at venue in the prototype). Stripe Connect is planned later — we’re polishing the booking experience first.",
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9£%@.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function wantsHuman(input: string): boolean {
  const n = normalize(input);
  return HUMAN_KEYWORDS.some((k) => n.includes(k));
}

export function matchChatIntent(input: string): ChatIntent | null {
  const n = normalize(input);
  if (!n) return null;

  let best: { intent: ChatIntent; score: number } | null = null;

  for (const intent of CHAT_INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (n.includes(kw)) {
        // Longer keyword phrases weigh more
        score += Math.max(1, Math.ceil(kw.length / 4));
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { intent, score };
    }
  }

  return best && best.score >= 1 ? best.intent : null;
}

export type ChatReply = {
  text: string;
  showWhatsApp: boolean;
};

export function replyToChat(input: string): ChatReply {
  if (wantsHuman(input)) {
    return { text: CHAT_HUMAN_ANSWER, showWhatsApp: true };
  }
  const intent = matchChatIntent(input);
  if (intent) {
    return { text: intent.answer, showWhatsApp: false };
  }
  return { text: CHAT_FALLBACK, showWhatsApp: true };
}
