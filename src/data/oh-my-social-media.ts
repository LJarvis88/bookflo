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
    "Social-first beauty content studio — strategy calls, shoot days, and makeup for camera. Energetic, bookable, and unapologetically on-brand.",
  logoText: "OMS",
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
    { id: "oms_cat_strategy", name: "Strategy" },
    { id: "oms_cat_shoots", name: "Content shoots" },
    { id: "oms_cat_glam", name: "Glam for camera" },
  ],
  services: [
    {
      id: "oms_svc_audit",
      categoryId: "oms_cat_strategy",
      name: "Social audit call",
      description: "45-minute review of your feed, offers, and next 30 days.",
      durationMinutes: 45,
      pricePence: 9500,
      active: true,
    },
    {
      id: "oms_svc_plan",
      categoryId: "oms_cat_strategy",
      name: "Content calendar sprint",
      description: "Half-day planning workshop with templates you can reuse.",
      durationMinutes: 180,
      pricePence: 28000,
      active: true,
    },
    {
      id: "oms_svc_reel",
      categoryId: "oms_cat_shoots",
      name: "Reel day (half day)",
      description: "On-location or studio reels batch with shot list.",
      durationMinutes: 240,
      pricePence: 45000,
      active: true,
    },
    {
      id: "oms_svc_ugc",
      categoryId: "oms_cat_shoots",
      name: "UGC product session",
      description: "Lifestyle product clips for paid and organic.",
      durationMinutes: 90,
      pricePence: 18000,
      active: true,
    },
    {
      id: "oms_svc_glam",
      categoryId: "oms_cat_glam",
      name: "Camera glam",
      description: "Makeup and hair for content — soft glam, high definition.",
      durationMinutes: 60,
      pricePence: 7500,
      active: true,
    },
  ],
  staff: [
    {
      id: "oms_staff_tee",
      name: "Tee",
      role: "Founder · strategist",
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
    {
      id: "oms_staff_mina",
      name: "Mina Cole",
      role: "Glam artist",
      initials: "MC",
      color: "#C45A8A",
      active: true,
    },
  ],
  hours: [
    { weekday: 0, open: null, close: null },
    { weekday: 1, open: "10:00", close: "18:00" },
    { weekday: 2, open: "10:00", close: "18:00" },
    { weekday: 3, open: "10:00", close: "18:00" },
    { weekday: 4, open: "10:00", close: "18:00" },
    { weekday: 5, open: "10:00", close: "16:00" },
    { weekday: 6, open: null, close: null },
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
      serviceId: "oms_svc_audit",
      staffId: "oms_staff_tee",
      customerId: "oms_cus_1",
      clientName: "Ava Brooks",
      clientEmail: "ava@example.com",
      clientPhone: "07700 900201",
      date: DEMO_TODAY,
      startTime: "10:00",
      endTime: "10:45",
      status: "confirmed",
      pricePence: 9500,
    },
    {
      id: "oms_apt_2",
      serviceId: "oms_svc_reel",
      staffId: "oms_staff_jaz",
      customerId: "oms_cus_2",
      clientName: "Leo Nash",
      clientEmail: "leo@example.com",
      clientPhone: "07700 900202",
      date: DEMO_TODAY,
      startTime: "11:00",
      endTime: "15:00",
      status: "confirmed",
      pricePence: 45000,
    },
    {
      id: "oms_apt_3",
      serviceId: "oms_svc_glam",
      staffId: "oms_staff_mina",
      clientName: "Sky Patel",
      clientEmail: "sky@example.com",
      clientPhone: "07700 900203",
      date: DEMO_TODAY,
      startTime: "10:30",
      endTime: "11:30",
      status: "pending",
      pricePence: 7500,
    },
    {
      id: "oms_apt_4",
      serviceId: "oms_svc_ugc",
      staffId: "oms_staff_jaz",
      clientName: "Rae Quinn",
      clientEmail: "rae@example.com",
      clientPhone: "07700 900204",
      date: "2026-10-31",
      startTime: "13:00",
      endTime: "14:30",
      status: "confirmed",
      pricePence: 18000,
    },
  ],
};

export function getOmsService(tenant: Tenant, id: string) {
  return tenant.services.find((s) => s.id === id);
}

export function getOmsStaff(tenant: Tenant, id: string) {
  return tenant.staff.find((s) => s.id === id);
}
