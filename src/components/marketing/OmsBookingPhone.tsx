"use client";

import { OMS_BRAND, OMS_PALETTE } from "@/data/oh-my-social-media";
import { TenantLogo } from "@/components/branding/TenantLogo";

const CATEGORIES = ["Content shoots", "Studio shoots", "Packages", "Discovery"] as const;

const SERVICES = [
  {
    name: "Content shoot — 3 hours",
    meta: "On-location · Tee",
    price: "£250",
    active: true,
  },
  {
    name: "Content shoot — 6 hours",
    meta: "Full day · Tee",
    price: "£400",
    active: false,
  },
  {
    name: "3h content + studio",
    meta: "Package · Tee + Jaz",
    price: "£350",
    active: false,
  },
] as const;

/**
 * Oh My Social Media booking phone — white/clean mid-flow UI for the case-study section
 * (magenta + orange accents, real logo, Content/Studio/Packages pricing).
 */
export function OmsBookingPhone({ className = "" }: { className?: string }) {
  const brand = OMS_BRAND;
  const { magenta, orange, white, ink, muted } = OMS_PALETTE;
  const gradient = `linear-gradient(135deg, ${magenta} 0%, ${orange} 100%)`;

  return (
    <div
      className={`mx-auto aspect-[9/19.5] w-full max-w-[240px] ${className}`}
      style={{ filter: "drop-shadow(0 22px 40px rgba(14,20,32,0.22))" }}
    >
      <div
        className="h-full rounded-[2.6rem] p-[3px] ring-1 ring-black/10"
        style={{ background: "linear-gradient(160deg, #2a2a2c 0%, #0a0a0a 100%)" }}
      >
        <div className="h-full rounded-[2.4rem] bg-black p-[7px]">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem]"
            style={{ background: white, color: ink }}
          >
            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 top-[9px] z-20 h-[20px] w-[78px] -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />

            {/* White header with real OMS logo */}
            <div
              className="relative shrink-0 border-b px-3 pb-3 pt-9"
              style={{ background: white, borderColor: `${magenta}22` }}
            >
              <div className="flex flex-col items-center gap-1.5">
                <TenantLogo brand={brand} size="sm" className="object-center max-h-9 max-w-[150px]" />
                <p className="text-center text-[9px] leading-tight" style={{ color: muted }}>
                  Bold content days for beauty brands
                </p>
              </div>

              {/* Progress — magenta → orange */}
              <div className="mt-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span
                    className="text-[8px] uppercase tracking-[0.14em]"
                    style={{ color: muted }}
                  >
                    Step 2 of 7
                  </span>
                  <span
                    className="text-[8px] font-semibold"
                    style={{
                      background: gradient,
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Choose a service
                  </span>
                </div>
                <div className="h-[3px] overflow-hidden rounded-full bg-[#f3f4f6]">
                  <div className="h-full rounded-full" style={{ width: "28%", background: gradient }} />
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-2 pt-2.5">
              <div className="mb-1.5 flex items-center gap-1">
                <span className="text-[9px]" style={{ color: muted }}>
                  ← Back
                </span>
              </div>

              <p
                className="mb-2 text-[12px] font-semibold leading-tight tracking-tight"
                style={{ fontFamily: `"${brand.fontHeading}", system-ui, sans-serif` }}
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
                      className="shrink-0 rounded-full px-2 py-1 text-[7.5px] font-semibold tracking-wide"
                      style={
                        active
                          ? { background: gradient, color: white }
                          : {
                              background: white,
                              color: muted,
                              boxShadow: `inset 0 0 0 1px ${magenta}28`,
                            }
                      }
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>

              {/* Service cards with real £ pricing */}
              <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.name}
                    className="rounded-[0.7rem] px-2 py-1.5"
                    style={
                      svc.active
                        ? {
                            background: `linear-gradient(135deg, ${magenta}14 0%, ${orange}14 100%)`,
                            boxShadow: `inset 0 0 0 1.5px ${magenta}99`,
                          }
                        : {
                            background: "#FAFAFA",
                            boxShadow: "inset 0 0 0 1px #E5E7EB",
                          }
                    }
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-semibold leading-tight">{svc.name}</p>
                        <p className="mt-0.5 text-[7.5px]" style={{ color: muted }}>
                          {svc.meta}
                        </p>
                      </div>
                      <p
                        className="shrink-0 text-[9px] font-bold"
                        style={{ color: svc.active ? magenta : ink }}
                      >
                        {svc.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className="mt-2 rounded-full py-2 text-center text-[10px] font-semibold tracking-wide text-white"
                style={{ background: gradient }}
              >
                Continue · Content 3h · £250
              </div>

              <div className="mx-auto mt-2 h-[3px] w-[88px] rounded-full bg-black/25" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
