import type { Metadata } from "next";
import { Syne, Manrope, Cormorant_Garamond, Outfit } from "next/font/google";
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
        {children}
      </body>
    </html>
  );
}
