/**
 * Luke’s BOOKFLO USP phone art — cropped from luke-usp-banner-orange-ref.png.
 * Signature Facial / Lip Filler / Brow Lamination booking UI (not Contour).
 */
export function BookfloUspPhone({ className = "" }: { className?: string }) {
  return (
    <img
      src="/marketing/usp-bookflo-phone.webp"
      alt="BOOKFLO booking app on iPhone — Signature Facial, Lip Filler, Brow Lamination"
      width={500}
      height={760}
      className={`mx-auto block h-auto w-full max-w-[280px] ${className}`}
      decoding="async"
      loading="lazy"
      style={{ filter: "drop-shadow(0 28px 50px rgba(40, 12, 48, 0.35))" }}
    />
  );
}
