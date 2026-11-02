import Stripe from "stripe";
import { getStripeSecretKey } from "@/lib/stripe/config";

let stripeSingleton: Stripe | null = null;

/** Server-only Stripe client for Luke’s BOOKFLO platform account (TEST mode). */
export function getStripe(): Stripe {
  if (stripeSingleton) return stripeSingleton;
  stripeSingleton = new Stripe(getStripeSecretKey(), {
    apiVersion: "2026-10-28.endive",
    typescript: true,
  });
  return stripeSingleton;
}
