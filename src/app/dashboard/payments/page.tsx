export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Payments</h1>
        <p className="mt-1 text-sm text-bf-muted">
          Test-mode stubs only — never pretend live money movement.
        </p>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>Test mode</strong> — Stripe Billing and Connect are not connected. Phase 3+ wiring.
      </div>

      <section className="space-y-4 rounded-3xl border border-bf-line bg-white/70 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">Billing</h2>
          <span className="rounded-full bg-bf-fog px-2.5 py-1 text-xs font-medium text-bf-muted">
            Test mode
          </span>
        </div>
        <p className="text-sm text-bf-muted leading-relaxed">
          SaaS subscription invoices will appear here. For now Contour Preston is on the Salon plan
          (£39/mo) as fictional entitlement only.
        </p>
        <button
          type="button"
          disabled
          className="rounded-full border border-bf-line px-4 py-2 text-sm text-bf-muted opacity-70"
        >
          Open Stripe Billing portal (stub)
        </button>
      </section>

      <section className="space-y-4 rounded-3xl border border-bf-line bg-white/70 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">Stripe Connect</h2>
          <span className="rounded-full bg-bf-fog px-2.5 py-1 text-xs font-medium text-bf-muted">
            Test mode
          </span>
        </div>
        <p className="text-sm text-bf-muted leading-relaxed">
          Client deposits and payouts will use Connect. This prototype defaults to pay-at-venue with
          no card capture.
        </p>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-bf-muted">Account status</dt>
            <dd className="font-medium">Not connected</dd>
          </div>
          <div>
            <dt className="text-bf-muted">Charges enabled</dt>
            <dd className="font-medium">No</dd>
          </div>
        </dl>
        <button
          type="button"
          disabled
          className="rounded-full border border-bf-line px-4 py-2 text-sm text-bf-muted opacity-70"
        >
          Connect Stripe account (stub)
        </button>
      </section>
    </div>
  );
}
