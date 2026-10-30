import type { PlanId } from "@/lib/types";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  blurb: string;
  features: string[];
  highlighted?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    price: 19,
    blurb: "Independent beauty pros who want a branded page that looks paid-for.",
    features: [
      "1 branded booking page",
      "Unlimited bookings",
      "Services & hours",
      "Email confirmations",
      "Pay at venue",
    ],
  },
  {
    id: "salon",
    name: "Salon",
    price: 39,
    blurb: "Multi-staff salons and aesthetics clinics ready to look unmistakably theirs.",
    features: [
      "Everything in Solo",
      "Up to 8 staff calendars",
      "Branding editor + live preview",
      "Customer list",
      "AI brand match (demo)",
    ],
    highlighted: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 59,
    blurb: "Growing studios that want priority support and room to expand.",
    features: [
      "Everything in Salon",
      "Unlimited staff",
      "Priority support",
      "Custom domain path (soon)",
      "Stripe Connect ready (stub)",
    ],
  },
];
