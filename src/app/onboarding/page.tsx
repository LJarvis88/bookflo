import type { Metadata } from "next";
import { OnboardingClosed } from "@/components/auth/OnboardingClosed";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "BOOKFLO onboarding is invite-only during demos.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/onboarding" },
};

/** Public tenant creation is closed — waitlist only while demos run. */
export default function OnboardingPage() {
  return <OnboardingClosed />;
}
