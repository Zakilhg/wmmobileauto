## Within Minutes Mobile Auto Repair

Production-ready marketing site with Sanity CMS and Resend email.

## Local setup

1) Install dependencies:

```bash
npm install
```

2) Create `.env.local` using `.env.example` as a guide.

3) Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Sanity CMS setup

1) Create a Sanity project and dataset:
   - Go to `https://sanity.io`
   - Create a project (choose a name like "Within Minutes")
   - Create a dataset (ex: `production`)

2) Add the values to `.env.local`:

```
SANITY_PROJECT_ID=yourProjectId
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
```

3) Run the Studio locally:

```bash
npm run dev
```

Open `http://localhost:3000/studio`.

4) Add basic auth for `/studio`:

```
STUDIO_USERNAME=yourUsername
STUDIO_PASSWORD=yourPassword
```

## Content editing in /studio

- **Services**: update descriptions, service lists, common issues, tint tiers.
- **FAQs**: add/edit questions for mechanic and tint categories.
- **Service Areas**: add/remove cities.
- **Gallery**: upload mechanic or tint photos and add short descriptions.
- **Hours**: update weekly schedule.
- **Site Settings**: edit phone, email, hero text, CTA copy, and badges.

## Resend email setup

1) Create a Resend account and API key.
2) Add your key to `.env.local`:

```
RESEND_API_KEY=yourKey
EMAIL_TO=owner@domain.com
```

3) For production, add a verified sending domain in Resend and update the `from`
   address in `app/api/quote/route.ts`.

### DNS records for Resend

Resend will provide DNS records to verify your sending domain:
- **SPF** (TXT record)
- **DKIM** (CNAME records)

Add the records exactly as provided in your DNS provider.

## Deploy to Vercel

1) Push the repository to GitHub.
2) Import the repo in Vercel.
3) Add the environment variables from `.env.example`.
4) Deploy.

### Add a custom domain

In Vercel:
- Add the domain under Project Settings → Domains.
- Update your DNS provider with the A/AAAA or CNAME record Vercel provides.

## Adding gallery photos

1) Go to `/studio` → Gallery Items.
2) Upload an image and select a category (Mechanic or Tint).
3) Add a short title and description.

## Adding service areas

1) Go to `/studio` → Service Areas.
2) Add a city or neighborhood name.
3) Save and publish.

