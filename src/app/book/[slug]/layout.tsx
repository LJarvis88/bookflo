import type { Metadata, Viewport } from "next";
import { getTenantBySlug, listTenantSlugs } from "@/data/tenants";
import { getBookingPwa } from "@/lib/pwa";

export function generateStaticParams() {
  return listTenantSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tenant = getTenantBySlug(slug);
  const pwa = getBookingPwa(slug);
  if (!pwa) {
    return { title: tenant?.name ?? "Book" };
  }

  return {
    applicationName: pwa.name,
    appleWebApp: {
      capable: true,
      title: pwa.shortName,
      statusBarStyle: "black-translucent",
    },
    icons: {
      icon: pwa.icons.map((icon) => ({
        url: icon.src,
        sizes: icon.sizes,
        type: "image/png",
      })),
      apple: [{ url: pwa.appleTouchIcon, sizes: "180x180", type: "image/png" }],
    },
    manifest: pwa.manifestPath,
    other: {
      "mobile-web-app-capable": "yes",
    },
  };
}

export async function generateViewport({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Viewport> {
  const { slug } = await params;
  const pwa = getBookingPwa(slug);
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: pwa?.themeColor ?? "#0E1420",
  };
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
