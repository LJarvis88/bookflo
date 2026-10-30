"use client";

import Link from "next/link";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  DemoTenantProvider,
  useDemoTenant,
} from "@/components/dashboard/DemoTenantProvider";

const mobileLinks = [
  ["/dashboard", "Appointments"],
  ["/dashboard/calendar", "Week"],
  ["/dashboard/customers", "Customers"],
  ["/dashboard/services", "Services"],
  ["/dashboard/staff", "Team"],
  ["/dashboard/branding", "Branding"],
  ["/dashboard/payments", "Payments"],
  ["/dashboard/subscription", "Plan"],
  ["/dashboard/settings", "Settings"],
] as const;

function DashboardShell({ children }: { children: React.ReactNode }) {
  const tenant = useDemoTenant();

  // OMS admin may use a soft cream wash for hierarchy; Contour stays cool grey.
  // OMS public booking stays pure white via brand tokens — not this shell.
  const shellBg =
    tenant.slug === "oh-my-social-media" ? "#FAF7F2" : "#f7f8fa";

  return (
    <div className="min-h-screen text-bf-ink" style={{ background: shellBg }}>
      <div className="mx-auto flex min-h-screen max-w-[1480px]">
        <div className="hidden w-56 shrink-0 md:block lg:w-60">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-bf-line bg-white px-4 py-3 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold">BOOKFLO</p>
                <p className="text-xs text-bf-muted">{tenant.name}</p>
              </div>
              <Link
                href="/login"
                className="shrink-0 rounded-full bg-bf-ink px-3.5 py-2 text-xs font-medium text-white"
              >
                Log in
              </Link>
            </div>
            <nav
              aria-label="Dashboard"
              className="-mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {mobileLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 rounded-full border border-bf-line bg-white px-3 py-1.5 text-xs font-medium text-bf-muted"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <main className="flex-1 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoTenantProvider>
      <DashboardShell>{children}</DashboardShell>
    </DemoTenantProvider>
  );
}
