import { findTenantBySlug } from "@/data/tenants";
import { jsonWithCors, optionsResponse } from "@/lib/stripe/cors";
import { assertStripeKeys, getStripeMode } from "@/lib/stripe/config";
import { getConnectAccountId } from "@/lib/stripe/connect-store";
import { getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

export async function GET(request: Request) {
  try {
    assertStripeKeys();
    const { searchParams } = new URL(request.url);
    const tenantSlug = searchParams.get("tenantSlug")?.trim();
    const mode = getStripeMode();
    if (!tenantSlug) {
      return jsonWithCors(request, { error: "tenantSlug required" }, { status: 400 });
    }

    const tenant = findTenantBySlug(tenantSlug);
    if (!tenant) {
      return jsonWithCors(request, { error: "Unknown tenant" }, { status: 404 });
    }

    const accountId = await getConnectAccountId(tenantSlug);
    if (!accountId) {
      return jsonWithCors(request, {
        connected: false,
        accountId: null,
        chargesEnabled: false,
        payoutsEnabled: false,
        detailsSubmitted: false,
        mode,
      });
    }

    const stripe = getStripe();
    const account = await stripe.accounts.retrieve(accountId);

    return jsonWithCors(request, {
      connected: true,
      accountId,
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled: Boolean(account.payouts_enabled),
      detailsSubmitted: Boolean(account.details_submitted),
      mode,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connect status failed";
    return jsonWithCors(request, { error: message }, { status: 500 });
  }
}
