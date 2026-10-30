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
 * Contour Preston booking phone — richer mid-flow UI for the case-study section
 * (Deep Ink header, progress, categories, service list, Champagne Gold accents).
 */
export function ContourBookingPhone({ className = "" }: { className?: string }) {
  const brand = CONTOUR_PRESTON_BRAND;
  const { deepInk, champagneGold, kimKCream, cashmere, midnightNavy } = CONTOUR_PALETTE;

  return (
    <div
      className={`mx-auto aspect-[9/19.5] w-full max-w-[240px] ${className}`}
      style={{ filter: "drop-shadow(0 22px 40px rgba(14,20,32,0.22))" }}
    >
      <div
        className="h-full rounded-[2.6rem] p-[3px] ring-1 ring-white/10"
        style={{
          background: `linear-gradient(160deg, ${deepInk} 0%, ${midnightNavy} 100%)`,
        }}
      >
        <div className="h-full rounded-[2.4rem] bg-black p-[7px]">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem]"
            style={{ background: kimKCream, color: deepInk }}
          >
            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 top-[9px] z-20 h-[20px] w-[78px] -translate-x-1/2 rounded-full"
              style={{ background: deepInk }}
              aria-hidden
            />

            {/* Contour header — Deep Ink → Midnight Navy like live booking */}
            <div
              className="relative shrink-0 border-b px-3 pb-3 pt-9"
              style={{
                background: `linear-gradient(160deg, ${deepInk} 0%, ${midnightNavy} 100%)`,
                borderColor: `${champagneGold}33`,
              }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <TenantLogo brand={brand} size="sm" className="object-center max-h-8" />
                <p
                  className="text-center text-[9px] leading-tight"
                  style={{ color: cashmere }}
                >
                  Quiet luxury aesthetics
                </p>
              </div>

              {/* Progress */}
              <div className="mt-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[8px] uppercase tracking-[0.14em]" style={{ color: cashmere }}>
                    Step 2 of 7
                  </span>
                  <span className="text-[8px] font-medium" style={{ color: champagneGold }}>
                    Choose a service
                  </span>
                </div>
                <div className="h-[3px] overflow-hidden rounded-full" style={{ background: `${midnightNavy}` }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: "28%", background: champagneGold }}
                  />
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-2 pt-2.5">
              <div className="mb-1.5 flex items-center gap-1">
                <span className="text-[9px]" style={{ color: cashmere }}>
                  ← Back
                </span>
              </div>

              <p
                className="mb-2 text-[12px] leading-tight tracking-tight"
                style={{ fontFamily: `"${brand.fontHeading}", Georgia, serif` }}
              >
                Choose a service
              </p>

              {/* Category chips */}
              <div className="mb-2.5 flex gap-1 overflow-hidden">
                {CATEGORIES.map((cat, i) => {
                  const active = i === 0;
                  return (
                    <span
                      key={cat}
                      className="shrink-0 rounded-full px-2 py-1 text-[7.5px] font-medium tracking-wide"
                      style={
                        active
                          ? {
                              background: champagneGold,
                              color: deepInk,
                            }
                          : {
                              background: "#FFFFFF",
                              color: cashmere,
                              boxShadow: `inset 0 0 0 1px ${champagneGold}40`,
                            }
                      }
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>

              {/* Service cards */}
              <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.name}
                    className="rounded-[0.7rem] px-2 py-1.5"
                    style={
                      svc.active
                        ? {
                            background: `${champagneGold}28`,
                            boxShadow: `inset 0 0 0 1px ${champagneGold}99`,
                          }
                        : {
                            background: "#FFFFFF",
                            boxShadow: `inset 0 0 0 1px ${champagneGold}30`,
                          }
                    }
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-semibold leading-tight">{svc.name}</p>
                        <p className="mt-0.5 text-[7.5px]" style={{ color: cashmere }}>
                          {svc.meta}
                        </p>
                      </div>
                      <p
                        className="shrink-0 text-[9px] font-semibold"
                        style={{ color: svc.active ? champagneGold : deepInk }}
                      >
                        {svc.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sticky CTA */}
              <div
                className="mt-2 rounded-full py-2 text-center text-[10px] font-semibold tracking-wide"
                style={{ background: champagneGold, color: deepInk }}
              >
                Continue · Signature Facial
              </div>

              <div
                className="mx-auto mt-2 h-[3px] w-[88px] rounded-full opacity-35"
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
