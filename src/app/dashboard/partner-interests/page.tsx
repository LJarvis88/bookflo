"use client";

import { useEffect, useState } from "react";
import {
  partnerInterestsToCsv,
  readLocalPartnerInterests,
  type PartnerInterestLead,
} from "@/lib/partner-interest-store";
import { partnerInterestApiUrl } from "@/lib/partner-api";

/**
 * Luke/Bob review surface for Christmas partner leads.
 * Merges localStorage (this browser) + API JSONL when Node host is up.
 */
export default function PartnerInterestsPage() {
  const [leads, setLeads] = useState<PartnerInterestLead[]>([]);
  const [sourceNote, setSourceNote] = useState("Loading…");

  useEffect(() => {
    const local = readLocalPartnerInterests();
    setLeads(local);
    setSourceNote(
      local.length
        ? `${local.length} in this browser (localStorage)`
        : "No local leads yet",
    );

    void (async () => {
      try {
        const res = await fetch(partnerInterestApiUrl("/api/partner-interest"));
        if (!res.ok) return;
        const data = (await res.json()) as {
          leads?: PartnerInterestLead[];
        };
        const remote = data.leads ?? [];
        if (!remote.length) return;
        const byId = new Map<string, PartnerInterestLead>();
        for (const lead of [...remote, ...local]) {
          byId.set(lead.id, lead);
        }
        const merged = [...byId.values()].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1,
        );
        setLeads(merged);
        setSourceNote(
          `${merged.length} leads (API + localStorage) · export CSV below`,
        );
      } catch {
        // Static host — local only.
      }
    })();
  }, []);

  function downloadCsv() {
    const csv = partnerInterestsToCsv(leads);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookflo-partner-interests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Partner interests
          </h1>
          <p className="mt-1 text-sm text-bf-muted">{sourceNote}</p>
        </div>
        <button
          type="button"
          onClick={downloadCsv}
          disabled={leads.length === 0}
          className="rounded-full bg-bf-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Export CSV
        </button>
      </header>

      {leads.length === 0 ? (
        <p className="rounded-2xl border border-bf-line bg-white/70 px-4 py-6 text-sm text-bf-muted">
          No interests yet. Public form:{" "}
          <a href="/join/partner" className="text-bf-accent hover:underline">
            /join/partner
          </a>
          . On static deed, leads also land via WhatsApp / email to hello@.
        </p>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="rounded-2xl border border-bf-line bg-white/80 px-4 py-3 text-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-bf-ink">{lead.name}</p>
                <p className="text-xs text-bf-muted">
                  {new Date(lead.createdAt).toLocaleString("en-GB")}
                </p>
              </div>
              <dl className="mt-2 grid gap-1 text-bf-muted sm:grid-cols-2">
                <div>
                  <dt className="inline text-xs uppercase tracking-wide">Business</dt>{" "}
                  <dd className="inline text-bf-ink">{lead.business || "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-xs uppercase tracking-wide">Email</dt>{" "}
                  <dd className="inline text-bf-ink">{lead.email || "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-xs uppercase tracking-wide">Phone</dt>{" "}
                  <dd className="inline text-bf-ink">{lead.phone || "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-xs uppercase tracking-wide">Tag</dt>{" "}
                  <dd className="inline text-bf-ink">{lead.tag}</dd>
                </div>
              </dl>
              {lead.notes ? (
                <p className="mt-2 text-bf-ink/80">{lead.notes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
