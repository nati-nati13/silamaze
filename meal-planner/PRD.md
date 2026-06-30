# Dermako Academy — Product Requirements Document

## 1. Overview

Beauty salon & professional cosmetology academy website. Georgian language. Luxury feminine aesthetic.

**Brand:** Dermako Academy  
**Markets:** Tbilisi + Sagarejo  
**Stack:** Next.js 16 App Router, Tailwind CSS v4, shadcn/ui, TypeScript

---

## 2. Business Info

| Field | Value |
|-------|-------|
| Name | Dermako Academy |
| Location 1 | თბილისი, ვაჟა-ფშაველას 8 |
| Location 2 | საგარეჯო, ერეკლე II-ის 49 |
| Facebook | https://www.facebook.com/mariam.mako.520412 |
| Language | Georgian (ka) |

---

## 3. Pages

### 3.1 მთავარი `/`
- **Hero** — Full-viewport. Brand name "Dermako Academy" large serif. Tagline. Two CTAs: სერვისები / კურსები.
- **Services preview** — 5 service cards with icons. "ყველა სერვისი" link.
- **Courses preview** — 3 course cards with "ჩარიცხვა" CTA per card.
- **Contact teaser** — Both addresses + Facebook link + full contact button.

### 3.2 სერვისები `/servesebi`
- Page hero banner.
- Grid of all 5 services. Each card: icon, title, description, price placeholder ("––").

### 3.3 აკადემია `/akademia`
- Dark hero banner.
- 3 course cards with "ჩარიცხვა" → Facebook link.
- "Why us" section with 5 benefit points.
- Enrollment CTA strip (rose background).

### 3.4 კონტაქტი `/kontakti`
- Page hero.
- Two location cards with Google Maps link.
- Facebook social link.

---

## 4. Services

| ID | Georgian Title |
|----|---------------|
| classical | კლასიკური კოსმეტოლოგია |
| injection | ინექციური კოსმეტოლოგია |
| massage | მასაჟი |
| permanent | პერმანენტული მაკიაჟი |
| laser | ლაზერული (დიოდური) ეპილაცია |

---

## 5. Courses (Academy)

| ID | Georgian Title |
|----|---------------|
| classical | კლასიკური კოსმეტოლოგია |
| laser | ლაზერული (დიოდური) ეპილაცია |
| permanent | პერმანენტული მაკიაჟი |

---

## 6. Design System

### Palette
| Token | Value | Use |
|-------|-------|-----|
| `--primary` | `oklch(0.58 0.12 358)` | Rose pink — CTAs, accents |
| `--secondary` | `oklch(0.72 0.09 75)` | Warm gold — labels, dividers |
| `--background` | `oklch(0.98 0.01 75)` | Cream white |
| `--foreground` | `oklch(0.18 0.03 15)` | Deep dark |
| `--muted` | `oklch(0.95 0.02 358)` | Light rose sections |

### Typography
| Role | Font | Weights |
|------|------|---------|
| Heading (`--font-heading`) | Cormorant Garamond | 400/500/600/700 |
| Body (`--font-sans`) | Montserrat | 300/400/500/600/700 |

### Feel
- Elegant, minimal, luxury
- Gold accent lines on course cards (top border)
- Rose decorative circles in hero
- Smooth hover transitions on all cards
- Mobile hamburger nav
- Sticky header with backdrop blur

---

## 7. Component Architecture

```
src/
├── shared/const/
│   ├── services.const.ts     ← 5 services
│   ├── courses.const.ts      ← 3 courses
│   ├── contacts.const.ts     ← 2 locations + Facebook URL
│   └── navigation.const.ts   ← PUBLIC_NAV_ITEMS (4 links)
│
├── shared/components/layout/
│   ├── header.tsx            ← sticky, mobile menu, active link highlight
│   └── footer.tsx            ← brand + locations + Facebook
│
├── features/marketing/components/
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   ├── courses-section.tsx
│   ├── contact-section.tsx
│   ├── home-page.tsx         ← composes all 4 sections
│   ├── services-page.tsx
│   ├── academy-page.tsx
│   └── contact-page.tsx
│
└── app/(public)/
    ├── page.tsx              → home-page
    ├── servesebi/page.tsx    → services-page
    ├── akademia/page.tsx     → academy-page
    └── kontakti/page.tsx     → contact-page
```

---

## 8. Implementation Checklist

### Setup
- [x] Clone nextjs-starter into `meal-planner/`
- [x] `npm install`
- [x] `cp .env.example .env`

### Design tokens
- [x] `globals.css` — rose/gold/cream palette, Cormorant + Montserrat vars
- [x] `layout.tsx` — font imports, `lang="ka"`

### Constants
- [x] `app.const.ts` — APP_NAME = "Dermako Academy"
- [x] `navigation.const.ts` — PUBLIC_NAV_ITEMS
- [x] `services.const.ts` — 5 services
- [x] `courses.const.ts` — 3 courses
- [x] `contacts.const.ts` — 2 locations + FACEBOOK_URL

### Layout components
- [x] `header.tsx` — luxury header, mobile menu, active state
- [x] `footer.tsx` — brand + addresses + Facebook

### Page components
- [x] `hero-section.tsx`
- [x] `services-section.tsx`
- [x] `courses-section.tsx`
- [x] `contact-section.tsx`
- [x] `home-page.tsx`
- [x] `services-page.tsx`
- [x] `academy-page.tsx`
- [x] `contact-page.tsx`

### Routes
- [x] `/` → home
- [x] `/servesebi` → services
- [x] `/akademia` → academy
- [x] `/kontakti` → contact

### QA
- [ ] Test all 4 pages render
- [ ] Mobile responsive check
- [ ] Nav active states work
- [ ] Facebook + Maps links open correctly
- [ ] No TypeScript errors

---

---

## 9. Phase 2 — Authentication & Backend

### Goal
User accounts for course enrollment tracking. MongoDB Atlas as production DB.

### Database
- **Provider:** MongoDB Atlas — `cluster0.1h4dhvl.mongodb.net`
- **DB name:** `dermako`
- **User:** `dermakoacademy8_db_user`
- **Connection:** `MONGO_URI` in `.env` (replace `<db_password>` with real password)

### Auth Flow
- **Provider:** NextAuth v5 (JWT sessions)
- **Methods:** Email/password credentials + Google OAuth
- **Password hashing:** SHA-256 via Node.js `crypto`

### User Schema (`users` collection)
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | required |
| `email` | String | required, unique |
| `passwordHash` | String | empty for OAuth users |
| `avatar` | String | optional, from Google |
| `role` | `user` \| `admin` | default `user` |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

### Pages
| Route | Component | Purpose |
|-------|-----------|---------|
| `/sign-up` | `SignUpForm` | Registration with Georgian labels |
| `/sign-in` | `LoginForm` | Login with Georgian labels |
| `/dashboard` | `DashboardOverview` | Protected, role-based |

### API Routes
| Method | Path | Handler |
|--------|------|---------|
| POST | `/api/auth/register` | `registerService` → creates user |
| GET/POST | `/api/auth/[...nextauth]` | NextAuth handler |

### Phase 2 Checklist
- [x] MongoDB Atlas URI in `.env` (replace `<db_password>`)
- [x] NextAuth config with Credentials + Google providers
- [x] User schema + model (`UserModel`)
- [x] Repository: `findByEmail`, `create`, `updateByEmail`
- [x] Services: `registerService`, `loginService`, `upsertOAuthUserService`
- [x] `/api/auth/register` route
- [x] `/sign-in` page — Georgian labels, Dermako card design
- [x] `/sign-up` page — Georgian labels, Dermako card design
- [x] Protected `/dashboard` route via `proxy.ts` middleware
- [ ] Replace `<db_password>` in `.env` with real Atlas password

---

## 10. Future / Out of Scope

- Price list (placeholder "––" for now — client to fill)
- Booking system
- Image gallery
- Real photos (placeholder sections only)
- Blog / news
