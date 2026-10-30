"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  DEMO_ACCOUNTS,
  DEMO_OWNER,
  type DemoAccount,
  findDemoAccount,
} from "@/lib/demo-auth";
import { writeDemoTenantSlug } from "@/lib/demo-session";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(DEMO_OWNER.email);
  const [password, setPassword] = useState<string>(DEMO_OWNER.password);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function fillAccount(account: DemoAccount) {
    setEmail(account.email);
    setPassword(account.password);
    setError(null);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const account = findDemoAccount(email, password);
    if (!account) {
      setError("Use one of the demo accounts shown above.");
      setSubmitting(false);
      return;
    }

    writeDemoTenantSlug(account.tenantSlug);
    router.push("/dashboard");
  }

  return (
    <>
      <div className="mt-5 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bf-muted">
          Demo accounts
        </p>
        {DEMO_ACCOUNTS.map((account) => (
          <button
            key={account.email}
            type="button"
            onClick={() => fillAccount(account)}
            className="w-full rounded-2xl border border-dashed border-bf-line bg-bf-sky/15 px-4 py-3.5 text-left transition hover:border-bf-accent/30 hover:bg-bf-accent-soft/40"
          >
            <p className="text-sm text-bf-ink">
              <span className="font-medium">{account.name}</span>
              <span className="text-bf-muted"> · {account.role}</span>
            </p>
            <dl className="mt-2 space-y-1 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                <dt className="shrink-0 text-bf-muted">Email</dt>
                <dd className="break-all font-medium text-bf-ink">{account.email}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                <dt className="shrink-0 text-bf-muted">Password</dt>
                <dd className="font-medium text-bf-ink">{account.password}</dd>
              </div>
            </dl>
          </button>
        ))}
      </div>

      <form className="mt-6 space-y-4 sm:mt-8" onSubmit={onSubmit}>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium text-bf-ink">Email</span>
          <input
            type="email"
            name="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-bf-line bg-white px-3.5 py-3 text-base outline-none focus:border-bf-accent sm:py-2.5 sm:text-sm"
            required
          />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium text-bf-ink">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-bf-line bg-white px-3.5 py-3 text-base outline-none focus:border-bf-accent sm:py-2.5 sm:text-sm"
            required
          />
        </label>

        {error && (
          <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" variant="dark" className="w-full py-3" disabled={submitting}>
          {submitting ? "Signing in…" : "Log in"}
        </Button>
      </form>
    </>
  );
}
