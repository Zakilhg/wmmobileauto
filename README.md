# Within Minutes Mobile Auto Repair

A modern, full-stack business website built with Next.js 15, Sanity CMS, and Tailwind CSS. Features a responsive design, dark mode, CMS-powered content, and transactional email integration.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=flat-square&logo=sanity)

---

## Overview

This is a production-ready marketing website for a mobile auto repair and window tinting business. The site is designed to convert visitors into customers through clear CTAs, fast load times, and mobile-first UX.

**Live Demo:** [wmmobileauto.com](https://wmmobileauto.com)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI + shadcn/ui |
| CMS | Sanity v4 |
| Email | Resend |
| Deployment | Vercel |

---

## Features

### Frontend
- **Responsive Design** — Mobile-first approach with optimized layouts for all screen sizes
- **Dark Mode** — System preference detection with manual toggle
- **Sticky Header** — With hamburger menu and quick-call button on mobile
- **Animated Interactions** — Smooth transitions and micro-interactions

### Content Management
- **Sanity Studio** — Embedded CMS at `/studio` with custom login
- **Dynamic Content** — Services, FAQs, Gallery, Service Areas, Hours, Site Settings
- **Fallback Defaults** — Site works even with empty CMS data

### Performance & SEO
- **Server Components** — Leverages React Server Components for fast initial loads
- **Auto Sitemap** — Dynamic `sitemap.xml` generation
- **Structured Data** — JSON-LD for local business schema
- **Meta Tags** — Open Graph and Twitter cards configured

### Security
- **Protected CMS** — Cookie-based authentication for Studio access
- **Rate Limiting** — Prevents spam on quote form
- **Input Validation** — Zod schemas for form data
- **Honeypot Fields** — Bot protection without CAPTCHA

---

## Project Structure

```
├── app/
│   ├── (site)/              # Public pages
│   │   ├── page.tsx         # Home
│   │   ├── mobile-mechanic/ # Service page
│   │   ├── window-tint/     # Service page
│   │   ├── service-areas/   # Locations
│   │   ├── gallery/         # Work showcase
│   │   └── contact/         # Quote form
│   ├── api/
│   │   └── quote/           # Email API route
│   └── studio/              # Sanity CMS
├── components/
│   ├── site/                # Page components
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── sanity/              # CMS client & queries
│   └── validators/          # Zod schemas
├── sanity/
│   └── schemas/             # Content type definitions
└── public/
    └── logo/                # Brand assets
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Sanity account
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git https://github.com/Zakilhg/wmmobileauto.git
   cd wm-mobile-auto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure `.env.local`**
   ```env
   # Site
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_PHONE=555-555-5555
   NEXT_PUBLIC_TEXT_NUMBER=555-555-5555

   # Email
   EMAIL_TO=you@example.com
   FROM_EMAIL=noreply@exmaple.com
   RESEND_API_KEY=re_xxxxx

   # Sanity
   SANITY_PROJECT_ID=your-project-id
   SANITY_DATASET=production
   SANITY_API_VERSION=2025-01-01
   SANITY_TOKEN=your-token
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production

   # Studio Auth
   STUDIO_USERNAME=admin
   STUDIO_PASSWORD=your-password
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the site**
   - Website: [http://localhost:3000](http://localhost:3000)
   - CMS: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Environment Variables

All variables from `.env.example` must be set in your hosting platform.

---

## Content Management

Access the CMS at `/studio` with your configured credentials.

| Content Type | Description |
|--------------|-------------|
| **Site Settings** | Business name, phone, email, hero text, CTAs |
| **Services** | Service descriptions, lists, tint tiers |
| **FAQs** | Categorized Q&A for each service |
| **Service Areas** | Cities and neighborhoods served |
| **Gallery** | Work photos with categories |
| **Hours** | Weekly business schedule |

---

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## License

This project is private and not licensed for public use.

---

## Author

Built by **Zakaria Lahgaz**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/zakarialahgaz/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat-square&logo=github)](https://github.com/Zakilhg)
