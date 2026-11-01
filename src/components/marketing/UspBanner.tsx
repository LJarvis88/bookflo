import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TRIAL_DAYS } from "@/data/pricing";

/**
 * Zero-commission USP.
 * Desktop: Luke’s exact full banner PNG (copy + phone) — no redraw.
 * Mobile: HTML copy + CTA on the gradient; phone hidden.
 * Source: media/luke-usp-desktop-full.png → /marketing/usp-luke-desktop-full.png
 */
export function UspBanner() {
  return (
    <section
      aria-labelledby="usp-banner-heading"
      className="relative z-10 overflow-hidden border-t border-bf-line/70 bg-[#f4f4f6]"
    >
      <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:px-8 md:py-16 lg:px-10">
        <h2 id="usp-banner-heading" className="sr-only">
          Zero commission. Your brand stays yours.
        </h2>

        {/* Desktop — Luke’s exact mock (full banner with phone) */}
        <div className="relative hidden md:block">
          <a
            href="/signup"
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bf-ink"
          >
            <img
              src="/marketing/usp-luke-desktop-full.png"
              alt="Zero commission. Your brand stays yours. Flat subscription, 14-day free trial. Clients book on a page that looks like you — not a marketplace. Start free trial."
              width={1774}
              height={772}
              className="mx-auto block h-auto w-full drop-shadow-[0_18px_40px_rgba(40,12,48,0.18)]"
              decoding="async"
              loading="eager"
              fetchPriority="low"
            />
          </a>
        </div>

        {/* Mobile — copy + CTA only; no phone */}
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift md:hidden sm:rounded-[2rem]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, #FF7A33 0%, #FF4E6E 28%, #F9188A 52%, #E855D4 74%, #C9A8F5 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-[8%] bottom-[-35%] h-[120%] w-[55%] rounded-[100%] bg-[#FF9A55]/35 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-[28%] top-[-40%] h-[90%] w-[45%] rounded-[100%] bg-[#FF2D9B]/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-[10%] bottom-[-20%] h-[110%] w-[50%] rounded-[100%] bg-[#D4B8FF]/45 blur-2xl"
            aria-hidden
          />
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
            viewBox="0 0 1200 520"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M-40 420 C 180 280, 320 520, 520 360 C 720 200, 860 480, 1080 300 C 1180 220, 1240 180, 1280 140 L 1280 560 L -40 560 Z"
              fill="white"
            />
            <path
              d="M 200 80 C 360 40, 480 160, 640 90 C 800 20, 920 140, 1100 60"
              fill="none"
              stroke="white"
              strokeWidth="48"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>

          <div className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-14">
            <p className="max-w-md text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Zero commission. Your brand stays yours.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/90 sm:text-base">
              Flat subscription, {TRIAL_DAYS}-day free trial. Clients book on a page that looks like
              you — not a marketplace.
            </p>
            <div className="mt-8">
              <Button
                href="/signup"
                variant="secondary"
                className="border-transparent bg-white px-7 py-3 text-bf-ink shadow-soft hover:border-transparent hover:bg-white/95"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
