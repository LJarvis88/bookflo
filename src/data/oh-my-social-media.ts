import type { BrandTokens, Tenant } from "@/lib/types";
import { DEMO_TODAY } from "@/lib/format";

/**
 * Oh My Social Media palette (sampled from brand kit PNG):
 * Magenta / fuchsia #EB0E7F · Bright orange #FE5F0B
 * Cream surfaces #F7F1E8 (not pure white) · warm ink for contrast
 */
export const OMS_PALETTE = {
  magenta: "#EB0E7F",
  orange: "#FE5F0B",
  cream: "#F7F1E8",
  creamDeep: "#F0E6D8",
  ink: "#1C1218",
  muted: "#8B6A73",
} as const;

export const OMS_BRAND: BrandTokens = {
  displayName: "Oh My Social Media",
  tagline: "Bold content days for beauty brands who want to be seen",
  description:
    "Social-first beauty content studio — content days and studio shoots. Energetic, bookable, and unapologetically on-brand.",
  logoText: "OMS",
  logoUrl: "/tenants/oh-my-social-media/logo.png",
  coverStyle: "blush",
  primary: OMS_PALETTE.magenta,
  secondary: OMS_PALETTE.orange,
  background: OMS_PALETTE.cream,
  ink: OMS_PALETTE.ink,
  muted: OMS_PALETTE.muted,
  surface: OMS_PALETTE.creamDeep,
  buttonBg: OMS_PALETTE.magenta,
  buttonText: "#FFFFFF",
  fontHeading: "Syne",
  fontBody: "Manrope",
};

export const OMS_LOGO = "/tenants/oh-my-social-media/logo.png";

/** Studio shoots: 10am, 12pm, 2pm. Content packages share these start times where they fit. */
export const OMS_BOOKING_SLOTS = ["10:00", "12:00", "14:00"] as const;

/** Any day of the week (demo window). */
export const OMS_AVAILABLE_DATES = [
  "2026-11-01", // Sun
  "2026-11-02", // Mon
  "2026-11-03", // Tue
  "2026-11-04", // Wed
  "2026-11-05", // Thu
  "2026-11-06", // Fri
  "2026-11-07", // Sat
  "2026-11-08", // Sun
  "2026-11-09", // Mon
  "2026-11-10", // Tue
  "2026-11-11", // Wed
  "2026-11-12", // Thu
  "2026-11-13", // Fri
  "2026-11-14", // Sat
] as const;

export const ohMySocialMedia: Tenant = {
  id: "tenant_oh_my_social_media",
  slug: "oh-my-social-media",
  name: "Oh My Social Media",
  type: "Content studio",
  websiteUrl: "https://ohmysocialmedia.example",
  plan: "salon",
  timezone: "Europe/London",
  address: "Studio 4, Northern Quarter, Manchester M1 1JN",
  phone: "0161 555 0142",
  email: "hello@ohmysocialmedia.example",
  brand: OMS_BRAND,
  categories: [
    { id: "oms_cat_content", name: "Content shoots" },
    { id: "oms_cat_studio", name: "Studio shoots" },
    { id: "oms_cat_discovery", name: "Discovery call slots" },
  ],
  services: [
    {
      id: "oms_svc_content_3h",
      categoryId: "oms_cat_content",
      name: "Content shoot — 3 hours",
      description: "On-brand content day package. Shot list + direction included.",
      durationMinutes: 180,
      pricePence: 45000,
      active: true,
    },
    {
      id: "oms_svc_content_6h",
      categoryId: "oms_cat_content",
      name: "Content shoot — 6 hours",
      description: "Full content day package for multi-set / multi-outfit batches.",
      durationMinutes: 360,
      pricePence: 78000,
      active: true,
    },
    {
      id: "oms_svc_studio_2h",
      categoryId: "oms_cat_studio",
      name: "Studio shoot — 2 hours",
      description: "In-studio session. Slots at 10:00, 12:00, or 14:00 — any day.",
      durationMinutes: 120,
      pricePence: 28000,
      active: true,
    },
    {
      id: "oms_svc_discovery",
      categoryId: "oms_cat_discovery",
      name: "Discovery call",
      description: "30-minute intro call to scope content goals and next shoot.",
      durationMinutes: 30,
      pricePence: 0,
      active: true,
    },
  ],
  staff: [
    {
      id: "oms_staff_tee",
      name: "Tee",
      role: "Founder · director",
      initials: "TE",
      color: OMS_PALETTE.magenta,
      active: true,
    },
    {
      id: "oms_staff_jaz",
      name: "Jaz Rivera",
      role: "Shooter",
      initials: "JR",
      color: OMS_PALETTE.orange,
      active: true,
    },
  ],
  // Open every day — studio shoots bookable any day of the week
  hours: [
    { weekday: 0, open: "10:00", close: "18:00" },
    { weekday: 1, open: "10:00", close: "18:00" },
    { weekday: 2, open: "10:00", close: "18:00" },
    { weekday: 3, open: "10:00", close: "18:00" },
    { weekday: 4, open: "10:00", close: "18:00" },
    { weekday: 5, open: "10:00", close: "18:00" },
    { weekday: 6, open: "10:00", close: "18:00" },
  ],
  customers: [
    {
      id: "oms_cus_1",
      name: "Ava Brooks",
      email: "ava@example.com",
      phone: "07700 900201",
      visits: 4,
      lastVisit: "2026-10-20",
    },
    {
      id: "oms_cus_2",
      name: "Leo Nash",
      email: "leo@example.com",
      phone: "07700 900202",
      visits: 2,
      lastVisit: "2026-10-28",
    },
  ],
  appointments: [
    {
      id: "oms_apt_1",
      serviceId: "oms_svc_studio_2h",
      staffId: "oms_staff_tee",
      customerId: "oms_cus_1",
      clientName: "Ava Brooks",
      clientEmail: "ava@example.com",
      clientPhone: "07700 900201",
      date: DEMO_TODAY,
      startTime: "10:00",
      endTime: "12:00",
      status: "confirmed",
      pricePence: 28000,
    },
    {
      id: "oms_apt_2",
      serviceId: "oms_svc_content_3h",
      staffId: "oms_staff_jaz",
      customerId: "oms_cus_2",
      clientName: "Leo Nash",
      clientEmail: "leo@example.com",
      clientPhone: "07700 900202",
      date: DEMO_TODAY,
      startTime: "12:00",
      endTime: "15:00",
      status: "confirmed",
      pricePence: 45000,
    },
    {
      id: "oms_apt_3",
      serviceId: "oms_svc_studio_2h",
      staffId: "oms_staff_tee",
      clientName: "Sky Patel",
      clientEmail: "sky@example.com",
      clientPhone: "07700 900203",
      date: DEMO_TODAY,
      startTime: "14:00",
      endTime: "16:00",
      status: "pending",
      pricePence: 28000,
    },
    {
      id: "oms_apt_4",
      serviceId: "oms_svc_content_6h",
      staffId: "oms_staff_jaz",
      clientName: "Rae Quinn",
      clientEmail: "rae@example.com",
      clientPhone: "07700 900204",
      date: "2026-11-01",
      startTime: "10:00",
      endTime: "16:00",
      status: "confirmed",
      pricePence: 78000,
    },
  ],
};

/** Slots for a given OMS service. Studio: 10 / 12 / 2; discovery shares those; content package starts. */
export function getOmsSlotsForService(serviceId: string | null | undefined): string[] {
  if (serviceId === "oms_svc_content_6h") {
    // Full day — morning start only
    return ["10:00"];
  }
  if (serviceId === "oms_svc_content_3h") {
    // 3h fits 10:00 or 12:00 before close
    return ["10:00", "12:00"];
  }
  // Studio 2h + discovery calls — 10am, 12pm, 2pm any day
  return [...OMS_BOOKING_SLOTS];
}

export function getOmsService(tenant: Tenant, id: string) {
  return tenant.services.find((s) => s.id === id);
}

export function getOmsStaff(tenant: Tenant, id: string) {
  return tenant.staff.find((s) => s.id === id);
}
