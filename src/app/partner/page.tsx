import type { Metadata } from "next";
import { PartnerAliasRedirect } from "@/components/marketing/PartnerAliasRedirect";
import { PARTNER_PATH } from "@/data/partner-interest";

export const metadata: Metadata = {
  title: "Christmas partner",
  description: "Redirecting to BOOKFLO Christmas partner interest.",
  robots: { index: false, follow: true },
  alternates: { canonical: PARTNER_PATH },
};

/** Short social alias — static-export safe client redirect. */
export default function PartnerAliasPage() {
  return <PartnerAliasRedirect />;
}
