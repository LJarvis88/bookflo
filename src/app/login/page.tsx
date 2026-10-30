import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { DEMO_OWNER } from "@/lib/demo-auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bf-atmosphere px-4 py-8 sm:px-5 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="font-display text-2xl font-semibold text-bf-ink">
          BOOKFLO
        </Link>
        <div className="mt-8 rounded-3xl border border-bf-line bg-white/80 p-5 shadow-soft backdrop-blur sm:mt-10 sm:p-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-bf-muted">
            Stub login for Contour Preston — no real auth in this prototype.
          </p>

          <div className="mt-5 rounded-2xl border border-dashed border-bf-accent/40 bg-bf-accent-soft/50 px-4 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bf-accent">
              Demo credentials
            </p>
            <p className="mt-1.5 text-sm text-bf-ink">
              <span className="font-medium">{DEMO_OWNER.name}</span>
              <span className="text-bf-muted"> · {DEMO_OWNER.role}</span>
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                <dt className="shrink-0 text-bf-muted">Email</dt>
                <dd className="break-all font-medium text-bf-ink">{DEMO_OWNER.email}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
                <dt className="shrink-0 text-bf-muted">Password</dt>
                <dd className="font-medium text-bf-ink">{DEMO_OWNER.password}</dd>
              </div>
            </dl>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-bf-muted">
            New here?{" "}
            <Link href="/signup" className="font-medium text-bf-accent hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
