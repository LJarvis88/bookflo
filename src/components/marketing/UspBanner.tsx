import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ContourBookingPhone } from "@/components/marketing/ContourBookingPhone";
import { TRIAL_DAYS } from "@/data/pricing";

/**
 * Premium zero-commission USP banner — split layout (copy + CTA left, product phone right).
 * BOOKFLO mauve / lavender / soft blue; no marketplace blue, no store badges (PWA-first).
 */
export function UspBanner() {
  return (
    <section
      aria-labelledby="usp-banner-heading"
      className="relative z-10 overflow-hidden border-t border-bf-line/70 bg-gradient-to-b from-[#f5f6f8] via-[#eef4f7] to-[#f7f8fa]"
    >
      <div
        className="pointer-events-none absolute left-[12%] top-0 h-56 w-[22rem] rounded-full bg-[#E7D5FA]/45 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-[8%] h-48 w-80 rounded-full bg-bf-sky/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="relative md:py-6">
          {/* Rounded panel — overflow visible so the phone can break the edges */}
          <div
            className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-[#845D81] via-[#6f4f6d] to-[#3d4f5c] shadow-lift sm:rounded-[2rem] md:inset-y-6"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 top-[-10%] h-72 w-72 rounded-full bg-[#E7D5FA]/25 blur-3xl md:top-[5%]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[5%] right-[18%] h-56 w-64 rounded-full bg-[#A2BECC]/30 blur-3xl"
            aria-hidden
          />

          <div className="relative grid md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-14 md:px-12 lg:px-14 lg:py-16">
              <h2
                id="usp-banner-heading"
                className="max-w-md text-balance font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.5rem] md:leading-[1.15]"
              >
                Zero commission. Your brand stays yours.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 sm:text-base">
                Flat subscription, {TRIAL_DAYS}-day free trial. Clients book on a page that looks like
                you — not a marketplace.
              </p>
              <div className="mt-8">
                <Button
                  href="/signup"
                  variant="secondary"
                  className="border-transparent bg-white px-7 py-3 text-bf-ink shadow-soft hover:border-transparent hover:bg-[#F3EAFB]"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-center px-6 pb-10 pt-2 md:px-8 md:py-0 lg:pr-10">
              <div className="relative w-full max-w-[260px] animate-fade-up md:-my-4 md:[animation-delay:120ms]">
                <div
                  className="pointer-events-none absolute inset-x-6 bottom-4 top-10 rounded-[2rem] bg-[#E7D5FA]/20 blur-2xl"
                  aria-hidden
                />
                <ContourBookingPhone className="relative max-w-[248px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
