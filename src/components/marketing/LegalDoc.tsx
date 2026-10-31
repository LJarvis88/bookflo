import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { LegalFooter } from "@/components/marketing/LegalFooter";

export function LegalDoc({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bf-atmosphere text-bf-ink">
      <div className="bf-grain absolute inset-0" aria-hidden />
      <SiteHeader />
      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-bf-accent">
          Legal
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <aside className="mt-6 rounded-2xl border border-bf-accent/25 bg-bf-accent-soft/40 px-4 py-3 text-sm leading-relaxed text-bf-ink/90">
          Demo / template copy for the BOOKFLO prototype. This is not legal
          advice. Luke should have a solicitor review before relying on it for
          live customers.
        </aside>
        <div className="prose-legal mt-10 space-y-8 text-[15px] leading-relaxed text-bf-muted">
          {children}
        </div>
        <p className="mt-12 text-sm text-bf-muted">
          <Link href="/" className="font-medium text-bf-accent hover:underline">
            ← Back to BOOKFLO
          </Link>
        </p>
      </main>
      <LegalFooter />
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-semibold tracking-tight text-bf-ink">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
