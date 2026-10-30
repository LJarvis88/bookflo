"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
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
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-bf-line/80 border-y border-bf-line/80">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg tracking-tight text-bf-ink md:text-xl">
                {item.q}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-bf-muted transition ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 max-w-2xl text-sm leading-relaxed text-bf-muted md:text-base">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
