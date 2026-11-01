import { contourPreston, getService, getStaff } from "@/data/contour-preston";
import { ohMySocialMedia } from "@/data/oh-my-social-media";
import type { Tenant } from "@/lib/types";

export const TENANTS: Tenant[] = [contourPreston, ohMySocialMedia];

/** Public booking fallback only — never use as a silent dashboard default. */
export const DEFAULT_TENANT_SLUG = contourPreston.slug;

export function findTenantBySlug(
  slug: string | null | undefined,
): Tenant | undefined {
  if (!slug) return undefined;
  return TENANTS.find((t) => t.slug === slug);
}

export function getTenantBySlug(slug: string | null | undefined): Tenant {
  return findTenantBySlug(slug) ?? contourPreston;
}

export function listTenantSlugs(): string[] {
  return TENANTS.map((t) => t.slug);
}

export { getService, getStaff };
