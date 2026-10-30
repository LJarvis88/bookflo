import type { Metadata, Viewport } from "next";
import { Syne, Manrope, Cormorant_Garamond, Outfit } from "next/font/google";
import { RegisterServiceWorker } from "@/components/pwa/RegisterServiceWorker";
import { BOOKFLO_PWA } from "@/lib/pwa";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-tenant-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-tenant-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "BOOKFLO — Your brand. Your bookings. Beautifully connected.",
  description:
    "Premium zero-commission white-label beauty booking SaaS. Brand craft, effortless booking, simple onboarding.",
  applicationName: BOOKFLO_PWA.name,
  appleWebApp: {
    capable: true,
    title: BOOKFLO_PWA.shortName,
    statusBarStyle: "default",
  },
  icons: {
    icon: BOOKFLO_PWA.icons.map((icon) => ({
      url: icon.src,
      sizes: icon.sizes,
      type: "image/png",
    })),
    apple: [{ url: BOOKFLO_PWA.appleTouchIcon, sizes: "180x180", type: "image/png" }],
  },
  manifest: BOOKFLO_PWA.manifestPath,
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: BOOKFLO_PWA.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${syne.variable} ${manrope.variable} ${cormorant.variable} ${outfit.variable} min-h-screen antialiased`}
      >
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
