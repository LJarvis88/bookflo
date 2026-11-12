import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { PARTNER_TAG } from "@/data/partner-interest";
import {
  newLeadId,
  type PartnerInterestLead,
} from "@/lib/partner-interest-store";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "partner-interests.jsonl");
/** Mirror into the agent store so Bob can export without Node SSH. */
const STORE_MIRROR = path.join(
  "/cursor/stores/self/internal",
  "partner-interests.jsonl",
);

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin") ?? "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

async function appendLead(lead: PartnerInterestLead): Promise<void> {
  const line = `${JSON.stringify(lead)}\n`;
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(DATA_FILE, line, "utf8");
  try {
    await mkdir(path.dirname(STORE_MIRROR), { recursive: true });
    await appendFile(STORE_MIRROR, line, "utf8");
  } catch {
    // Store mirror is best-effort (local/dev may lack the mount).
  }
}

async function readLeads(): Promise<PartnerInterestLead[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    return raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as PartnerInterestLead);
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  const leads = await readLeads();
  return NextResponse.json(
    { count: leads.length, leads },
    { headers: corsHeaders(request) },
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<PartnerInterestLead>;
    const name = body.name?.trim() ?? "";
    if (!name) {
      return NextResponse.json(
        { error: "name is required" },
        { status: 400, headers: corsHeaders(request) },
      );
    }

    const lead: PartnerInterestLead = {
      id: newLeadId(),
      createdAt: new Date().toISOString(),
      name,
      business: body.business?.trim() ?? "",
      email: body.email?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      notes: body.notes?.trim() ?? "",
      tag: PARTNER_TAG,
      source: body.source?.trim() || "join/partner",
    };

    await appendLead(lead);
    return NextResponse.json(
      { ok: true, lead },
      { status: 201, headers: corsHeaders(request) },
    );
  } catch {
    return NextResponse.json(
      { error: "Could not save interest" },
      { status: 500, headers: corsHeaders(request) },
    );
  }
}
