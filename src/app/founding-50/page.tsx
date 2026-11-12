import type { Metadata } from "next";
import { Founding50AliasRedirect } from "@/components/marketing/Founding50AliasRedirect";
import { FOUNDING_50_PATH } from "@/data/founding50";

export const metadata: Metadata = {
  title: "First 50",
  description: "Redirecting to BOOKFLO First 50 founding onboarding.",
  robots: { index: false, follow: true },
  alternates: { canonical: FOUNDING_50_PATH },
};

/** Short social alias — static-export safe client redirect. */
export default function Founding50AliasPage() {
  return <Founding50AliasRedirect />;
}
