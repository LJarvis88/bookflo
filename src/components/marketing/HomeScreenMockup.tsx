import Image from "next/image";

const filler = [
  { label: "Photos", tone: "#dbe4f0" },
  { label: "Maps", tone: "#d8efe4" },
  { label: "Music", tone: "#f5dde8" },
  { label: "Mail", tone: "#e8e4f5" },
  { label: "Safari", tone: "#d9e8fb" },
  { label: "Notes", tone: "#f7efd6" },
];

/**
 * iPhone-style home screen with Contour + OMS demo booking icons highlighted.
 * Product pitch: each client uploads their own logo/mark.
 */
export function HomeScreenMockup() {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      {/* iPhone 18-style frame */}
      <div className="relative rounded-[2.6rem] bg-[#1c1c1e] p-[10px] shadow-lift ring-1 ring-black/20">
        <div className="relative overflow-hidden rounded-[2.15rem] bg-gradient-to-b from-[#1a1a2e] via-[#2a2240] to-[#3d2f55]">
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-20 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black" />

          <div className="px-5 pb-5 pt-14">
            <p className="mb-5 text-center text-[11px] font-medium tracking-wide text-white/70">
              9:41
            </p>

            <div className="grid grid-cols-4 gap-x-3 gap-y-5">
              {/* Contour — highlighted demo */}
              <DemoAppIcon
                src="/marketing/contour-app-icon.jpg"
                alt="Contour Preston app icon"
                label="Contour"
                ring="#C8A36C"
              />
              {/* OMS — highlighted demo */}
              <DemoAppIcon
                src="/marketing/oms-app-icon.png"
                alt="Oh My Social Media app icon"
                label="OMS"
                ring="#EB0E7F"
              />
              {filler.map((app) => (
                <div key={app.label} className="flex flex-col items-center gap-1.5">
                  <div
                    className="h-12 w-12 rounded-[13px] opacity-70"
                    style={{ background: app.tone }}
                    aria-hidden
                  />
                  <span className="max-w-[52px] truncate text-center text-[9px] text-white/55">
                    {app.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Dock */}
            <div className="mt-8 flex items-center justify-center gap-4 rounded-[1.35rem] bg-white/15 px-4 py-3 backdrop-blur-md">
              {["#8ec5ff", "#ff9f7a", "#9ae6b4", "#f6e05e"].map((c) => (
                <div
                  key={c}
                  className="h-11 w-11 rounded-[12px]"
                  style={{ background: c }}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-bf-muted">
        Demo examples · clients upload their own mark
      </p>
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
    <div className="relative flex flex-col items-center gap-1.5">
      <div
        className="relative rounded-[15px] p-[2px]"
        style={{
          background: `linear-gradient(145deg, ${ring}, ${ring}88)`,
          boxShadow: `0 0 0 1px ${ring}55, 0 0 18px ${ring}66`,
        }}
      >
        <div className="overflow-hidden rounded-[13px] bg-white">
          <Image src={src} alt={alt} width={96} height={96} className="h-12 w-12 object-cover" />
        </div>
        <span
          className="absolute -right-1 -top-1 rounded-full px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-white"
          style={{ background: ring }}
        >
          Demo
        </span>
      </div>
      <span className="max-w-[52px] truncate text-center text-[9px] font-medium text-white">
        {label}
      </span>
    </div>
  );
}
