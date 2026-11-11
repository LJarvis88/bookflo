"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FOUNDING_50_PATH } from "@/data/founding50";

/** Static-export safe redirect from /founding-50 → /join/first-50. */
export function Founding50AliasRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(FOUNDING_50_PATH);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-bf-atmosphere px-4 text-sm text-bf-muted">
      Taking you to First 50 onboarding…
    </div>
  );
}
