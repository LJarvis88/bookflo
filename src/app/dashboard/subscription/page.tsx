import { PLANS, TRIAL_DAYS } from "@/data/pricing";

export default function SubscriptionPage() {
  const current = "salon";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Plan</h1>
        <p className="mt-1 text-sm text-bf-muted">
          Contour Preston is on <strong className="text-bf-ink">Team · £39/mo</strong> (demo).
          Every plan includes a {TRIAL_DAYS}-day free trial.
        </p>
      </header>

      <div className="rounded-2xl border border-bf-line bg-white px-4 py-3 text-sm text-bf-muted">
        Plan changes are stubbed — no live billing. Stripe is out of scope for this prototype.
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const active = plan.id === current;
          return (
            <div
              key={plan.id}
              className={`rounded-2xl border p-6 ${
                active ? "border-bf-ink bg-white shadow-soft" : "border-bf-line bg-white"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-semibold">{plan.name}</h2>
                <span className="rounded-full bg-bf-fog px-2.5 py-0.5 text-xs font-medium text-bf-muted">
                  {TRIAL_DAYS} day trial
                </span>
                {active && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-bf-ink">
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
