"use client";

/** Luke’s final art — compressed WebP of his PNG (source kept at homescreen-luke.png). */
export function HomeScreenMockup() {
  return (
    <img
      src="/marketing/homescreen-luke.webp"
      alt="iPhone home screen with Oh My, Contour, and Bookflo"
      width={1024}
      height={1536}
      className="mx-auto block h-auto w-full max-w-[520px]"
      decoding="async"
      loading="lazy"
    />
  );
}
