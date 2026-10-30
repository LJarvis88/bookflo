import Link from "next/link";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { BookingPreview } from "@/components/marketing/BookingPreview";
import { Faq } from "@/components/marketing/Faq";
import { Button } from "@/components/ui/Button";
import { PLANS } from "@/data/pricing";
import { ArrowRight, Sparkles, Palette, CalendarDays, Shield } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Brand that holds",
    body: "Logo, colour, type, cover, and voice — live-previewed before you publish. Your clients never see a marketplace skin.",
  },
  {
    icon: CalendarDays,
    title: "Booking without friction",
    body: "Category → service → staff → time → confirm. Mobile-first, calm, and fast enough for Instagram bio links.",
  },
  {
    icon: Sparkles,
    title: "Onboarding in minutes",
    body: "Guided setup from account to publish. Optional AI brand match seeds tokens from your site — always editable.",
  },
  {
    icon: Shield,
    title: "Zero commission",
    body: "Flat subscription. No cut of your bookings. Stripe Connect stubs are labelled test mode until Phase 3.",
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
    <div className="relative min-h-screen overflow-x-hidden bg-bf-atmosphere text-bf-ink">
      <div className="bf-grain absolute inset-0 z-0" aria-hidden />
      <SiteHeader />

      {/* Hero — brand first, full-bleed atmosphere, one composition */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-8 md:grid-cols-2 md:gap-10 md:px-8 md:pb-28 md:pt-12">
        <div className="animate-fade-up">
          <p className="font-display text-5xl font-semibold tracking-tight text-bf-ink sm:text-6xl md:text-7xl">
            BOOKFLO
          </p>
          <h1 className="mt-5 max-w-md text-balance font-display text-2xl font-medium leading-snug tracking-tight text-bf-ink/90 sm:text-3xl">
            Your brand. Your bookings. Beautifully connected.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-bf-muted sm:text-lg">
            Zero-commission white-label booking for salons and independents who refuse to look generic.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/signup" variant="dark" className="px-6 py-3">
              Start free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/book/contour-preston" variant="secondary" className="px-6 py-3">
              See Contour Preston
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-up [animation-delay:120ms]">
          <div
            className="absolute -inset-8 -z-10 rounded-full bg-bf-accent/10 blur-3xl animate-soft-pulse"
            aria-hidden
          />
          <BookingPreview />
        </div>
      </section>

      {/* AI branding explanation */}
      <section className="relative z-10 border-y border-bf-line/70 bg-white/40 backdrop-blur-sm">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bf-accent">
              AI brand match
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Your website becomes your booking brand — in one pass.
            </h2>
            <p className="mt-4 max-w-xl text-bf-muted leading-relaxed">
              Point BOOKFLO at your site and we suggest colours, type, and tone. In this prototype the
              match is mocked with Contour Preston’s palette and clearly labelled{" "}
              <span className="font-medium text-bf-ink">“AI brand match — demo”</span>. Every
              token stays fully overridable before you publish.
            </p>
          </div>
          <div className="rounded-3xl border border-bf-line bg-bf-mist/80 p-6 shadow-soft">
            <div className="flex items-center justify-between text-xs text-bf-muted">
              <span>From contourpreston.example</span>
              <span className="rounded-full bg-bf-accent-soft px-2.5 py-1 font-medium text-bf-accent">
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
            <p className="mt-5 text-sm text-bf-muted">
              Suggested type: Cormorant Garamond + Outfit · Cover: ink → navy
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Built to win on craft — not marketplace noise.
        </h2>
        <p className="mt-3 max-w-2xl text-bf-muted">
          Fresha and Booksy own discovery. BOOKFLO owns how your brand shows up when someone is ready to book.
        </p>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="space-y-3">
              <f.icon className="h-5 w-5 text-bf-accent" strokeWidth={1.75} />
              <h3 className="font-display text-xl font-semibold tracking-tight">{f.title}</h3>
              <p className="text-sm leading-relaxed text-bf-muted md:text-base">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 bg-bf-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Simple pricing. Zero commission.
          </h2>
          <p className="mt-3 max-w-xl text-white/65">
            Pick a plan. Keep 100% of what you earn from clients.
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col rounded-3xl p-6 ${
                  plan.highlighted
                    ? "bg-white text-bf-ink shadow-lift"
                    : "bg-white/5 ring-1 ring-white/10"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                  {plan.highlighted && (
                    <span className="text-xs font-medium uppercase tracking-wider text-bf-accent">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-4 font-display text-4xl font-semibold tracking-tight">
                  £{plan.price}
                  <span
                    className={`ml-1 text-base font-sans font-normal ${
                      plan.highlighted ? "text-bf-muted" : "text-white/55"
                    }`}
                  >
                    /mo
                  </span>
                </p>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    plan.highlighted ? "text-bf-muted" : "text-white/60"
                  }`}
                >
                  {plan.blurb}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex gap-2">
                      <span className={plan.highlighted ? "text-bf-accent" : "text-bf-brass"}>
                        —
                      </span>
                      <span className={plan.highlighted ? "text-bf-ink/80" : "text-white/80"}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  href="/signup"
                  variant={plan.highlighted ? "dark" : "secondary"}
                  className={`mt-8 w-full ${
                    !plan.highlighted ? "border-white/20 bg-transparent text-white hover:bg-white/10" : ""
                  }`}
                >
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-20 md:px-8">
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
      <section id="faq" className="relative z-10 mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Questions
        </h2>
        <Faq />
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-24 md:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-bf-mesh bg-white/70 px-8 py-14 text-center shadow-soft ring-1 ring-bf-line md:px-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">
            Publish a booking page that feels like you.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-bf-muted">
            Scaffolded for multi-tenant SaaS. This Phase 2 build uses fictional in-memory data —
            no live payments or scraping.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/signup" variant="dark" className="px-6 py-3">
              Create account
            </Button>
            <Button href="/login" variant="secondary" className="px-6 py-3">
              Log in
            </Button>
            <Button href="/dashboard" variant="ghost" className="px-6 py-3">
              Open demo dashboard
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-bf-line/80 bg-white/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-bf-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-display text-lg font-semibold text-bf-ink">BOOKFLO</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/onboarding" className="hover:text-bf-ink">
              Onboarding
            </Link>
            <Link href="/dashboard" className="hover:text-bf-ink">
              Dashboard
            </Link>
            <Link href="/book/contour-preston" className="hover:text-bf-ink">
              Booking demo
            </Link>
          </div>
          <p>Phase 2 visual prototype · Temporary name</p>
        </div>
      </footer>
    </div>
  );
}
