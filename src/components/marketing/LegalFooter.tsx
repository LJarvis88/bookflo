import Link from "next/link";
import { MarketingChatWidget } from "@/components/marketing/MarketingChatWidget";

/**
 * Slim legal bar — structure mirrors competitor lander footers
 * (copyright left · policy links right), light BOOKFLO brand.
 * Also mounts the zero-cost FAQ chat widget on marketing surfaces.
 */
export function LegalFooter() {
  return (
    <>
      <footer className="relative z-10 border-t border-bf-line/80 bg-[#f7f8fa]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-5 py-4 text-[13px] leading-none text-bf-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 lg:px-10">
          <p className="font-sans tracking-tight">
            © 2026 BOOKFLO. All rights reserved.
          </p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans tracking-tight"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-bf-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-bf-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bf-accent"
            >
              Terms and conditions
            </Link>
          </nav>
        </div>
      </footer>
      <MarketingChatWidget />
    </>
  );
}
