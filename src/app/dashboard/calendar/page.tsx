"use client";

import Link from "next/link";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import { getService, getStaff } from "@/data/tenants";
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

const PASTELS: Record<string, { bg: string; text: string }> = {
  staff_amelia: { bg: "#F8E8E4", text: "#5C3D4A" },
  staff_noah: { bg: "#E4EEF8", text: "#2F4A66" },
  staff_priya: { bg: "#E6F3EA", text: "#2F5A3E" },
  oms_staff_tee: { bg: "#FCE4F0", text: "#8B0A4A" },
  oms_staff_jaz: { bg: "#FFE8D6", text: "#9A3A00" },
  oms_staff_mina: { bg: "#F8E0EA", text: "#6B2A48" },
};

export default function CalendarPage() {
  const tenant = useDemoTenant();

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Week</h1>
          <p className="mt-1 text-sm text-bf-muted">
            {tenant.name} ·{" "}
            <Link href="/dashboard" className="text-bf-ink underline-offset-2 hover:underline">
              open day view
            </Link>
          </p>
        </div>
      </header>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
        {DAYS.map((day) => {
          const appts = tenant.appointments
            .filter((a) => a.date === day.date)
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          const closed = day.date === "2026-11-02";
          return (
            <div
              key={day.date}
              className="min-h-[160px] rounded-2xl border border-bf-line bg-white p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-bf-muted">
                {day.label}
              </p>
              {closed ? (
                <p className="mt-4 text-xs text-bf-muted">Closed</p>
              ) : (
                <div className="mt-3 space-y-1.5">
                  {appts.length === 0 && <p className="text-xs text-bf-muted">Free</p>}
                  {appts.map((apt) => {
                    const service = getService(tenant, apt.serviceId);
                    const staff = getStaff(tenant, apt.staffId);
                    const pastel = PASTELS[apt.staffId] ?? { bg: "#F0F0F0", text: "#333" };
                    return (
                      <div
                        key={apt.id}
                        className="rounded-lg px-2 py-1.5 text-xs"
                        style={{ background: pastel.bg, color: pastel.text }}
                      >
                        <p className="font-semibold tabular-nums">{apt.startTime}</p>
                        <p className="truncate font-medium">{apt.clientName}</p>
                        <p className="truncate opacity-75">
                          {service?.name} · {staff?.name.split(" ")[0]}
                        </p>
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
        <h2 className="mb-3 font-display text-lg font-semibold">All appointments</h2>
        <div className="divide-y divide-bf-line border-y border-bf-line bg-white">
          {[...tenant.appointments]
            .sort((a, b) => `${a.date}${a.startTime}`.localeCompare(`${b.date}${b.startTime}`))
            .map((apt) => {
              const service = getService(tenant, apt.serviceId);
              return (
                <div key={apt.id} className="flex flex-wrap justify-between gap-2 px-1 py-3 text-sm">
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
