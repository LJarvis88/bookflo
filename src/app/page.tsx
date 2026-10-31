import type { Metadata } from "next";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import { HeroProductMockup } from "@/components/marketing/HeroProductMockup";
import { HomeScreenMockup } from "@/components/marketing/HomeScreenMockup";
import { ContourBookingPhone } from "@/components/marketing/ContourBookingPhone";
import { OmsBookingPhone } from "@/components/marketing/OmsBookingPhone";
import { Faq } from "@/components/marketing/Faq";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { Button } from "@/components/ui/Button";
import { PLANS, TRIAL_DAYS } from "@/data/pricing";
import { BOOKFLO_CONTACT_EMAIL } from "@/lib/contact";
import {
  OG_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import {
  ArrowRight,
  Sparkles,
  Palette,
  CalendarDays,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: BOOKFLO_CONTACT_EMAIL,
      description: SITE_DESCRIPTION,
      logo: `${SITE_URL}/marketing/bookflo-email-logo.png`,
      sameAs: [] as string[],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-GB",
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: String(plan.price),
        priceCurrency: "GBP",
        description: plan.blurb,
      })),
    },
  ],
};

const features = [
  {
    icon: CalendarDays,
    title: "Calendar-first admin",
    body: "Staff day columns, soft appointment blocks, and a mobile list that feels calm under pressure — not a cluttered inbox.",
  },
  {
    icon: Palette,
    title: "Brand that holds",
    body: "Logo, colour, type, cover, and voice — live-previewed before you publish. Your clients never see a marketplace skin.",
  },
  {
    icon: Sparkles,
    title: "Onboarding in minutes",
    body: "Guided setup from account to publish. Optional AI brand match seeds tokens from your site — always editable.",
  },
  {
    icon: Shield,
    title: "Zero commission",
    body: "Flat subscription with a 14-day free trial. No cut of your bookings. Stripe stays out of this prototype.",
  },
];

const testimonials = [
  {
    quote:
      "Our booking page finally looks like Contour — not like we bolted on someone else’s widget.",
    name: "Amelia Hart",
    role: "Lead aesthetician, Contour Preston",
  },
  {
    quote:
      "I went from Instagram DMs to a live link the same afternoon. Clients just… book.",
    name: "Jess Okonkwo",
    role: "Lash artist, Manchester",
  },
  {
    quote:
      "Fresha was fine until branding mattered. BOOKFLO is the first tool that treated our identity as the product.",
    name: "Tom Hale",
    role: "Salon owner, Leeds",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white text-bf-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Soft lavender atmosphere — Pantone 7443 C #E7D5FA (not cream; not Fresha L/R purple) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-20 left-1/2 h-[520px] w-[680px] -translate-x-1/2 rounded-full bg-[#E7D5FA]/70 blur-[110px]" />
        <div className="absolute top-[18%] right-[-12%] h-[380px] w-[420px] rounded-full bg-[#E7D5FA]/55 blur-[100px]" />
        <div className="absolute top-[48%] left-[-8%] h-[320px] w-[360px] rounded-full bg-[#E7D5FA]/40 blur-[90px]" />
      </div>

      <SiteHeader />

      {/* Hero — full-bleed width, brand first, wide product stage */}
      <section className="relative z-10 w-full pb-20 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <BookfloWordmark as="p" size="hero" />
            <h1 className="mt-5 text-balance font-display text-2xl font-medium leading-snug tracking-tight text-bf-ink sm:text-3xl md:text-4xl lg:text-[2.75rem]">
              The booking software for salons that care how they look.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-bf-muted sm:text-lg">
              White-label booking with a calendar-first admin. Zero commission.{" "}
              {TRIAL_DAYS}-day free trial on every plan.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="/signup" variant="dark" className="px-7 py-3">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/book/contour-preston" variant="secondary" className="px-6 py-3">
                See Contour Preston
              </Button>
            </div>
          </div>

          {/* Wide product mockup — uses nearly full content width */}
          <div className="relative mt-12 w-full animate-fade-up [animation-delay:120ms] sm:mt-16 md:mt-20">
            <HeroProductMockup />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-bf-line/70 bg-gradient-to-b from-[#f4f8fa] to-[#eef4f7]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 lg:px-10">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Simple, flexible booking software
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-bf-muted">
            Fresha-like admin for your team. Contour-level brand craft for your clients.
          </p>
          <div className="mx-auto mt-14 grid max-w-5xl gap-10 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="space-y-3">
                <f.icon className="h-5 w-5 text-bf-ink" strokeWidth={1.75} />
                <h3 className="font-display text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="text-sm leading-relaxed text-bf-muted md:text-base">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* White-label home screen — Luke’s PNG, Apple-quiet layout */}
      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-[980px] px-6 pb-8 pt-28 text-center sm:px-8 md:pt-36">
          <p className="text-[12px] font-medium tracking-[0.16em] text-bf-muted uppercase">
            White-label add-on
          </p>
          <h2 className="mt-5 font-display text-[2rem] font-semibold tracking-tight text-bf-ink sm:text-[2.5rem] md:text-[3rem]">
            Their booking app. On their home screen.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-bf-muted">
            Clients upload their own mark. No BOOKFLO on their install.
          </p>
        </div>
        <div className="mx-auto max-w-[980px] px-6 pb-28 sm:px-8 md:pb-36">
          <HomeScreenMockup />
        </div>
      </section>

      {/* Contour Preston — quiet luxury case study (copy left, phone right) */}
      <section className="relative z-10 border-t border-bf-line/70 bg-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-24 sm:px-8 lg:px-10">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-bf-muted">
              Case study · Contour Preston
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-[2.5rem] md:leading-tight">
              Contour’s brand. Contour’s bookings.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bf-muted sm:text-base">
              Quiet luxury, end to end — Deep Ink, Champagne Gold, and Kim K Cream. Contour’s booking
              page feels like the studio: unhurried type, precise spacing, and a cream canvas clients
              actually book on.
            </p>
            <div className="mt-8">
              <Button href="/book/contour-preston" variant="secondary" className="px-6">
                Open Contour booking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-center rounded-[1.75rem] border border-[#E8E4DC] bg-gradient-to-br from-[#F0EAE2] via-[#F7F4EF] to-[#E8EBF0] px-8 py-12 sm:px-12">
            <ContourBookingPhone />
          </div>
        </div>
      </section>

      {/* Oh My Social Media — premium white case study (phone left, copy right) */}
      <section className="relative z-10 border-t border-bf-line/70 bg-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 py-20 md:grid-cols-[0.95fr_1.05fr] md:py-24 sm:px-8 lg:px-10">
          <div className="order-2 flex justify-center rounded-[1.75rem] border border-[#F0E8EC] bg-gradient-to-br from-[#FFFFFF] via-[#FCF8FA] to-[#FFF6F0] px-8 py-12 sm:px-12 md:order-1">
            <OmsBookingPhone />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-bf-muted">
              Case study · Oh My Social Media
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-[2.5rem] md:leading-tight">
              Oh My’s brand. Oh My’s bookings.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-bf-muted sm:text-base">
              Premium white space with magenta and orange used as accents — never noise. Content
              shoots, Studio shoots, and Packages priced from £200 to £500 on a clean booking page
              that feels editorial, not marketplace.
            </p>
            <div className="mt-8">
              <Button href="/book/oh-my-social-media" variant="secondary" className="px-6">
                Open OMS booking
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI branding */}
      <section className="relative z-10 border-t border-bf-line/70 bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bf-muted">
              AI brand match
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Your website becomes your booking brand.
            </h2>
            <p className="mt-4 max-w-xl text-bf-muted leading-relaxed">
              Point BOOKFLO at your site and we suggest colours, type, and tone. In this prototype the
              match is mocked with Contour Preston and Oh My Social Media palettes — each labelled{" "}
              <span className="font-medium text-bf-ink">“AI brand match — demo”</span>. Every token
              stays fully overridable.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-bf-line bg-gradient-to-br from-[#f7f8fa] to-[#e8f0f4] p-6">
              <div className="flex items-center justify-between text-xs text-bf-muted">
                <span>From contourpreston.example</span>
                <span className="rounded-full bg-white px-2.5 py-1 font-medium text-bf-ink ring-1 ring-bf-line">
                  Demo only
                </span>
              </div>
              <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">
                {[
                  ["#0C111B", "Deep Ink"],
                  ["#192C42", "Midnight Navy"],
                  ["#C8A36C", "Champagne Gold"],
                  ["#F0EAE2", "Kim K Cream"],
                  ["#D5C4B2", "Cashmere"],
                ].map(([hex, name]) => (
                  <div key={hex} className="space-y-2">
                    <div
                      className="aspect-square rounded-xl border border-black/5"
                      style={{ background: hex }}
                    />
                    <p className="text-[10px] leading-tight text-bf-muted">
                      {name}
                      <br />
                      {hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-bf-line bg-gradient-to-br from-[#f7f8fa] to-[#e8f0f4] p-6">
              <div className="flex items-center justify-between text-xs text-bf-muted">
                <span>From ohmysocialmedia.example</span>
                <span className="rounded-full bg-white px-2.5 py-1 font-medium text-bf-ink ring-1 ring-bf-line">
                  Demo only
                </span>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  ["#EB0E7F", "Magenta"],
                  ["#FE5F0B", "Bright Orange"],
                  ["#FFFFFF", "White"],
                ].map(([hex, name]) => (
                  <div key={hex} className="space-y-2">
                    <div
                      className="aspect-square rounded-xl border border-black/5"
                      style={{ background: hex }}
                    />
                    <p className="text-[10px] leading-tight text-bf-muted">
                      {name}
                      <br />
                      {hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 border-t border-bf-line/70 bg-gradient-to-b from-[#f7f8fa] via-[#eef4f7] to-[#f7f8fa]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 md:py-24 lg:px-10">
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Software that grows with your business
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-bf-muted">
            Flat monthly pricing. Zero commission. {TRIAL_DAYS}-day free trial on every plan.
          </p>
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl bg-white p-6 ring-1 ${
                  plan.highlighted ? "ring-bf-ink shadow-soft" : "ring-bf-line"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                  <span className="rounded-full bg-bf-fog px-2.5 py-0.5 text-xs font-medium text-bf-muted">
                    {TRIAL_DAYS} day trial
                  </span>
                </div>
                <p className="mt-5 font-display text-4xl font-semibold tracking-tight">
                  £{plan.price}
                  <span className="ml-1 text-base font-sans font-normal text-bf-muted">
                    {plan.priceNote ? ` ${plan.priceNote}` : " per month"}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-bf-muted">{plan.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-bf-ink/80">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-2">
                      <span className="text-bf-muted">—</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/signup" variant="dark" className="mt-8 w-full">
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-10">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          What owners say
        </h2>
        <p className="mt-2 text-sm text-bf-muted">Placeholder testimonials for the prototype.</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="space-y-4">
              <p className="font-display text-xl leading-snug tracking-tight text-bf-ink">
                “{t.quote}”
              </p>
              <footer className="text-sm text-bf-muted">
                <span className="font-medium text-bf-ink">{t.name}</span>
                <br />
                {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-20">
        <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Questions
        </h2>
        <Faq />
      </section>

      {/* Final CTA */}
      <section className="relative z-10 overflow-hidden border-t border-bf-line/70 bg-gradient-to-b from-[#eef4f7] to-[#f5f6f8]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-[#E7D5FA]/50 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[10%] h-48 w-72 rounded-full bg-bf-sky/35 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Try BOOKFLO free for {TRIAL_DAYS} days
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-bf-muted">
            Publish a booking page that feels like you — and run the day from a calm calendar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup" variant="dark" className="px-7 py-3">
              Start free trial
            </Button>
            <Button href="/login" variant="secondary" className="px-6 py-3">
              Log in
            </Button>
          </div>
        </div>
      </section>

      <LegalFooter />
    </div>
  );
}
