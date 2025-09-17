# StayFit.pk

StayFit.pk is a professional fitness website built with a modern, full-stack TypeScript architecture.  
It delivers a high-performance, SEO-friendly, and responsive platform with integrated backend features.

---

## Tech Stack

### Frontend
- React 18  
- TypeScript  
- Vite  
- Tailwind CSS  
- React Router  
- shadcn/ui components  

### Backend
- Node.js  
- Express.js (TypeScript)  
- Prisma ORM  
- JWT Authentication  
- Stripe / PayPal SDK  

### Database
- PostgreSQL (recommended)  
- MySQL (alternative if needed)  

### DevOps
- Hostinger VPS (production hosting)  
- NGINX reverse proxy  
- PM2 for Node.js process management  
- Git & GitHub for version control and CI/CD  

---

## Features

- Modern, responsive landing page with hero carousel  
- SEO-optimized structure with meta tags and schema  
- WhatsApp button for direct inquiries  
- Integrated chatbot (Gemini-ready, frontend placeholder)  
- Google Maps embedding for location  
- Video testimonials linked with YouTube  
- Highlights gallery  
- Membership and trainer profile pages  
- Pricing plans with secure payments (Stripe/PayPal)  
- Blog, testimonials, and newsletter subscription  
- Admin dashboard with analytics  
- Accessibility and performance optimized  
stayfit.pk/
│
├── frontend/       # React + Vite + Tailwind + shadcn/ui
│   ├── public/
│   ├── src/
│   └── …
│
├── backend/        # Node.js + Express + TypeScript + Prisma
│   ├── src/
│   └── …
│
└── README.md
---

## Setup Instructions

### Clone the repository
```bash
git clone https://github.com/sultan9723/stayfit.pk.git
cd stayfit.pk
cd frontend
npm install
npm run dev
cd backend
npm install
npm run dev
Database (PostgreSQL)
	1.	Install PostgreSQL on your VPS (or use a managed instance).
	2.	Update your .env file with database credentials:
DATABASE_URL="postgresql://user:password@localhost:5432/stayfit"
Run Prisma migrations:
npx prisma migrate dev
Roadmap
	•	Add dark mode toggle
	•	Deploy production version on Hostinger VPS
	•	Expand admin dashboard and analytics
	•	Add advanced SEO with schema markup
Build a professional fitness website for StayFit.pk using the following tech stack:

Tech Stack:
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- shadcn/ui components

Color Scheme:
- Dark Navy (#0F172A) → primary background
- Golden Yellow (#FACC15) → highlight & primary CTA buttons
- Fresh Green (#16A34A) → secondary CTA, trust signals
- White (#FFFFFF) → text on dark
- Light Gray (#9CA3AF) → muted subtext

Requirements:
1. SEO optimization:
   - Title/meta tags per page
   - Open Graph + Twitter Card tags
   - Schema.org (LocalBusiness + Article for blog posts)
   - Alt tags for all images

2. Hero Section:
   - Fullscreen carousel with gym images
   - Overlay headline + subtext
   - CTA buttons (“Join Now” in yellow, “Explore Programs” in green)
   - Smooth fade/slide animations, responsive on mobile & desktop

3. Navigation:
   - Sticky navbar with smooth scroll
   - Links: Home, Programs, Trainers, Pricing, Blog, Contact

4. Sections:
   - Why StayFit: 4 cards (Strength, Cardio, MMA, Nutrition) with icons
   - Video Testimonials: Carousel of YouTube video thumbnails, open in lightbox
   - Programs & Classes: Grid of programs with “Book Now” button
   - Trainers: Profile cards with specialties and booking option
   - Pricing Plans: 3–4 cards with “Most Popular” highlighted in yellow
   - Achievements/Metrics: Animated counters (members, trainers, years, transformations)
   - Highlights Gallery: Responsive image grid with lightbox modal
   - Blog/News: SEO-ready article cards
   - FAQ: Accordion style Q&A
   - Newsletter Signup: Form for Mailchimp/SendGrid
   - Contact Section: Form (Name, Email, Phone, Message) + embedded Google Map

5. Floating Elements:
   - WhatsApp button (green) linking to wa.me link
   - Chatbot widget (frontend-only placeholder, Gemini-ready)

6. Footer:
   - Quick links (Programs, Trainers, Pricing, Blog)
   - Social media icons
   - Business hours
   - Copyright + Privacy Policy

7. Design Guidelines:
   - Use Tailwind CSS utility classes
   - Use shadcn/ui for components (buttons, cards, modal, accordion, forms)
   - Animations with Framer Motion or Tailwind transitions (lightweight, smooth)
   - Fully responsive for mobile, tablet, desktop
   - Accessibility features (contrast, keyboard nav, alt text)

8. Project Structure:
   - /frontend → React + Vite + Tailwind + shadcn/ui
   - Pages routed with React Router
   - Components organized under /components

Deliverable:
Generate the full React + Vite + Tailwind + TypeScript codebase following these requirements, ready to run with npm install && npm run dev.
---

## Project Structure
