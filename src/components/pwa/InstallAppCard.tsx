"use client";

import { useEffect, useMemo, useState } from "react";
import type { TenantPwaConfig } from "@/lib/pwa";

type Platform = "ios" | "android" | "desktop" | "standalone";

function detectPlatform(): Platform {
  if (typeof window === "undefined") return "desktop";
  const mq = window.matchMedia("(display-mode: standalone)").matches;
  const iosStandalone = "standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
  if (mq || iosStandalone) return "standalone";

  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isIOS) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "desktop";
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface InstallAppCardProps {
  pwa: TenantPwaConfig;
  /** Visual tone for tenant booking surfaces */
  tone?: "platform" | "tenant";
  brandPrimary?: string;
  brandInk?: string;
  brandSurface?: string;
  brandMuted?: string;
  className?: string;
}

export function InstallAppCard({
  pwa,
  tone = "platform",
  brandPrimary,
  brandInk,
  brandSurface,
  brandMuted,
  className = "",
}: InstallAppCardProps) {
  const [platform, setPlatform] = useState<Platform>("desktop");
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
    const key = `bookflo-a2hs-dismissed:${pwa.slug}`;
    if (sessionStorage.getItem(key) === "1") setDismissed(true);

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);
    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, [pwa.slug]);

  const steps = useMemo(() => {
    if (platform === "ios") {
      return [
        "Tap Share (□↑) in Safari’s toolbar",
        "Scroll and tap Add to Home Screen",
        `Confirm — icon shows as “${pwa.shortName}”`,
      ];
    }
    if (platform === "android") {
      return [
        "Open Chrome’s menu (⋮)",
        "Tap Install app or Add to Home screen",
        `Confirm — “${pwa.shortName}” installs with this brand’s icon`,
      ];
    }
    return [
      "Open this page on your phone",
      "iPhone: Safari → Share → Add to Home Screen",
      "Android: Chrome → ⋮ → Install app / Add to Home screen",
    ];
  }, [platform, pwa.shortName]);

  if (platform === "standalone" || dismissed) return null;

  const isTenant = tone === "tenant";
  const shellStyle = isTenant
    ? {
        background: brandSurface || "rgba(255,255,255,0.06)",
        color: brandInk,
        outline: `1px solid ${brandPrimary || "#fff"}33`,
      }
    : undefined;

  async function installNative() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }

  function dismiss() {
    sessionStorage.setItem(`bookflo-a2hs-dismissed:${pwa.slug}`, "1");
    setDismissed(true);
  }

  return (
    <aside
      className={`rounded-2xl p-4 sm:p-5 ${isTenant ? "" : "border border-bf-line bg-white shadow-soft"} ${className}`}
      style={shellStyle}
      aria-label={`Add ${pwa.name} to your home screen`}
    >
      <div className="flex items-start gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pwa.appleTouchIcon}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-[22%] shadow-sm"
        />
        <div className="min-w-0 flex-1">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.14em] ${isTenant ? "opacity-70" : "text-bf-muted"}`}
            style={isTenant ? { color: brandMuted } : undefined}
          >
            Add to Home Screen
          </p>
          <h2 className={`mt-1 font-display text-lg font-semibold tracking-tight ${isTenant ? "" : "text-bf-ink"}`}>
            Install {pwa.shortName}
          </h2>
          <p
            className={`mt-1 text-sm ${isTenant ? "opacity-80" : "text-bf-muted"}`}
            style={isTenant ? { color: brandMuted } : undefined}
          >
            Opens like an app with your {isTenant ? "salon" : "BOOKFLO"} icon — no App Store needed.
          </p>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className={`shrink-0 text-xs ${isTenant ? "opacity-60" : "text-bf-muted"}`}
          aria-label="Dismiss"
        >
          Not now
        </button>
      </div>

      <ol
        className={`mt-4 space-y-2 text-sm ${isTenant ? "" : "text-bf-ink"}`}
        style={isTenant ? { color: brandInk } : undefined}
      >
        {steps.map((step, i) => (
          <li key={step} className="flex gap-2.5">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                isTenant ? "" : "bg-bf-ink text-white"
              }`}
              style={
                isTenant
                  ? { background: brandPrimary, color: "#fff" }
                  : undefined
              }
            >
              {i + 1}
            </span>
            <span className={isTenant ? "opacity-90" : ""}>{step}</span>
          </li>
        ))}
      </ol>

      {deferred && platform === "android" ? (
        <button
          type="button"
          onClick={installNative}
          className="mt-4 w-full rounded-full py-3 text-sm font-medium text-white"
          style={{ background: brandPrimary || "#0E1420" }}
        >
          Install {pwa.shortName}
        </button>
      ) : null}

      {platform === "ios" ? (
        <p
          className={`mt-3 text-xs ${isTenant ? "opacity-70" : "text-bf-muted"}`}
          style={isTenant ? { color: brandMuted } : undefined}
        >
          Must use Safari on iPhone — Chrome on iOS can’t add a branded home-screen icon.
        </p>
      ) : null}
    </aside>
  );
}
