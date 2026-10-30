"use client";

import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import { weekdayLabel } from "@/lib/format";

export default function StaffPage() {
  const tenant = useDemoTenant();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Team</h1>
        <p className="mt-1 text-sm text-bf-muted">{tenant.name} · demo roster</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {tenant.staff.map((member) => (
          <div key={member.id} className="rounded-2xl border border-bf-line bg-white p-5">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ background: member.color }}
            >
              {member.initials}
            </div>
            <p className="mt-4 font-display text-xl font-semibold tracking-tight">{member.name}</p>
            <p className="text-sm text-bf-muted">{member.role}</p>
            <p className="mt-3 text-xs uppercase tracking-wider text-bf-muted">Active</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Studio hours</h2>
        <div className="max-w-md divide-y divide-bf-line/80 border-y border-bf-line/80 text-sm">
          {tenant.hours.map((h) => (
            <div key={h.weekday} className="flex justify-between py-2.5">
              <span className="font-medium">{weekdayLabel(h.weekday)}</span>
              <span className="text-bf-muted">
                {h.open ? `${h.open}–${h.close}` : "Closed"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
