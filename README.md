# BOOKFLO — Phase 2 visual prototype

**Your brand. Your bookings. Beautifully connected.**

Premium zero-commission white-label beauty booking SaaS. Phase 2 Next.js UI prototype with in-memory demo data (Contour Preston + Oh My Social Media). Stripe Connect is wired in **TEST mode** for OMS booking payments (pay in full or 50% deposit). No production database or live Stripe keys.

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
| `/signup` · `/login` | Auth stubs — login: `liv@contourpreston.com` / `contour-demo` → `/dashboard` |
| `/onboarding` | Multi-step salon onboarding |
| `/dashboard` | Today’s appointments |
| `/dashboard/calendar` | Week calendar |
| `/dashboard/customers` | Customer list |
| `/dashboard/services` | Services & prices |
| `/dashboard/staff` | Staff + hours |
| `/dashboard/branding` | Branding editor + live preview |
| `/dashboard/payments` | SaaS billing exemptions + OMS Stripe Connect onboarding (TEST) |
| `/dashboard/subscription` | Plan management (Tee free for life) |
| `/dashboard/settings` | Business profile (read-only demo) |
| `/book/contour-preston` | Contour Preston customer booking flow |
| `/book/oh-my-social-media` | OMS booking — pay in full or 50% deposit via Connect |

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

## Stripe (TEST mode)

Copy `.env.example` → `.env.local` and set Luke’s BOOKFLO **test** keys (`pk_test_` / `sk_test_` only — live keys are rejected).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe.js / Checkout (publishable) |
| `STRIPE_SECRET_KEY` | Server Checkout Sessions + Connect Account Links |
| `NEXT_PUBLIC_APP_URL` | Success/cancel + Connect return URLs |
| `STRIPE_CONNECT_OMS_ACCOUNT_ID` | Optional pinned OMS Express account id (hosted) |
| `BOOKFLO_STATIC_EXPORT` | Set `1` only for `npm run build:static` (deed HTML; parks `/api`) |

Default `npm run build` is **Node-capable** (required for Connect). Pure static deed publishes: `npm run build:static`. Ops notes: store doc `stripe-connect-oms.md`.

OMS Admin → Payments → **Connect Stripe account** opens Express onboarding for Tee. Checkout uses destination charges (0% application fee) so client payments go to Oh My Social Media. Tee is **free for life** on BOOKFLO SaaS (never Stripe Billing).

## Phase 3+ stubs (intentionally not live)

- Auth / sessions / multi-tenant persistence
- Postgres (or similar) + real tenancy
- Stripe Billing for paying SaaS subscribers
- Transactional email / SMS
- Real AI website scraping for brand match
- Custom domains, file uploads, production live keys

## Demo businesses

**Contour Preston** — aesthetics studio, Winckley Square, Preston. Pay at venue in this build.

**Oh My Social Media** — Tee’s content studio. Online pay in full / 50% deposit via Stripe Connect (TEST).
