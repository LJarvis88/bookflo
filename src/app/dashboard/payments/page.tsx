"use client";

import { useCallback, useEffect, useState } from "react";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import {
  getSaasBillingExemption,
  isFreeForLifeTenant,
} from "@/lib/saas-billing";
import { clientStripeApiUrl } from "@/lib/stripe/api-base";
import { connectsPaymentsEnabled } from "@/lib/stripe/config";

interface ConnectStatus {
  connected: boolean;
  accountId: string | null;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  mode?: string;
  error?: string;
}

export default function PaymentsPage() {
  const tenant = useDemoTenant();
  const saasExemption = getSaasBillingExemption(tenant.slug);
  const freeForLife = isFreeForLifeTenant(tenant.slug);
  const connectEnabled = connectsPaymentsEnabled(tenant.slug);

  const [status, setStatus] = useState<ConnectStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(connectEnabled);
  const [onboardBusy, setOnboardBusy] = useState(false);
  const [onboardError, setOnboardError] = useState<string | null>(null);

  const refreshStatus = useCallback(async () => {
    if (!connectEnabled) return;
    setStatusLoading(true);
    try {
      const res = await fetch(
        clientStripeApiUrl(
          `/api/stripe/connect/status?tenantSlug=${encodeURIComponent(tenant.slug)}`,
        ),
      );
      const data = (await res.json()) as ConnectStatus;
      if (!res.ok) {
        setStatus({
          connected: false,
          accountId: null,
          chargesEnabled: false,
          payoutsEnabled: false,
          detailsSubmitted: false,
          error: data.error ?? "Could not load Connect status",
        });
      } else {
        setStatus(data);
      }
    } catch {
      setStatus({
        connected: false,
        accountId: null,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        error: "Network error loading Connect status",
      });
    } finally {
      setStatusLoading(false);
    }
  }, [connectEnabled, tenant.slug]);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  async function startOnboarding() {
    setOnboardBusy(true);
    setOnboardError(null);
    try {
      const res = await fetch(clientStripeApiUrl("/api/stripe/connect/onboard"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tenantSlug: tenant.slug }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setOnboardError(data.error ?? "Could not create onboarding link");
        setOnboardBusy(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setOnboardError("Network error starting Connect onboarding");
      setOnboardBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Payments</h1>
        <p className="mt-1 text-sm text-bf-muted">
          Stripe Connect on Luke’s BOOKFLO platform account — client payments go to{" "}
          {tenant.name}.
        </p>
      </header>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong>{status?.mode === "live" ? "Live mode" : "Test mode"}</strong>
        {status?.mode === "live"
          ? " — real card charges. "
          : " — use test cards until Luke flips STRIPE_MODE=live. "}
        Client booking payments use Stripe Connect (destination charges) so funds go to the
        connected business, not BOOKFLO SaaS billing.
      </div>

      <section className="space-y-4 rounded-3xl border border-bf-line bg-white/70 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">BOOKFLO SaaS billing</h2>
          <span className="rounded-full bg-bf-fog px-2.5 py-1 text-xs font-medium text-bf-muted">
            Test mode
          </span>
        </div>
        {saasExemption ? (
          <div className="space-y-2 text-sm leading-relaxed">
            <p>
              <span className="font-medium text-bf-ink">{saasExemption.label}</span>
              {" — "}
              {saasExemption.detail}
            </p>
            {freeForLife && (
              <p className="rounded-2xl border border-bf-line bg-bf-fog/60 px-3 py-2 text-bf-muted">
                No Stripe Billing subscription will be created for {tenant.name}. Client shoot
                payments still use Connect below.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-bf-muted leading-relaxed">
            SaaS subscription invoices will appear here. {tenant.name} is on the Salon plan
            (£39/mo) as fictional entitlement only.
          </p>
        )}
        <button
          type="button"
          disabled
          className="rounded-full border border-bf-line px-4 py-2 text-sm text-bf-muted opacity-70"
        >
          {freeForLife
            ? "Stripe Billing portal — not applicable (free for life)"
            : "Open Stripe Billing portal (stub)"}
        </button>
      </section>

      <section className="space-y-4 rounded-3xl border border-bf-line bg-white/70 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">Stripe Connect</h2>
          <span className="rounded-full bg-bf-fog px-2.5 py-1 text-xs font-medium text-bf-muted">
            {status?.mode === "live" ? "Live mode" : "Test mode"}
          </span>
        </div>

        {connectEnabled ? (
          <>
            <p className="text-sm text-bf-muted leading-relaxed">
              Connect an Express account so client payments (pay in full or 50% deposit) from{" "}
              <code className="text-bf-ink">/book/{tenant.slug}</code> transfer to{" "}
              {tenant.name}. Platform account is BOOKFLO (Luke) — never Tee’s personal Stripe for
              SaaS.
            </p>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-bf-muted">Account status</dt>
                <dd className="font-medium">
                  {statusLoading
                    ? "Checking…"
                    : status?.connected
                      ? status.detailsSubmitted
                        ? "Connected"
                        : "Onboarding started"
                      : "Not connected"}
                </dd>
              </div>
              <div>
                <dt className="text-bf-muted">Charges enabled</dt>
                <dd className="font-medium">
                  {statusLoading ? "…" : status?.chargesEnabled ? "Yes" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-bf-muted">Payouts enabled</dt>
                <dd className="font-medium">
                  {statusLoading ? "…" : status?.payoutsEnabled ? "Yes" : "No"}
                </dd>
              </div>
              <div>
                <dt className="text-bf-muted">Connect account</dt>
                <dd className="font-medium font-mono text-xs break-all">
                  {status?.accountId ?? "—"}
                </dd>
              </div>
            </dl>
            {(status?.error || onboardError) && (
              <p className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
                {onboardError ?? status?.error}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void startOnboarding()}
                disabled={onboardBusy}
                className="rounded-full bg-bf-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {onboardBusy
                  ? "Opening Stripe…"
                  : status?.connected
                    ? "Continue Connect onboarding"
                    : "Connect Stripe account"}
              </button>
              <button
                type="button"
                onClick={() => void refreshStatus()}
                disabled={statusLoading}
                className="rounded-full border border-bf-line px-4 py-2 text-sm text-bf-ink disabled:opacity-60"
              >
                Refresh status
              </button>
            </div>
            <p className="text-xs text-bf-muted leading-relaxed">
              Tee: click Connect, complete Stripe Express onboarding with Oh My Social Media
              details, then return here. Clients can then pay deposits/full amounts on the public
              booking page.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-bf-muted leading-relaxed">
              Client deposits via Connect are enabled for Oh My Social Media first. This tenant
              still defaults to pay-at-venue.
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
              Connect Stripe account (not enabled for this tenant)
            </button>
          </>
        )}
      </section>
    </div>
  );
}
