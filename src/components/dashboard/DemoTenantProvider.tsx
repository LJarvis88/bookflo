"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findTenantBySlug } from "@/data/tenants";
import {
  appendStoredAppointment,
  mergeAppointments,
  readStoredAppointments,
} from "@/lib/appointment-store";
import { hasStaffOverlap } from "@/lib/booking-overlap";
import { isAllowlistedTenantSlug } from "@/lib/demo-auth";
import {
  readDemoAuthSlug,
  writeDemoAuthSlug,
} from "@/lib/demo-session";
import type { Appointment, Tenant } from "@/lib/types";

const DemoTenantContext = createContext<Tenant | null>(null);

type CreateAppointmentResult = { ok: true } | { ok: false; error: string };

const CreateAppointmentContext = createContext<
  ((apt: Appointment) => CreateAppointmentResult) | null
>(null);

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

function withAppointments(base: Tenant, appointments: Appointment[]): Tenant {
  return { ...base, appointments };
}

export function DemoTenantProvider({ children }: { children: ReactNode }) {
  // Start unresolved on purpose — never paint Contour (or any salon) as a default.
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [resolved, setResolved] = useState(false);

  useLayoutEffect(() => {
    const slug = resolveAuthenticatedSlug();
    if (slug) {
      writeDemoAuthSlug(slug);
      stripTenantQueryParam();
      const base = findTenantBySlug(slug);
      if (!base) {
        setTenant(null);
      } else {
        const stored = readStoredAppointments(slug);
        setTenant(
          withAppointments(base, mergeAppointments(base.appointments, stored)),
        );
      }
    } else {
      setTenant(null);
    }
    setResolved(true);
  }, []);

  const createAppointment = useCallback(
    (apt: Appointment): CreateAppointmentResult => {
      if (!tenant) {
        return { ok: false, error: "Not signed in." };
      }
      if (
        hasStaffOverlap({
          appointments: tenant.appointments,
          staffId: apt.staffId,
          date: apt.date,
          startTime: apt.startTime,
          endTime: apt.endTime,
          excludeId: apt.id,
        })
      ) {
        return {
          ok: false,
          error: "That time overlaps an existing booking for this team member.",
        };
      }
      const stored = appendStoredAppointment(tenant.slug, apt);
      const base = findTenantBySlug(tenant.slug);
      if (!base) {
        return { ok: false, error: "Unknown salon." };
      }
      setTenant(
        withAppointments(base, mergeAppointments(base.appointments, stored)),
      );
      return { ok: true };
    },
    [tenant],
  );

  const createValue = useMemo(() => createAppointment, [createAppointment]);

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
      <CreateAppointmentContext.Provider value={createValue}>
        {children}
      </CreateAppointmentContext.Provider>
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

export function useCreateAppointment(): (
  apt: Appointment,
) => CreateAppointmentResult {
  const create = useContext(CreateAppointmentContext);
  if (!create) {
    throw new Error(
      "useCreateAppointment must be used inside a resolved DemoTenantProvider",
    );
  }
  return create;
}
