"use client";

const staff = [
  { name: "Amelia", role: "Lead", bg: "#F8E8E4", text: "#5C3D4A", initials: "AH" },
  { name: "Noah", role: "Injectables", bg: "#D5E6EF", text: "#3D5A68", initials: "NE" },
  { name: "Priya", role: "Skin", bg: "#E7D5FA", text: "#845D81", initials: "PS" },
  { name: "Liv", role: "Owner", bg: "#EFE4F2", text: "#5C3D5A", initials: "LV" },
];

type Block = { top: string; h: string; title: string; sub: string };

const blocks: Block[][] = [
  [
    { top: "8%", h: "18%", title: "09:30-10:30", sub: "Sophie · Facial" },
    { top: "42%", h: "12%", title: "14:00-14:30", sub: "Emma · Consult" },
    { top: "62%", h: "16%", title: "16:00-16:45", sub: "Nora · Hydra" },
  ],
  [
    { top: "14%", h: "12%", title: "10:00-10:30", sub: "Maya · Toxin" },
    { top: "55%", h: "16%", title: "15:30-16:15", sub: "Olivia · Lips" },
  ],
  [
    { top: "22%", h: "14%", title: "11:15-12:00", sub: "Hannah · Glow" },
    { top: "48%", h: "14%", title: "14:30-15:10", sub: "Isabelle · Peel" },
  ],
  [{ top: "30%", h: "20%", title: "12:00-13:30", sub: "Team briefing" }],
];

/** Wide product stage: clean staff-day calendar (Contour booking lives in its own section). */
export function HeroProductMockup() {
  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute left-[20%] top-[-6%] h-[50%] w-[60%] -translate-x-1/2 rounded-full bg-[#E7D5FA]/65 blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[10%] right-[-4%] h-[45%] w-[38%] rounded-full bg-[#E7D5FA]/50 blur-[70px]"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-bf-line bg-white/95 shadow-lift backdrop-blur-[2px] sm:rounded-3xl">
        <div className="flex items-center gap-2 border-b border-bf-line bg-[#f7f8fa] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e5e7eb]" />
          <p className="ml-3 text-xs font-medium text-bf-muted">Appointments · Contour Preston</p>
          <span className="ml-auto rounded-full bg-bf-ink px-2.5 py-1 text-[10px] font-medium text-white">
            Add +
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4">
          {staff.map((s, i) => (
            <div
              key={s.name}
              className={`min-h-[220px] border-bf-line sm:min-h-[280px] md:min-h-[320px] ${
                i > 0 ? "border-l" : ""
              } ${i > 1 ? "hidden sm:block" : ""}`}
            >
              <div className="flex items-center gap-2 border-b border-bf-line px-3 py-2.5">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold"
                  style={{ background: s.bg, color: s.text }}
                >
                  {s.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-bf-ink">{s.name}</p>
                  <p className="truncate text-[10px] text-bf-muted">{s.role}</p>
                </div>
              </div>
              <div className="relative h-[180px] bg-[linear-gradient(to_bottom,transparent_calc(100%-1px),#eef0f4_calc(100%-1px))] bg-[length:100%_36px] sm:h-[240px] md:h-[280px]">
                {(blocks[i] ?? []).map((b) => (
                  <div
                    key={b.title}
                    className="absolute left-1.5 right-1.5 overflow-hidden rounded-lg border px-1.5 py-1"
                    style={{
                      top: b.top,
                      height: b.h,
                      background: s.bg,
                      borderColor: `${s.text}33`,
                      color: s.text,
                    }}
                  >
                    <p className="truncate text-[10px] font-semibold leading-tight">{b.title}</p>
                    <p className="truncate text-[10px] leading-tight opacity-80">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
