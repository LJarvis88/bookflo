"use client";

import Image from "next/image";

/**
 * Luke’s home-screen marketing mock — Oh My · Contour · Bookflo (exact visual).
 * Served as his designed PNG so icon order, wallpaper, blur, and Bookflo wave stay faithful.
 * PWA seed icons remain in /public/marketing/{oms,contour}-app-icon.* for real installs.
 */
export function HomeScreenMockup() {
  return (
    <div className="mx-auto w-full max-w-[320px] sm:max-w-[340px]">
      <div
        className="relative overflow-hidden rounded-[1.5rem]"
        style={{ filter: "drop-shadow(0 28px 48px rgba(14,20,32,0.22))" }}
      >
        <Image
          src="/marketing/homescreen-luke.webp"
          alt="iPhone home screen with Oh My, Contour, and Bookflo booking apps"
          width={1024}
          height={1536}
          className="h-auto w-full"
          priority
        />
      </div>
      <p className="mt-5 text-center text-xs leading-relaxed text-bf-muted">
        Oh My · Contour · Bookflo · clients upload their own mark
      </p>
    </div>
  );
}
