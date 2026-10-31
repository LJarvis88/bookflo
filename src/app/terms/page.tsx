import type { Metadata } from "next";
import { LegalDoc, LegalSection } from "@/components/marketing/LegalDoc";
import { BOOKFLO_CONTACT_EMAIL, BOOKFLO_MAILTO } from "@/lib/contact";
import { TRIAL_DAYS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Terms and Conditions — BOOKFLO",
  description:
    "Terms for using BOOKFLO, demo accounts, the free trial, and zero-commission subscription framing.",
};

export default function TermsPage() {
  return (
    <LegalDoc title="Terms and conditions">
      <p>
        These Terms and Conditions govern your use of bookflo.app and the
        BOOKFLO product prototype. They are a working template, not a
        substitute for legal advice. By using the site you agree to these terms.
      </p>

      <LegalSection title="Who we are">
        <p>
          BOOKFLO is a white-label booking platform for salons, aesthetics, and
          creative businesses. Contact:{" "}
          <a
            href={BOOKFLO_MAILTO}
            className="font-medium text-bf-accent hover:underline"
          >
            {BOOKFLO_CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Use of the site">
        <p>
          You may use bookflo.app to learn about BOOKFLO, explore demos, start a
          trial, and manage a branded booking experience. You must not misuse
          the service (including attempting to break security, scrape without
          permission, or use the platform for unlawful content).
        </p>
        <p>
          Marketing pages, prices, and feature descriptions are informational
          and may change as the product develops.
        </p>
      </LegalSection>

      <LegalSection title="Demo accounts">
        <p>
          Shared demo logins (for example Contour Preston or Oh My Social Media)
          are for evaluation only. Demo data is fictional or illustrative. Do
          not enter real client personal data into demo tenants. We may reset or
          revoke demo access at any time.
        </p>
      </LegalSection>

      <LegalSection title={`${TRIAL_DAYS}-day free trial`}>
        <p>
          New accounts may start a {TRIAL_DAYS}-day free trial on available
          plans. Trial features match the selected plan unless we say otherwise.
          At the end of the trial, continued use requires an active
          subscription. We may cancel trials that look abusive or automated.
        </p>
      </LegalSection>

      <LegalSection title="Subscription and zero commission">
        <p>
          BOOKFLO is framed as a flat subscription product: we do not take a
          commission cut of your bookings. Card processing (for example Stripe)
          may be added later and would be billed by those providers under their
          own terms — this prototype does not process live payments.
        </p>
        <p>
          Plan prices on the site are indicative until you confirm a paid
          subscription. Taxes may apply based on your location.
        </p>
      </LegalSection>

      <LegalSection title="Your content and branding">
        <p>
          You keep ownership of logos, copy, and client relationships you upload
          or manage. You grant BOOKFLO a limited licence to host and display that
          content so the booking service works. You confirm you have rights to
          the branding and materials you use.
        </p>
      </LegalSection>

      <LegalSection title="Availability and prototypes">
        <p>
          bookflo.app and demo environments are provided on an “as is” basis
          while the product is in prototype. We do not guarantee uninterrupted
          availability or that demo behaviour matches a future production
          release.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          To the fullest extent permitted by law, BOOKFLO is not liable for
          indirect or consequential loss arising from use of the prototype site
          or demos. Nothing in these terms excludes liability that cannot be
          limited under applicable law (including for death or personal injury
          caused by negligence, or fraud).
        </p>
      </LegalSection>

      <LegalSection title="No legal advice">
        <p>
          Nothing on bookflo.app, including these Terms and the Privacy Policy,
          is legal, tax, or professional advice. Have a solicitor review any
          terms you rely on for live customers or regulated activities.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms as BOOKFLO evolves. Continued use after
          changes are posted on this page means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions:{" "}
          <a
            href={BOOKFLO_MAILTO}
            className="font-medium text-bf-accent hover:underline"
          >
            {BOOKFLO_CONTACT_EMAIL}
          </a>{" "}
          · bookflo.app
        </p>
        <p className="text-sm">Last updated: 31 October 2026.</p>
      </LegalSection>
    </LegalDoc>
  );
}
