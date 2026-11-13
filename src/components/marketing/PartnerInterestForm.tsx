"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  BOOKFLO_CONTACT_EMAIL,
  BOOKFLO_MAILTO,
  BOOKFLO_WHATSAPP_DISPLAY,
  bookfloPartnerWhatsAppUrl,
} from "@/lib/contact";
import { PARTNER_TAG } from "@/data/partner-interest";
import {
  appendLocalPartnerInterest,
  newLeadId,
  type PartnerInterestLead,
} from "@/lib/partner-interest-store";
import { partnerInterestApiUrl } from "@/lib/partner-api";
import {
  appendLocalFounding30,
  applicationFromPartnerLead,
} from "@/lib/founding30-store";
import { founding30ApiUrl } from "@/lib/founding30-api";

type Status = "idle" | "saving" | "saved" | "error";

export function PartnerInterestForm() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function buildDetails() {
    const lines = [
      `Tag: ${PARTNER_TAG}`,
      name.trim() && `Name: ${name.trim()}`,
      business.trim() && `Business: ${business.trim()}`,
      email.trim() && `Email: ${email.trim()}`,
      phone.trim() && `Phone / WhatsApp: ${phone.trim()}`,
      notes.trim() && `Notes: ${notes.trim()}`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  async function persistLead(): Promise<PartnerInterestLead> {
    const lead: PartnerInterestLead = {
      id: newLeadId(),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      business: business.trim(),
      email: email.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
      tag: PARTNER_TAG,
      source: "join/partner",
    };

    appendLocalPartnerInterest(lead);

    // Option A dual-write → Founding 30 applications (same cohort, proper programme).
    const f30 = applicationFromPartnerLead(lead);
    appendLocalFounding30(f30);

    try {
      const res = await fetch(partnerInterestApiUrl("/api/partner-interest"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) {
        // Static deed may 404 the API — local + WhatsApp still capture the lead.
        console.warn("partner-interest API", res.status);
      }
    } catch {
      // Offline / static host — localStorage + WhatsApp remain.
    }

    try {
      await fetch(founding30ApiUrl("/api/founding-30/apply"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f30),
      });
    } catch {
      // Dual-write best-effort on static hosts.
    }

    return lead;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    setStatus("saving");
    try {
      await persistLead();
      setStatus("saved");
      const url = bookfloPartnerWhatsAppUrl(buildDetails());
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
      setError("Could not save interest — try WhatsApp or email below.");
    }
  }

  const mailto = (() => {
    const subject = encodeURIComponent(
      "BOOKFLO Christmas partner interest · christmas-partner",
    );
    const body = encodeURIComponent(
      `Hi — I'd like to register interest as a Christmas partner (6 months free core).\n\n${buildDetails()}`,
    );
    return `${BOOKFLO_MAILTO}?subject=${subject}&body=${body}`;
  })();

  return (
    <motion.form
      onSubmit={(e) => void onSubmit(e)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-[#845D81]/20 bg-white/90 p-6 shadow-soft backdrop-blur-md sm:p-8"
      aria-labelledby="partner-interest-heading"
      style={{
        boxShadow:
          "0 18px 50px -28px rgba(132, 93, 129, 0.45), 0 0 0 1px rgba(231, 213, 250, 0.6)",
      }}
    >
      <h2
        id="partner-interest-heading"
        className="font-display text-2xl font-semibold tracking-tight text-bf-ink"
      >
        Register your interest
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-bf-muted">
        We record your details for the Christmas partner list — tagged{" "}
        <span className="font-medium text-[#845D81]">{PARTNER_TAG}</span>
        — and dual-write into{" "}
        <span className="font-medium text-[#845D81]">Founding 30</span>. Demo
        login stays invite-only; this is interest, not a public admin account.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
            Your name
          </span>
          <input
            className="field"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex"
            required
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
            Business
          </span>
          <input
            className="field"
            name="business"
            autoComplete="organization"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Studio or salon"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
            Email
          </span>
          <input
            className="field"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
            Phone / WhatsApp
          </span>
          <input
            className="field"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="07…"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
            Notes
          </span>
          <textarea
            className="field min-h-[88px] resize-y"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="City, services, how you know Toni…"
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3">
        <Button
          type="submit"
          variant="dark"
          className="w-full py-3"
          disabled={status === "saving"}
        >
          {status === "saving"
            ? "Saving…"
            : `Send interest · WhatsApp ${BOOKFLO_WHATSAPP_DISPLAY}`}
        </Button>
        <a
          href={mailto}
          className="block text-center text-sm font-medium text-[#845D81] hover:underline"
        >
          Or email {BOOKFLO_CONTACT_EMAIL}
        </a>
      </div>

      {status === "saved" ? (
        <p className="mt-4 text-center text-xs text-bf-muted" role="status">
          Interest saved locally — WhatsApp opened with your details. Send the
          message so Luke has it on the partner list.
        </p>
      ) : null}
    </motion.form>
  );
}
