import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookfloUspPhone } from "@/components/marketing/BookfloUspPhone";
import { TRIAL_DAYS } from "@/data/pricing";

/**
 * Zero-commission USP — Luke’s orange→pink→lavender BOOKFLO phone mock.
 * Source: media/luke-usp-banner-orange-ref.png (phone art in /marketing/usp-bookflo-phone.webp).
 */
export function UspBanner() {
  return (
    <section
      aria-labelledby="usp-banner-heading"
      className="relative z-10 overflow-hidden border-t border-bf-line/70 bg-[#f4f4f6]"
    >
      <div className="relative mx-auto max-w-[1400px] px-5 py-14 sm:px-8 md:py-16 lg:px-10">
        <div className="relative overflow-hidden rounded-[1.75rem] shadow-lift sm:rounded-[2rem]">
          {/* Orange → hot pink → lavender panel */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, #FF7A33 0%, #FF4E6E 28%, #F9188A 52%, #E855D4 74%, #C9A8F5 100%)",
            }}
            aria-hidden
          />
          {/* Soft wave / blob atmosphere (Luke mock) */}
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

          <div className="relative grid md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-14 md:px-12 lg:px-14 lg:py-16">
              <h2
                id="usp-banner-heading"
                className="max-w-md text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.55rem] md:leading-[1.12]"
              >
                Zero commission. Your brand stays yours.
              </h2>
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

            <div className="relative z-10 flex items-center justify-center px-6 pb-10 pt-2 md:justify-end md:px-8 md:py-6 lg:pr-12">
              <div className="relative w-full max-w-[300px] animate-fade-up md:-my-2 md:origin-bottom md:rotate-[6deg] md:[animation-delay:120ms]">
                <BookfloUspPhone className="relative max-w-[280px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
