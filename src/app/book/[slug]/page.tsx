import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { getTenantBySlug, listTenantSlugs, TENANTS } from "@/data/tenants";

export function generateStaticParams() {
  return listTenantSlugs().map((slug) => ({ slug }));
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = TENANTS.find((t) => t.slug === slug);
  if (!tenant) notFound();
  return <BookingFlow tenant={getTenantBySlug(slug)} />;
}
