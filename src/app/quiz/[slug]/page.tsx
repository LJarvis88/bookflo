import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicQuiz } from "@/components/quiz/PublicQuiz";
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
    return { title: "Quiz", robots: { index: false } };
  }

  const title = `What should I book? · ${tenant.brand.displayName}`;
  const description =
    tenant.brand.tagline ||
    `Find the right service to book with ${tenant.brand.displayName}.`;
  const path = `/quiz/${tenant.slug}`;
  const ogImage = tenant.brand.logoUrl;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
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
    robots: { index: true, follow: true },
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tenant = TENANTS.find((t) => t.slug === slug);
  if (!tenant) notFound();
  const path = `/quiz/${tenant.slug}`;
  const crumbs = breadcrumbList([
    { name: "Home", path: "/" },
    { name: tenant.brand.displayName, path: `/book/${tenant.slug}` },
    { name: "Quiz", path },
  ]);
  return (
    <>
      <JsonLd data={crumbs} />
      <PublicQuiz tenant={getTenantBySlug(slug)} />
    </>
  );
}
