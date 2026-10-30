import Link from "next/link";
import { contourPreston, getService, getStaff } from "@/data/contour-preston";
import { DEMO_TODAY, formatGBP, formatTimeRange } from "@/lib/format";

export default function DashboardTodayPage() {
  const tenant = contourPreston;
  const today = tenant.appointments
    .filter((a) => a.date === DEMO_TODAY)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
  const upcoming = tenant.appointments
    .filter((a) => a.date > DEMO_TODAY)
    .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
    .slice(0, 5);

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bf-muted">
            Thursday 30 Oct 2026
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Today at Contour
          </h1>
        </div>
        <Link
          href="/book/contour-preston"
          className="rounded-full border border-bf-line bg-white px-4 py-2 text-sm text-bf-ink hover:border-bf-ink/20"
        >
          Share booking link
        </Link>
      </header>

      <section>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Appointments · {today.length}
          </h2>
          <p className="text-sm text-bf-muted">Demo data · in memory</p>
        </div>
        <div className="divide-y divide-bf-line/80 border-y border-bf-line/80">
          {today.map((apt) => {
            const service = getService(tenant, apt.serviceId);
            const staff = getStaff(tenant, apt.staffId);
            return (
              <div
                key={apt.id}
                className="grid gap-2 py-4 sm:grid-cols-[100px_1fr_auto] sm:items-center"
              >
                <p className="text-sm font-medium tabular-nums">
                  {formatTimeRange(apt.startTime, apt.endTime)}
                </p>
                <div>
                  <p className="font-medium">{apt.clientName}</p>
                  <p className="text-sm text-bf-muted">
                    {service?.name} · {staff?.name}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-bf-muted">{formatGBP(apt.pricePence)}</span>
                  <StatusPill status={apt.status} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-xl font-semibold tracking-tight">Upcoming</h2>
        <div className="space-y-3">
          {upcoming.map((apt) => {
            const service = getService(tenant, apt.serviceId);
            return (
              <div
                key={apt.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-bf-line/80 bg-white/60 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{apt.clientName}</p>
                  <p className="text-sm text-bf-muted">
                    {apt.date} · {apt.startTime} · {service?.name}
                  </p>
                </div>
                <StatusPill status={apt.status} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    confirmed: "bg-bf-accent-soft text-bf-accent",
    pending: "bg-amber-50 text-amber-800",
    completed: "bg-bf-fog text-bf-muted",
    cancelled: "bg-red-50 text-red-700",
    no_show: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${styles[status] ?? styles.pending}`}
    >
      {status.replace("_", " ")}
    </span>
  );
}
