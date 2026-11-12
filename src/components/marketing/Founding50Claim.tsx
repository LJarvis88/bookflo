"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  BOOKFLO_CONTACT_EMAIL,
  BOOKFLO_MAILTO,
  BOOKFLO_WHATSAPP_DISPLAY,
  bookfloFounding50WhatsAppUrl,
} from "@/lib/contact";
import { FOUNDING_50_TAG } from "@/data/founding50";

type Status = "idle" | "ready";

export function Founding50Claim() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function buildDetails() {
    const lines = [
      `Tag: ${FOUNDING_50_TAG}`,
      name.trim() && `Name: ${name.trim()}`,
      business.trim() && `Business: ${business.trim()}`,
      email.trim() && `Email: ${email.trim()}`,
    ].filter(Boolean);
    return lines.join("\n");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("ready");
    const url = bookfloFounding50WhatsAppUrl(buildDetails());
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const mailto = (() => {
    const subject = encodeURIComponent("BOOKFLO First 50 · founding-50 claim");
    const body = encodeURIComponent(
      `Hi — I'd like to claim a First 50 founding spot (quiz free for demo).\n\n${buildDetails()}`,
    );
    return `${BOOKFLO_MAILTO}?subject=${subject}&body=${body}`;
  })();

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-bf-line/80 bg-white/85 p-6 shadow-soft backdrop-blur-md sm:p-8"
      aria-labelledby="founding50-claim-heading"
    >
      <h2
        id="founding50-claim-heading"
        className="font-display text-2xl font-semibold tracking-tight text-bf-ink"
      >
        Claim your founding spot
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-bf-muted">
        Demo-only until January 2027 — we record interest and tag you{" "}
        <span className="font-medium text-bf-ink">{FOUNDING_50_TAG}</span>. No
        public admin accounts open yet.
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
        <label className="block sm:col-span-2">
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
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button type="submit" variant="dark" className="w-full py-3">
          WhatsApp claim · {BOOKFLO_WHATSAPP_DISPLAY}
        </Button>
        <a
          href={mailto}
          className="block text-center text-sm font-medium text-bf-accent hover:underline"
        >
          Or email {BOOKFLO_CONTACT_EMAIL}
        </a>
      </div>

      {status === "ready" ? (
        <p className="mt-4 text-center text-xs text-bf-muted" role="status">
          WhatsApp opened with your founding-50 details — send the message to
          lock your spot.
        </p>
      ) : null}
    </motion.form>
  );
}
