"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { DEMO_OWNER, isDemoOwnerLogin } from "@/lib/demo-auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(DEMO_OWNER.email);
  const [password, setPassword] = useState<string>(DEMO_OWNER.password);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!isDemoOwnerLogin(email, password)) {
      setError("Use the Contour Preston demo credentials shown below.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
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
  );
}
