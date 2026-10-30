"use client";

import { useId } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "hero";

const sizeClass: Record<Size, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
  hero: "text-5xl sm:text-6xl md:text-7xl",
};

/**
 * BOOKFLO wordmark — keeps current Syne display font, with the lavender→periwinkle
 * gradient wave under “flo” (matches brand/bookflo-logo-wave-ref.png).
 */
export function BookfloWordmark({
  size = "md",
  className = "",
  as: Tag = "span",
}: {
  size?: Size;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `flo-wave-${uid}`;

  return (
    <Tag
      className={`relative inline-block overflow-visible pb-[0.28em] font-display font-semibold tracking-tight text-bf-ink ${sizeClass[size]} ${className}`}
      aria-label="bookflo"
    >
      <span className="relative z-[1]">book</span>
      <span className="relative z-[1] inline-block">
        flo
        {/* Wave sits just under the baseline of “flo”, matching the ref */}
        <svg
          className="pointer-events-none absolute left-[-2%] right-[-4%] top-[88%] h-[0.38em] w-[108%]"
          viewBox="0 0 100 20"
          fill="none"
          aria-hidden
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E4D0FB" />
              <stop offset="28%" stopColor="#C397FC" />
              <stop offset="55%" stopColor="#A68FFD" />
              <stop offset="82%" stopColor="#8D92FD" />
              <stop offset="100%" stopColor="#8189FD" />
            </linearGradient>
          </defs>
          {/* Measured from bookflo-logo-wave-ref: rise under f/l, dip under o, soft lift at tip */}
          <path
            d="M 2 14.2 C 12 8.5, 22 4.8, 32 5.4 C 42 6.2, 48 9.2, 55 11.2 C 65 14.2, 74 15.2, 84 14.4 C 91 13.8, 95 11.2, 98 8.2"
            stroke={`url(#${gradId})`}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Tag>
  );
}
