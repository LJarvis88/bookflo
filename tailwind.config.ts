import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bf: {
          ink: "var(--bf-ink)",
          mist: "var(--bf-mist)",
          fog: "var(--bf-fog)",
          line: "var(--bf-line)",
          accent: "var(--bf-accent)",
          "accent-soft": "var(--bf-accent-soft)",
          brass: "var(--bf-brass)",
          muted: "var(--bf-muted)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        tenantDisplay: ["var(--font-tenant-display)", "Georgia", "serif"],
        tenantBody: ["var(--font-tenant-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 50px -28px rgba(14, 20, 32, 0.35)",
        lift: "0 12px 40px -18px rgba(14, 20, 32, 0.28)",
      },
      backgroundImage: {
        "bf-atmosphere":
          "radial-gradient(1200px 600px at 12% -10%, rgba(27, 107, 90, 0.14), transparent 55%), radial-gradient(900px 500px at 88% 8%, rgba(196, 165, 116, 0.16), transparent 50%), linear-gradient(180deg, #f7f8fa 0%, #eef1f5 48%, #f5f6f8 100%)",
        "bf-mesh":
          "radial-gradient(ellipse at 20% 0%, rgba(27, 107, 90, 0.09), transparent 45%), radial-gradient(ellipse at 80% 20%, rgba(196, 165, 116, 0.1), transparent 40%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "soft-pulse": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.75" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "soft-pulse": "soft-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
