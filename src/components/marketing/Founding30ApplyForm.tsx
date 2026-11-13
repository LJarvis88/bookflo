"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  BOOKFLO_CONTACT_EMAIL,
  BOOKFLO_MAILTO,
  BOOKFLO_WHATSAPP_DISPLAY,
  bookfloWhatsAppUrl,
} from "@/lib/contact";
import {
  FOUNDING30_ADDONS,
  FOUNDING30_SUCCESS_PATH,
  FOUNDING30_TAG,
} from "@/data/founding30";
import {
  FOUNDING_THEME_PRESETS,
  type FoundingThemeId,
} from "@/data/founding-themes";
import {
  appendLocalFounding30,
  createBlankApplication,
} from "@/lib/founding30-store";
import { founding30ApiUrl } from "@/lib/founding30-api";

type Step = 0 | 1 | 2 | 3;

const STEPS = ["You", "Business", "Look", "Extras"] as const;

export function Founding30ApplyForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [themePreset, setThemePreset] = useState<FoundingThemeId | "">("");
  const [addonSms, setAddonSms] = useState(false);
  const [addonQuiz, setAddonQuiz] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function validateStep(): boolean {
    setError(null);
    if (step === 0) {
      if (!name.trim()) {
        setError("Name is required.");
        return false;
      }
      if (!email.trim()) {
        setError("Email helps us reach you with a code later.");
        return false;
      }
    }
    if (step === 1 && !business.trim()) {
      setError("Business name is required.");
      return false;
    }
    if (step === 2 && !themePreset) {
      setError("Pick a booking look — you can change brand colours later.");
      return false;
    }
    return true;
  }

  function next() {
    if (!validateStep()) return;
    setStep((s) => Math.min(3, s + 1) as Step);
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(0, s - 1) as Step);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;
    setStatus("saving");
    setError(null);

    const app = createBlankApplication({
      name,
      email,
      phone,
      business,
      website,
      notes,
      themePreset,
      addonSms,
      addonQuiz,
      source: "founding-30",
    });

    appendLocalFounding30(app);

    try {
      await fetch(founding30ApiUrl("/api/founding-30/apply"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...app, companyWebsite: honeypot }),
      });
    } catch {
      // Static deed may 404 — localStorage still holds the application.
    }

    const wa = bookfloWhatsAppUrl(
      [
        `Hi — BookFlo Founding 30 application (${FOUNDING30_TAG}).`,
        `Name: ${name.trim()}`,
        `Business: ${business.trim()}`,
        `Email: ${email.trim()}`,
        phone.trim() && `Phone: ${phone.trim()}`,
        `Theme: ${themePreset || "—"}`,
        `SMS interest: ${addonSms ? "yes" : "no"}`,
        `Quiz interest: ${addonQuiz ? "yes" : "no"}`,
        notes.trim() && `Notes: ${notes.trim()}`,
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.open(wa, "_blank", "noopener,noreferrer");

    router.push(
      `${FOUNDING30_SUCCESS_PATH}?id=${encodeURIComponent(app.id)}`,
    );
  }

  const mailto = (() => {
    const subject = encodeURIComponent(
      "BookFlo Founding 30 application · founding-30",
    );
    const body = encodeURIComponent(
      [
        "Hi — I'd like to apply for BookFlo Founding 30.",
        "",
        `Name: ${name}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Theme: ${themePreset || "—"}`,
        `SMS: ${addonSms ? "yes" : "no"}`,
        `Quiz: ${addonQuiz ? "yes" : "no"}`,
        `Notes: ${notes}`,
      ].join("\n"),
    );
    return `${BOOKFLO_MAILTO}?subject=${subject}&body=${body}`;
  })();

  return (
    <motion.form
      onSubmit={(e) => void onSubmit(e)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-bf-line bg-white/90 p-6 shadow-soft backdrop-blur-md sm:p-8"
      aria-labelledby="f30-apply-heading"
    >
      <h2
        id="f30-apply-heading"
        className="font-display text-2xl font-semibold tracking-tight text-bf-ink"
      >
        Apply for Founding 30
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-bf-muted">
        Interest only — no account is created yet. Access codes land when
        January onboarding opens. Tagged{" "}
        <span className="font-medium text-bf-accent">{FOUNDING30_TAG}</span>.
      </p>

      <ol className="mt-6 flex gap-2" aria-label="Application steps">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`flex-1 rounded-full px-2 py-1.5 text-center text-[11px] font-medium tracking-wide ${
              i === step
                ? "bg-bf-ink text-white"
                : i < step
                  ? "bg-bf-accent-soft text-bf-accent"
                  : "bg-bf-fog text-bf-muted"
            }`}
          >
            {label}
          </li>
        ))}
      </ol>

      {/* Honeypot */}
      <input
        type="text"
        name="companyWebsite"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-6 space-y-4"
        >
          {step === 0 && (
            <>
              <Field label="Your name" required>
                <input
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </Field>
              <Field label="Email" required>
                <input
                  className="field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  className="field"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </Field>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Business name" required>
                <input
                  className="field"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  autoComplete="organization"
                  required
                />
              </Field>
              <Field label="Website or Instagram">
                <input
                  className="field"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://… or @handle"
                />
              </Field>
              <Field label="Notes">
                <textarea
                  className="field min-h-[88px] resize-y"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="City, services, how you found BOOKFLO…"
                />
              </Field>
            </>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
                Booking look preference
              </legend>
              <p className="mb-4 text-sm text-bf-muted">
                Presentation only — your brand colours and logo layer on top later.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {FOUNDING_THEME_PRESETS.map((theme) => {
                  const selected = themePreset === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setThemePreset(theme.id)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-bf-ink ring-1 ring-bf-ink"
                          : "border-bf-line hover:border-bf-accent/40"
                      }`}
                    >
                      <div
                        className="mb-3 h-14 rounded-xl"
                        style={{
                          background: `linear-gradient(135deg, ${theme.tokens.primary ?? "#845D81"}, ${theme.tokens.secondary ?? "#E7D5FA"})`,
                        }}
                      />
                      <p className="font-display text-base font-semibold">
                        {theme.label}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-bf-muted">
                        {theme.blurb}
                      </p>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <>
              <p className="text-sm text-bf-muted">
                Optional add-ons —{" "}
                <strong className="font-medium text-bf-ink">
                  never preselected
                </strong>
                . Core stays complimentary for 6 months either way.
              </p>
              <label className="flex cursor-pointer gap-3 rounded-2xl border border-bf-line p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={addonQuiz}
                  onChange={(e) => setAddonQuiz(e.target.checked)}
                />
                <span>
                  <span className="font-medium text-bf-ink">
                    {FOUNDING30_ADDONS.quiz.name} · £
                    {FOUNDING30_ADDONS.quiz.priceMonthly.toFixed(2)}/mo
                  </span>
                  <span className="mt-1 block text-sm text-bf-muted">
                    {FOUNDING30_ADDONS.quiz.blurb}
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer gap-3 rounded-2xl border border-bf-line p-4">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={addonSms}
                  onChange={(e) => setAddonSms(e.target.checked)}
                />
                <span>
                  <span className="font-medium text-bf-ink">
                    {FOUNDING30_ADDONS.sms.name} · £
                    {FOUNDING30_ADDONS.sms.priceMonthly.toFixed(2)}/mo
                  </span>
                  <span className="mt-1 block text-sm text-bf-muted">
                    {FOUNDING30_ADDONS.sms.blurb}
                  </span>
                </span>
              </label>
              <div className="rounded-2xl bg-bf-fog/60 px-4 py-3 text-sm text-bf-muted">
                Review: <strong className="text-bf-ink">{name}</strong>
                {business ? ` · ${business}` : ""} · theme{" "}
                <strong className="text-bf-ink">
                  {themePreset || "—"}
                </strong>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {error ? (
        <p
          className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={back}>
            Back
          </Button>
        ) : null}
        {step < 3 ? (
          <Button type="button" variant="dark" className="flex-1" onClick={next}>
            Continue
          </Button>
        ) : (
          <Button
            type="submit"
            variant="dark"
            className="flex-1 py-3"
            disabled={status === "saving"}
          >
            {status === "saving"
              ? "Submitting…"
              : `Submit · WhatsApp ${BOOKFLO_WHATSAPP_DISPLAY}`}
          </Button>
        )}
      </div>

      <a
        href={mailto}
        className="mt-4 block text-center text-sm font-medium text-bf-accent hover:underline"
      >
        Or email {BOOKFLO_CONTACT_EMAIL}
      </a>
    </motion.form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.12em] text-bf-muted">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
