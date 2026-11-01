import { listTenantSlugs } from "@/data/tenants";

/** localStorage + cookie key — same name so older demos keep working. */
export const DEMO_TENANT_STORAGE_KEY = "bookflo-demo-tenant";
export const DEMO_TENANT_COOKIE = "bookflo-demo-tenant";

export function isKnownTenantSlug(
  slug: string | null | undefined,
): slug is string {
  return Boolean(slug && listTenantSlugs().includes(slug));
}

/** Client: prefer cookie, then localStorage. Never invent a default tenant. */
export function readDemoTenantSlug(): string | null {
  if (typeof window === "undefined") return null;

  const fromCookie = readDemoTenantCookieFromDocument();
  if (isKnownTenantSlug(fromCookie)) return fromCookie;

  const fromStorage = localStorage.getItem(DEMO_TENANT_STORAGE_KEY);
  if (isKnownTenantSlug(fromStorage)) return fromStorage;

  return null;
}

function readDemoTenantCookieFromDocument(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${DEMO_TENANT_COOKIE}=([^;]*)`),
  );
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

/** Persist tenant for SSR (cookie) + client recovery (localStorage). */
export function writeDemoTenantSlug(slug: string): void {
  if (typeof window === "undefined") return;
  if (!isKnownTenantSlug(slug)) return;

  localStorage.setItem(DEMO_TENANT_STORAGE_KEY, slug);
  document.cookie = [
    `${DEMO_TENANT_COOKIE}=${encodeURIComponent(slug)}`,
    "Path=/",
    "Max-Age=31536000",
    "SameSite=Lax",
  ].join("; ");
}

export function clearDemoTenantSlug(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(DEMO_TENANT_STORAGE_KEY);
  document.cookie = `${DEMO_TENANT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}
