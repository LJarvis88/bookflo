import { DEFAULT_TENANT_SLUG } from "@/data/tenants";

export const DEMO_TENANT_STORAGE_KEY = "bookflo-demo-tenant";

export function readDemoTenantSlug(): string {
  if (typeof window === "undefined") return DEFAULT_TENANT_SLUG;
  return localStorage.getItem(DEMO_TENANT_STORAGE_KEY) ?? DEFAULT_TENANT_SLUG;
}

export function writeDemoTenantSlug(slug: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_TENANT_STORAGE_KEY, slug);
}
