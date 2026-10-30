"use client";

import Image from "next/image";

const fillerRow1 = [
  { label: "Photos", tone: "linear-gradient(145deg,#9ec4f0,#5a8fd4)" },
  { label: "Maps", tone: "linear-gradient(145deg,#A2BECC,#6a8fa3)" },
];
const fillerRow2 = [
  { label: "Music", tone: "linear-gradient(145deg,#f5a3c0,#e86a9a)" },
  { label: "Mail", tone: "linear-gradient(145deg,#9aa3f5,#6b75d9)" },
  { label: "Safari", tone: "linear-gradient(145deg,#74b4f5,#3d7fd4)" },
  { label: "Notes", tone: "linear-gradient(145deg,#E7D5FA,#b89ad9)" },
];
const fillerRow3 = [
  { label: "Calendar", tone: "linear-gradient(180deg,#fff 45%,#e85a5a 45%)" },
  { label: "Weather", tone: "linear-gradient(145deg,#7ec8f5,#4a9ad4)" },
  { label: "Clock", tone: "linear-gradient(145deg,#3a3a3c,#1c1c1e)" },
  { label: "Wallet", tone: "linear-gradient(145deg,#845D81,#5c3f59)" },
];

/**
 * Realistic iPhone home-screen mock — correct proportions, Dynamic Island,
 * status bar, wallpaper, dock. Contour + OMS highlighted as demo examples;
 * clients upload their own logo mark.
 */
export function HomeScreenMockup() {
  return (
    <div className="mx-auto w-full max-w-[272px]">
      {/* Device — ~9:19.5 portrait, not a squat card */}
      <div
        className="relative mx-auto aspect-[9/19.5] w-full max-w-[272px]"
        style={{
          filter: "drop-shadow(0 28px 48px rgba(14,20,32,0.28))",
        }}
      >
        {/* Outer titanium frame */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#3a3a3c] via-[#1c1c1e] to-[#0a0a0a] p-[3px] ring-1 ring-white/10">
          {/* Inner bezel */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.75rem] bg-black p-[10px]">
            {/* Screen */}
            <div className="relative h-full w-full overflow-hidden rounded-[2.2rem]">
              {/* Wallpaper */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 120% 80% at 50% -10%, #c4b5e8 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 100% 60%, #7a9bb8 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 0% 80%, #845D81 0%, transparent 45%), linear-gradient(165deg, #1a1428 0%, #2a3348 42%, #1e2838 100%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
                aria-hidden
              />

              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[11px] z-30 h-[28px] w-[102px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />

              {/* Status bar */}
              <div className="relative z-20 flex items-center justify-between px-6 pt-[14px]">
                <span className="text-[12px] font-semibold tracking-tight text-white">9:41</span>
                <div className="flex items-center gap-1.5 text-white" aria-hidden>
                  {/* Signal */}
                  <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                    <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
                    <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
                    <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" />
                    <rect x="12" y="0" width="2.5" height="11" rx="0.5" />
                  </svg>
                  {/* Wifi */}
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
                    <path d="M7 9.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm0-3.4c1.4 0 2.7.5 3.7 1.4l-1.1 1.1A3.6 3.6 0 0 0 7 7.4c-.9 0-1.7.3-2.4.8L3.5 7.1A5.1 5.1 0 0 1 7 5.8Zm0-3.3c2.3 0 4.4.9 6 2.3L11.9 6A6.8 6.8 0 0 0 7 4.1 6.8 6.8 0 0 0 2.1 6L1 4.8A8.8 8.8 0 0 1 7 2.5Z" />
                  </svg>
                  {/* Battery */}
                  <div className="flex items-center gap-0.5">
                    <div className="relative h-[10px] w-[22px] rounded-[3px] border border-white/80 p-[1.5px]">
                      <div className="h-full w-[70%] rounded-[1px] bg-white" />
                    </div>
                    <div className="h-[4px] w-[1.5px] rounded-r-full bg-white/80" />
                  </div>
                </div>
              </div>

              {/* App grid */}
              <div className="relative z-10 flex h-[calc(100%-52px)] flex-col px-[18px] pb-3 pt-5">
                <div className="grid grid-cols-4 gap-x-3 gap-y-4">
                  <DemoAppIcon
                    src="/marketing/contour-app-icon.jpg"
                    alt="Contour Preston app icon"
                    label="Contour"
                    ring="#C8A36C"
                  />
                  <DemoAppIcon
                    src="/marketing/oms-app-icon.png"
                    alt="Oh My Social Media app icon"
                    label="OMS"
                    ring="#EB0E7F"
                  />
                  {fillerRow1.map((app) => (
                    <FillerIcon key={app.label} label={app.label} tone={app.tone} />
                  ))}
                  {fillerRow2.map((app) => (
                    <FillerIcon key={app.label} label={app.label} tone={app.tone} />
                  ))}
                  {fillerRow3.map((app) => (
                    <FillerIcon key={app.label} label={app.label} tone={app.tone} />
                  ))}
                </div>

                {/* Page dots */}
                <div className="mt-auto flex items-center justify-center gap-1.5 pb-3 pt-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                </div>

                {/* Dock */}
                <div className="flex items-center justify-between rounded-[1.4rem] bg-white/18 px-3.5 py-3 backdrop-blur-xl ring-1 ring-white/15">
                  {[
                    "linear-gradient(145deg,#5ac8fa,#007aff)",
                    "linear-gradient(145deg,#ff9f0a,#ff453a)",
                    "linear-gradient(145deg,#bf5af2,#5e5ce6)",
                    "linear-gradient(145deg,#A2BECC,#845D81)", /* sky → mauve, no green */
                  ].map((c) => (
                    <div
                      key={c}
                      className="h-[48px] w-[48px] rounded-[11px] shadow-sm"
                      style={{ background: c }}
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Home indicator */}
                <div className="mx-auto mt-2.5 h-[4px] w-[108px] rounded-full bg-white/85" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        {/* Side buttons (visual only) */}
        <div
          className="absolute -left-[2px] top-[92px] h-7 w-[2px] rounded-l-sm bg-[#2c2c2e]"
          aria-hidden
        />
        <div
          className="absolute -left-[2px] top-[140px] h-14 w-[2px] rounded-l-sm bg-[#2c2c2e]"
          aria-hidden
        />
        <div
          className="absolute -left-[2px] top-[204px] h-14 w-[2px] rounded-l-sm bg-[#2c2c2e]"
          aria-hidden
        />
        <div
          className="absolute -right-[2px] top-[160px] h-[72px] w-[2px] rounded-r-sm bg-[#2c2c2e]"
          aria-hidden
        />
      </div>

      <p className="mt-5 text-center text-xs text-bf-muted">
        Demo examples · clients upload their own mark
      </p>
    </div>
  );
}

function FillerIcon({ label, tone }: { label: string; tone: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="h-[48px] w-[48px] rounded-[11px] opacity-90 shadow-sm"
        style={{ background: tone }}
        aria-hidden
      />
      <span className="max-w-[56px] truncate text-center text-[10px] font-medium text-white/90 drop-shadow">
        {label}
      </span>
    </div>
  );
}

function DemoAppIcon({
  src,
  alt,
  label,
  ring,
}: {
  src: string;
  alt: string;
  label: string;
  ring: string;
}) {
  return (
    <div className="relative flex flex-col items-center gap-1">
      <div
        className="relative rounded-[13px] p-[2px]"
        style={{
          background: `linear-gradient(145deg, ${ring}, ${ring}88)`,
          boxShadow: `0 0 0 1px ${ring}55, 0 0 20px ${ring}55`,
        }}
      >
        <div className="overflow-hidden rounded-[11px] bg-white">
          <Image src={src} alt={alt} width={96} height={96} className="h-[48px] w-[48px] object-cover" />
        </div>
        <span
          className="absolute -right-1.5 -top-1.5 rounded-full px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wide text-white shadow-sm"
          style={{ background: ring }}
        >
          Demo
        </span>
      </div>
      <span className="max-w-[56px] truncate text-center text-[10px] font-medium text-white drop-shadow">
        {label}
      </span>
    </div>
  );
}
