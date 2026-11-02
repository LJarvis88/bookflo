"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatGBP } from "@/lib/format";
import type { Tenant } from "@/lib/types";

type SuccessQuery = {
  bookingRef: string;
  paymentChoice: string;
  amountPaid: number | null;
  hasSession: boolean;
};

function readSuccessQuery(): SuccessQuery {
  if (typeof window === "undefined") {
    return {
      bookingRef: "",
      paymentChoice: "",
      amountPaid: null,
      hasSession: false,
    };
  }
  const search = new URLSearchParams(window.location.search);
  const amountRaw = Number(search.get("amount") ?? "");
  return {
    bookingRef: search.get("ref")?.trim() || "",
    paymentChoice: search.get("choice")?.trim() || "",
    amountPaid: Number.isFinite(amountRaw) ? amountRaw : null,
    hasSession: Boolean(search.get("session_id")?.trim()),
  };
}

export function BookingPaymentSuccess({ tenant }: { tenant: Tenant }) {
  const brand = tenant.brand;
  const [query, setQuery] = useState<SuccessQuery | null>(null);

  useEffect(() => {
    setQuery(readSuccessQuery());
  }, []);

  if (!query) {
    return (
      <div
        className="min-h-screen"
        style={{ background: brand.background }}
        aria-busy="true"
      />
    );
  }

  const { bookingRef, paymentChoice, amountPaid, hasSession } = query;
  const error =
    !hasSession && !bookingRef
      ? "Missing payment confirmation details."
      : null;

  const choiceCopy =
    paymentChoice === "deposit"
      ? "50% deposit paid — balance due at your shoot"
      : paymentChoice === "full"
        ? "Paid in full"
        : "Payment received";

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center"
      style={{
        background: brand.background,
        color: brand.ink,
        fontFamily: `var(--font-tenant-body), system-ui, sans-serif`,
      }}
    >
      <div className="w-full max-w-md">
        <p
          className="text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ color: brand.muted }}
        >
          {tenant.brand.displayName}
        </p>
        <h1
          className="mt-3 text-3xl tracking-tight"
          style={{ fontFamily: `var(--font-tenant-display), Georgia, serif` }}
        >
          {error ? "Something went wrong" : "You’re booked"}
        </h1>
        {error ? (
          <p className="mt-3 text-sm" style={{ color: brand.muted }}>
            {error}
          </p>
        ) : (
          <>
            {bookingRef && (
              <p className="mt-2 text-sm" style={{ color: brand.muted }}>
                Reference {bookingRef}
              </p>
            )}
            <div
              className="mt-8 space-y-2 rounded-2xl p-5 text-left text-sm"
              style={{
                background: brand.surface,
                outline: `1px solid ${brand.primary}22`,
              }}
            >
              <div className="flex justify-between gap-4">
                <span style={{ color: brand.muted }}>Payment</span>
                <span className="text-right font-medium">{choiceCopy}</span>
              </div>
              {amountPaid != null && (
                <div className="flex justify-between gap-4">
                  <span style={{ color: brand.muted }}>Charged</span>
                  <span className="text-right font-medium">
                    {formatGBP(amountPaid)}
                  </span>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <span style={{ color: brand.muted }}>Where</span>
                <span className="text-right font-medium">{tenant.address}</span>
              </div>
            </div>
            <p className="mt-6 text-xs" style={{ color: brand.muted }}>
              Card payment via Stripe Connect (test mode). Funds go to{" "}
              {tenant.name}.
            </p>
          </>
        )}
        <Link
          href={`/book/${tenant.slug}`}
          className="mt-8 inline-flex rounded-full px-6 py-3 text-sm font-medium"
          style={{ background: brand.buttonBg, color: brand.buttonText }}
        >
          Book another
        </Link>
      </div>
    </div>
  );
}
