"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Old Toni link — single admin A2HS lives on /login + /dashboard now. */
export default function OmsLoginAliasPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return (
    <p className="p-6 text-sm text-bf-muted">Taking you to log in…</p>
  );
}
