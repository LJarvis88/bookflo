/** Client + server shapes for Christmas partner interest leads. */

export interface PartnerInterestLead {
  id: string;
  createdAt: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  notes: string;
  tag: string;
  source: string;
}

const STORAGE_KEY = "bookflo-partner-interests";

export function newLeadId(): string {
  return `pi_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function readLocalPartnerInterests(): PartnerInterestLead[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PartnerInterestLead[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendLocalPartnerInterest(lead: PartnerInterestLead): void {
  if (typeof window === "undefined") return;
  const next = [...readLocalPartnerInterests(), lead];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function partnerInterestsToCsv(leads: PartnerInterestLead[]): string {
  const header = [
    "id",
    "createdAt",
    "name",
    "business",
    "email",
    "phone",
    "notes",
    "tag",
    "source",
  ];
  const rows = leads.map((l) =>
    [
      l.id,
      l.createdAt,
      l.name,
      l.business,
      l.email,
      l.phone,
      l.notes,
      l.tag,
      l.source,
    ]
      .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return [header.join(","), ...rows].join("\n");
}
