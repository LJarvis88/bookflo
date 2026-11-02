import type { Appointment } from "@/lib/types";

/** Parse "HH:mm" to minutes from midnight. */
export function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function minutesToTime(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function addMinutesToTime(start: string, minutes: number): string {
  return minutesToTime(timeToMinutes(start) + minutes);
}

/** Half-open style: [start, end) overlaps if start < otherEnd && otherStart < end. */
export function rangesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string,
): boolean {
  return timeToMinutes(startA) < timeToMinutes(endB) && timeToMinutes(startB) < timeToMinutes(endA);
}

const BLOCKING: Appointment["status"][] = ["confirmed", "pending"];

export function isBlockingAppointment(apt: Appointment): boolean {
  return BLOCKING.includes(apt.status);
}

/**
 * True if staff already has a blocking appointment on this date overlapping [start, end).
 */
export function hasStaffOverlap(opts: {
  appointments: Appointment[];
  staffId: string;
  date: string;
  startTime: string;
  endTime: string;
  excludeId?: string;
}): boolean {
  const { appointments, staffId, date, startTime, endTime, excludeId } = opts;
  return appointments.some(
    (apt) =>
      apt.staffId === staffId &&
      apt.date === date &&
      apt.id !== excludeId &&
      isBlockingAppointment(apt) &&
      rangesOverlap(startTime, endTime, apt.startTime, apt.endTime),
  );
}

/** Filter start slots that would overlap an existing booking for this staff/date/duration. */
export function availableStartSlots(opts: {
  appointments: Appointment[];
  staffId: string;
  date: string;
  durationMinutes: number;
  candidateStarts: string[];
}): string[] {
  const { appointments, staffId, date, durationMinutes, candidateStarts } = opts;
  return candidateStarts.filter((start) => {
    const end = addMinutesToTime(start, durationMinutes);
    return !hasStaffOverlap({
      appointments,
      staffId,
      date,
      startTime: start,
      endTime: end,
    });
  });
}
