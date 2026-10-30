"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Scissors,
  UserRound,
  Palette,
  CreditCard,
  Settings,
  BadgePoundSterling,
  ExternalLink,
} from "lucide-react";
import { CONTOUR_PRESTON_BRAND } from "@/data/contour-preston";
import { TenantLogo } from "@/components/branding/TenantLogo";

const links = [
  { href: "/dashboard", label: "Today", icon: LayoutDashboard },
  { href: "/dashboard/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/services", label: "Services", icon: Scissors },
  { href: "/dashboard/staff", label: "Staff", icon: UserRound },
  { href: "/dashboard/branding", label: "Branding", icon: Palette },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/subscription", label: "Subscription", icon: BadgePoundSterling },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col border-r border-bf-line bg-white/70 backdrop-blur">
      <div className="border-b border-bf-line px-5 py-5">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-bf-ink">
          BOOKFLO
        </Link>
        <div
          className="mt-4 rounded-xl px-3 py-3"
          style={{ background: CONTOUR_PRESTON_BRAND.background }}
        >
          <TenantLogo brand={CONTOUR_PRESTON_BRAND} size="sm" />
        </div>
        <p className="mt-2 text-xs text-bf-muted">Contour Preston · demo tenant</p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {links.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-bf-ink text-white"
                  : "text-bf-muted hover:bg-bf-fog/70 hover:text-bf-ink"
              }`}
            >
              <link.icon className="h-4 w-4" strokeWidth={1.75} />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-bf-line p-4">
        <Link
          href="/book/contour-preston"
          className="flex items-center gap-2 text-sm text-bf-accent hover:underline"
        >
          View booking page
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
