import { PLANS } from "@/data/pricing";

export default function SubscriptionPage() {
  const current = "salon";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Subscription</h1>
        <p className="mt-1 text-sm text-bf-muted">
          Contour Preston is on <strong className="text-bf-ink">Salon · £39/mo</strong> (demo).
        </p>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Plan changes are stubbed — no live billing in Phase 2.
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const active = plan.id === current;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-6 ${
                active ? "border-bf-ink bg-white shadow-soft" : "border-bf-line bg-white/50"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-2xl font-semibold">{plan.name}</h2>
                {active && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-bf-accent">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-3 font-display text-3xl font-semibold">
                £{plan.price}
                <span className="text-base font-sans font-normal text-bf-muted">/mo</span>
              </p>
              <p className="mt-2 text-sm text-bf-muted">{plan.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm text-bf-ink/80">
                {plan.features.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
              <button
                type="button"
                disabled
                className="mt-6 w-full rounded-full border border-bf-line py-2.5 text-sm text-bf-muted opacity-70"
              >
                {active ? "Current plan" : "Switch (stub)"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
