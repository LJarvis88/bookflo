"use client";

import { useCallback, useEffect, useState } from "react";
import {
  founding30ToCsv,
  readLocalFounding30,
  upsertLocalFounding30,
  type Founding30Application,
} from "@/lib/founding30-store";
import { founding30ApiUrl } from "@/lib/founding30-api";
import { draftEntitlementFromApplication } from "@/lib/founding30-entitlements";
import { FOUNDING30_CAP } from "@/data/founding30";

type AdminAction =
  | "shortlist"
  | "approve"
  | "reject"
  | "waitlist"
  | "issue_code";

/**
 * Platform ops surface for Founding 30 — Tee demo login.
 * Approve / issue_code stores BF-… for January; never activates accounts.
 */
export default function Founding30AdminPage() {
  const [apps, setApps] = useState<Founding30Application[]>([]);
  const [sourceNote, setSourceNote] = useState("Loading…");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(() => {
    const local = readLocalFounding30();
    setApps(local);
    setSourceNote(
      local.length
        ? `${local.length} in this browser (localStorage)`
        : "No local applications yet",
    );

    void (async () => {
      try {
        const res = await fetch(founding30ApiUrl("/api/founding-30/apply"));
        if (!res.ok) return;
        const data = (await res.json()) as {
          applications?: Founding30Application[];
          seatsUsed?: number;
          seatsLeft?: number;
        };
        const remote = data.applications ?? [];
        if (!remote.length && !local.length) return;
        const byId = new Map<string, Founding30Application>();
        for (const app of [...remote, ...local]) {
          byId.set(app.id, app);
        }
        const merged = [...byId.values()].sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1,
        );
        setApps(merged);
        setSourceNote(
          `${merged.length} apps · ${data.seatsUsed ?? "?"} / ${FOUNDING30_CAP} seats · ${data.seatsLeft ?? "?"} left`,
        );
      } catch {
        // Static host — local only.
      }
    })();
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function runAction(id: string, action: AdminAction) {
    setBusyId(id);
    try {
      const res = await fetch(founding30ApiUrl("/api/founding-30/apply"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      if (res.ok) {
        const data = (await res.json()) as { application?: Founding30Application };
        if (data.application) {
          upsertLocalFounding30(data.application);
        }
      } else {
        // Offline / static: apply locally so Luke can still shortlist tonight.
        const list = readLocalFounding30();
        const idx = list.findIndex((a) => a.id === id);
        if (idx >= 0) {
          const app = { ...list[idx] };
          const now = new Date().toISOString();
          if (action === "shortlist") app.status = "shortlisted";
          if (action === "reject") app.status = "rejected";
          if (action === "waitlist") app.status = "waitlisted";
          if (action === "approve" || action === "issue_code") {
            app.status = "code_issued";
            if (!app.accessCode) {
              const { generateAccessCode } = await import(
                "@/lib/founding30-store"
              );
              app.accessCode = generateAccessCode();
              app.codeIssuedAt = now;
            }
          }
          app.updatedAt = now;
          app.activation = "pending_january";
          upsertLocalFounding30(app);
        }
      }
      load();
    } finally {
      setBusyId(null);
    }
  }

  function downloadCsv() {
    const csv = founding30ToCsv(apps);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookflo-founding30-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Founding 30
          </h1>
          <p className="mt-1 text-sm text-bf-muted">{sourceNote}</p>
          <p className="mt-2 text-xs leading-relaxed text-bf-muted">
            Apply + admin only — codes can be issued for January. Activation is
            locked off. Does not change public signup, trial, or Tee/Liv billing.
          </p>
        </div>
        <button
          type="button"
          onClick={downloadCsv}
          disabled={apps.length === 0}
          className="rounded-full bg-bf-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Export CSV
        </button>
      </header>

      {apps.length === 0 ? (
        <p className="rounded-2xl border border-bf-line bg-white/70 px-4 py-6 text-sm text-bf-muted">
          No applications yet. Public form:{" "}
          <a href="/founding-30" className="text-bf-accent hover:underline">
            /founding-30
          </a>
          . Partner dual-writes also land here.
        </p>
      ) : (
        <ul className="space-y-3">
          {apps.map((app) => {
            const draft = draftEntitlementFromApplication(app);
            return (
              <li
                key={app.id}
                className="rounded-2xl border border-bf-line bg-white/80 px-4 py-3 text-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium text-bf-ink">
                    {app.name}
                    {app.business ? (
                      <span className="font-normal text-bf-muted">
                        {" "}
                        · {app.business}
                      </span>
                    ) : null}
                  </p>
                  <p className="text-xs text-bf-muted">
                    {new Date(app.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
                <dl className="mt-2 grid gap-1 text-bf-muted sm:grid-cols-2">
                  <div>
                    <dt className="inline text-xs uppercase tracking-wide">
                      Status
                    </dt>{" "}
                    <dd className="inline font-medium text-bf-ink">
                      {app.status}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-xs uppercase tracking-wide">
                      Theme
                    </dt>{" "}
                    <dd className="inline text-bf-ink">
                      {app.themePreset || "—"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-xs uppercase tracking-wide">
                      Email
                    </dt>{" "}
                    <dd className="inline text-bf-ink">{app.email || "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline text-xs uppercase tracking-wide">
                      Phone
                    </dt>{" "}
                    <dd className="inline text-bf-ink">{app.phone || "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline text-xs uppercase tracking-wide">
                      Add-ons
                    </dt>{" "}
                    <dd className="inline text-bf-ink">
                      quiz {app.addonQuiz ? "yes" : "no"} · sms{" "}
                      {app.addonSms ? "yes" : "no"}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline text-xs uppercase tracking-wide">
                      Source
                    </dt>{" "}
                    <dd className="inline text-bf-ink">{app.source}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="inline text-xs uppercase tracking-wide">
                      Code
                    </dt>{" "}
                    <dd className="inline font-mono text-bf-ink">
                      {app.accessCode ?? "— (issue on approve)"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="inline text-xs uppercase tracking-wide">
                      Entitlement draft
                    </dt>{" "}
                    <dd className="inline text-bf-ink">
                      {draft.coreComplimentaryMonths}mo core · activationReady{" "}
                      {String(draft.activationReady)} · quizUnlocked{" "}
                      {String(draft.quizUnlocked)} · smsUnlocked{" "}
                      {String(draft.smsUnlocked)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    [
                      ["shortlist", "Shortlist"],
                      ["approve", "Approve + code"],
                      ["waitlist", "Waitlist"],
                      ["reject", "Reject"],
                    ] as const
                  ).map(([action, label]) => (
                    <button
                      key={action}
                      type="button"
                      disabled={busyId === app.id}
                      onClick={() => void runAction(app.id, action)}
                      className="rounded-full border border-bf-line bg-white px-3 py-1.5 text-xs font-medium text-bf-ink hover:border-bf-accent/40 disabled:opacity-50"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
