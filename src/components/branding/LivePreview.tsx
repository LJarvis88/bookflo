"use client";

import type { BrandTokens } from "@/lib/types";
import { TenantLogo } from "@/components/branding/TenantLogo";

const coverGradients: Record<BrandTokens["coverStyle"], string> = {
  blush: "linear-gradient(145deg, #e8d5d0 0%, #f7ebe6 45%, #d4b8b0 100%)",
  ink: "linear-gradient(145deg, #2c2420 0%, #5c3d4a 55%, #8a6a5a 100%)",
  sage: "linear-gradient(145deg, #d7ebe4 0%, #eef4f1 50%, #b8cfc4 100%)",
  noir: "linear-gradient(160deg, #0C111B 0%, #192C42 55%, #243852 100%)",
};

interface LivePreviewProps {
  brand: BrandTokens;
  compact?: boolean;
  className?: string;
}

export function LivePreview({ brand, compact = false, className = "" }: LivePreviewProps) {
  const surface = brand.surface ?? brand.secondary;

  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-lift ${className}`}
      style={{
        background: brand.background,
        color: brand.ink,
        borderColor: `${brand.primary}33`,
        fontFamily: `"${brand.fontBody}", system-ui, sans-serif`,
      }}
    >
      <div
        className={`relative flex ${compact ? "h-28" : "h-40"} w-full items-end p-4`}
        style={{
          background: brand.logoUrl?.includes("oh-my-social-media")
            ? "#0A0A0A"
            : coverGradients[brand.coverStyle],
        }}
      >
        <TenantLogo brand={brand} size={compact ? "md" : "lg"} />
      </div>
      <div className={`space-y-3 ${compact ? "p-4" : "p-5"}`}>
        <div>
          <p
            className={`${compact ? "text-xl" : "text-2xl"} leading-tight tracking-tight`}
            style={{ fontFamily: `"${brand.fontHeading}", Georgia, serif` }}
          >
            {brand.displayName}
          </p>
          <p className="mt-1 text-sm" style={{ color: brand.muted }}>
            {brand.tagline}
          </p>
        </div>
        {!compact && (
          <p className="text-sm leading-relaxed" style={{ color: brand.muted }}>
            {brand.description.slice(0, 120)}
            {brand.description.length > 120 ? "…" : ""}
          </p>
        )}
        <div className="flex flex-wrap gap-2 pt-1">
          {["Facial", "Injectables", "Consult"].map((label) => (
            <span
              key={label}
              className="rounded-full px-3 py-1 text-xs"
              style={{
                background: surface,
                color: brand.ink,
                outline: `1px solid ${brand.primary}40`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="mt-1 w-full rounded-full py-2.5 text-sm font-medium transition"
          style={{ background: brand.buttonBg, color: brand.buttonText }}
        >
          Book now
        </button>
      </div>
    </div>
  );
}
