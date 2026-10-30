"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getTenantBySlug, DEFAULT_TENANT_SLUG } from "@/data/tenants";
import { readDemoTenantSlug } from "@/lib/demo-session";
import type { Tenant } from "@/lib/types";

const DemoTenantContext = createContext<Tenant>(getTenantBySlug(DEFAULT_TENANT_SLUG));

export function DemoTenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<Tenant>(() =>
    getTenantBySlug(DEFAULT_TENANT_SLUG),
  );

  useEffect(() => {
    setTenant(getTenantBySlug(readDemoTenantSlug()));
  }, []);

  return (
    <DemoTenantContext.Provider value={tenant}>{children}</DemoTenantContext.Provider>
  );
}

export function useDemoTenant(): Tenant {
  return useContext(DemoTenantContext);
}
