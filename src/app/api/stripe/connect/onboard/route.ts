import { findTenantBySlug } from "@/data/tenants";
import { jsonWithCors, optionsResponse } from "@/lib/stripe/cors";
import {
  OMS_TENANT_SLUG,
  assertStripeKeys,
  getAppUrl,
  getStripeMode,
} from "@/lib/stripe/config";
import {
  getConnectAccountId,
  setConnectAccountId,
} from "@/lib/stripe/connect-store";
import { getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

/**
 * Create (or reuse) an Express Connect account for a tenant and return
 * an Account Link so Tee can complete onboarding later.
 * Platform = Luke’s BOOKFLO Stripe account (test or live per STRIPE_MODE) — never Toni/Tee’s.
 */
export async function POST(request: Request) {
  try {
    assertStripeKeys();
    const body = (await request.json()) as { tenantSlug?: string };
    const tenantSlug = body.tenantSlug?.trim();
    const mode = getStripeMode();
    if (!tenantSlug) {
      return jsonWithCors(request, { error: "tenantSlug required" }, { status: 400 });
    }

    const tenant = findTenantBySlug(tenantSlug);
    if (!tenant) {
      return jsonWithCors(request, { error: "Unknown tenant" }, { status: 404 });
    }

    if (tenantSlug !== OMS_TENANT_SLUG) {
      return jsonWithCors(
        request,
        {
          error:
            "Stripe Connect onboarding is enabled for Oh My Social Media only in this phase.",
        },
        { status: 403 },
      );
    }

    const stripe = getStripe();
    let accountId = await getConnectAccountId(tenantSlug);

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "GB",
        email: tenant.email.includes("example")
          ? "tee@ohmysocialmedia.com"
          : tenant.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_profile: {
          name: tenant.name,
          url: tenant.websiteUrl,
          product_description:
            "Beauty content days and studio shoots booked via BOOKFLO",
        },
        metadata: {
          bookflo_tenant_id: tenant.id,
          bookflo_tenant_slug: tenant.slug,
          platform: "bookflo",
          stripe_mode: mode,
        },
      });
      accountId = account.id;
      await setConnectAccountId(tenantSlug, accountId);
    }

    const appUrl = getAppUrl();
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appUrl}/dashboard/payments?connect=refresh&tenant=${tenantSlug}`,
      return_url: `${appUrl}/dashboard/payments?connect=return&tenant=${tenantSlug}`,
      type: "account_onboarding",
    });

    return jsonWithCors(request, {
      accountId,
      url: accountLink.url,
      mode,
      hint: "Tee completes Stripe Express onboarding in this link. Client booking payments then route to Oh My Social Media via Connect.",
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Connect onboard failed";
    const needsConnectSignup = /signed up for Connect/i.test(raw);
    return jsonWithCors(
      request,
      {
        error: needsConnectSignup
          ? "Luke must enable Stripe Connect on the BOOKFLO platform account first (Stripe Dashboard → Connect), then Tee can complete Express onboarding."
          : raw,
        code: needsConnectSignup
          ? "platform_connect_not_enabled"
          : "connect_onboard_failed",
      },
      { status: 500 },
    );
  }
}
