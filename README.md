# BOOKFLO — Phase 2 visual prototype

**Your brand. Your bookings. Beautifully connected.**

Premium zero-commission white-label beauty booking SaaS. This Phase 2 build is a Next.js UI prototype with fictional in-memory demo data (Contour Preston). No real database, auth, Stripe, or AI scraping.

## Requirements

- **Node.js 22+** (developed on Node `v22.23.4`)
- npm 10+

## Local preview

```bash
cd bookflo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Key routes

| Route | Surface |
|---|---|
| `/` | Marketing homepage |
| `/signup` · `/login` | Auth stubs (no real accounts) |
| `/onboarding` | Multi-step salon onboarding |
| `/dashboard` | Today’s appointments |
| `/dashboard/calendar` | Week calendar |
| `/dashboard/customers` | Customer list |
| `/dashboard/services` | Services & prices |
| `/dashboard/staff` | Staff + hours |
| `/dashboard/branding` | Branding editor + live preview |
| `/dashboard/payments` | Billing + Connect **test-mode stubs** |
| `/dashboard/subscription` | Plan management stub |
| `/dashboard/settings` | Business profile (read-only demo) |
| `/book/contour-preston` | Contour Preston customer booking flow |

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** + CSS variables for platform (`bf-*`) and tenant tokens
- **Framer Motion** for intentional motion
- **Lucide** icons
- Fonts: **Syne** + **Manrope** (platform); **Cormorant Garamond** + **Outfit** (Contour Preston)
- Demo data in `src/data/` — ready to grow into multi-tenant SaaS

## Design notes

- Platform shell (marketing, onboarding, dashboard) uses the BOOKFLO identity.
- Tenant booking page at `/book/contour-preston` is Contour Preston branded — not a BOOKFLO skin.
- “AI brand match — demo” fills Contour Preston sample tokens; always overridable; not live scraping.

## Phase 3+ stubs (intentionally not live)

- Auth / sessions / multi-tenant persistence
- Postgres (or similar) + real tenancy
- Stripe Billing & Connect (UI labelled **test mode**)
- Transactional email / SMS
- Real AI website scraping for brand match
- Custom domains, file uploads, production deploy

## Demo business

**Contour Preston** — aesthetics studio, Winckley Square, Preston. UK services, staff, hours, and appointments are fictional.
