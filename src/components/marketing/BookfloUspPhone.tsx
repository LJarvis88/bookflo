/**
 * Luke’s BOOKFLO USP phone art — nested card + iPhone mock.
 * Exact PNG only (no WebP / reconversion). Source:
 * media/luke-usp-bookflo-phone-exact.png → /marketing/usp-bookflo-phone.png
 */
export function BookfloUspPhone({ className = "" }: { className?: string }) {
  return (
    <img
      src="/marketing/usp-bookflo-phone.png"
      alt="BOOKFLO booking app on iPhone — Full Leg Waxing, Brow Lamination, Book now"
      width={613}
      height={549}
      className={`mx-auto block h-auto w-full max-w-[300px] ${className}`}
      decoding="async"
      loading="eager"
      fetchPriority="low"
      style={{ filter: "drop-shadow(0 28px 50px rgba(40, 12, 48, 0.35))" }}
    />
  );
}
