import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import {
  BOOKFLO_CONTACT_EMAIL,
  BOOKFLO_MAILTO,
  BOOKFLO_WHATSAPP_DISPLAY,
  bookfloWaitlistWhatsAppUrl,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "BOOKFLO is demo-only right now — invite-only access. Join the waitlist via WhatsApp.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bf-atmosphere">
      <div className="flex-1 px-5 py-12">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="inline-flex items-center" aria-label="bookflo home">
            <BookfloWordmark size="lg" />
          </Link>
          <div className="mt-10 rounded-3xl border border-bf-line bg-white/80 p-8 shadow-soft backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bf-muted">
              Invite only
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Public signup is closed
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-bf-muted">
              BOOKFLO is running invite-only demos. New accounts are not created from this site —
              message us on WhatsApp to join the waitlist, and we&apos;ll open access when
              we&apos;re ready.
            </p>
            <div className="mt-8 space-y-3">
              <Button
                href={bookfloWaitlistWhatsAppUrl()}
                variant="dark"
                className="w-full py-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp waitlist · {BOOKFLO_WHATSAPP_DISPLAY}
              </Button>
              <a
                href={BOOKFLO_MAILTO}
                className="block text-center text-sm font-medium text-bf-accent hover:underline"
              >
                Or email {BOOKFLO_CONTACT_EMAIL}
              </a>
            </div>
            <p className="mt-8 text-center text-sm text-bf-muted">
              Already invited?{" "}
              <Link href="/login" className="font-medium text-bf-accent hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
}
