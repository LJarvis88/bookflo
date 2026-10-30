"use client";

import { useEffect, useState } from "react";
import { LivePreview } from "@/components/branding/LivePreview";
import { TenantLogo } from "@/components/branding/TenantLogo";
import { useDemoTenant } from "@/components/dashboard/DemoTenantProvider";
import type { BrandTokens } from "@/lib/types";
import { Sparkles } from "lucide-react";

export function BrandingEditor() {
  const tenant = useDemoTenant();
  const [brand, setBrand] = useState<BrandTokens>(tenant.brand);

  useEffect(() => {
    setBrand(tenant.brand);
  }, [tenant.slug, tenant.brand]);

  function update<K extends keyof BrandTokens>(key: K, value: BrandTokens[K]) {
    setBrand((b) => ({ ...b, [key]: value }));
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      <div className="space-y-8">
        <header>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Branding</h1>
          <p className="mt-1 text-sm text-bf-muted">
            {tenant.name} · live preview updates as you edit. Session-only.
          </p>
        </header>

        <button
          type="button"
          onClick={() => setBrand(tenant.brand)}
          className="flex w-full items-start gap-3 rounded-2xl border border-dashed border-bf-accent/40 bg-bf-accent-soft/40 px-4 py-3 text-left"
        >
          <Sparkles className="mt-0.5 h-4 w-4 text-bf-accent" />
          <div>
            <p className="text-sm font-semibold">AI brand match — demo</p>
            <p className="text-xs text-bf-muted">
              Resets to {tenant.name} sample tokens. Not live website scraping.
            </p>
          </div>
        </button>

        {brand.logoUrl && (
          <div
            className="rounded-2xl border border-bf-line px-4 py-5"
            style={{ background: brand.background }}
          >
            <p
              className="mb-3 text-xs font-medium uppercase tracking-wider"
              style={{ color: brand.muted }}
            >
              Logo
            </p>
            <TenantLogo brand={brand} size="lg" />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Display name">
            <input
              className="field"
              value={brand.displayName}
              onChange={(e) => update("displayName", e.target.value)}
            />
          </Field>
          <Field label="Logo initials">
            <input
              className="field"
              value={brand.logoText}
              maxLength={3}
              onChange={(e) => update("logoText", e.target.value)}
            />
          </Field>
          <Field label="Tagline" className="sm:col-span-2">
            <input
              className="field"
              value={brand.tagline}
              onChange={(e) => update("tagline", e.target.value)}
            />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <textarea
              className="field min-h-[96px]"
              value={brand.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </Field>
          <Field label="Primary">
            <input
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
              value={brand.primary}
              onChange={(e) => {
                update("primary", e.target.value);
                update("buttonBg", e.target.value);
              }}
            />
          </Field>
          <Field label="Secondary">
            <input
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
              value={brand.secondary}
              onChange={(e) => update("secondary", e.target.value)}
            />
          </Field>
          <Field label="Background">
            <input
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
              value={brand.background}
              onChange={(e) => update("background", e.target.value)}
            />
          </Field>
          <Field label="Ink">
            <input
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
              value={brand.ink}
              onChange={(e) => update("ink", e.target.value)}
            />
          </Field>
          <Field label="Button fill">
            <input
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
              value={brand.buttonBg}
              onChange={(e) => update("buttonBg", e.target.value)}
            />
          </Field>
          <Field label="Button text">
            <input
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-bf-line bg-white p-1"
              value={brand.buttonText}
              onChange={(e) => update("buttonText", e.target.value)}
            />
          </Field>
          <Field label="Heading font">
            <select
              className="field"
              value={brand.fontHeading}
              onChange={(e) => update("fontHeading", e.target.value)}
            >
              <option>Cormorant Garamond</option>
              <option>Syne</option>
              <option>Fraunces</option>
              <option>Newsreader</option>
            </select>
          </Field>
          <Field label="Body font">
            <select
              className="field"
              value={brand.fontBody}
              onChange={(e) => update("fontBody", e.target.value)}
            >
              <option>Outfit</option>
              <option>Manrope</option>
              <option>DM Sans</option>
            </select>
          </Field>
          <Field label="Cover style" className="sm:col-span-2">
            <div className="flex flex-wrap gap-2">
              {(["noir", "ink", "blush", "sage"] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => update("coverStyle", style)}
                  className={`rounded-full px-4 py-2 text-sm capitalize ${
                    brand.coverStyle === style
                      ? "bg-bf-ink text-white"
                      : "border border-bf-line bg-white text-bf-muted"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-bf-muted">
          Live preview
        </p>
        <LivePreview brand={brand} />
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block space-y-1.5 text-sm ${className}`}>
      <span className="font-medium text-bf-ink">{label}</span>
      {children}
    </label>
  );
}
