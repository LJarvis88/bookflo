/**
 * Phase 2 stub credentials — not real auth.
 * Demo-only allowlist until Luke opens signup (prefs).
 * Only Liv Contour + Tee OMS may log into admin.
 */

export const DEMO_ACCESS_DENIED_MESSAGE =
  "Demo access only — invite only. Public signup is closed while we run demos.";

export interface DemoAccount {
  name: string;
  role: string;
  email: string;
  password: string;
  /** Tenant slug for dashboard + booking branding */
  tenantSlug: string;
}

/** Contour Preston founder (Liv) — ink / navy / gold. Allowlisted but not advertised on login UI until Liv replies. */
export const DEMO_OWNER: DemoAccount = {
  name: "Liv",
  role: "Contour Preston founder",
  email: "liv@contourpreston.com",
  password: "contour-demo",
  tenantSlug: "contour-preston",
};

/** Oh My Social Media (Tee) — magenta / orange on pure white. */
export const DEMO_TEE: DemoAccount = {
  name: "Tee",
  role: "Oh My Social Media",
  email: "tee@ohmysocialmedia.com",
  password: "oms-demo",
  tenantSlug: "oh-my-social-media",
};

/** Hard allowlist — login API accepts only these credentials. */
export const DEMO_ACCOUNTS: DemoAccount[] = [DEMO_OWNER, DEMO_TEE];

/**
 * Accounts shown on the public login picker.
 * Tee only until Liv replies — Liv stays allowlisted via DEMO_ACCOUNTS.
 */
export const DEMO_PUBLIC_PICKER_ACCOUNTS: DemoAccount[] = [DEMO_TEE];

export function findDemoAccount(
  email: string,
  password: string,
): DemoAccount | undefined {
  const normalised = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find(
    (account) => account.email === normalised && account.password === password,
  );
}

export function isDemoLogin(email: string, password: string): boolean {
  return Boolean(findDemoAccount(email, password));
}

/** @deprecated Prefer isDemoLogin — kept for any older imports. */
export function isDemoOwnerLogin(email: string, password: string): boolean {
  return isDemoLogin(email, password);
}

export function isAllowlistedTenantSlug(slug: string | null | undefined): boolean {
  return Boolean(
    slug && DEMO_ACCOUNTS.some((account) => account.tenantSlug === slug),
  );
}
