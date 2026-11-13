import type { FoundingThemeId } from "@/data/founding-themes";
import { FOUNDING30_TAG } from "@/data/founding30";

export type Founding30Status =
  | "submitted"
  | "shortlisted"
  | "approved"
  | "rejected"
  | "waitlisted"
  | "code_issued";

/** Activation reserved for January — never set by v1 apply/admin. */
export type Founding30ActivationState = "pending_january" | "not_applicable";

export interface Founding30Application {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: Founding30Status;
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  notes: string;
  themePreset: FoundingThemeId | "";
  /** Always default false — never preselected in UI. */
  addonSms: boolean;
  addonQuiz: boolean;
  tag: string;
  source: string;
  accessCode: string | null;
  codeIssuedAt: string | null;
  /** Scaffold only — activation deferred. */
  activation: Founding30ActivationState;
  tenantSlug: string | null;
}

const STORAGE_KEY = "bookflo-founding30-applications";

export function newFounding30Id(): string {
  return `f30_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Format BF-XXXX-XXXX (A–Z0–9, no ambiguous I/O/0/1). */
export function generateAccessCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const chunk = (n: number) => {
    let out = "";
    for (let i = 0; i < n; i++) {
      out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
  };
  return `BF-${chunk(4)}-${chunk(4)}`;
}

export function createBlankApplication(
  partial: Partial<Founding30Application> &
    Pick<Founding30Application, "name">,
): Founding30Application {
  const now = new Date().toISOString();
  return {
    id: newFounding30Id(),
    createdAt: now,
    updatedAt: now,
    status: "submitted",
    name: partial.name.trim(),
    business: (partial.business ?? "").trim(),
    email: (partial.email ?? "").trim(),
    phone: (partial.phone ?? "").trim(),
    website: (partial.website ?? "").trim(),
    notes: (partial.notes ?? "").trim(),
    themePreset: partial.themePreset ?? "",
    addonSms: Boolean(partial.addonSms),
    addonQuiz: Boolean(partial.addonQuiz),
    tag: FOUNDING30_TAG,
    source: partial.source?.trim() || "founding-30",
    accessCode: null,
    codeIssuedAt: null,
    activation: "pending_january",
    tenantSlug: null,
  };
}

export function readLocalFounding30(): Founding30Application[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Founding30Application[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeLocalFounding30(apps: Founding30Application[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function appendLocalFounding30(app: Founding30Application): void {
  const next = [...readLocalFounding30(), app];
  writeLocalFounding30(next);
}

export function upsertLocalFounding30(app: Founding30Application): void {
  const list = readLocalFounding30();
  const idx = list.findIndex((a) => a.id === app.id);
  if (idx >= 0) list[idx] = app;
  else list.push(app);
  writeLocalFounding30(list);
}

export function founding30ToCsv(apps: Founding30Application[]): string {
  const header = [
    "id",
    "createdAt",
    "updatedAt",
    "status",
    "name",
    "business",
    "email",
    "phone",
    "website",
    "notes",
    "themePreset",
    "addonSms",
    "addonQuiz",
    "tag",
    "source",
    "accessCode",
    "codeIssuedAt",
    "activation",
  ];
  const rows = apps.map((a) =>
    [
      a.id,
      a.createdAt,
      a.updatedAt,
      a.status,
      a.name,
      a.business,
      a.email,
      a.phone,
      a.website,
      a.notes,
      a.themePreset,
      a.addonSms ? "yes" : "no",
      a.addonQuiz ? "yes" : "no",
      a.tag,
      a.source,
      a.accessCode ?? "",
      a.codeIssuedAt ?? "",
      a.activation,
    ]
      .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}

/** Dual-write helper from Christmas partner lead shape. */
export function applicationFromPartnerLead(input: {
  name: string;
  business?: string;
  email?: string;
  phone?: string;
  notes?: string;
  id?: string;
  createdAt?: string;
}): Founding30Application {
  const app = createBlankApplication({
    name: input.name,
    business: input.business,
    email: input.email,
    phone: input.phone,
    notes: input.notes,
    source: "christmas-partner",
  });
  if (input.id) app.id = `f30_from_${input.id}`;
  if (input.createdAt) {
    app.createdAt = input.createdAt;
    app.updatedAt = input.createdAt;
  }
  return app;
}
