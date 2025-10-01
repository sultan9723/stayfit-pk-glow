# StayFit.pk

StayFit.pk is a modern, high-performance fitness website built with React + TypeScript and Vite. It’s fully responsive, SEO-friendly, and integrates form modals wired to a backend API via environment configuration.

---

## Tech Stack (current)

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- shadcn/ui (Radix + Tailwind component primitives)
- lucide-react (icons)
- react-helmet-async (SEO)

---

## Features

- Hero carousel with animated content and CTAs
- Programs, Trainers, Pricing, Blog sections/pages
- Registration, Booking, and Trainer Booking modals
- Mobile-first responsive design with refined button and typography scales
- Accessibility-conscious components (focus rings, contrast)
- SEO: per-page titles and descriptions via `react-helmet-async`

---

## Environment

Create a `.env` at the project root:

```env
# Base URL for backend (optional). If unset, relative URLs are used.
VITE_API_BASE=http://localhost:3001
```

The following components submit to `${import.meta.env.VITE_API_BASE || ''}/api/book`:
- `src/components/RegistrationModal.tsx`
- `src/components/BookingModal.tsx`
- `src/components/TrainerBookingModal.tsx`

Ensure your backend exposes a POST `/api/book` endpoint to receive JSON form payloads.

---

## Scripts

```bash
npm install           # install deps
npm run dev           # start Vite dev server
npm run build         # production build
npm run preview       # preview production build locally
```

---

## Project Structure (key)

```
src/
  assets/                    # images
  components/
    sections/                # Hero, PricingPlans, ProgramsSection, TrainersSection, etc.
    RegistrationModal.tsx    # membership registration form modal
    BookingModal.tsx         # program booking modal
    TrainerBookingModal.tsx  # trainer booking modal
    Button.jsx               # shared responsive button component
    ui/                      # shadcn/ui wrappers (card, badge, dialog, input, etc.)
  pages/
    ProgramsPage.tsx
    TrainersPage.tsx
  data/
    stayfit_content.json     # content source for programs/trainers/blog
  hooks/
    useScrollAnimation.ts
  index.css                  # Tailwind styles + custom utilities
```

---

## Design System (mobile responsiveness)

- Buttons (≤640px): compact by default via `Button.jsx`
  - Primary/Secondary: `px-4 py-2 text-sm rounded-md` (grow at `sm:`)
- HeroSection (≤640px): `h1 text-3xl`, `h2 text-lg`, body `text-sm`
- Cards: single-column on mobile, `min-h-[320px]`, `p-4` content padding
- Sections: `py-8` on mobile, animations preserved

These styles are applied without changing desktop appearance.

---

## Deployment

Any static host that supports SPA routing works:
- Vercel / Netlify / Cloudflare Pages / Static S3 + CloudFront

Build and deploy the `dist/` folder:

```bash
npm run build
# upload dist/ to your host
```

If your backend is separate, deploy it independently and set `VITE_API_BASE` to its public URL.

---

## License

Proprietary. All rights reserved.
