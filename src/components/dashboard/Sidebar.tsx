"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  CalendarRange,
  Users,
  Scissors,
  UserRound,
  Palette,
  CreditCard,
  Settings,
  BadgePoundSterling,
  ExternalLink,
} from "lucide-react";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";

const primaryLinks = [
  { href: "/dashboard", label: "Appointments", icon: CalendarDays },
  { href: "/dashboard/calendar", label: "Week", icon: CalendarRange },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/services", label: "Services", icon: Scissors },
  { href: "/dashboard/staff", label: "Team", icon: UserRound },
];

const secondaryLinks = [
  { href: "/dashboard/branding", label: "Branding", icon: Palette },
  { href: "/dashboard/payments", label: "Payments", icon: CreditCard },
  { href: "/dashboard/subscription", label: "Plan", icon: BadgePoundSterling },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof CalendarDays;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
        active
          ? "bg-bf-ink font-medium text-white"
          : "text-bf-muted hover:bg-bf-fog/80 hover:text-bf-ink"
      }`}
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
      {label}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const tenant = useDemoTenant();

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <aside className="flex h-full w-full flex-col border-r border-bf-line bg-white">
      <div className="border-b border-bf-line px-5 py-5">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-bf-ink">
          BOOKFLO
        </Link>
        <p className="mt-1 text-xs text-bf-muted">{tenant.name}</p>
      </div>
      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        <div className="space-y-0.5">
          {primaryLinks.map((link) => (
            <NavLink key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </div>
        <div className="space-y-0.5 border-t border-bf-line pt-3">
          {secondaryLinks.map((link) => (
            <NavLink key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </div>
      </nav>
      <div className="border-t border-bf-line p-4">
        <Link
          href={`/book/${tenant.slug}`}
          className="flex items-center gap-2 text-sm text-bf-muted hover:text-bf-ink"
        >
          View booking page
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
