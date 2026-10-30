import Link from "next/link";
import { Sidebar } from "@/components/dashboard/Sidebar";

const mobileLinks = [
  ["/dashboard", "Today"],
  ["/dashboard/calendar", "Calendar"],
  ["/dashboard/customers", "Customers"],
  ["/dashboard/services", "Services"],
  ["/dashboard/staff", "Staff"],
  ["/dashboard/branding", "Branding"],
  ["/dashboard/payments", "Payments"],
  ["/dashboard/subscription", "Plan"],
  ["/dashboard/settings", "Settings"],
  ["/book/contour-preston", "Booking"],
] as const;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bf-atmosphere text-bf-ink">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <div className="hidden w-60 shrink-0 md:block lg:w-64">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-bf-line bg-white/80 px-4 py-3 backdrop-blur md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-lg font-semibold">BOOKFLO</p>
                <p className="text-xs text-bf-muted">Liv · Contour Preston</p>
              </div>
              <Link
                href="/login"
                className="shrink-0 rounded-full border border-bf-line bg-white px-3 py-2 text-xs font-medium text-bf-muted"
              >
                Demo login
              </Link>
            </div>
            <nav
              aria-label="Dashboard"
              className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {mobileLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="shrink-0 rounded-full border border-bf-line bg-white px-3 py-2 text-xs font-medium text-bf-muted active:bg-bf-fog"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <main className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
