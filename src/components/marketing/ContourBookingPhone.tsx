"use client";

import { CONTOUR_PRESTON_BRAND, CONTOUR_PALETTE } from "@/data/contour-preston";
import { TenantLogo } from "@/components/branding/TenantLogo";

const CATEGORIES = ["Skin & facials", "Injectables", "Body", "Consults"] as const;

const SERVICES = [
  { name: "Signature Contour Facial", meta: "60 min · Amelia", price: "£85", active: true },
  { name: "HydraGlow Infusion", meta: "45 min · Priya", price: "£75", active: false },
  { name: "Chemical Peel — Brighten", meta: "40 min · Priya", price: "£95", active: false },
] as const;

/**
 * Contour Preston — quiet-luxury booking phone for the case-study section.
 * Deep Ink / Champagne Gold / Kim K Cream. Refined type + spacing.
 */
export function ContourBookingPhone({ className = "" }: { className?: string }) {
  const brand = CONTOUR_PRESTON_BRAND;
  const { deepInk, champagneGold, kimKCream, cashmere, midnightNavy } = CONTOUR_PALETTE;

  return (
    <div
      className={`mx-auto aspect-[9/19.5] w-full max-w-[248px] ${className}`}
      style={{ filter: "drop-shadow(0 28px 50px rgba(12,17,27,0.32))" }}
    >
      <div
        className="h-full rounded-[2.75rem] p-[2.5px]"
        style={{
          background: `linear-gradient(165deg, ${champagneGold}55 0%, ${deepInk} 38%, ${midnightNavy} 100%)`,
        }}
      >
        <div className="h-full rounded-[2.55rem] p-[7px]" style={{ background: deepInk }}>
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[2.05rem]"
            style={{ background: kimKCream, color: deepInk }}
          >
            <div
              className="absolute left-1/2 top-[10px] z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full"
              style={{ background: deepInk }}
              aria-hidden
            />

            {/* Quiet luxury header */}
            <div
              className="relative shrink-0 px-3.5 pb-3.5 pt-10"
              style={{
                background: `linear-gradient(165deg, ${deepInk} 0%, ${midnightNavy} 100%)`,
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <TenantLogo brand={brand} size="sm" className="object-center max-h-[34px]" />
                <p
                  className="text-center text-[8.5px] font-light tracking-[0.18em] uppercase"
                  style={{ color: cashmere }}
                >
                  Quiet luxury aesthetics
                </p>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span
                    className="text-[7.5px] font-medium uppercase tracking-[0.2em]"
                    style={{ color: `${cashmere}cc` }}
                  >
                    02 / 07
                  </span>
                  <span
                    className="text-[8px] tracking-[0.04em]"
                    style={{ color: champagneGold, fontFamily: `"${brand.fontHeading}", Georgia, serif` }}
                  >
                    Choose a service
                  </span>
                </div>
                <div className="h-px overflow-hidden" style={{ background: `${champagneGold}28` }}>
                  <div className="h-full" style={{ width: "28%", background: champagneGold }} />
                </div>
              </div>
            </div>

            {/* Cream body */}
            <div className="flex min-h-0 flex-1 flex-col px-3 pb-2.5 pt-3">
              <button
                type="button"
                tabIndex={-1}
                className="mb-2.5 self-start text-[8.5px] tracking-[0.06em]"
                style={{ color: cashmere }}
              >
                ← Back
              </button>

              <p
                className="mb-3 text-[13px] leading-none tracking-tight"
                style={{ fontFamily: `"${brand.fontHeading}", Georgia, serif`, fontWeight: 500 }}
              >
                Choose a service
              </p>

              {/* Refined category pills — outline, not chunky */}
              <div className="mb-3 flex gap-1 overflow-hidden">
                {CATEGORIES.map((cat, i) => {
                  const active = i === 0;
                  return (
                    <span
                      key={cat}
                      className="shrink-0 rounded-full px-2 py-[5px] text-[7px] tracking-[0.04em]"
                      style={
                        active
                          ? {
                              background: deepInk,
                              color: champagneGold,
                            }
                          : {
                              background: "transparent",
                              color: cashmere,
                              boxShadow: `inset 0 0 0 1px ${champagneGold}45`,
                            }
                      }
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>

              {/* Service list — hairline cards, gold rail on selection */}
              <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.name}
                    className="relative overflow-hidden rounded-xl px-2.5 py-2"
                    style={{
                      background: svc.active ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                      boxShadow: svc.active
                        ? `inset 2px 0 0 ${champagneGold}, inset 0 0 0 1px ${champagneGold}55`
                        : `inset 0 0 0 1px ${champagneGold}28`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p
                          className="truncate text-[9px] leading-snug tracking-tight"
                          style={{ fontWeight: 550 }}
                        >
                          {svc.name}
                        </p>
                        <p className="mt-0.5 text-[7.5px] tracking-[0.02em]" style={{ color: cashmere }}>
                          {svc.meta}
                        </p>
                      </div>
                      <p
                        className="shrink-0 text-[9px] tabular-nums tracking-tight"
                        style={{
                          color: svc.active ? champagneGold : deepInk,
                          fontFamily: `"${brand.fontHeading}", Georgia, serif`,
                        }}
                      >
                        {svc.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-2.5 rounded-full py-[9px] text-center text-[9px] font-medium tracking-[0.12em] uppercase"
                style={{ background: champagneGold, color: deepInk }}
              >
                Continue
              </div>

              <div
                className="mx-auto mt-2.5 h-[3px] w-[80px] rounded-full opacity-30"
                style={{ background: deepInk }}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
