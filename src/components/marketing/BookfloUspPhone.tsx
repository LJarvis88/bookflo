/**
 * Luke’s BOOKFLO USP phone art — nested card + iPhone mock
 * (Signature Facial / Lip Filler / Brow Lamination).
 * PNG is the source of truth; WebP is the preferred transfer.
 * Source: media/luke-usp-bookflo-phone-ref.png
 */
export function BookfloUspPhone({ className = "" }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/marketing/usp-bookflo-phone.webp" type="image/webp" />
      <img
        src="/marketing/usp-bookflo-phone.png"
        alt="BOOKFLO booking app on iPhone — Signature Facial, Lip Filler, Brow Lamination"
        width={591}
        height={588}
        className={`mx-auto block h-auto w-full max-w-[300px] ${className}`}
        decoding="async"
        // Above-the-fold once scrolled to USP — eager avoids lazy + transform races
        // that can surface as a broken icon in some browsers.
        loading="eager"
        fetchPriority="low"
        style={{ filter: "drop-shadow(0 28px 50px rgba(40, 12, 48, 0.35))" }}
      />
    </picture>
  );
}
