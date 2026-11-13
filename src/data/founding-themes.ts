import type { BrandTokens } from "@/lib/types";

export type FoundingThemeId =
  | "luxe"
  | "clinical"
  | "soft"
  | "noir"
  | "modern";

export interface FoundingThemePreset {
  id: FoundingThemeId;
  label: string;
  blurb: string;
  /** Presentation defaults — salon brand layers on top at activation time. */
  tokens: Partial<BrandTokens>;
}

/**
 * Shared BookingFlow / BrandTokens presets — not five duplicated pages.
 * Applied only when a Founding 30 business activates (January+); capture preference now.
 */
export const FOUNDING_THEME_PRESETS: FoundingThemePreset[] = [
  {
    id: "luxe",
    label: "Luxe",
    blurb: "Deep ink, champagne gold, editorial calm.",
    tokens: {
      coverStyle: "ink",
      background: "#0C111B",
      ink: "#F0EAE2",
      primary: "#C8A36C",
      secondary: "#192C42",
      muted: "#D5C4B2",
      surface: "#192C42",
      buttonBg: "#C8A36C",
      buttonText: "#0C111B",
      fontHeading: "Cormorant Garamond",
      fontBody: "Outfit",
    },
  },
  {
    id: "clinical",
    label: "Clinical",
    blurb: "Cool white, steel accents, precise and clean.",
    tokens: {
      coverStyle: "lavender",
      background: "#F7F9FB",
      ink: "#121820",
      primary: "#5B7C99",
      secondary: "#E8EEF3",
      muted: "#6B7785",
      surface: "#FFFFFF",
      buttonBg: "#5B7C99",
      buttonText: "#FFFFFF",
      fontHeading: "Syne",
      fontBody: "Manrope",
    },
  },
  {
    id: "soft",
    label: "Soft",
    blurb: "Lavender mist, gentle contrast, warm welcome.",
    tokens: {
      coverStyle: "lavender",
      background: "#F7F4FB",
      ink: "#2A2233",
      primary: "#845D81",
      secondary: "#E7D5FA",
      muted: "#6B6278",
      surface: "#FFFFFF",
      buttonBg: "#845D81",
      buttonText: "#FFFFFF",
      fontHeading: "Cormorant Garamond",
      fontBody: "Manrope",
    },
  },
  {
    id: "noir",
    label: "Noir",
    blurb: "Midnight surfaces, quiet luxury, high drama.",
    tokens: {
      coverStyle: "noir",
      background: "#0C111B",
      ink: "#F0EAE2",
      primary: "#A2BECC",
      secondary: "#192C42",
      muted: "#9AA3B2",
      surface: "#141B28",
      buttonBg: "#A2BECC",
      buttonText: "#0C111B",
      fontHeading: "Syne",
      fontBody: "Outfit",
    },
  },
  {
    id: "modern",
    label: "Modern",
    blurb: "Bright geometry, confident type, crisp CTAs.",
    tokens: {
      coverStyle: "blush",
      background: "#FFFFFF",
      ink: "#0E1420",
      primary: "#845D81",
      secondary: "#F5F6F8",
      muted: "#5C6678",
      surface: "#F5F6F8",
      buttonBg: "#0E1420",
      buttonText: "#FFFFFF",
      fontHeading: "Syne",
      fontBody: "Manrope",
    },
  },
];

export function getFoundingTheme(
  id: FoundingThemeId | string | null | undefined,
): FoundingThemePreset | undefined {
  return FOUNDING_THEME_PRESETS.find((t) => t.id === id);
}
