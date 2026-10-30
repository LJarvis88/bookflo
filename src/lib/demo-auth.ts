/** Phase 2 stub credentials — Contour Preston founder (Liv). Not real auth. */
export const DEMO_OWNER = {
  name: "Liv",
  role: "Contour Preston founder",
  email: "liv@contourpreston.com",
  password: "contour-demo",
} as const;

export function isDemoOwnerLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_OWNER.email &&
    password === DEMO_OWNER.password
  );
}
