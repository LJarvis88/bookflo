"use client";

/** Luke’s PNG only — no CSS phone / icons. */
export function HomeScreenMockup() {
  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <img
        src="/marketing/homescreen-luke.png"
        alt="iPhone home screen with Oh My, Contour, and Bookflo"
        width={1024}
        height={1536}
        className="block h-auto w-full"
      />
      <figcaption className="mt-4 text-center text-xs text-bf-muted">
        Oh My · Contour · Bookflo · clients upload their own mark
      </figcaption>
    </figure>
  );
}
