import Link from "next/link";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { LegalFooter } from "@/components/marketing/LegalFooter";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bf-atmosphere">
      <div className="relative flex-1">
        <div className="bf-grain absolute inset-0" aria-hidden />
        <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
          <Link href="/" className="inline-flex items-center" aria-label="bookflo home">
            <BookfloWordmark size="md" />
          </Link>
          <p className="text-xs text-bf-muted">Salon onboarding · demo</p>
        </header>
        <main className="relative z-10 px-5 pb-20 md:px-8">
          <OnboardingWizard />
        </main>
      </div>
      <LegalFooter />
    </div>
  );
}
