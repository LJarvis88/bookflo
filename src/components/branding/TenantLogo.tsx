import Image from "next/image";
import type { BrandTokens } from "@/lib/types";

interface TenantLogoProps {
  brand: BrandTokens;
  /** Visual size of the logo mark / wordmark block */
  size?: "sm" | "md" | "lg" | "hero";
  className?: string;
}

const sizes = {
  sm: { box: "h-9 w-auto max-w-[120px]", initials: "h-9 w-9 text-xs" },
  md: { box: "h-12 w-auto max-w-[160px]", initials: "h-12 w-12 text-sm" },
  lg: { box: "h-14 w-auto max-w-[200px]", initials: "h-14 w-14 text-base" },
  hero: { box: "h-16 w-auto max-w-[240px] sm:h-20 sm:max-w-[280px]", initials: "h-16 w-16 text-lg" },
};

export function TenantLogo({ brand, size = "md", className = "" }: TenantLogoProps) {
  const s = sizes[size];

  if (brand.logoUrl) {
    return (
      <Image
        src={brand.logoUrl}
        alt={`${brand.displayName} logo`}
        width={560}
        height={180}
        className={`${s.box} object-contain ${className || "object-left"}`}
        priority={size === "hero"}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold tracking-wide ${s.initials} ${className}`}
      style={{
        background: brand.primary,
        color: brand.buttonText,
        fontFamily: `"${brand.fontHeading}", Georgia, serif`,
      }}
      aria-label={brand.displayName}
    >
      {brand.logoText}
    </div>
  );
}
