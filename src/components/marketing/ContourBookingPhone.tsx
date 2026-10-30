"use client";

import { CONTOUR_PRESTON_BRAND, CONTOUR_PALETTE } from "@/data/contour-preston";
import { TenantLogo } from "@/components/branding/TenantLogo";

/**
 * Soft Contour Preston booking phone — cream screen, Deep Ink bezel, Champagne Gold CTA.
 * Used in its own marketing section (not floated on the hero calendar).
 */
export function ContourBookingPhone({ className = "" }: { className?: string }) {
  const brand = CONTOUR_PRESTON_BRAND;
  const { deepInk, champagneGold, kimKCream, cashmere, midnightNavy } = CONTOUR_PALETTE;

  return (
    <div
      className={`mx-auto aspect-[9/19.5] w-full max-w-[220px] ${className}`}
      style={{ filter: "drop-shadow(0 22px 40px rgba(14,20,32,0.22))" }}
    >
      <div
        className="h-full rounded-[2.6rem] p-[3px] ring-1 ring-white/10"
        style={{
          background: `linear-gradient(160deg, ${deepInk} 0%, ${midnightNavy} 100%)`,
        }}
      >
        <div className="h-full rounded-[2.4rem] bg-black p-[8px]">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem]"
            style={{ background: kimKCream, color: deepInk }}
          >
            <div
              className="absolute left-1/2 top-[10px] z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full"
              style={{ background: deepInk }}
              aria-hidden
            />

            <div
              className="flex flex-col items-center px-4 pb-2 pt-11"
              style={{
                background: `linear-gradient(180deg, ${champagneGold}22 0%, transparent 70%)`,
              }}
            >
              <TenantLogo brand={brand} size="md" className="object-center max-h-11" />
            </div>

            <div className="mt-auto space-y-2.5 px-4 pb-5">
              <div>
                <p
                  className="text-sm leading-tight tracking-tight"
                  style={{ fontFamily: `"${brand.fontHeading}", Georgia, serif`, color: deepInk }}
                >
                  Contour Preston
                </p>
                <p className="mt-0.5 text-[11px]" style={{ color: cashmere }}>
                  Quiet luxury aesthetics
                </p>
              </div>

              <div
                className="rounded-xl px-2.5 py-2 text-[11px]"
                style={{
                  background: "#FFFFFF",
                  color: deepInk,
                  boxShadow: `inset 0 0 0 1px ${champagneGold}40`,
                }}
              >
                Signature Contour Facial · Amelia
              </div>

              <div
                className="rounded-full py-2.5 text-center text-[11px] font-medium tracking-wide"
                style={{ background: champagneGold, color: deepInk }}
              >
                Book now
              </div>

              <div
                className="mx-auto mt-1 h-[4px] w-[96px] rounded-full opacity-40"
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
