"use client";

import { OMS_BRAND, OMS_PALETTE } from "@/data/oh-my-social-media";
import { TenantLogo } from "@/components/branding/TenantLogo";

const CATEGORIES = ["Content", "Studio", "Packages", "Discovery"] as const;

const SERVICES = [
  {
    name: "Content shoot — 3 hours",
    meta: "On-location · with Tee",
    price: "£250",
    active: true,
  },
  {
    name: "Content shoot — 6 hours",
    meta: "Full day · with Tee",
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
 * Oh My Social Media — premium white booking phone for the case-study section.
 * Magenta + orange as precise accents (not loud). Real logo + Content/Studio/Packages pricing.
 */
export function OmsBookingPhone({ className = "" }: { className?: string }) {
  const brand = OMS_BRAND;
  const { magenta, orange, white, ink, muted } = OMS_PALETTE;
  const accent = magenta;
  const ctaGradient = `linear-gradient(120deg, ${magenta} 0%, ${orange} 100%)`;

  return (
    <div
      className={`mx-auto aspect-[9/19.5] w-full max-w-[248px] ${className}`}
      style={{ filter: "drop-shadow(0 28px 50px rgba(28,18,24,0.18))" }}
    >
      <div
        className="h-full rounded-[2.75rem] p-[2.5px]"
        style={{
          background: `linear-gradient(165deg, ${magenta}66 0%, #1a1a1c 42%, #0a0a0a 100%)`,
        }}
      >
        <div className="h-full rounded-[2.55rem] bg-[#111] p-[7px]">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-[2.05rem]"
            style={{ background: white, color: ink }}
          >
            <div
              className="absolute left-1/2 top-[10px] z-20 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black"
              aria-hidden
            />

            {/* Pure white header — premium, not candy */}
            <div
              className="relative shrink-0 px-3.5 pb-3.5 pt-10"
              style={{ background: white, borderBottom: "1px solid #F0F0F2" }}
            >
              <div className="flex flex-col items-center gap-2">
                <TenantLogo brand={brand} size="sm" className="object-center max-h-[36px] max-w-[148px]" />
                <p
                  className="text-center text-[8px] font-medium uppercase tracking-[0.16em]"
                  style={{ color: muted }}
                >
                  Content studio · Manchester
                </p>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-baseline justify-between">
                  <span
                    className="text-[7.5px] font-medium uppercase tracking-[0.2em]"
                    style={{ color: muted }}
                  >
                    02 / 07
                  </span>
                  <span className="text-[8px] font-medium tracking-[0.02em]" style={{ color: accent }}>
                    Choose a service
                  </span>
                </div>
                <div className="h-px overflow-hidden bg-[#EFEFF1]">
                  <div className="h-full" style={{ width: "28%", background: ctaGradient }} />
                </div>
              </div>
            </div>

            {/* Airy white body */}
            <div className="flex min-h-0 flex-1 flex-col px-3 pb-2.5 pt-3">
              <button
                type="button"
                tabIndex={-1}
                className="mb-2.5 self-start text-[8.5px] tracking-[0.06em]"
                style={{ color: muted }}
              >
                ← Back
              </button>

              <p
                className="mb-3 text-[13px] font-semibold leading-none tracking-tight"
                style={{ fontFamily: `"${brand.fontHeading}", system-ui, sans-serif` }}
              >
                Choose a service
              </p>

              {/* Precise category chips */}
              <div className="mb-3 flex gap-1 overflow-hidden">
                {CATEGORIES.map((cat, i) => {
                  const active = i === 0;
                  return (
                    <span
                      key={cat}
                      className="shrink-0 rounded-full px-2.5 py-[5px] text-[7.5px] font-medium tracking-[0.04em]"
                      style={
                        active
                          ? { background: ink, color: white }
                          : {
                              background: white,
                              color: muted,
                              boxShadow: "inset 0 0 0 1px #E6E6EA",
                            }
                      }
                    >
                      {cat}
                    </span>
                  );
                })}
              </div>

              {/* Service cards — white, magenta rail when selected */}
              <div className="min-h-0 flex-1 space-y-1.5 overflow-hidden">
                {SERVICES.map((svc) => (
                  <div
                    key={svc.name}
                    className="relative overflow-hidden rounded-xl px-2.5 py-2"
                    style={{
                      background: white,
                      boxShadow: svc.active
                        ? `inset 2px 0 0 ${magenta}, inset 0 0 0 1px ${magenta}40`
                        : "inset 0 0 0 1px #E8E8EC",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-semibold leading-snug tracking-tight">
                          {svc.name}
                        </p>
                        <p className="mt-0.5 text-[7.5px] tracking-[0.02em]" style={{ color: muted }}>
                          {svc.meta}
                        </p>
                      </div>
                      <p
                        className="shrink-0 text-[9px] font-semibold tabular-nums tracking-tight"
                        style={{ color: svc.active ? magenta : ink }}
                      >
                        {svc.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gradient reserved for the CTA only */}
              <div
                className="mt-2.5 rounded-full py-[9px] text-center text-[9px] font-semibold tracking-[0.12em] uppercase text-white"
                style={{ background: ctaGradient }}
              >
                Continue · £250
              </div>

              <div className="mx-auto mt-2.5 h-[3px] w-[80px] rounded-full bg-black/20" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
