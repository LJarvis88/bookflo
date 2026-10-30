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
      "Email confirmations",
      "Email and chat support",
    ],
    cta: "Start free trial",
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
      "Customer list",
      "Phone, chat, and email support",
    ],
    highlighted: true,
    cta: "Start free trial",
  },
  {
    id: "pro",
    name: "Studio",
    price: 59,
    blurb: "Growing studios that need room to expand.",
    features: [
      "Everything in Team",
      "Unlimited staff",
      "Priority support",
      "Custom domain path (soon)",
      "Stripe Connect ready (stub)",
    ],
    cta: "Start free trial",
  },
];
