/**
 * Founding 30 email hooks — v1 manual (Bob / hello@).
 * No Resend/Postmark in-app yet. Replace `queueFounding30Email` body when a provider lands.
 */

import { BOOKFLO_MAILTO } from "@/lib/contact";
import type { Founding30Application } from "@/lib/founding30-store";

export type Founding30EmailKind =
  | "application_received"
  | "approved_code"
  | "ops_new_application";

export interface Founding30EmailPayload {
  kind: Founding30EmailKind;
  to: string;
  subject: string;
  body: string;
  applicationId: string;
}

export function buildApplicationReceivedEmail(
  app: Founding30Application,
): Founding30EmailPayload {
  return {
    kind: "application_received",
    to: app.email || "hello@bookflo.app",
    subject: "BookFlo Founding 30 — we received your application",
    applicationId: app.id,
    body: [
      `Hi ${app.name},`,
      "",
      "Thanks for applying to BookFlo Founding 30.",
      "We've recorded your interest — 6 months complimentary core BookFlo for 30 beauty businesses.",
      "",
      "We'll shortlist and share access codes when January onboarding opens. No account is created yet.",
      "",
      `Business: ${app.business || "—"}`,
      `Theme preference: ${app.themePreset || "—"}`,
      `SMS add-on interest: ${app.addonSms ? "yes" : "no"}`,
      `Quiz add-on interest: ${app.addonQuiz ? "yes" : "no"}`,
      "",
      "— BOOKFLO",
    ].join("\n"),
  };
}

export function buildOpsNewApplicationEmail(
  app: Founding30Application,
): Founding30EmailPayload {
  return {
    kind: "ops_new_application",
    to: "hello@bookflo.app",
    subject: `Founding 30 application · ${app.business || app.name}`,
    applicationId: app.id,
    body: [
      "New Founding 30 application",
      "",
      `id: ${app.id}`,
      `name: ${app.name}`,
      `business: ${app.business}`,
      `email: ${app.email}`,
      `phone: ${app.phone}`,
      `theme: ${app.themePreset || "—"}`,
      `addonSms: ${app.addonSms}`,
      `addonQuiz: ${app.addonQuiz}`,
      `source: ${app.source}`,
      `notes: ${app.notes}`,
      "",
      "Review: /dashboard/founding-30",
    ].join("\n"),
  };
}

export function buildApprovedCodeEmail(
  app: Founding30Application,
): Founding30EmailPayload {
  return {
    kind: "approved_code",
    to: app.email || "hello@bookflo.app",
    subject: "BookFlo Founding 30 — you're shortlisted",
    applicationId: app.id,
    body: [
      `Hi ${app.name},`,
      "",
      "You're on the BookFlo Founding 30 shortlist.",
      app.accessCode
        ? `Your access code (for January activation): ${app.accessCode}`
        : "We'll send your access code when January onboarding opens.",
      "",
      "Keep this email — activation is not open yet.",
      "",
      "— BOOKFLO",
    ].join("\n"),
  };
}

/**
 * v1: log + return a mailto URL for Bob/manual send.
 * Future: swap for Resend/Postmark without changing call sites.
 */
export async function queueFounding30Email(
  payload: Founding30EmailPayload,
): Promise<{ queued: true; mailto: string; provider: "manual" }> {
  if (typeof console !== "undefined") {
    console.info("[founding30-email:manual]", payload.kind, payload.to);
  }
  const mailto = `${BOOKFLO_MAILTO}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(payload.body)}`;
  return { queued: true, mailto, provider: "manual" };
}
