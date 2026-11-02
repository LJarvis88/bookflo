import { findTenantBySlug, getService } from "@/data/tenants";
import { jsonWithCors, optionsResponse } from "@/lib/stripe/cors";
import {
  OMS_TENANT_SLUG,
  amountForPaymentChoice,
  assertStripeKeys,
  getAppUrl,
  getStripeMode,
  type PaymentChoice,
} from "@/lib/stripe/config";
import { getConnectAccountId } from "@/lib/stripe/connect-store";
import { getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

interface CheckoutBody {
  tenantSlug?: string;
  serviceId?: string;
  paymentChoice?: PaymentChoice;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  staffId?: string;
  date?: string;
  time?: string;
  notes?: string;
  bookingRef?: string;
}

export function OPTIONS(request: Request) {
  return optionsResponse(request);
}

/**
 * Create a Stripe Checkout Session on the BOOKFLO platform account,
 * destination-charging to the OMS Express Connect account (0% application fee).
 */
export async function POST(request: Request) {
  try {
    assertStripeKeys();
    const body = (await request.json()) as CheckoutBody;
    const tenantSlug = body.tenantSlug?.trim();
    const serviceId = body.serviceId?.trim();
    const paymentChoice = body.paymentChoice;
    const customerEmail = body.customerEmail?.trim().toLowerCase() ?? "";
    const customerName = body.customerName?.trim() ?? "";
    const mode = getStripeMode();

    if (!tenantSlug || !serviceId || !paymentChoice) {
      return jsonWithCors(
        request,
        { error: "tenantSlug, serviceId, and paymentChoice are required" },
        { status: 400 },
      );
    }

    if (paymentChoice !== "full" && paymentChoice !== "deposit") {
      return jsonWithCors(request, { error: "Invalid paymentChoice" }, { status: 400 });
    }

    if (tenantSlug !== OMS_TENANT_SLUG) {
      return jsonWithCors(
        request,
        { error: "Online booking payments are enabled for Oh My Social Media only." },
        { status: 403 },
      );
    }

    const tenant = findTenantBySlug(tenantSlug);
    if (!tenant) {
      return jsonWithCors(request, { error: "Unknown tenant" }, { status: 404 });
    }

    const service = getService(tenant, serviceId);
    if (!service || !service.active) {
      return jsonWithCors(request, { error: "Unknown service" }, { status: 404 });
    }

    if (service.pricePence <= 0) {
      return jsonWithCors(
        request,
        { error: "This service does not require payment" },
        { status: 400 },
      );
    }

    if (!customerEmail.includes("@") || !customerName) {
      return jsonWithCors(
        request,
        { error: "customerName and customerEmail are required" },
        { status: 400 },
      );
    }

    const connectAccountId = await getConnectAccountId(tenantSlug);
    if (!connectAccountId) {
      return jsonWithCors(
        request,
        {
          error:
            "Oh My Social Media has not connected Stripe yet. Ask Tee to open Admin → Payments and complete Connect onboarding.",
          code: "connect_not_linked",
        },
        { status: 409 },
      );
    }

    const stripe = getStripe();
    const account = await stripe.accounts.retrieve(connectAccountId);
    if (!account.charges_enabled) {
      return jsonWithCors(
        request,
        {
          error:
            "Stripe Connect onboarding is incomplete. Tee must finish the Express onboarding link before clients can pay.",
          code: "connect_onboarding_incomplete",
          accountId: connectAccountId,
        },
        { status: 409 },
      );
    }

    const amountPence = amountForPaymentChoice(service.pricePence, paymentChoice);
    const choiceLabel =
      paymentChoice === "deposit" ? "50% deposit" : "Pay in full";
    const bookingRef =
      body.bookingRef?.trim() ||
      `OMS-${Math.floor(100000 + Math.random() * 900000)}`;

    const appUrl = getAppUrl();
    const meta = {
      bookflo_tenant_slug: tenantSlug,
      bookflo_service_id: serviceId,
      payment_choice: paymentChoice,
      booking_ref: bookingRef,
      staff_id: body.staffId ?? "",
      booking_date: body.date ?? "",
      booking_time: body.time ?? "",
      customer_name: customerName,
      customer_phone: body.customerPhone ?? "",
      service_price_pence: String(service.pricePence),
      amount_charged_pence: String(amountPence),
      stripe_mode: mode,
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: amountPence,
            product_data: {
              name: `${service.name} — ${choiceLabel}`,
              description: `${tenant.name} · Ref ${bookingRef}`,
            },
          },
        },
      ],
      // Destination charge: platform collects, funds transfer to OMS Express account.
      // 0% BOOKFLO commission — no application_fee_amount.
      payment_intent_data: {
        transfer_data: {
          destination: connectAccountId,
        },
        metadata: meta,
        description: `${tenant.name}: ${service.name} (${choiceLabel})`,
      },
      success_url: `${appUrl}/book/${tenantSlug}/success?session_id={CHECKOUT_SESSION_ID}&ref=${encodeURIComponent(bookingRef)}&amount=${amountPence}&choice=${paymentChoice}`,
      cancel_url: `${appUrl}/book/${tenantSlug}?payment=cancelled`,
      metadata: meta,
    });

    if (!session.url) {
      return jsonWithCors(
        request,
        { error: "Checkout Session missing redirect URL" },
        { status: 500 },
      );
    }

    return jsonWithCors(request, {
      url: session.url,
      sessionId: session.id,
      bookingRef,
      amountPence,
      paymentChoice,
      mode,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return jsonWithCors(request, { error: message }, { status: 500 });
  }
}
