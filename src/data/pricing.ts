import type { PlanId } from "@/lib/types";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  priceNote?: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

export const TRIAL_DAYS = 14;

/** Clear monetisation ladder under pricing cards — no invented £ for add-ons. */
export const PRICING_LADDER = [
  {
    title: "Email reminders",
    body: "Included on every plan — confirmations and reminders stay free.",
  },
  {
    title: "Booking quiz",
    body: "In your dashboard from day one. Unlock to use — a simple account upgrade. Never required for bookings.",
  },
  {
    title: "SMS reminders",
    body: "Paid add-on above quiz — not free or unlimited. For salons that want texts, priced to cover real message costs.",
  },
] as const;

export const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Independent",
    price: 19,
    blurb: "For solo beauty pros who want a branded booking page.",
    features: [
      "Single calendar column",
      "1 branded booking page",
      "Unlimited bookings",
      "Free email reminders",
      "Booking quiz — unlock to use",
      "Email and chat support",
    ],
    cta: "Join waitlist",
  },
  {
    id: "salon",
    name: "Team",
    price: 39,
    priceNote: "per salon monthly",
    blurb: "Multi-staff salons and clinics with shared calendars.",
    features: [
      "Multiple calendar columns",
      "Up to 8 team members",
      "Branding editor + live preview",
      "Free email reminders",
      "Booking quiz — unlock to use",
      "Phone, chat, and email support",
    ],
    highlighted: true,
    cta: "Join waitlist",
  },
  {
    id: "pro",
    name: "Studio",
    price: 59,
    blurb: "Growing studios that need room to expand.",
    features: [
      "Everything in Team",
      "Unlimited staff",
      "Free email reminders",
      "Booking quiz — unlock to use",
      "Priority support",
      "Custom domain path (soon)",
      "Stripe Connect (OMS deposits live in test)",
    ],
    cta: "Join waitlist",
  },
];
