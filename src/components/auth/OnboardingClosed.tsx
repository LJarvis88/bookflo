"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Static-export safe redirect away from tenant-creation onboarding. */
export function OnboardingClosed() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/signup");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bf-atmosphere px-4 text-sm text-bf-muted">
      Public signup is closed — redirecting to the waitlist…
    </div>
  );
}
