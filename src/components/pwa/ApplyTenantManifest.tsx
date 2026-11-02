"use client";

import { useEffect } from "react";
import type { TenantPwaConfig } from "@/lib/pwa";

/**
 * Swap document manifest + apple-touch-icon to the tenant’s PWA assets.
 * Needed on shared /dashboard HTML so Tee’s Add to Home Screen gets OMS, not BOOKFLO.
 */
export function ApplyTenantManifest({ pwa }: { pwa: TenantPwaConfig }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const ensureLink = (rel: string, attr: string) => {
      let el = document.querySelector<HTMLLinkElement>(
        `link[rel="${rel}"][${attr}]`,
      );
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        el.setAttribute(attr, "1");
        document.head.appendChild(el);
      }
      return el;
    };

    const manifest = ensureLink("manifest", "data-tenant-pwa");
    manifest.href = pwa.manifestPath;

    const apple = ensureLink("apple-touch-icon", "data-tenant-pwa");
    apple.sizes = "180x180";
    apple.href = pwa.appleTouchIcon;

    // Prefer tenant PNG icons over root BOOKFLO wordmark favicon.
    let iconLink = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-tenant-pwa]',
    );
    if (!iconLink) {
      iconLink = document.createElement("link");
      iconLink.rel = "icon";
      iconLink.type = "image/png";
      iconLink.setAttribute("data-tenant-pwa", "1");
      document.head.appendChild(iconLink);
    }
    iconLink.sizes = "192x192";
    iconLink.href = pwa.icons[0]?.src ?? pwa.appleTouchIcon;

    const theme = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    const prevTheme = theme?.content;
    if (theme) theme.content = pwa.themeColor;

    let appName = document.querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-title"]',
    );
    if (!appName) {
      appName = document.createElement("meta");
      appName.name = "apple-mobile-web-app-title";
      document.head.appendChild(appName);
    }
    const prevTitle = appName.content;
    appName.content = pwa.shortName;

    let capable = document.querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-capable"]',
    );
    if (!capable) {
      capable = document.createElement("meta");
      capable.name = "apple-mobile-web-app-capable";
      document.head.appendChild(capable);
    }
    capable.content = "yes";

    return () => {
      if (theme && prevTheme) theme.content = prevTheme;
      if (appName && prevTitle) appName.content = prevTitle;
    };
  }, [pwa]);

  return null;
}
