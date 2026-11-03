"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { getOmsSlotsForService } from "@/data/oh-my-social-media";
import { BOOKING_SLOTS } from "@/data/contour-preston";
import {
  addMinutesToTime,
  availableStartSlots,
  hasStaffOverlap,
} from "@/lib/booking-overlap";
import { formatDuration, formatGBP } from "@/lib/format";
import type { Appointment, Tenant } from "@/lib/types";

const DATE_OPTIONS_OMS = [
  "2026-10-30",
  "2026-10-31",
  "2026-11-01",
  "2026-11-02",
  "2026-11-03",
  "2026-11-04",
  "2026-11-05",
  "2026-11-06",
  "2026-11-07",
];

const DATE_OPTIONS_CONTOUR = [
  "2026-10-30",
  "2026-10-31",
  "2026-11-01",
  "2026-11-03",
  "2026-11-04",
];

type Props = {
  tenant: Tenant;
  defaultDate: string;
  onClose: () => void;
  onCreate: (apt: Appointment) => { ok: true } | { ok: false; error: string };
};

export function CreateBookingModal({
  tenant,
  defaultDate,
  onClose,
  onCreate,
}: Props) {
  const isOms = tenant.slug === "oh-my-social-media";
  // Hide temporary Stripe smoke SKU from Tee’s diary Add flow.
  const activeServices = tenant.services.filter(
    (s) => s.active && s.id !== "oms_svc_live_smoke",
  );
  const activeStaff = tenant.staff.filter((s) => s.active);
  const dateOptions = isOms ? DATE_OPTIONS_OMS : DATE_OPTIONS_CONTOUR;

  const [serviceId, setServiceId] = useState(activeServices[0]?.id ?? "");
  const [staffId, setStaffId] = useState(activeStaff[0]?.id ?? "");
  const [date, setDate] = useState(
    dateOptions.includes(defaultDate) ? defaultDate : dateOptions[0],
  );
  const [startTime, setStartTime] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const service = activeServices.find((s) => s.id === serviceId);
  const candidateStarts = useMemo(() => {
    if (!service) return [] as string[];
    const raw = isOms ? getOmsSlotsForService(serviceId) : [...BOOKING_SLOTS];
    return availableStartSlots({
      appointments: tenant.appointments,
      staffId,
      date,
      durationMinutes: service.durationMinutes,
      candidateStarts: raw,
    });
  }, [tenant.appointments, staffId, date, service, serviceId, isOms]);

  // Keep selection valid when staff/date/service changes.
  const effectiveStart =
    startTime && candidateStarts.includes(startTime)
      ? startTime
      : (candidateStarts[0] ?? "");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!service || !staffId || !date || !effectiveStart) {
      setError("Choose service, team member, date, and an open time.");
      return;
    }
    if (!clientName.trim()) {
      setError("Client name is required.");
      return;
    }

    const endTime = addMinutesToTime(effectiveStart, service.durationMinutes);
    if (
      hasStaffOverlap({
        appointments: tenant.appointments,
        staffId,
        date,
        startTime: effectiveStart,
        endTime,
      })
    ) {
      setError("That time overlaps an existing booking for this team member.");
      return;
    }

    const apt: Appointment = {
      id: `admin_${tenant.slug.slice(0, 3)}_${Date.now()}`,
      serviceId: service.id,
      staffId,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim(),
      date,
      startTime: effectiveStart,
      endTime,
      status: "confirmed",
      notes: notes.trim() || undefined,
      pricePence: service.pricePence,
    };

    const result = onCreate(apt);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-booking-title"
    >
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-bf-line px-5 py-4">
          <div>
            <h2
              id="create-booking-title"
              className="font-display text-xl font-semibold tracking-tight"
            >
              Add booking
            </h2>
            <p className="mt-0.5 text-sm text-bf-muted">
              Put a client in the {tenant.name} diary — refuses overlapping times.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-bf-muted hover:bg-bf-fog hover:text-bf-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4 px-5 py-5">
          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Service</span>
            <select
              className="field w-full"
              value={serviceId}
              onChange={(e) => {
                setServiceId(e.target.value);
                setStartTime("");
              }}
            >
              {activeServices.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {formatDuration(s.durationMinutes)} ·{" "}
                  {formatGBP(s.pricePence)}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Team member</span>
            <select
              className="field w-full"
              value={staffId}
              onChange={(e) => {
                setStaffId(e.target.value);
                setStartTime("");
              }}
            >
              {activeStaff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {s.role}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Date</span>
              <select
                className="field w-full"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setStartTime("");
                }}
              >
                {dateOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Start time</span>
              <select
                className="field w-full"
                value={effectiveStart}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={candidateStarts.length === 0}
              >
                {candidateStarts.length === 0 ? (
                  <option value="">No open slots</option>
                ) : (
                  candidateStarts.map((t) => (
                    <option key={t} value={t}>
                      {t}
                      {service
                        ? `–${addMinutesToTime(t, service.durationMinutes)}`
                        : ""}
                    </option>
                  ))
                )}
              </select>
            </label>
          </div>

          {candidateStarts.length === 0 && (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              No open times for this team member on that day — pick another
              person or date (overlaps are blocked).
            </p>
          )}

          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Client name</span>
            <input
              className="field w-full"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Email</span>
              <input
                className="field w-full"
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="block space-y-1.5 text-sm">
              <span className="font-medium">Phone</span>
              <input
                className="field w-full"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
          </div>

          <label className="block space-y-1.5 text-sm">
            <span className="font-medium">Notes</span>
            <textarea
              className="field w-full min-h-[72px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>

          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-bf-line px-4 py-2 text-sm text-bf-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={candidateStarts.length === 0}
              className="rounded-full bg-bf-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Save booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
