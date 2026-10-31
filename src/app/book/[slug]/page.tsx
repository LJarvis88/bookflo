import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { JsonLd, breadcrumbList } from "@/components/seo/JsonLd";
import { getTenantBySlug, listTenantSlugs, TENANTS } from "@/data/tenants";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return listTenantSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenant = TENANTS.find((t) => t.slug === slug);
  if (!tenant) {
    return { title: "Book", robots: { index: false } };
  }

  const title = `Book with ${tenant.brand.displayName}`;
  const description =
    tenant.brand.description ||
    tenant.brand.tagline ||
    `Book an appointment with ${tenant.brand.displayName}.`;
  const path = `/book/${tenant.slug}`;
  const ogImage = tenant.brand.logoUrl;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    // Keep white-label demos tenant-branded (no BOOKFLO favicon/siteName).
    applicationName: tenant.brand.displayName,
    icons: ogImage ? { icon: ogImage } : undefined,
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: tenant.brand.displayName,
      images: ogImage
        ? [{ url: ogImage, alt: tenant.brand.displayName }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    // Public demo booking pages are indexable as tenant-branded case studies.
    robots: { index: true, follow: true },
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = TENANTS.find((t) => t.slug === slug);
  if (!tenant) notFound();
  const path = `/book/${tenant.slug}`;
  // Schema only — booking chrome stays white-label (tenant title/logo in UI).
  const crumbs = breadcrumbList([
    { name: "Home", path: "/" },
    { name: tenant.brand.displayName, path },
  ]);
  return (
    <>
      <JsonLd data={crumbs} />
      <BookingFlow tenant={getTenantBySlug(slug)} />
    </>
  );
}
