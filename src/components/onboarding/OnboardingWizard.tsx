"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LivePreview } from "@/components/branding/LivePreview";
import { TenantLogo } from "@/components/branding/TenantLogo";
import { CONTOUR_PRESTON_BRAND } from "@/data/contour-preston";
import type { BrandTokens, WorkingHours } from "@/lib/types";
import { formatGBP, weekdayLabel } from "@/lib/format";
import { Sparkles, Check } from "lucide-react";

const STEPS = [
  "Account",
  "Business",
  "Website",
  "Branding",
  "Services",
  "Hours",
  "Preview",
  "Publish",
] as const;

const defaultBrand: BrandTokens = {
  displayName: "Your salon",
  tagline: "Book your next appointment",
  description: "A calm space for beauty treatments tailored to you.",
  logoText: "YS",
  coverStyle: "sage",
  primary: "#1B6B5A",
  secondary: "#D7EBE4",
  background: "#F7F8FA",
  ink: "#0E1420",
  muted: "#5C6678",
  surface: "#FFFFFF",
  buttonBg: "#1B6B5A",
  buttonText: "#FFFFFF",
  fontHeading: "Syne",
  fontBody: "Manrope",
};

const defaultHours: WorkingHours[] = [
  { weekday: 0, open: null, close: null },
  { weekday: 1, open: "09:00", close: "18:00" },
  { weekday: 2, open: "09:00", close: "18:00" },
  { weekday: 3, open: "09:00", close: "18:00" },
  { weekday: 4, open: "09:00", close: "18:00" },
  { weekday: 5, open: "09:00", close: "17:00" },
  { weekday: 6, open: "10:00", close: "14:00" },
];

const starterServices = [
  { name: "Signature Facial", durationMinutes: 60, pricePence: 8500 },
  { name: "New Client Consultation", durationMinutes: 30, pricePence: 3500 },
  { name: "Express Glow", durationMinutes: 30, pricePence: 4500 },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [brand, setBrand] = useState<BrandTokens>(defaultBrand);
  const [services, setServices] = useState(starterServices);
  const [hours, setHours] = useState(defaultHours);
  const [aiApplied, setAiApplied] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;

  const canNext = useMemo(() => {
    if (step === 0) return ownerName.trim().length > 1 && email.includes("@");
    if (step === 1) return businessName.trim().length > 1;
    return true;
  }, [step, ownerName, email, businessName]);

  function applyAiBrandMatch() {
    const next: BrandTokens = {
      ...CONTOUR_PRESTON_BRAND,
      displayName: businessName || CONTOUR_PRESTON_BRAND.displayName,
      logoUrl: CONTOUR_PRESTON_BRAND.logoUrl,
      logoText: (businessName || "CP")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };
    setBrand(next);
    setAiApplied(true);
  }

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs text-bf-muted">
            <span>
              Step {step + 1} of {STEPS.length} · {STEPS[step]}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-bf-fog">
            <motion.div
              className="h-full bg-bf-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="min-h-[320px]"
          >
            {step === 0 && (
              <StepShell title="Create your account" subtitle="Demo only — nothing is stored.">
                <Field label="Your name">
                  <input
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="field"
                    placeholder="Amelia Hart"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field"
                    placeholder="you@salon.example"
                  />
                </Field>
                <Field label="Password">
                  <input type="password" className="field" defaultValue="demo-password" />
                </Field>
              </StepShell>
            )}

            {step === 1 && (
              <StepShell title="Business name" subtitle="This becomes your booking page title.">
                <Field label="Business name">
                  <input
                    value={businessName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setBusinessName(v);
                      setBrand((b) => ({
                        ...b,
                        displayName: v || b.displayName,
                        logoText: v
                          ? v
                              .split(" ")
                              .map((w) => w[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()
                          : b.logoText,
                      }));
                    }}
                    className="field"
                    placeholder="Contour Preston"
                  />
                </Field>
              </StepShell>
            )}

            {step === 2 && (
              <StepShell
                title="Website URL"
                subtitle="Optional. Used later for AI brand match suggestions."
              >
                <Field label="Website">
                  <input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="field"
                    placeholder="https://contourpreston.example"
                  />
                </Field>
              </StepShell>
            )}

            {step === 3 && (
              <StepShell
                title="Branding"
                subtitle="Tune tokens manually, or seed from the demo AI match."
              >
                <button
                  type="button"
                  onClick={applyAiBrandMatch}
                  className="mb-6 flex w-full items-center justify-between gap-3 rounded-2xl border border-dashed border-bf-accent/40 bg-bf-accent-soft/50 px-4 py-3 text-left transition hover:bg-bf-accent-soft"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 text-bf-accent" />
                    <div>
                      <p className="text-sm font-semibold text-bf-ink">
                        AI brand match — demo
                      </p>
                      <p className="text-xs text-bf-muted">
                        Fills Contour Preston sample tokens. Always overridable. Not live scraping.
                      </p>
                    </div>
                  </div>
                  {aiApplied && <Check className="h-4 w-4 text-bf-accent" />}
                </button>

                {brand.logoUrl && (
                  <div
                    className="mb-4 rounded-2xl border border-bf-line px-4 py-5"
                    style={{ background: brand.background }}
                  >
                    <p
                      className="mb-3 text-xs font-medium uppercase tracking-wider"
                      style={{ color: brand.muted }}
                    >
                      Matched logo (demo)
                    </p>
                    <TenantLogo brand={brand} size="lg" />
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Primary colour">
                    <input
                      type="color"
                      value={brand.primary}
                      onChange={(e) =>
                        setBrand((b) => ({
                          ...b,
                          primary: e.target.value,
                          buttonBg: e.target.value,
                        }))
                      }
                      className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
                    />
                  </Field>
                  <Field label="Secondary colour">
                    <input
                      type="color"
                      value={brand.secondary}
                      onChange={(e) => setBrand((b) => ({ ...b, secondary: e.target.value }))}
                      className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
                    />
                  </Field>
                  <Field label="Logo initials">
                    <input
                      value={brand.logoText}
                      onChange={(e) => setBrand((b) => ({ ...b, logoText: e.target.value }))}
                      className="field"
                      maxLength={3}
                    />
                  </Field>
                  <Field label="Heading font">
                    <select
                      value={brand.fontHeading}
                      onChange={(e) => setBrand((b) => ({ ...b, fontHeading: e.target.value }))}
                      className="field"
                    >
                      <option>Cormorant Garamond</option>
                      <option>Syne</option>
                      <option>Fraunces</option>
                      <option>Newsreader</option>
                    </select>
                  </Field>
                  <Field label="Tagline" className="sm:col-span-2">
                    <input
                      value={brand.tagline}
                      onChange={(e) => setBrand((b) => ({ ...b, tagline: e.target.value }))}
                      className="field"
                    />
                  </Field>
                </div>
              </StepShell>
            )}

            {step === 4 && (
              <StepShell title="Services & prices" subtitle="Start with a few — edit anytime.">
                <div className="space-y-3">
                  {services.map((svc, i) => (
                    <div
                      key={i}
                      className="grid gap-3 rounded-2xl border border-bf-line bg-white/70 p-4 sm:grid-cols-[1fr_100px_110px]"
                    >
                      <input
                        value={svc.name}
                        onChange={(e) => {
                          const next = [...services];
                          next[i] = { ...svc, name: e.target.value };
                          setServices(next);
                        }}
                        className="field"
                      />
                      <input
                        type="number"
                        value={svc.durationMinutes}
                        onChange={(e) => {
                          const next = [...services];
                          next[i] = { ...svc, durationMinutes: Number(e.target.value) };
                          setServices(next);
                        }}
                        className="field"
                        aria-label="Duration minutes"
                      />
                      <input
                        type="number"
                        value={svc.pricePence / 100}
                        onChange={(e) => {
                          const next = [...services];
                          next[i] = {
                            ...svc,
                            pricePence: Math.round(Number(e.target.value) * 100),
                          };
                          setServices(next);
                        }}
                        className="field"
                        aria-label="Price GBP"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-bf-muted">
                  Columns: name · duration (min) · price (£)
                </p>
              </StepShell>
            )}

            {step === 5 && (
              <StepShell title="Opening hours" subtitle="Weekly schedule for availability.">
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div
                      key={h.weekday}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-bf-line bg-white/70 px-3 py-2.5"
                    >
                      <span className="w-10 text-sm font-medium">{weekdayLabel(h.weekday)}</span>
                      <label className="flex items-center gap-2 text-sm text-bf-muted">
                        <input
                          type="checkbox"
                          checked={!!h.open}
                          onChange={(e) => {
                            setHours((prev) =>
                              prev.map((row) =>
                                row.weekday === h.weekday
                                  ? e.target.checked
                                    ? { ...row, open: "09:00", close: "18:00" }
                                    : { ...row, open: null, close: null }
                                  : row,
                              ),
                            );
                          }}
                        />
                        Open
                      </label>
                      {h.open && (
                        <>
                          <input
                            type="time"
                            value={h.open}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((row) =>
                                  row.weekday === h.weekday
                                    ? { ...row, open: e.target.value }
                                    : row,
                                ),
                              )
                            }
                            className="field !w-auto"
                          />
                          <span className="text-bf-muted">to</span>
                          <input
                            type="time"
                            value={h.close ?? "18:00"}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((row) =>
                                  row.weekday === h.weekday
                                    ? { ...row, close: e.target.value }
                                    : row,
                                ),
                              )
                            }
                            className="field !w-auto"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </StepShell>
            )}

            {step === 6 && (
              <StepShell title="Preview" subtitle="This is how clients will meet your brand.">
                <div className="max-w-sm">
                  <LivePreview brand={brand} />
                </div>
                <ul className="mt-6 space-y-2 text-sm text-bf-muted">
                  <li>{services.length} services · from {formatGBP(Math.min(...services.map((s) => s.pricePence)))}</li>
                  <li>
                    Open{" "}
                    {hours
                      .filter((h) => h.open)
                      .map((h) => weekdayLabel(h.weekday))
                      .join(", ")}
                  </li>
                  {websiteUrl && <li>Website: {websiteUrl}</li>}
                </ul>
              </StepShell>
            )}

            {step === 7 && (
              <StepShell
                title="Ready to publish"
                subtitle="Publishing is simulated — opens the Contour Preston demo dashboard."
              >
                <div className="rounded-2xl border border-bf-line bg-white/80 p-5">
                  <p className="font-display text-2xl font-semibold tracking-tight">
                    {brand.displayName || businessName || "Your salon"}
                  </p>
                  <p className="mt-2 text-sm text-bf-muted">
                    Share link (demo): /book/contour-preston
                  </p>
                </div>
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between gap-3">
          <Button type="button" variant="ghost" onClick={back} disabled={step === 0}>
            Back
          </Button>
          {step < STEPS.length - 1 ? (
            <Button type="button" variant="dark" onClick={next} disabled={!canNext}>
              Continue
            </Button>
          ) : (
            <Button type="button" variant="dark" onClick={() => router.push("/dashboard")}>
              Publish booking page
            </Button>
          )}
        </div>
      </div>

      <aside className="hidden lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-bf-muted">
          Live preview
        </p>
        <LivePreview brand={brand} compact />
      </aside>
    </div>
  );
}

function StepShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      <p className="mt-2 text-bf-muted">{subtitle}</p>
      <div className="mt-8 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-1.5 text-sm ${className}`}>
      <span className="font-medium text-bf-ink">{label}</span>
      {children}
    </label>
  );
}
