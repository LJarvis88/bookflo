import { contourPreston, getService, getStaff } from "@/data/contour-preston";
import { formatGBP } from "@/lib/format";

const DAYS = [
  { date: "2026-10-30", label: "Thu 30" },
  { date: "2026-10-31", label: "Fri 31" },
  { date: "2026-11-01", label: "Sat 1" },
  { date: "2026-11-02", label: "Sun 2" },
  { date: "2026-11-03", label: "Mon 3" },
  { date: "2026-11-04", label: "Tue 4" },
  { date: "2026-11-05", label: "Wed 5" },
];

export default function CalendarPage() {
  const tenant = contourPreston;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Calendar</h1>
        <p className="mt-1 text-sm text-bf-muted">Week view · Contour Preston demo</p>
      </header>

      <div className="grid gap-3 md:grid-cols-7">
        {DAYS.map((day) => {
          const appts = tenant.appointments
            .filter((a) => a.date === day.date)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          const closed = day.date === "2026-11-02";
          return (
            <div
              key={day.date}
              className="min-h-[180px] rounded-2xl border border-bf-line/80 bg-white/50 p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-bf-muted">
                {day.label}
              </p>
              {closed ? (
                <p className="mt-4 text-xs text-bf-muted">Closed</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {appts.length === 0 && (
                    <p className="text-xs text-bf-muted">No bookings</p>
                  )}
                  {appts.map((apt) => {
                    const service = getService(tenant, apt.serviceId);
                    const staff = getStaff(tenant, apt.staffId);
                    return (
                      <div
                        key={apt.id}
                        className="rounded-xl px-2.5 py-2 text-xs"
                        style={{ background: staff?.color ?? "#5C3D4A", color: "#fff" }}
                      >
                        <p className="font-medium">{apt.startTime}</p>
                        <p className="opacity-90">{apt.clientName}</p>
                        <p className="opacity-75">{service?.name}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">All listed appointments</h2>
        <div className="divide-y divide-bf-line/80 border-y border-bf-line/80">
          {[...tenant.appointments]
            .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
            .map((apt) => {
              const service = getService(tenant, apt.serviceId);
              return (
                <div key={apt.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                  <span>
                    {apt.date} · {apt.startTime} — {apt.clientName}
                  </span>
                  <span className="text-bf-muted">
                    {service?.name} · {formatGBP(apt.pricePence)}
                  </span>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
