"use client";

import { PLANS, TRIAL_DAYS } from "@/data/pricing";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import {
  getSaasBillingExemption,
  isFreeForLifeTenant,
} from "@/lib/saas-billing";

export default function SubscriptionPage() {
  const tenant = useDemoTenant();
  const current = "salon";
  const currentPlan = PLANS.find((plan) => plan.id === current);
  const exemption = getSaasBillingExemption(tenant.slug);
  const freeForLife = isFreeForLifeTenant(tenant.slug);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Plan</h1>
        <p className="mt-1 text-sm text-bf-muted">
          {tenant.name} is on{" "}
          <strong className="text-bf-ink">
            {currentPlan?.name ?? "Team"}
            {freeForLife
              ? " · complimentary for life"
              : ` · £${currentPlan?.price ?? 39}/mo`}
          </strong>
          {exemption?.reason === "ambassador_12mo"
            ? " (ambassador)."
            : freeForLife
              ? "."
              : ` (demo). Every plan includes a ${TRIAL_DAYS}-day free trial.`}
        </p>
      </header>

      {exemption ? (
        <div className="rounded-2xl border border-bf-line bg-white px-4 py-3 text-sm text-bf-ink">
          <p className="font-medium">{exemption.label}</p>
          <p className="mt-1 text-bf-muted leading-relaxed">{exemption.detail}</p>
          {freeForLife && (
            <p className="mt-2 text-bf-muted leading-relaxed">
              Stripe Billing will never charge this tenant. Client booking payments use Stripe
              Connect separately (Admin → Payments).
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-bf-line bg-white px-4 py-3 text-sm text-bf-muted">
          Plan changes are stubbed — no live Stripe Billing yet.
        </div>
      )}

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
                {freeForLife && active ? (
                  <span className="rounded-full bg-bf-fog px-2.5 py-0.5 text-xs font-medium text-bf-muted">
                    Free for life
                  </span>
                ) : (
                  <span className="rounded-full bg-bf-fog px-2.5 py-0.5 text-xs font-medium text-bf-muted">
                    {TRIAL_DAYS} day trial
                  </span>
                )}
                {active && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-bf-ink">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-3 font-display text-3xl font-semibold">
                {freeForLife && active ? (
                  <>
                    £0
                    <span className="text-base font-sans font-normal text-bf-muted">
                      {" "}
                      forever
                    </span>
                  </>
                ) : (
                  <>
                    £{plan.price}
                    <span className="text-base font-sans font-normal text-bf-muted">/mo</span>
                  </>
                )}
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
                {active
                  ? freeForLife
                    ? "Complimentary — no billing"
                    : "Current plan"
                  : "Switch (stub)"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
