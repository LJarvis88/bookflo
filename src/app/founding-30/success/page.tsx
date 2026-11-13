import type { Metadata } from "next";
import Link from "next/link";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { Button } from "@/components/ui/Button";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import {
  FOUNDING30_PATH,
  FOUNDING30_SUCCESS_PATH,
} from "@/data/founding30";
import { BOOKFLO_CONTACT_EMAIL } from "@/lib/contact";
import { OG_IMAGE_PATH, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Application received · Founding 30",
  description: "Your BookFlo Founding 30 application is in. Activation opens with January onboarding.",
  alternates: { canonical: FOUNDING30_SUCCESS_PATH },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Application received — ${SITE_NAME}`,
    url: FOUNDING30_SUCCESS_PATH,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
};

export default function Founding30SuccessPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bf-atmosphere text-bf-ink">
      <div className="pointer-events-none absolute inset-0 bf-grain" aria-hidden />
      <header className="relative z-10 mx-auto flex w-full max-w-lg items-center px-5 py-6 sm:px-8">
        <Link href="/" className="inline-flex" aria-label="bookflo home">
          <BookfloWordmark size="lg" />
        </Link>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-lg flex-1 px-5 pb-16 sm:px-8">
        <div className="rounded-3xl border border-bf-line bg-white/90 p-8 shadow-soft text-center animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bf-accent">
            Founding 30
          </p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Application received
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-bf-muted">
            Thanks — we&apos;ve saved your details. WhatsApp may have opened so
            you can ping the team. No admin account is created yet; we&apos;ll
            shortlist and share access codes when January onboarding opens.
          </p>
          <p className="mt-3 text-sm text-bf-muted">
            Questions? {BOOKFLO_CONTACT_EMAIL}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Button href={FOUNDING30_PATH} variant="dark" className="w-full py-3">
              Back to Founding 30
            </Button>
            <Button href="/" variant="secondary" className="w-full py-3">
              Home
            </Button>
          </div>
        </div>
      </main>
      <LegalFooter />
    </div>
  );
}
