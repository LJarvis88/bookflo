import { Sidebar } from "@/components/dashboard/Sidebar";

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
          <div className="border-b border-bf-line bg-white/60 px-4 py-3 md:hidden">
            <p className="font-display text-lg font-semibold">BOOKFLO</p>
            <p className="text-xs text-bf-muted">Contour Preston · demo</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-xs">
              {[
                ["/dashboard", "Today"],
                ["/dashboard/calendar", "Calendar"],
                ["/dashboard/branding", "Branding"],
                ["/dashboard/services", "Services"],
                ["/dashboard/payments", "Payments"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="shrink-0 rounded-full border border-bf-line bg-white px-3 py-1.5 text-bf-muted"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
