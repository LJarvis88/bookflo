import type { Metadata } from "next";
import Link from "next/link";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { Founding30ApplyForm } from "@/components/marketing/Founding30ApplyForm";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import {
  FOUNDING30_APPLY_PATH,
  FOUNDING30_PATH,
} from "@/data/founding30";
import { OG_IMAGE_PATH, SITE_NAME } from "@/lib/site";

const title = "Apply · BookFlo Founding 30";
const description =
  "Multi-step Founding 30 application — interest only until January onboarding.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: FOUNDING30_APPLY_PATH },
  openGraph: {
    title: `${title} — ${SITE_NAME}`,
    description,
    url: FOUNDING30_APPLY_PATH,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630 }],
  },
};

export default function Founding30ApplyPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bf-atmosphere text-bf-ink">
      <div className="pointer-events-none absolute inset-0 bf-grain" aria-hidden />
      <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-6 sm:px-8">
        <Link href="/" className="inline-flex" aria-label="bookflo home">
          <BookfloWordmark size="lg" />
        </Link>
        <Link
          href={FOUNDING30_PATH}
          className="text-sm font-medium text-bf-muted hover:text-bf-ink"
        >
          Back to Founding 30
        </Link>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-5 pb-16 sm:px-8">
        <Founding30ApplyForm />
      </main>
      <LegalFooter />
    </div>
  );
}
