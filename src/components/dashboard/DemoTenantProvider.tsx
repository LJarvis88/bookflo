"use client";

import Link from "next/link";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { findTenantBySlug } from "@/data/tenants";
import { isAllowlistedTenantSlug } from "@/lib/demo-auth";
import {
  readDemoAuthSlug,
  writeDemoAuthSlug,
} from "@/lib/demo-session";
import type { Tenant } from "@/lib/types";

const DemoTenantContext = createContext<Tenant | null>(null);

/**
 * Resolve tenant only from allowlisted auth — never from a bare ?tenant=
 * query or cookie alone. Public visitors cannot open admin without login.
 */
function resolveAuthenticatedSlug(): string | null {
  if (typeof window === "undefined") return null;

  const authSlug = readDemoAuthSlug();
  if (!isAllowlistedTenantSlug(authSlug)) return null;

  const fromQuery = new URLSearchParams(window.location.search).get("tenant");
  // Query may refine the session only when it matches the authenticated slug.
  if (fromQuery && fromQuery !== authSlug) return null;

  return authSlug;
}

function stripTenantQueryParam() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has("tenant")) return;
  url.searchParams.delete("tenant");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", next);
}

export function DemoTenantProvider({ children }: { children: ReactNode }) {
  // Start unresolved on purpose — never paint Contour (or any salon) as a default.
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [resolved, setResolved] = useState(false);

  useLayoutEffect(() => {
    // Resolve once on mount (login uses a full page load into /dashboard).
    const slug = resolveAuthenticatedSlug();
    if (slug) {
      try {
        writeDemoAuthSlug(slug);
      } catch {
        // Auth already present in memory for this paint; persistence can retry later.
      }
      stripTenantQueryParam();
      setTenant(findTenantBySlug(slug) ?? null);
    } else {
      setTenant(null);
    }
    setResolved(true);
  }, []);

  if (!resolved) {
    // Neutral shell only — no logo, name, or colours from any demo tenant.
    return (
      <div
        className="min-h-screen bg-[#f7f8fa]"
        aria-busy="true"
        aria-label="Loading salon portal"
      />
    );
  }

  if (!tenant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-4 text-bf-ink">
        <div className="max-w-sm text-center">
          <p className="font-display text-xl font-semibold tracking-tight">
            Salon portal
          </p>
          <p className="mt-2 text-sm text-bf-muted">
            Sign in with your invite to open your business dashboard.
            No salon branding loads until your account is resolved.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-flex rounded-full bg-bf-ink px-5 py-2.5 text-sm font-medium text-white"
          >
            Log in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <DemoTenantContext.Provider value={tenant}>
      {children}
    </DemoTenantContext.Provider>
  );
}

export function useDemoTenant(): Tenant {
  const tenant = useContext(DemoTenantContext);
  if (!tenant) {
    throw new Error("useDemoTenant must be used inside a resolved DemoTenantProvider");
  }
  return tenant;
}
