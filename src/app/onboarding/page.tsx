import Link from "next/link";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-bf-atmosphere">
      <div className="bf-grain absolute inset-0" aria-hidden />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Link href="/" className="font-display text-xl font-semibold text-bf-ink">
          BOOKFLO
        </Link>
        <p className="text-xs text-bf-muted">Salon onboarding · demo</p>
      </header>
      <main className="relative z-10 px-5 pb-20 md:px-8">
        <OnboardingWizard />
      </main>
    </div>
  );
}
