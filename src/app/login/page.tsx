import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bf-atmosphere px-4 py-8 sm:px-5 sm:py-12">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="inline-flex items-center" aria-label="bookflo home">
          <BookfloWordmark size="lg" />
        </Link>
        <div className="mt-8 rounded-3xl border border-bf-line bg-white/80 p-5 shadow-soft backdrop-blur sm:mt-10 sm:p-8">
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
      </div>
    </div>
  );
}
