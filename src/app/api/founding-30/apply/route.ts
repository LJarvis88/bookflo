import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { FOUNDING30_CAP, FOUNDING30_TAG } from "@/data/founding30";
import type { FoundingThemeId } from "@/data/founding-themes";
import { FOUNDING_THEME_PRESETS } from "@/data/founding-themes";
import {
  createBlankApplication,
  generateAccessCode,
  type Founding30Application,
  type Founding30Status,
} from "@/lib/founding30-store";
import {
  buildApplicationReceivedEmail,
  buildApprovedCodeEmail,
  buildOpsNewApplicationEmail,
  queueFounding30Email,
} from "@/lib/founding30-email";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "founding30-applications.jsonl");
const STORE_MIRROR = path.join(
  "/cursor/stores/self/internal",
  "founding30-applications.jsonl",
);

const THEME_IDS = new Set(FOUNDING_THEME_PRESETS.map((t) => t.id));

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin") ?? "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

async function readApps(): Promise<Founding30Application[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as Founding30Application);
  } catch {
    return [];
  }
}

async function rewriteApps(apps: Founding30Application[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const body = apps.map((a) => JSON.stringify(a)).join("\n") + (apps.length ? "\n" : "");
  await writeFile(DATA_FILE, body, "utf8");
  try {
    await mkdir(path.dirname(STORE_MIRROR), { recursive: true });
    await writeFile(STORE_MIRROR, body, "utf8");
  } catch {
    // Store mirror best-effort.
  }
}

async function appendApp(app: Founding30Application): Promise<void> {
  const line = `${JSON.stringify(app)}\n`;
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, line, "utf8");
  try {
    await mkdir(path.dirname(STORE_MIRROR), { recursive: true });
    await appendFile(STORE_MIRROR, line, "utf8");
  } catch {
    // ignore
  }
}

function seatCount(apps: Founding30Application[]): number {
  return apps.filter((a) =>
    ["shortlisted", "approved", "code_issued"].includes(a.status),
  ).length;
}

export async function GET(request: Request) {
  const apps = await readApps();
  const seats = seatCount(apps);
  return NextResponse.json(
    {
      count: apps.length,
      seatsUsed: seats,
      seatsLeft: Math.max(0, FOUNDING30_CAP - seats),
      cap: FOUNDING30_CAP,
      applications: apps.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1,
      ),
    },
    { headers: corsHeaders(request) },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<Founding30Application> & {
      /** Honeypot — bots fill this; humans leave empty. */
      companyWebsite?: string;
    };

    if (body.companyWebsite) {
      return NextResponse.json(
        { ok: true },
        { status: 201, headers: corsHeaders(request) },
      );
    }

    const name = body.name?.trim() ?? "";
    if (!name) {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400, headers: corsHeaders(request) },
      );
    }

    const themeRaw = (body.themePreset ?? "") as string;
    const themePreset = (
      THEME_IDS.has(themeRaw as FoundingThemeId) ? themeRaw : ""
    ) as FoundingThemeId | "";

    const existing = await readApps();
    const seats = seatCount(existing);
    const status: Founding30Status =
      seats >= FOUNDING30_CAP ? "waitlisted" : "submitted";

    const app = createBlankApplication({
      name,
      business: body.business,
      email: body.email,
      phone: body.phone,
      website: body.website,
      notes: body.notes,
      themePreset,
      addonSms: Boolean(body.addonSms),
      addonQuiz: Boolean(body.addonQuiz),
      source: body.source?.trim() || "founding-30",
    });
    app.status = status;
    app.tag = FOUNDING30_TAG;
    // Never activate — explicit.
    app.activation = "pending_january";
    app.tenantSlug = null;
    app.accessCode = null;

    // Idempotent-ish dual-write: if client sent an id, keep it.
    if (body.id?.startsWith("f30_")) {
      app.id = body.id;
      const dup = existing.find((a) => a.id === app.id);
      if (dup) {
        return NextResponse.json(
          { ok: true, application: dup, duplicate: true },
          { status: 200, headers: corsHeaders(request) },
        );
      }
    }

    await appendApp(app);

    void queueFounding30Email(buildApplicationReceivedEmail(app));
    void queueFounding30Email(buildOpsNewApplicationEmail(app));

    return NextResponse.json(
      { ok: true, application: app },
      { status: 201, headers: corsHeaders(request) },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not save application" },
      { status: 500, headers: corsHeaders(request) },
    );
  }
}

/** Admin actions: shortlist | approve (issues code) | reject | waitlist — never activate. */
export async function PATCH(request: Request) {
  try {
    const body = (await request.json()) as {
      id?: string;
      action?: "shortlist" | "approve" | "reject" | "waitlist" | "issue_code";
    };
    const id = body.id?.trim();
    const action = body.action;
    if (!id || !action) {
      return NextResponse.json(
        { error: "id and action required" },
        { status: 400, headers: corsHeaders(request) },
      );
    }

    const apps = await readApps();
    const idx = apps.findIndex((a) => a.id === id);
    if (idx < 0) {
      return NextResponse.json(
        { error: "not found" },
        { status: 404, headers: corsHeaders(request) },
      );
    }

    const app = { ...apps[idx] };
    const now = new Date().toISOString();
    const seats = seatCount(apps.filter((a) => a.id !== id));

    if (
      (action === "shortlist" || action === "approve" || action === "issue_code") &&
      seats >= FOUNDING30_CAP &&
      !["shortlisted", "approved", "code_issued"].includes(app.status)
    ) {
      return NextResponse.json(
        { error: "Founding 30 cap reached (30)" },
        { status: 409, headers: corsHeaders(request) },
      );
    }

    switch (action) {
      case "shortlist":
        app.status = "shortlisted";
        break;
      case "reject":
        app.status = "rejected";
        break;
      case "waitlist":
        app.status = "waitlisted";
        break;
      case "approve":
      case "issue_code":
        app.status = "code_issued";
        if (!app.accessCode) {
          app.accessCode = generateAccessCode();
          app.codeIssuedAt = now;
        }
        void queueFounding30Email(buildApprovedCodeEmail(app));
        break;
      default:
        return NextResponse.json(
          { error: "unknown action" },
          { status: 400, headers: corsHeaders(request) },
        );
    }

    app.updatedAt = now;
    // Hard lock: never activate from admin in this phase.
    app.activation = "pending_january";
    app.tenantSlug = null;

    apps[idx] = app;
    await rewriteApps(apps);

    return NextResponse.json(
      { ok: true, application: app },
      { headers: corsHeaders(request) },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not update application" },
      { status: 500, headers: corsHeaders(request) },
    );
  }
}
