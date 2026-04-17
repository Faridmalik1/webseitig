# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM (legacy), MongoDB + Mongoose (leads)
- **Validation**: Zod v3 (`zod`)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Email**: NodeMailer (German HTML templates)

## Key Commands

```bash
# Start all services in parallel (website + API + CRM)
pnpm dev

# Individual services
pnpm --filter @workspace/sds-website run dev
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/crm run dev

# Build / typecheck all packages
pnpm build
pnpm typecheck
```

### Local development (outside Replit)
```bash
corepack enable          # ensures the correct pnpm version is used
pnpm install
pnpm dev
```

### Environment variables
Copy `.env.example` → `.env` and fill in the values:
- `MONGODB_URI` — MongoDB Atlas connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` — SMTP credentials for NodeMailer
- `ADMIN_EMAIL` — receives new lead notifications
- `CRM_ADMIN_KEY` — password for the CRM portal (default: `webseitig-admin-2025`)
- `SESSION_SECRET` — long random string for cookie signing

In Replit, these are set via the Secrets panel (not the `.env` file).

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### SDS Website (`artifacts/sds-website`)
- **Preview path**: `/`
- **Type**: Next.js 15 (App Router) — full-stack, single port, Vercel-ready
- **Design**: Dark theme, bg `#171717`, card `#1c1c1c`, lime accent `#C8E646`
- **Features**:
  - Pixel-perfect German landing page (web.seitig brand)
  - Sections: Navbar, Hero, About, Services, Features, Pricing, Portfolio, Testimonials, FAQ, CTABanner, Footer
  - ContactModal: name + optional email + phone + branche dropdown, Framer Motion animations, real API POST
  - Legal pages: Impressum, Datenschutz, AGB (Next.js file-based routes)
  - Footer: logo, legal links, scroll-to-top, Kontakt scrolls to #faq
  - Portfolio: autoplay 4.5s, prev/next arrows, dot navigation
  - ModalProvider context (`src/lib/modal-context.tsx`) — opens from Navbar, Hero, Pricing, CTABanner
  - **Built-in API routes** (`src/app/api/`):
    - `POST /api/leads` — create lead (MongoDB + SMTP)
    - `GET /api/leads` — list leads (X-Admin-Key required)
    - `GET /api/leads/stats` — count by status (X-Admin-Key required)
    - `PATCH /api/leads/[id]` — update lead (X-Admin-Key required)
    - `DELETE /api/leads/[id]` — delete lead (X-Admin-Key required)
    - `POST /api/contact` — contact form
    - `GET /api/healthz` — health check
  - **Shared libs** in `src/lib/`: `mongodb.ts`, `mailer.ts`; model: `src/models/Lead.ts`
  - **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`
  - **Deployment**: Deploy directly to Vercel — no separate API server needed

### API Server (`artifacts/api-server`)
- **Preview path**: `/api`
- **Type**: Express 5 API server
- **Routes**:
  - `GET /api/healthz` — health check
  - `POST /api/contact` — legacy contact form (NodeMailer)
  - `POST /api/leads` — create lead from website form, triggers emails
  - `GET /api/leads` — list leads (requires X-Admin-Key header)
  - `GET /api/leads/stats` — count by status (requires X-Admin-Key header)
  - `PATCH /api/leads/:id` — update status/notes (requires X-Admin-Key header)
  - `DELETE /api/leads/:id` — delete lead (requires X-Admin-Key header)
- **Database**: MongoDB (connect via `MONGODB_URI` env var — optional, falls back gracefully)
- **Email**: NodeMailer with German HTML templates; requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ADMIN_EMAIL env vars
- **Models**: `src/models/Lead.ts` — name, email?, phone, branche, status, notes, source, createdAt
- **Admin auth**: `X-Admin-Key` header checked against `CRM_ADMIN_KEY` env var

### CRM Portal (`artifacts/crm`)
- **Preview path**: `/crm`
- **Type**: React + Vite internal admin portal
- **Design**: Dark theme matching web.seitig (#171717, #C8E646)
- **Features**:
  - Login page: password → validates against GET /api/leads/stats with X-Admin-Key header
  - Dashboard: 6 stat cards (Total, Neu, In Kontakt, Qualifiziert, Gewonnen, Verloren)
  - Leads table: search by name/phone/branche, filter by status tabs
  - Inline status dropdown per lead row
  - Lead detail drawer (slide-in): status buttons, WhatsApp link, notes textarea, delete
  - Default admin key: `webseitig-admin-2025` (set in CRM_ADMIN_KEY env var)

## Environment Variables

### Required for emails (add when ready)
- `SMTP_HOST` — SMTP server host
- `SMTP_PORT` — SMTP server port (587 or 465)
- `SMTP_USER` — SMTP username / from address
- `SMTP_PASS` — SMTP password (secret)
- `ADMIN_EMAIL` — admin email to receive lead notifications

### Required for MongoDB lead persistence
- `MONGODB_URI` — MongoDB Atlas connection string (secret)

### CRM auth
- `CRM_ADMIN_KEY` — admin password for CRM portal (default: `webseitig-admin-2025`)

## Notes
- Language: German only (no i18n)
- Zod v3 used in api-server (workspace catalog); api-zod uses same
- MongoDB connection is non-fatal — if MONGODB_URI not set, leads are logged but not persisted
- SMTP not set → emails logged to console only (mock mode)
