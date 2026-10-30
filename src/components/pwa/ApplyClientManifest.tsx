"use client";

import { useEffect } from "react";
import { manifestJsonFromPwa, type TenantPwaConfig } from "@/lib/pwa";

/**
 * For client-uploaded icons (data URLs), inject a blob: manifest + apple-touch-icon
 * so Add to Home Screen uses their mark — not a hardcoded demo seed.
 */
export function ApplyClientManifest({ pwa }: { pwa: TenantPwaConfig }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (pwa.isDemoSeed && pwa.manifestPath) return;

    const json = manifestJsonFromPwa(pwa);
    const blob = new Blob([json], { type: "application/manifest+json" });
    const url = URL.createObjectURL(blob);

    let manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"][data-client-pwa]');
    if (!manifestLink) {
      manifestLink = document.createElement("link");
      manifestLink.rel = "manifest";
      manifestLink.dataset.clientPwa = "1";
      document.head.appendChild(manifestLink);
    }
    const prev = manifestLink.href;
    manifestLink.href = url;

    let apple = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"][data-client-pwa]');
    if (!apple) {
      apple = document.createElement("link");
      apple.rel = "apple-touch-icon";
      apple.dataset.clientPwa = "1";
      document.head.appendChild(apple);
    }
    apple.href = pwa.appleTouchIcon;

    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prevTheme = theme?.content;
    if (theme) theme.content = pwa.themeColor;

    return () => {
      URL.revokeObjectURL(url);
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      if (theme && prevTheme) theme.content = prevTheme;
    };
  }, [pwa]);

  return null;
}
