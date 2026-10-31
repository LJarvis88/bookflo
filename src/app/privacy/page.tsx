import type { Metadata } from "next";
import { LegalDoc, LegalSection } from "@/components/marketing/LegalDoc";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import { BOOKFLO_CONTACT_EMAIL, BOOKFLO_MAILTO } from "@/lib/contact";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BOOKFLO processes personal data for accounts, bookings, and the marketing site.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — BOOKFLO",
    description:
      "How BOOKFLO processes personal data for accounts, bookings, and the marketing site.",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: SITE_NAME, path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalDoc title="Privacy Policy">
      <p>
        This Privacy Policy explains how BOOKFLO (“we”, “us”) handles personal
        data when you use bookflo.app and related demo or trial services. It is
        written for a UK-friendly SaaS context and is provided as a working
        template only.
      </p>

      <LegalSection title="Who is the controller?">
        <p>
          The data controller for BOOKFLO is <strong className="text-bf-ink">BOOKFLO</strong>
          , operating bookflo.app. Contact:{" "}
          <a
            href={BOOKFLO_MAILTO}
            className="font-medium text-bf-accent hover:underline"
          >
            {BOOKFLO_CONTACT_EMAIL}
          </a>
          .
        </p>
        <p>
          Where a salon or studio uses BOOKFLO to take bookings, that business
          may also be a controller of their clients’ booking data. BOOKFLO
          processes that data on their behalf as a processor for the booking
          service.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>Depending on how you use BOOKFLO, we may process:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-bf-ink">Account data</strong> — name, email,
            password (hashed), business name, and onboarding details you provide.
          </li>
          <li>
            <strong className="text-bf-ink">Booking data</strong> — client name,
            contact details, service, time, and related notes entered through a
            booking page.
          </li>
          <li>
            <strong className="text-bf-ink">Usage and device data</strong> —
            pages visited, approximate location from IP, browser type, and
            similar technical logs needed to run and secure the service.
          </li>
          <li>
            <strong className="text-bf-ink">Support messages</strong> — content
            you send to {BOOKFLO_CONTACT_EMAIL}.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Why we use personal data">
        <p>We process data to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>create and manage accounts, trials, and subscriptions;</li>
          <li>power branded booking pages and calendars;</li>
          <li>send transactional messages (for example booking confirmations);</li>
          <li>secure, debug, and improve bookflo.app;</li>
          <li>respond to enquiries and meet legal obligations.</li>
        </ul>
        <p>
          Our usual legal bases under UK GDPR are contract (providing the
          service you ask for), legitimate interests (running a secure SaaS
          product), and consent where we ask for it (for example optional
          marketing).
        </p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>
          We use essential cookies and similar storage that are necessary for
          the site and demo sessions to work (for example keeping you signed in
          to a prototype dashboard). We do not run advertising trackers in this
          prototype. If non-essential cookies are added later, we will update
          this notice and, where required, ask for consent.
        </p>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          We do not sell personal data. We may share data with infrastructure
          and email providers who process it for us under contract, or if the
          law requires disclosure. Demo accounts on this prototype are for
          product evaluation and should not be used for real client records.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          We keep account and booking data while your subscription or trial is
          active and for a reasonable period afterwards for backups, disputes,
          and legal retention. You can ask us to delete account data where we
          are not required to keep it.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Under UK data protection law you may have rights to access, correct,
          delete, or restrict processing of your personal data, to object to
          certain processing, and to data portability. You may also complain to
          the Information Commissioner’s Office (ICO). To exercise rights,
          email{" "}
          <a
            href={BOOKFLO_MAILTO}
            className="font-medium text-bf-accent hover:underline"
          >
            {BOOKFLO_CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="International transfers">
        <p>
          If we use providers outside the UK, we will rely on appropriate
          safeguards (such as UK adequacy regulations or standard contractual
          clauses) where required.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy:{" "}
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
    </>
  );
}
