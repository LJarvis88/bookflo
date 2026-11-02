import type { Appointment } from "@/lib/types";

const PREFIX = "bookflo.demo.appointments.v1:";

function key(tenantSlug: string): string {
  return `${PREFIX}${tenantSlug}`;
}

export function readStoredAppointments(tenantSlug: string): Appointment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key(tenantSlug));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Appointment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeStoredAppointments(
  tenantSlug: string,
  appointments: Appointment[],
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key(tenantSlug), JSON.stringify(appointments));
}

/** Seed appointments + any client-created overlay (admin or public). */
export function mergeAppointments(
  seed: Appointment[],
  stored: Appointment[],
): Appointment[] {
  const byId = new Map<string, Appointment>();
  for (const apt of seed) byId.set(apt.id, apt);
  for (const apt of stored) byId.set(apt.id, apt);
  return [...byId.values()].sort((a, b) =>
    a.date === b.date
      ? a.startTime.localeCompare(b.startTime)
      : a.date.localeCompare(b.date),
  );
}

export function appendStoredAppointment(
  tenantSlug: string,
  appointment: Appointment,
): Appointment[] {
  const next = [...readStoredAppointments(tenantSlug), appointment];
  writeStoredAppointments(tenantSlug, next);
  return next;
}
