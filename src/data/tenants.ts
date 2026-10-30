import { contourPreston, getService, getStaff } from "@/data/contour-preston";
import { ohMySocialMedia } from "@/data/oh-my-social-media";
import type { Tenant } from "@/lib/types";

export const TENANTS: Tenant[] = [contourPreston, ohMySocialMedia];

export const DEFAULT_TENANT_SLUG = contourPreston.slug;

export function getTenantBySlug(slug: string | null | undefined): Tenant {
  if (!slug) return contourPreston;
  return TENANTS.find((t) => t.slug === slug) ?? contourPreston;
}

export function listTenantSlugs(): string[] {
  return TENANTS.map((t) => t.slug);
}

export { getService, getStaff };
