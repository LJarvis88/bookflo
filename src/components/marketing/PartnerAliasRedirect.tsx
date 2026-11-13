"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PARTNER_PATH } from "@/data/partner-interest";

/** Static-export safe redirect from /partner → /join/partner. */
export function PartnerAliasRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(PARTNER_PATH);
  }, [router]);
  return (
    <p className="p-6 text-sm text-bf-muted">Taking you to the partner page…</p>
  );
}
