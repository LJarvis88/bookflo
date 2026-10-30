"use client";

import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import { formatDateLabel } from "@/lib/format";

export default function CustomersPage() {
  const tenant = useDemoTenant();
  const customers = tenant.customers;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Customers</h1>
        <p className="mt-1 text-sm text-bf-muted">
          {customers.length} on file · {tenant.name} demo data
        </p>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-bf-line text-xs uppercase tracking-wider text-bf-muted">
              <th className="py-3 pr-4 font-medium">Name</th>
              <th className="py-3 pr-4 font-medium">Contact</th>
              <th className="py-3 pr-4 font-medium">Visits</th>
              <th className="py-3 font-medium">Last visit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bf-line/70">
            {customers.map((c) => (
              <tr key={c.id}>
                <td className="py-3.5 pr-4 font-medium">{c.name}</td>
                <td className="py-3.5 pr-4 text-bf-muted">
                  {c.email}
                  <br />
                  {c.phone}
                </td>
                <td className="py-3.5 pr-4">{c.visits}</td>
                <td className="py-3.5 text-bf-muted">{formatDateLabel(c.lastVisit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
