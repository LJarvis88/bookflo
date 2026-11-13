import type { Metadata } from "next";
import Link from "next/link";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { Button } from "@/components/ui/Button";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  FOUNDING30_ADDONS,
  FOUNDING30_APPLY_PATH,
  FOUNDING30_CAP,
  FOUNDING30_CORE_MONTHS,
  FOUNDING30_LADDER,
  FOUNDING30_PATH,
  FOUNDING30_SPOTS_CLAIMED,
  founding30SpotsLeft,
} from "@/data/founding30";
import { FOUNDING_THEME_PRESETS } from "@/data/founding-themes";
import { OG_IMAGE_PATH, SITE_NAME } from "@/lib/site";

const title = "BookFlo Founding 30";
const description = `30 beauty businesses · ${FOUNDING30_CORE_MONTHS} months complimentary core BookFlo. Quiz and SMS stay optional paid add-ons.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: FOUNDING30_PATH },
  openGraph: {
    title: `${title} — ${SITE_NAME}`,
    description,
    url: FOUNDING30_PATH,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
};

const spotsLeft = founding30SpotsLeft();
const filled = Math.min(FOUNDING30_CAP, Math.max(0, FOUNDING30_SPOTS_CLAIMED));
const fillPct = Math.round((filled / FOUNDING30_CAP) * 100);

export default function Founding30LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bf-atmosphere text-bf-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: FOUNDING30_PATH,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bf-grain" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-bf-accent-soft/50 blur-3xl animate-soft-pulse"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-80 w-80 rounded-full bg-bf-sky/40 blur-3xl"
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="inline-flex" aria-label="bookflo home">
          <BookfloWordmark size="lg" />
        </Link>
        <Link
          href="/join/partner"
          className="text-sm font-medium text-bf-muted transition-colors hover:text-bf-ink"
        >
          Christmas partner list
        </Link>
      </header>

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bf-accent">
              Founding cohort · {FOUNDING30_CAP} only
            </p>
            <div className="mt-6 flex justify-center">
              <BookfloWordmark size="hero" />
            </div>
            <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              BookFlo Founding 30
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-bf-muted sm:text-lg">
              {FOUNDING30_CORE_MONTHS} months complimentary core booking for{" "}
              {FOUNDING30_CAP} beauty businesses. Apply now — accounts activate
              when January onboarding opens.
            </p>

            <div className="mx-auto mt-8 max-w-sm animate-fade-up [animation-delay:100ms]">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-bf-ink">
                  {filled} of {FOUNDING30_CAP} shortlisted
                </span>
                <span className="text-bf-muted">
                  {spotsLeft > 0 ? `${spotsLeft} spaces left` : "List full"}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bf-fog">
                <div
                  className="h-full rounded-full bg-bf-accent transition-all"
                  style={{ width: `${fillPct}%` }}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={FOUNDING30_APPLY_PATH} variant="dark" className="px-7 py-3">
                Apply for Founding 30
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {FOUNDING30_LADDER.map((step) => (
              <div key={step.step} className="animate-fade-up">
                <p className="text-xs font-semibold tracking-[0.16em] text-bf-accent">
                  {step.step}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-bf-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-bf-line/60 bg-white/50 py-16">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <h2 className="text-center font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Five looks. One booking flow.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-bf-muted">
              Pick a presentation preference in your application. Your logo and
              colours layer on top — we do not ship five separate booking apps.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {FOUNDING_THEME_PRESETS.map((theme) => (
                <div
                  key={theme.id}
                  className="overflow-hidden rounded-2xl border border-bf-line bg-white"
                >
                  <div
                    className="h-20"
                    style={{
                      background: `linear-gradient(145deg, ${theme.tokens.primary}, ${theme.tokens.secondary})`,
                    }}
                  />
                  <div className="p-3">
                    <p className="font-display text-sm font-semibold">
                      {theme.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-bf-muted">
                      {theme.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Optional add-ons
          </h2>
          <p className="mt-3 text-sm text-bf-muted">
            Never bundled as a fake discount. Never checked by default.
          </p>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-2xl border border-bf-line bg-white/80 p-5">
              <p className="font-display text-lg font-semibold">
                {FOUNDING30_ADDONS.quiz.name}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                £{FOUNDING30_ADDONS.quiz.priceMonthly.toFixed(2)}
                <span className="text-sm font-sans font-normal text-bf-muted">
                  /mo
                </span>
              </p>
              <p className="mt-2 text-sm text-bf-muted">
                {FOUNDING30_ADDONS.quiz.blurb}
              </p>
            </div>
            <div className="rounded-2xl border border-bf-line bg-white/80 p-5">
              <p className="font-display text-lg font-semibold">
                {FOUNDING30_ADDONS.sms.name}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                £{FOUNDING30_ADDONS.sms.priceMonthly.toFixed(2)}
                <span className="text-sm font-sans font-normal text-bf-muted">
                  /mo
                </span>
              </p>
              <p className="mt-2 text-sm text-bf-muted">
                {FOUNDING30_ADDONS.sms.blurb}
              </p>
            </div>
          </div>
          <div className="mt-10">
            <Button href={FOUNDING30_APPLY_PATH} variant="dark" className="px-7 py-3">
              Start application
            </Button>
          </div>
        </section>
      </main>

      <LegalFooter />
    </div>
  );
}
