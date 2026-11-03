import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { BookfloWordmark } from "@/components/branding/BookfloWordmark";
import { LegalFooter } from "@/components/marketing/LegalFooter";
import { ApplyTenantManifest } from "@/components/pwa/ApplyTenantManifest";
import { OMS_ADMIN_PWA } from "@/lib/pwa";

const pwa = OMS_ADMIN_PWA;

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your BOOKFLO salon dashboard.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/login" },
  // OMS admin is Toni’s one Home Screen target — apple-touch + manifest on /login
  // so Safari A2HS does not fall back to BOOKFLO B.
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

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-bf-atmosphere">
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
      <ApplyTenantManifest pwa={pwa} />
      <div className="flex-1 px-4 py-8 sm:px-5 sm:py-12">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="inline-flex items-center" aria-label="bookflo home">
            <BookfloWordmark size="lg" />
          </Link>
          <div className="mt-8 rounded-3xl border border-bf-line bg-white/80 p-5 shadow-soft backdrop-blur sm:mt-10 sm:p-8">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-bf-muted">
              Log in to your BOOKFLO dashboard.
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
      <LegalFooter />
    </div>
  );
}
