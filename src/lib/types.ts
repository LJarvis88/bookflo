export type PlanId = "solo" | "salon" | "pro";

export type AppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled"
  | "no_show";

export interface BrandTokens {
  displayName: string;
  tagline: string;
  description: string;
  logoText: string;
  logoUrl?: string;
  coverStyle: "blush" | "ink" | "sage" | "noir";
  primary: string;
  secondary: string;
  background: string;
  ink: string;
  muted: string;
  surface: string;
  buttonBg: string;
  buttonText: string;
  fontHeading: string;
  fontBody: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  durationMinutes: number;
  pricePence: number;
  active: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  active: boolean;
}

export interface WorkingHours {
  weekday: number; // 0=Sun
  open: string | null; // "09:00"
  close: string | null;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  visits: number;
  lastVisit: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  staffId: string;
  customerId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  pricePence: number;
}

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  type: string;
  websiteUrl?: string;
  plan: PlanId;
  timezone: string;
  address: string;
  phone: string;
  email: string;
  brand: BrandTokens;
  categories: ServiceCategory[];
  services: Service[];
  staff: StaffMember[];
  hours: WorkingHours[];
  customers: Customer[];
  appointments: Appointment[];
}

export interface OnboardingState {
  step: number;
  email: string;
  password: string;
  ownerName: string;
  businessName: string;
  websiteUrl: string;
  brand: BrandTokens;
  services: Array<Pick<Service, "name" | "durationMinutes" | "pricePence">>;
  hours: WorkingHours[];
}
