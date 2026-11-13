import Link from "next/link";
import { FOUNDING30_PATH } from "@/data/founding30";

/** Option A — Christmas partner page banner pointing at Founding 30. */
export function Founding30PartnerBanner() {
  return (
    <div
      className="relative z-20 border-b border-[#845D81]/15 bg-white/75 px-5 py-3 text-center backdrop-blur-md sm:px-8"
      role="region"
      aria-label="Founding 30 announcement"
    >
      <p className="text-sm leading-relaxed text-bf-ink">
        <span className="font-medium">Now called BookFlo Founding 30</span>
        <span className="text-bf-muted">
          {" "}
          — same 6 months free core. Prefer the full application?{" "}
        </span>
        <Link
          href={FOUNDING30_PATH}
          className="font-semibold text-[#845D81] underline-offset-2 hover:underline"
        >
          Apply at /founding-30
        </Link>
      </p>
    </div>
  );
}
