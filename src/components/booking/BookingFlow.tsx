"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BOOKING_SLOTS,
  DEMO_AVAILABLE_DATES,
  contourPreston,
} from "@/data/contour-preston";
import {
  getOmsSlotsForService,
  OMS_AVAILABLE_DATES,
} from "@/data/oh-my-social-media";
import { getService, getStaff } from "@/data/tenants";
import { TenantLogo } from "@/components/branding/TenantLogo";
import { InstallAppCard } from "@/components/pwa/InstallAppCard";
import { formatDateLabel, formatDuration, formatGBP } from "@/lib/format";
import { getTenantPwa } from "@/lib/pwa";
import type { BrandTokens, Tenant } from "@/lib/types";
import { ArrowLeft, Check } from "lucide-react";

type Step =
  | "category"
  | "service"
  | "staff"
  | "date"
  | "time"
  | "contact"
  | "review"
  | "confirmed";

const STEP_ORDER: Step[] = [
  "category",
  "service",
  "staff",
  "date",
  "time",
  "contact",
  "review",
  "confirmed",
];

export function BookingFlow({ tenant = contourPreston }: { tenant?: Tenant }) {
  const brand = tenant.brand;
  const refPrefix = tenant.slug === "oh-my-social-media" ? "OMS" : "CP";

  const [step, setStep] = useState<Step>("category");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [staffId, setStaffId] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [refCode, setRefCode] = useState("");

  const services = useMemo(
    () => tenant.services.filter((s) => s.categoryId === categoryId && s.active),
    [categoryId, tenant.services],
  );

  const service = serviceId ? getService(tenant, serviceId) : undefined;
  const staff = staffId ? getStaff(tenant, staffId) : undefined;

  const availableDates =
    tenant.slug === "oh-my-social-media"
      ? [...OMS_AVAILABLE_DATES]
      : DEMO_AVAILABLE_DATES;

  const bookingSlots =
    tenant.slug === "oh-my-social-media"
      ? getOmsSlotsForService(serviceId)
      : BOOKING_SLOTS;

  const stepIndex = STEP_ORDER.indexOf(step);

  function go(next: Step) {
    setStep(next);
  }

  function back() {
    if (stepIndex <= 0) return;
    go(STEP_ORDER[stepIndex - 1]);
  }

  function confirm() {
    setRefCode(`${refPrefix}-${Math.floor(100000 + Math.random() * 900000)}`);
    go("confirmed");
  }

  const surface = brand.surface ?? brand.secondary;
  const cssVars = {
    ["--tenant-bg" as string]: brand.background,
    ["--tenant-ink" as string]: brand.ink,
    ["--tenant-primary" as string]: brand.primary,
    ["--tenant-secondary" as string]: brand.secondary,
    ["--tenant-muted" as string]: brand.muted,
    ["--tenant-button" as string]: brand.buttonBg,
    ["--tenant-button-text" as string]: brand.buttonText,
  };

  return (
    <div
      className="min-h-screen"
      style={{
        ...cssVars,
        background: brand.background,
        color: brand.ink,
        fontFamily: `var(--font-tenant-body), system-ui, sans-serif`,
      }}
    >
      <header
        className="relative w-full border-b"
        style={{
          // Contour: Deep Ink → Midnight Navy (brand kit, not flat black).
          // OMS: pure white customer-facing header.
          background:
            tenant.slug === "contour-preston"
              ? `linear-gradient(160deg, ${brand.background} 0%, ${brand.secondary} 100%)`
              : brand.background,
          borderColor: `${brand.primary}33`,
        }}
      >
        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3 px-5 py-8 sm:py-10">
          <TenantLogo
            brand={brand}
            size="hero"
            className="object-center max-w-[280px] sm:max-w-[320px]"
          />
          <p className="text-center text-sm" style={{ color: brand.muted }}>
            {brand.tagline}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-md px-5 py-6 pb-28">
        {step !== "confirmed" && (
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={stepIndex === 0}
              className="inline-flex items-center gap-1 text-sm disabled:opacity-30"
              style={{ color: brand.muted }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <p className="text-xs uppercase tracking-[0.14em]" style={{ color: brand.muted }}>
              {stepIndex + 1} / {STEP_ORDER.length - 1}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22 }}
          >
            {step === "category" && (
              <Block title="What are you looking for?">
                <div className="space-y-2">
                  {tenant.categories.map((cat) => (
                    <Choice
                      key={cat.id}
                      label={cat.name}
                      active={categoryId === cat.id}
                      onClick={() => {
                        setCategoryId(cat.id);
                        setServiceId(null);
                        go("service");
                      }}
                      brand={brand}
                    />
                  ))}
                </div>
              </Block>
            )}

            {step === "service" && (
              <Block title="Choose a service">
                <div className="space-y-2">
                  {services.map((svc) => (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => {
                        setServiceId(svc.id);
                        go("staff");
                      }}
                      className="flex w-full flex-col gap-1 rounded-2xl px-4 py-3.5 text-left transition"
                      style={{
                        background: serviceId === svc.id ? `${brand.primary}22` : surface,
                        outline:
                          serviceId === svc.id
                            ? `1px solid ${brand.primary}88`
                            : `1px solid ${brand.primary}22`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-medium">{svc.name}</span>
                        <span className="shrink-0 text-sm">{formatGBP(svc.pricePence)}</span>
                      </div>
                      <p className="text-sm" style={{ color: brand.muted }}>
                        {formatDuration(svc.durationMinutes)} · {svc.description}
                      </p>
                    </button>
                  ))}
                </div>
              </Block>
            )}

            {step === "staff" && (
              <Block title="Who would you like?">
                <div className="space-y-2">
                  <Choice
                    label="Anyone available"
                    hint="We’ll match you to the next open specialist"
                    active={staffId === "anyone"}
                    onClick={() => {
                      setStaffId(tenant.staff[0].id);
                      go("date");
                    }}
                    brand={brand}
                  />
                  {tenant.staff.filter((s) => s.active).map((member) => (
                    <Choice
                      key={member.id}
                      label={member.name}
                      hint={member.role}
                      active={staffId === member.id}
                      onClick={() => {
                        setStaffId(member.id);
                        go("date");
                      }}
                      brand={brand}
                      avatar={member.initials}
                      avatarColor={member.color}
                    />
                  ))}
                </div>
              </Block>
            )}

            {step === "date" && (
              <Block title="Pick a date">
                {tenant.slug === "oh-my-social-media" && (
                  <p className="mb-3 text-sm" style={{ color: brand.muted }}>
                    Available any day of the week
                  </p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  {availableDates.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setDate(d);
                        setTime(null);
                        go("time");
                      }}
                      className="rounded-2xl px-3 py-4 text-left text-sm transition"
                      style={{
                        background: date === d ? `${brand.primary}22` : surface,
                        outline:
                          date === d
                            ? `1px solid ${brand.primary}88`
                            : `1px solid ${brand.primary}22`,
                      }}
                    >
                      {formatDateLabel(d)}
                    </button>
                  ))}
                </div>
              </Block>
            )}

            {step === "time" && (
              <Block title="Pick a time">
                {tenant.slug === "oh-my-social-media" && serviceId === "oms_svc_studio_2h" && (
                  <p className="mb-3 text-sm" style={{ color: brand.muted }}>
                    Studio slots: 10:00, 12:00, or 14:00
                  </p>
                )}
                <div className="grid grid-cols-3 gap-2">
                  {bookingSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setTime(slot);
                        go("contact");
                      }}
                      className="rounded-xl py-3 text-sm font-medium transition"
                      style={{
                        background: time === slot ? brand.primary : surface,
                        color: time === slot ? brand.buttonText : brand.ink,
                        outline: time === slot ? "none" : `1px solid ${brand.primary}22`,
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </Block>
            )}

            {step === "contact" && (
              <Block title="Your details">
                <div className="space-y-3">
                  <label className="block space-y-1.5 text-sm">
                    <span>Name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="tenant-field"
                      placeholder="Sophie Langley"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm">
                    <span>Email</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="tenant-field"
                      placeholder="you@example.com"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm">
                    <span>Phone</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="tenant-field"
                      placeholder="07xxx xxxxxx"
                    />
                  </label>
                  <label className="block space-y-1.5 text-sm">
                    <span>Notes (optional)</span>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="tenant-field min-h-[80px] resize-none"
                      placeholder="Allergies, preferences…"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={!name.trim() || !email.includes("@") || phone.trim().length < 7}
                    onClick={() => go("review")}
                    className="mt-2 w-full rounded-full py-3 text-sm font-medium disabled:opacity-40"
                    style={{ background: brand.buttonBg, color: brand.buttonText }}
                  >
                    Review booking
                  </button>
                </div>
              </Block>
            )}

            {step === "review" && service && staff && date && time && (
              <Block title="Review & confirm">
                <div
                  className="space-y-3 rounded-2xl p-4 text-sm"
                  style={{ background: surface, outline: `1px solid ${brand.primary}22` }}
                >
                  <Row label="Service" value={service.name} muted={brand.muted} />
                  <Row label="Duration" value={formatDuration(service.durationMinutes)} muted={brand.muted} />
                  <Row label="With" value={staff.name} muted={brand.muted} />
                  <Row label="When" value={`${formatDateLabel(date)} · ${time}`} muted={brand.muted} />
                  <Row label="Price" value={formatGBP(service.pricePence)} muted={brand.muted} />
                  <Row label="Name" value={name} muted={brand.muted} />
                  <Row label="Contact" value={`${email} · ${phone}`} muted={brand.muted} />
                  {notes && <Row label="Notes" value={notes} muted={brand.muted} />}
                </div>
                <p className="mt-3 text-xs" style={{ color: brand.muted }}>
                  Pay at venue · No card required in this demo
                </p>
                <button
                  type="button"
                  onClick={confirm}
                  className="mt-4 w-full rounded-full py-3 text-sm font-medium"
                  style={{ background: brand.buttonBg, color: brand.buttonText }}
                >
                  Confirm booking
                </button>
              </Block>
            )}

            {step === "confirmed" && service && date && time && (
              <div className="text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: `${brand.primary}22`, color: brand.primary }}
                >
                  <Check className="h-6 w-6" />
                </div>
                <h2
                  className="mt-5 text-3xl tracking-tight"
                  style={{ fontFamily: `var(--font-tenant-display), Georgia, serif` }}
                >
                  You’re booked
                </h2>
                <p className="mt-2 text-sm" style={{ color: brand.muted }}>
                  Reference {refCode}
                </p>
                <div
                  className="mt-8 space-y-2 rounded-2xl p-5 text-left text-sm"
                  style={{ background: surface, outline: `1px solid ${brand.primary}22` }}
                >
                  <Row label="Service" value={service.name} muted={brand.muted} />
                  <Row
                    label="When"
                    value={`${formatDateLabel(date)} · ${time}`}
                    muted={brand.muted}
                  />
                  <Row label="Where" value={tenant.address} muted={brand.muted} />
                </div>
                <p className="mt-6 text-xs" style={{ color: brand.muted }}>
                  Confirmation email is mocked in this prototype.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {getTenantPwa(tenant.slug) ? (
        <div className="mx-auto w-full max-w-md px-5 pb-4">
          <InstallAppCard
            pwa={getTenantPwa(tenant.slug)!}
            tone="tenant"
            brandPrimary={brand.primary}
            brandInk={brand.ink}
            brandSurface={surface}
            brandMuted={brand.muted}
          />
        </div>
      ) : null}

      <footer
        className="border-t px-5 py-6 text-center text-xs"
        style={{ borderColor: `${brand.primary}22`, color: brand.muted }}
      >
        <p>
          {tenant.address} · {tenant.phone}
        </p>
        <p className="mt-2 opacity-70">Booking powered by BOOKFLO</p>
      </footer>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2
        className="mb-5 text-2xl tracking-tight"
        style={{
          fontFamily: `var(--font-tenant-display), var(--font-syne), Georgia, serif`,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Choice({
  label,
  hint,
  active,
  onClick,
  brand,
  avatar,
  avatarColor,
}: {
  label: string;
  hint?: string;
  active: boolean;
  onClick: () => void;
  brand: BrandTokens;
  avatar?: string;
  avatarColor?: string;
}) {
  const surface = brand.surface ?? brand.secondary;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition"
      style={{
        background: active ? `${brand.primary}22` : surface,
        outline: active ? `1px solid ${brand.primary}88` : `1px solid ${brand.primary}22`,
      }}
    >
      {avatar && (
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ background: avatarColor }}
        >
          {avatar}
        </span>
      )}
      <span>
        <span className="block font-medium">{label}</span>
        {hint && (
          <span className="block text-sm" style={{ color: brand.muted }}>
            {hint}
          </span>
        )}
      </span>
    </button>
  );
}

function Row({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted: string;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span style={{ color: muted }}>{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
