import type { Metadata, Viewport } from "next";
import { DashboardClientLayout } from "@/components/dashboard/DashboardClientLayout";
import { OMS_ADMIN_PWA } from "@/lib/pwa";

const pwa = OMS_ADMIN_PWA;

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
  // Toni’s one Home Screen path — Add from diary with OMS mark (not public book).
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
    apple: [{ url: pwa.appleTouchIcon, type: "image/png" }],
    shortcut: [{ url: pwa.appleTouchIcon, type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: pwa.appleTouchIcon,
      },
    ],
  },
  manifest: pwa.manifestPath,
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: pwa.themeColor,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="manifest" href={pwa.manifestPath} />
      <link rel="apple-touch-icon" href={pwa.appleTouchIcon} />
      <link rel="apple-touch-icon-precomposed" href={pwa.appleTouchIcon} />
      <link rel="shortcut icon" href={pwa.appleTouchIcon} type="image/png" />
      <link
        rel="icon"
        href={pwa.icons[0]?.src ?? pwa.appleTouchIcon}
        type="image/png"
        sizes="192x192"
      />
      <DashboardClientLayout>{children}</DashboardClientLayout>
    </>
  );
}
