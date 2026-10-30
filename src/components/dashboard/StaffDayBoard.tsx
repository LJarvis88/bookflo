"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import { getService } from "@/data/tenants";
import { DEMO_TODAY, formatTimeRange } from "@/lib/format";
import type { Appointment, StaffMember } from "@/lib/types";

const DAY_OPTIONS = [
  { date: "2026-10-30", label: "Thu 30 Oct" },
  { date: "2026-10-31", label: "Fri 31 Oct" },
  { date: "2026-11-01", label: "Sat 1 Nov" },
  { date: "2026-11-03", label: "Mon 3 Nov" },
  { date: "2026-11-04", label: "Tue 4 Nov" },
];

/** Soft pastels for Contour staff columns (Fresha-like admin, not booking brand). */
const CONTOUR_PASTELS: Record<string, { bg: string; border: string; text: string }> = {
  staff_amelia: { bg: "#F8E8E4", border: "#E8C4BC", text: "#5C3D4A" },
  staff_noah: { bg: "#E4EEF8", border: "#B8CEE4", text: "#2F4A66" },
  staff_priya: { bg: "#D7E8F0", border: "#A2BECC", text: "#3D5A68" },
};

/** OMS staff pastels — magenta / orange / rose soft fills. */
const OMS_PASTELS: Record<string, { bg: string; border: string; text: string }> = {
  oms_staff_tee: { bg: "#FCE4F0", border: "#F5B6D4", text: "#8B0A4A" },
  oms_staff_jaz: { bg: "#FFE8D6", border: "#FFC399", text: "#9A3A00" },
  oms_staff_mina: { bg: "#F8E0EA", border: "#E8B0C8", text: "#6B2A48" },
};

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const PX_PER_MIN = 1.35;
const DAY_START_MIN = 9 * 60;
const DAY_END_MIN = 18 * 60;
const GRID_HEIGHT = (DAY_END_MIN - DAY_START_MIN) * PX_PER_MIN;

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function pastelFor(staffId: string) {
  return (
    CONTOUR_PASTELS[staffId] ??
    OMS_PASTELS[staffId] ?? { bg: "#F0F0F0", border: "#D5D5D5", text: "#333" }
  );
}

function AppointmentBlock({
  apt,
  compact = false,
}: {
  apt: Appointment;
  compact?: boolean;
}) {
  const tenant = useDemoTenant();
  const service = getService(tenant, apt.serviceId);
  const pastel = pastelFor(apt.staffId);
  const start = toMinutes(apt.startTime);
  const end = toMinutes(apt.endTime);
  const top = (start - DAY_START_MIN) * PX_PER_MIN;
  const height = Math.max((end - start) * PX_PER_MIN, 36);

  if (compact) {
    return (
      <div
        className="rounded-xl border px-3 py-2.5"
        style={{ background: pastel.bg, borderColor: pastel.border, color: pastel.text }}
      >
        <p className="text-xs font-semibold tabular-nums">
          {formatTimeRange(apt.startTime, apt.endTime)}
        </p>
        <p className="mt-0.5 text-sm font-medium">{apt.clientName}</p>
        <p className="text-xs opacity-80">{service?.name}</p>
      </div>
    );
  }

  return (
    <div
      className="absolute left-1 right-1 overflow-hidden rounded-lg border px-2 py-1.5 shadow-sm"
      style={{
        top,
        height,
        background: pastel.bg,
        borderColor: pastel.border,
        color: pastel.text,
      }}
    >
      <p className="truncate text-[11px] font-semibold leading-tight tabular-nums">
        {formatTimeRange(apt.startTime, apt.endTime)}
      </p>
      <p className="truncate text-xs font-medium leading-tight">{apt.clientName}</p>
      {height > 48 && (
        <p className="truncate text-[11px] leading-tight opacity-75">{service?.name}</p>
      )}
    </div>
  );
}

function StaffAvatar({ staff }: { staff: StaffMember }) {
  const pastel = pastelFor(staff.id);
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
      style={{
        background: pastel.bg,
        color: pastel.text,
      }}
    >
      {staff.initials}
    </div>
  );
}

export function StaffDayBoard() {
  const tenant = useDemoTenant();
  const [dayIndex, setDayIndex] = useState(
    Math.max(
      0,
      DAY_OPTIONS.findIndex((d) => d.date === DEMO_TODAY),
    ),
  );
  const day = DAY_OPTIONS[dayIndex] ?? DAY_OPTIONS[0];

  const dayAppts = useMemo(
    () =>
      tenant.appointments
        .filter((a) => a.date === day.date)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [tenant.appointments, day.date],
  );

  const activeStaff = tenant.staff.filter((s) => s.active);

  const goPrev = () => setDayIndex((i) => Math.max(0, i - 1));
  const goNext = () => setDayIndex((i) => Math.min(DAY_OPTIONS.length - 1, i + 1));

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={dayIndex === 0}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bf-line bg-white text-bf-ink disabled:opacity-30"
            aria-label="Previous day"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {day.label}
            </h1>
            <p className="text-sm text-bf-muted">
              {dayAppts.length} appointment{dayAppts.length === 1 ? "" : "s"} · {tenant.name}
            </p>
          </div>
          <button
            type="button"
            onClick={goNext}
            disabled={dayIndex === DAY_OPTIONS.length - 1}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bf-line bg-white text-bf-ink disabled:opacity-30"
            aria-label="Next day"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/book/${tenant.slug}`}
            className="hidden rounded-full border border-bf-line bg-white px-4 py-2 text-sm text-bf-ink hover:border-bf-ink/20 sm:inline-flex"
          >
            Share link
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-bf-ink px-4 py-2 text-sm font-medium text-white"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </header>

      <div className="hidden overflow-x-auto rounded-2xl border border-bf-line bg-white md:block">
        <div
          className="grid min-w-[720px]"
          style={{ gridTemplateColumns: `56px repeat(${activeStaff.length}, minmax(160px, 1fr))` }}
        >
          <div className="border-b border-bf-line bg-bf-mist/40" />
          {activeStaff.map((staff) => (
            <div
              key={staff.id}
              className="flex items-center gap-2.5 border-b border-l border-bf-line px-3 py-3"
            >
              <StaffAvatar staff={staff} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{staff.name.split(" ")[0]}</p>
                <p className="truncate text-xs text-bf-muted">{staff.role}</p>
              </div>
            </div>
          ))}

          <div className="relative border-bf-line" style={{ height: GRID_HEIGHT }}>
            {HOURS.map((h) => {
              const top = (toMinutes(h) - DAY_START_MIN) * PX_PER_MIN;
              return (
                <div
                  key={h}
                  className="absolute right-2 -translate-y-1/2 text-[10px] tabular-nums text-bf-muted"
                  style={{ top }}
                >
                  {h}
                </div>
              );
            })}
          </div>

          {activeStaff.map((staff) => {
            const appts = dayAppts.filter((a) => a.staffId === staff.id);
            return (
              <div
                key={staff.id}
                className="relative border-l border-bf-line"
                style={{ height: GRID_HEIGHT }}
              >
                {HOURS.map((h) => {
                  const top = (toMinutes(h) - DAY_START_MIN) * PX_PER_MIN;
                  return (
                    <div
                      key={h}
                      className="pointer-events-none absolute inset-x-0 border-t border-bf-line/60"
                      style={{ top }}
                    />
                  );
                })}
                {appts.map((apt) => (
                  <AppointmentBlock key={apt.id} apt={apt} />
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6 md:hidden">
        {activeStaff.map((staff) => {
          const appts = dayAppts.filter((a) => a.staffId === staff.id);
          if (appts.length === 0) return null;
          return (
            <section key={staff.id}>
              <div className="mb-3 flex items-center gap-2.5">
                <StaffAvatar staff={staff} />
                <div>
                  <p className="text-sm font-medium">{staff.name}</p>
                  <p className="text-xs text-bf-muted">
                    {appts.length} appointment{appts.length === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {appts.map((apt) => (
                  <AppointmentBlock key={apt.id} apt={apt} compact />
                ))}
              </div>
            </section>
          );
        })}
        {dayAppts.length === 0 && (
          <p className="rounded-2xl border border-dashed border-bf-line bg-white px-4 py-10 text-center text-sm text-bf-muted">
            No appointments this day
          </p>
        )}
      </div>
    </div>
  );
}
