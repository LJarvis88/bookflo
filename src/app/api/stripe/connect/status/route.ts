import { NextResponse } from "next/server";
import { findTenantBySlug } from "@/data/tenants";
import { assertTestModeKeys } from "@/lib/stripe/config";
import { getConnectAccountId } from "@/lib/stripe/connect-store";
import { getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    assertTestModeKeys();
    const { searchParams } = new URL(request.url);
    const tenantSlug = searchParams.get("tenantSlug")?.trim();
    if (!tenantSlug) {
      return NextResponse.json({ error: "tenantSlug required" }, { status: 400 });
    }

    const tenant = findTenantBySlug(tenantSlug);
    if (!tenant) {
      return NextResponse.json({ error: "Unknown tenant" }, { status: 404 });
    }

    const accountId = await getConnectAccountId(tenantSlug);
    if (!accountId) {
      return NextResponse.json({
        connected: false,
        accountId: null,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        mode: "test",
      });
    }

    const stripe = getStripe();
    const account = await stripe.accounts.retrieve(accountId);

    return NextResponse.json({
      connected: true,
      accountId,
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled: Boolean(account.payouts_enabled),
      detailsSubmitted: Boolean(account.details_submitted),
      mode: "test",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connect status failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
