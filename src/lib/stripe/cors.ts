import { NextResponse } from "next/server";

const DEFAULT_ORIGINS = [
  "https://bookflo.app",
  "https://www.bookflo.app",
  "https://bookflo-contour-3485.deed.page",
];

function allowedOrigins(): string[] {
  const extra = process.env.STRIPE_API_CORS_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const apiBase = process.env.NEXT_PUBLIC_STRIPE_API_BASE?.trim().replace(
    /\/$/,
    "",
  );
  const fromApiBase = apiBase?.startsWith("http") ? [apiBase] : [];
  // Allow ephemeral Cloudflare quick-tunnels used during cutover.
  const tunnel = (process.env.STRIPE_API_PUBLIC_ORIGIN ?? "")
    .trim()
    .replace(/\/$/, "");
  const fromTunnel = tunnel ? [tunnel] : [];
  return [
    ...DEFAULT_ORIGINS,
    ...fromApiBase,
    ...fromTunnel,
    ...(extra ?? []),
  ];
}

function isAllowedOrigin(origin: string): boolean {
  if (!origin) return false;
  if (allowedOrigins().includes(origin)) return true;
  // Interim deed.page hosts (Tee-only / Stripe Connect previews).
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".deed.page");
  } catch {
    return false;
  }
}

export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin") ?? "";
  const allow = isAllowedOrigin(origin) ? origin : DEFAULT_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function optionsResponse(request: Request): NextResponse {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request) });
}

export function jsonWithCors(
  request: Request,
  body: unknown,
  init?: { status?: number },
): NextResponse {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: corsHeaders(request),
  });
}
