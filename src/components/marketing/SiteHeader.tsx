import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 md:px-8">
      <Link href="/" className="group flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold tracking-tight text-bf-ink">
          BOOKFLO
        </span>
        <span className="hidden text-xs text-bf-muted sm:inline">booking</span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-bf-muted md:flex">
        <a href="#features" className="hover:text-bf-ink transition">
          Features
        </a>
        <a href="#pricing" className="hover:text-bf-ink transition">
          Pricing
        </a>
        <a href="#faq" className="hover:text-bf-ink transition">
          FAQ
        </a>
        <Link href="/book/contour-preston" className="hover:text-bf-ink transition">
          Demo booking
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Button href="/login" variant="ghost" className="hidden sm:inline-flex">
          Log in
        </Button>
        <Button href="/signup" variant="dark">
          Start free
        </Button>
      </div>
    </header>
  );
}
