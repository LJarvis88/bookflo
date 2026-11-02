import { NextResponse } from "next/server";
import { findTenantBySlug } from "@/data/tenants";
import { OMS_TENANT_SLUG, assertTestModeKeys, getAppUrl } from "@/lib/stripe/config";
import {
  getConnectAccountId,
  setConnectAccountId,
} from "@/lib/stripe/connect-store";
import { getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

/**
 * Create (or reuse) an Express Connect account for a tenant and return
 * an Account Link so Tee can complete onboarding later.
 * Platform = Luke’s BOOKFLO Stripe TEST account — never Toni/Tee’s.
 */
export async function POST(request: Request) {
  try {
    assertTestModeKeys();
    const body = (await request.json()) as { tenantSlug?: string };
    const tenantSlug = body.tenantSlug?.trim();
    if (!tenantSlug) {
      return NextResponse.json({ error: "tenantSlug required" }, { status: 400 });
    }

    const tenant = findTenantBySlug(tenantSlug);
    if (!tenant) {
      return NextResponse.json({ error: "Unknown tenant" }, { status: 404 });
    }

    if (tenantSlug !== OMS_TENANT_SLUG) {
      return NextResponse.json(
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

    return NextResponse.json({
      accountId,
      url: accountLink.url,
      mode: "test",
      hint: "Tee completes Stripe Express onboarding in this link. Client booking payments then route to Oh My Social Media via Connect.",
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : "Connect onboard failed";
    const needsConnectSignup = /signed up for Connect/i.test(raw);
    return NextResponse.json(
      {
        error: needsConnectSignup
          ? "Luke must enable Stripe Connect on the BOOKFLO platform account first (Stripe Dashboard → Connect), then Tee can complete Express onboarding."
          : raw,
        code: needsConnectSignup ? "platform_connect_not_enabled" : "connect_onboard_failed",
      },
      { status: 500 },
    );
  }
}
