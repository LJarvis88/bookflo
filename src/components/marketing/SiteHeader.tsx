"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 border-b border-bf-line/50 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-bf-ink">
          bookflo
        </Link>
        <nav className="hidden items-center gap-10 text-sm text-bf-muted md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-bf-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/login" variant="ghost" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button href="/signup" variant="dark" className="px-4">
            Sign up
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-bf-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-bf-line bg-white px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 text-bf-muted"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link href="/book/contour-preston" className="py-1 text-bf-muted">
              Demo booking
            </Link>
            <Link href="/login" className="py-1 text-bf-muted">
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
