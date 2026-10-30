import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { InstallAppCard } from "@/components/pwa/InstallAppCard";
import { BOOKFLO_PWA, getTenantPwa } from "@/lib/pwa";

export default function LoginPage() {
  const contour = getTenantPwa("contour-preston")!;
  const oms = getTenantPwa("oh-my-social-media")!;

  return (
    <div className="min-h-screen bg-bf-atmosphere px-4 py-8 sm:px-5 sm:py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <Link href="/" className="font-display text-2xl font-semibold text-bf-ink">
          BOOKFLO
        </Link>
        <div className="rounded-3xl border border-bf-line bg-white/80 p-5 shadow-soft backdrop-blur sm:p-8">
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-bf-muted">
            Stub login — no real auth in this prototype. Tap a demo account to fill the form.
          </p>

          <LoginForm />

          <p className="mt-6 text-center text-sm text-bf-muted">
            New here?{" "}
            <Link href="/signup" className="font-medium text-bf-accent hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-semibold tracking-tight text-bf-ink">
            Add booking apps to Home Screen
          </h2>
          <p className="text-sm text-bf-muted">
            Each client installs their own branded icon. Contour and OMS demos below — open the
            booking link on your phone, then follow the steps.
          </p>
          <div className="grid gap-3">
            <Link
              href={contour.startUrl}
              className="flex items-center gap-3 rounded-2xl border border-bf-line bg-white p-3 hover:border-bf-ink/20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={contour.appleTouchIcon}
                alt=""
                className="h-12 w-12 rounded-[22%] object-cover"
              />
              <span className="min-w-0">
                <span className="block font-medium text-bf-ink">{contour.name}</span>
                <span className="block text-xs text-bf-muted">Install from booking page · iOS Safari / Android Chrome</span>
              </span>
            </Link>
            <Link
              href={oms.startUrl}
              className="flex items-center gap-3 rounded-2xl border border-bf-line bg-white p-3 hover:border-bf-ink/20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={oms.appleTouchIcon}
                alt=""
                className="h-12 w-12 rounded-[22%] object-cover"
              />
              <span className="min-w-0">
                <span className="block font-medium text-bf-ink">{oms.name}</span>
                <span className="block text-xs text-bf-muted">Install from booking page · iOS Safari / Android Chrome</span>
              </span>
            </Link>
          </div>
          <InstallAppCard pwa={BOOKFLO_PWA} tone="platform" />
        </section>
      </div>
    </div>
  );
}
