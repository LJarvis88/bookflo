import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingPaymentSuccess } from "@/components/booking/BookingPaymentSuccess";
import { findTenantBySlug, listTenantSlugs } from "@/data/tenants";

export const metadata: Metadata = {
  title: "Payment confirmed",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return listTenantSlugs().map((slug) => ({ slug }));
}

export default async function BookingPaymentSuccessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = findTenantBySlug(slug);
  if (!tenant) notFound();
  return <BookingPaymentSuccess tenant={tenant} />;
}
