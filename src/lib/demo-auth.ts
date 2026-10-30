/** Phase 2 stub credentials — not real auth. */

export interface DemoAccount {
  name: string;
  role: string;
  email: string;
  password: string;
  /** Tenant slug for dashboard + booking branding */
  tenantSlug: string;
}

/** Contour Preston founder (Liv) — ink / navy / gold. */
export const DEMO_OWNER: DemoAccount = {
  name: "Liv",
  role: "Contour Preston founder",
  email: "liv@contourpreston.com",
  password: "contour-demo",
  tenantSlug: "contour-preston",
};

/** Oh My Social Media (Tee) — magenta / orange / cream. */
export const DEMO_TEE: DemoAccount = {
  name: "Tee",
  role: "Oh My Social Media",
  email: "tee@ohmysocialmedia.com",
  password: "oms-demo",
  tenantSlug: "oh-my-social-media",
};

export const DEMO_ACCOUNTS: DemoAccount[] = [DEMO_OWNER, DEMO_TEE];

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
