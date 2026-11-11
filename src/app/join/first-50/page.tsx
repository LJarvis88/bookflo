import type { Metadata } from "next";
import Link from "next/link";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { Founding50Claim } from "@/components/marketing/Founding50Claim";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import {
  FOUNDING_50_CAP,
  FOUNDING_50_LADDER,
  FOUNDING_50_PATH,
  FOUNDING_50_SPOTS_CLAIMED,
  founding50SpotsLeft,
} from "@/data/founding50";
import { JsonLd } from "@/components/seo/JsonLd";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "First 50 · quiz free for demo";
const description =
  "BOOKFLO founding cohort: first 50 get the booking quiz free for demo. After that, quiz unlock is paid — SMS costs more.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: FOUNDING_50_PATH },
  openGraph: {
    title: `${title} — ${SITE_NAME}`,
    description,
    url: FOUNDING_50_PATH,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
};

const spotsLeft = founding50SpotsLeft();
const filled = Math.min(
  FOUNDING_50_CAP,
  Math.max(0, FOUNDING_50_SPOTS_CLAIMED),
);
const fillPct = Math.round((filled / FOUNDING_50_CAP) * 100);

export default function First50JoinPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bf-atmosphere text-bf-ink">
      <div
        className="pointer-events-none absolute inset-0 bf-grain"
        aria-hidden
      />
      {/* Soft brand wash — atmosphere, not clutter */}
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
          href="/signup"
          className="text-sm font-medium text-bf-muted transition-colors hover:text-bf-ink"
        >
          General waitlist
        </Link>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero — one composition: brand, claim, line, CTA cue */}
        <section className="mx-auto max-w-5xl px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-10">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bf-accent">
              Founding cohort · {FOUNDING_50_CAP} only
            </p>
            <div className="mt-6 flex justify-center">
              <BookfloWordmark size="hero" />
            </div>
            <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              First 50 · quiz free for demo
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-bf-muted sm:text-lg">
              Beauty founders only. Claim a spot and get the booking quiz free
              while we demo toward January 2027. After 50 — or if you want SMS —
              upgrades apply.
            </p>

            {/* Counter placeholder */}
            <div className="mx-auto mt-8 max-w-sm animate-fade-up [animation-delay:100ms]">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-bf-ink">
                  {filled} of {FOUNDING_50_CAP} claimed
                </span>
                <span className="text-bf-muted">
                  {spotsLeft > 0
                    ? `${spotsLeft} spots left`
                    : "Full — join waitlist"}
                </span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-bf-fog"
                role="progressbar"
                aria-valuenow={filled}
                aria-valuemin={0}
                aria-valuemax={FOUNDING_50_CAP}
                aria-label="Founding spots claimed"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-bf-accent to-bf-sky transition-[width] duration-700"
                  style={{ width: `${Math.max(fillPct, filled === 0 ? 2 : fillPct)}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-bf-muted">
                Counter placeholder — updated as claims land.
              </p>
            </div>
          </div>

          {/* Typographic visual anchor */}
          <div
            className="pointer-events-none relative mx-auto mt-10 select-none text-center animate-fade-up [animation-delay:160ms]"
            aria-hidden
          >
            <span className="font-display text-[7.5rem] font-semibold leading-none tracking-tighter text-bf-ink/[0.06] sm:text-[10rem]">
              50
            </span>
          </div>
        </section>

        {/* Ladder — one job: clarify free → paid quiz → SMS */}
        <section className="border-t border-bf-line/60 bg-white/40">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Clear ladder
              </h2>
              <p className="mt-2 text-sm text-bf-muted sm:text-base">
                Free quiz for the first 50. Then unlock. SMS costs more.
              </p>
            </div>
            <ol className="mx-auto mt-10 max-w-2xl space-y-8">
              {FOUNDING_50_LADDER.map((item, i) => (
                <li
                  key={item.step}
                  className="flex gap-5 animate-fade-up"
                  style={{ animationDelay: `${180 + i * 80}ms` }}
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-bf-accent">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bf-muted">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Claim — interaction container */}
        <section className="mx-auto max-w-lg px-5 py-14 sm:px-8 sm:py-16">
          {spotsLeft > 0 ? (
            <Founding50Claim />
          ) : (
            <div className="rounded-3xl border border-bf-line/80 bg-white/85 p-8 text-center shadow-soft">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                First 50 are full
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-bf-muted">
                Quiz unlock is now a paid upgrade. SMS sits above that. Join the
                general waitlist and we&apos;ll open access for January 2027.
              </p>
              <Link
                href="/signup"
                className="mt-6 inline-flex text-sm font-medium text-bf-accent hover:underline"
              >
                Join the waitlist →
              </Link>
            </div>
          )}
          <p className="mt-8 text-center text-sm text-bf-muted">
            Already invited?{" "}
            <Link href="/login" className="font-medium text-bf-accent hover:underline">
              Log in
            </Link>
          </p>
        </section>
      </main>

      <LegalFooter />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description,
          url: `${SITE_URL}${FOUNDING_50_PATH}`,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        }}
      />
    </div>
  );
}
