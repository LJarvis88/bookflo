import type { Metadata } from "next";
import Link from "next/link";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { PartnerInterestForm } from "@/components/marketing/PartnerInterestForm";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  PARTNER_FREE_TARGET,
  PARTNER_INTERESTS_CLAIMED,
  PARTNER_LADDER,
  PARTNER_PATH,
  partnerSpotsLeft,
} from "@/data/partner-interest";
import { OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Christmas partner · 6 months free core";
const description =
  "BOOKFLO Christmas partner call with Toni — 6 months free core booking. Quiz and SMS stay paid extras. Register interest for the free cohort.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PARTNER_PATH },
  openGraph: {
    title: `${title} — ${SITE_NAME}`,
    description,
    url: PARTNER_PATH,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
};

const spotsLeft = partnerSpotsLeft();
const filled = Math.min(
  PARTNER_FREE_TARGET,
  Math.max(0, PARTNER_INTERESTS_CLAIMED),
);
const fillPct = Math.round((filled / PARTNER_FREE_TARGET) * 100);

/** FLO wave Christmas — lavender / mauve / soft blue winter light, not red-green kitsch. */
export default function ChristmasPartnerPage() {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden text-bf-ink"
      style={{
        background:
          "linear-gradient(165deg, #F7F4FB 0%, #E7D5FA 38%, #D8E8EF 72%, #F4F8FA 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bf-grain opacity-60" aria-hidden />
      {/* Soft winter light orbs — brand mauve + sky, bright ambient */}
      <div
        className="pointer-events-none absolute -left-28 top-10 h-[22rem] w-[22rem] rounded-full blur-3xl animate-soft-pulse"
        style={{ background: "rgba(231, 213, 250, 0.75)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-32 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{ background: "rgba(162, 190, 204, 0.55)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-24 left-1/3 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(132, 93, 129, 0.12)" }}
        aria-hidden
      />
      {/* Subtle frost line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
        }}
        aria-hidden
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="inline-flex" aria-label="bookflo home">
          <BookfloWordmark size="lg" />
        </Link>
        <Link
          href="/join/first-50"
          className="text-sm font-medium text-[#845D81]/80 transition-colors hover:text-[#845D81]"
        >
          First 50
        </Link>
      </header>

      <main className="relative z-10 flex-1">
        <section className="mx-auto max-w-5xl px-5 pb-8 pt-4 sm:px-8 sm:pb-12 sm:pt-8">
          <div className="mx-auto max-w-2xl text-center animate-fade-up">
            <p
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#845D81" }}
            >
              Christmas partner call · with Toni
            </p>
            <div className="mt-6 flex justify-center">
              <BookfloWordmark size="hero" />
            </div>
            <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Partner with BOOKFLO this winter
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-bf-muted sm:text-lg">
              Toni is a BOOKFLO partner. We&apos;re inviting beauty founders into
              a free-core cohort —{" "}
              <span className="font-medium text-bf-ink">6 months</span> of
              booking software on us. Aim {PARTNER_FREE_TARGET} partners.
              Quiz and SMS stay paid extras.
            </p>

            <div className="mx-auto mt-8 max-w-sm animate-fade-up [animation-delay:100ms]">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-bf-ink">
                  {filled} of {PARTNER_FREE_TARGET} interests
                </span>
                <span className="text-bf-muted">
                  {spotsLeft > 0 ? `${spotsLeft} spaces left` : "List full"}
                </span>
              </div>
              <div
                className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/70"
                role="progressbar"
                aria-valuenow={filled}
                aria-valuemin={0}
                aria-valuemax={PARTNER_FREE_TARGET}
                aria-label="Partner interests recorded"
              >
                <div
                  className="h-full rounded-full transition-[width] duration-700"
                  style={{
                    width: `${Math.max(fillPct, filled === 0 ? 3 : fillPct)}%`,
                    background:
                      "linear-gradient(90deg, #845D81 0%, #A2BECC 100%)",
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-bf-muted">
                Soft counter — updated as interests land.
              </p>
            </div>
          </div>

          {/* Seasonal typographic anchor — winter light, not kitsch */}
          <div
            className="pointer-events-none relative mx-auto mt-8 select-none text-center animate-fade-up [animation-delay:160ms]"
            aria-hidden
          >
            <span
              className="font-display text-[5.5rem] font-semibold leading-none tracking-tighter sm:text-[7.5rem]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(132,93,129,0.14) 0%, rgba(162,190,204,0.08) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              winter
            </span>
          </div>
        </section>

        {/* Offer ladder */}
        <section
          className="border-t border-white/50"
          style={{ background: "rgba(255,255,255,0.42)" }}
        >
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                The partner offer
              </h2>
              <p className="mt-2 text-sm text-bf-muted sm:text-base">
                Free core booking. Paid quiz and SMS when you want them. Convert
                to Solo / Salon / Pro later.
              </p>
            </div>
            <ol className="mx-auto mt-10 max-w-2xl space-y-8">
              {PARTNER_LADDER.map((item, i) => (
                <li
                  key={item.step}
                  className="flex gap-5 animate-fade-up"
                  style={{ animationDelay: `${180 + i * 80}ms` }}
                >
                  <span
                    className="font-display text-sm font-semibold tabular-nums"
                    style={{ color: "#845D81" }}
                  >
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

        {/* Toni partner signal */}
        <section className="mx-auto max-w-2xl px-5 py-12 text-center sm:px-8">
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: "#845D81" }}
          >
            Partner story
          </p>
          <p className="mt-3 font-display text-xl font-semibold tracking-tight text-balance sm:text-2xl">
            Toni · Oh My Social Media is live on BOOKFLO.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-bf-muted">
            This Christmas call brings more beauty founders into the same
            white-label booking stack — free core for six months, then a clear
            path onto paid plans.
          </p>
          <Link
            href="/book/oh-my-social-media"
            className="mt-5 inline-flex text-sm font-medium hover:underline"
            style={{ color: "#845D81" }}
          >
            See Toni&apos;s booking page →
          </Link>
        </section>

        {/* Interest form */}
        <section className="mx-auto max-w-lg px-5 pb-16 sm:px-8 sm:pb-20">
          <PartnerInterestForm />
          <p className="mt-8 text-center text-sm text-bf-muted">
            Already invited?{" "}
            <Link
              href="/login"
              className="font-medium hover:underline"
              style={{ color: "#845D81" }}
            >
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
          url: `${SITE_URL}${PARTNER_PATH}`,
          isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        }}
      />
    </div>
  );
}
