export function formatGBP(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: pence % 100 === 0 ? 0 : 2,
  }).format(pence / 100);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function formatDateLabel(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(d);
}

export function formatTimeRange(start: string, end: string): string {
  return `${start}–${end}`;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function weekdayLabel(weekday: number): string {
  return WEEKDAYS[weekday] ?? "";
}

/** Demo "today" pinned so fictional appointments stay coherent. */
export const DEMO_TODAY = "2026-10-30";
