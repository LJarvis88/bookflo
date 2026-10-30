"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTOUR_PRESTON_BRAND } from "@/data/contour-preston";
import { TenantLogo } from "@/components/branding/TenantLogo";

const steps = [
  { id: "service", label: "Service", value: "Signature Contour Facial" },
  { id: "staff", label: "With", value: "Amelia Hart" },
  { id: "when", label: "When", value: "Fri 6 Nov · 11:00" },
] as const;

export function BookingPreview() {
  const [active, setActive] = useState(0);
  const brand = CONTOUR_PRESTON_BRAND;
  const surface = brand.surface;

  return (
    <div
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] border shadow-lift"
      style={{
        background: brand.background,
        color: brand.ink,
        borderColor: `${brand.primary}40`,
      }}
    >
      <div
        className="flex h-40 w-full items-center justify-center px-6"
        style={{
          background: `linear-gradient(160deg, ${brand.background} 0%, ${brand.surface} 100%)`,
        }}
      >
        <TenantLogo brand={brand} size="lg" className="object-center" />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p
            className="text-2xl leading-none tracking-tight"
            style={{ fontFamily: `"${brand.fontHeading}", Georgia, serif` }}
          >
            Contour Preston
          </p>
          <p className="mt-1.5 text-sm" style={{ color: brand.muted }}>
            Book in under a minute — their brand, not ours.
          </p>
        </div>

        <div className="space-y-2">
          {steps.map((step, i) => {
            const selected = i === active;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(i)}
                className="flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left transition"
                style={{
                  background: selected ? `${brand.primary}22` : surface,
                  outline: selected
                    ? `1px solid ${brand.primary}88`
                    : `1px solid ${brand.primary}22`,
                }}
              >
                <span
                  className="text-xs uppercase tracking-[0.14em]"
                  style={{ color: brand.muted }}
                >
                  {step.label}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${step.id}-${selected}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium"
                  >
                    {step.value}
                  </motion.span>
                </AnimatePresence>
              </button>
            );
          })}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full py-3 text-sm font-medium"
          style={{ background: brand.buttonBg, color: brand.buttonText }}
          onClick={() => setActive((a) => (a + 1) % steps.length)}
        >
          Continue
        </motion.button>
        <p className="text-center text-[11px]" style={{ color: brand.muted }}>
          Interactive preview · Contour Preston demo
        </p>
      </div>
    </div>
  );
}
