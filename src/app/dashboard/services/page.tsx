"use client";

import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import { formatDuration, formatGBP } from "@/lib/format";

export default function ServicesPage() {
  const tenant = useDemoTenant();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-bf-muted">
            {tenant.name} · prices in GBP · edit UI stubbed
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-bf-ink px-4 py-2 text-sm text-white opacity-60"
          disabled
        >
          Add service (soon)
        </button>
      </header>

      {tenant.categories.map((cat) => {
        const services = tenant.services.filter((s) => s.categoryId === cat.id);
        return (
          <section key={cat.id}>
            <h2 className="mb-3 font-display text-lg font-semibold tracking-tight">{cat.name}</h2>
            <div className="divide-y divide-bf-line/80 border-y border-bf-line/80">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="grid gap-1 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-6"
                >
                  <div>
                    <p className="font-medium">{svc.name}</p>
                    <p className="text-sm text-bf-muted">{svc.description}</p>
                  </div>
                  <p className="text-sm text-bf-muted">{formatDuration(svc.durationMinutes)}</p>
                  <p className="font-medium tabular-nums">{formatGBP(svc.pricePence)}</p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
