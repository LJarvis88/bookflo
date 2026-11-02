"use client";

import { useEffect } from "react";
import type { TenantPwaConfig } from "@/lib/pwa";

/**
 * Force tenant (OMS) home-screen icons to win over root BOOKFLO favicon /
 * any leftover apple-touch links. Runs ASAP on the booking page so Safari
 * Add to Home Screen does not pick the mauve B.
 */
export function ApplyTenantManifest({ pwa }: { pwa: TenantPwaConfig }) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const head = document.head;

    // Strip competing icons Safari might prefer (BOOKFLO favicon / old apple-touch).
    head
      .querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"], link[rel="mask-icon"]',
      )
      .forEach((el) => el.parentElement?.removeChild(el));

    const prependLink = (
      rel: string,
      href: string,
      extra?: { type?: string; sizes?: string },
    ) => {
      const el = document.createElement("link");
      el.rel = rel;
      el.href = href;
      el.setAttribute("data-tenant-pwa", "1");
      if (extra?.type) el.type = extra.type;
      // Intentionally omit sizes on apple-touch — older iOS skips sized links.
      if (extra?.sizes && !rel.startsWith("apple-touch")) {
        el.sizes = extra.sizes;
      }
      head.insertBefore(el, head.firstChild);
      return el;
    };

    // Apple first (highest priority for A2HS).
    prependLink("apple-touch-icon-precomposed", pwa.appleTouchIcon, {
      type: "image/png",
    });
    prependLink("apple-touch-icon", pwa.appleTouchIcon, { type: "image/png" });

    // Replace favicon.ico with OMS mark so nothing BOOKFLO remains.
    const primary = pwa.icons[0]?.src ?? pwa.appleTouchIcon;
    prependLink("icon", primary, { type: "image/png", sizes: "192x192" });
    prependLink("shortcut icon", pwa.appleTouchIcon, { type: "image/png" });

    let manifest = head.querySelector<HTMLLinkElement>(
      'link[rel="manifest"][data-tenant-pwa]',
    );
    if (!manifest) {
      manifest = document.createElement("link");
      manifest.rel = "manifest";
      manifest.setAttribute("data-tenant-pwa", "1");
      head.insertBefore(manifest, head.firstChild);
    }
    manifest.href = pwa.manifestPath;

    const theme = head.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    const prevTheme = theme?.content;
    if (theme) theme.content = pwa.themeColor;

    let appName = head.querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-title"]',
    );
    if (!appName) {
      appName = document.createElement("meta");
      appName.name = "apple-mobile-web-app-title";
      head.appendChild(appName);
    }
    const prevTitle = appName.content;
    appName.content = pwa.shortName;

    let capable = head.querySelector<HTMLMetaElement>(
      'meta[name="apple-mobile-web-app-capable"]',
    );
    if (!capable) {
      capable = document.createElement("meta");
      capable.name = "apple-mobile-web-app-capable";
      head.appendChild(capable);
    }
    capable.content = "yes";

    return () => {
      if (theme && prevTheme) theme.content = prevTheme;
      if (appName && prevTitle) appName.content = prevTitle;
    };
  }, [pwa]);

  return null;
}
