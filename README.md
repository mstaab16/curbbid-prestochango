# Contractor Website Template

A high-performance, config-driven website template for home-services contractors. Built with Astro 6, Tailwind CSS v4, and Bun. One codebase produces a unique site for any trade — plumber, electrician, roofer, painter, HVAC tech, landscaper, handyman — by changing a single config file and swapping content.

**Build output:** static HTML, ~25KB CSS, zero JavaScript on non-interactive pages, sub-2-second load times.

---

## Quick Start

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # static output in dist/
bun run preview  # preview the build locally
```

---

## How to Customize for a New Contractor

There are four layers of customization, from fastest to deepest. Most sites only need the first two.

### 1. Edit the Site Config (5 minutes)

Open **`src/config/site.ts`** and replace every field in `siteConfig` with the contractor's real information:

```ts
export const siteConfig: SiteConfig = {
  business: {
    name: 'Ramirez Plumbing',
    phone: '(512) 555-0199',
    email: 'hello@ramirezplumbing.com',
    address: { street: '402 Elm St', city: 'Austin', state: 'TX', zip: '78701' },
    license: 'TX Master Plumber #M-40912',
    tagline: 'Fast, Fair Plumbing You Can Trust',
    description: 'Austin's top-rated plumber. 24/7 emergency service, upfront pricing, and a 100% satisfaction guarantee on every job.',
    hours: [
      { days: 'Monday - Friday', hours: '7:00 AM - 7:00 PM' },
      { days: 'Saturday', hours: '8:00 AM - 5:00 PM' },
      { days: 'Sunday', hours: '24/7 Emergency' },
    ],
    foundedYear: 2012,
  },
  // ... rest of config
};
```

This single file controls:
- Every heading, phone link, and address on every page
- Navigation links (auto-built from feature flags)
- SEO title template and default meta description
- Contact form destination and hidden fields
- Footer content, social links, and service area cities

### 2. Set the Brand Identity (15 minutes)

Still inside `src/config/site.ts`, update the `branding` object. The color values flow through CSS custom properties into every Tailwind utility class (`bg-primary`, `text-cta`, `rounded-card`, etc.) — you never need to find-and-replace hex codes across components.

```ts
branding: {
  colors: {
    primary: '#1a5276',   // Main brand color (header, links, icons, section backgrounds)
    secondary: '#f8fafc', // Hero background, light sections
    accent: '#e67e22',    // Highlights, warning icons, badges
    cta: '#e74c3c',       // Primary button fill ("Get a Free Quote")
    ctaHover: '#c0392b',  // Button hover state
    background: '#ffffff', // Page background
    surface: '#f1f5f9',   // Card backgrounds, alternating sections
    text: '#1e293b',      // Headings and body text
    textMuted: '#64748b', // Secondary text, descriptions, placeholders
  },
  fonts: {
    heading: '"Montserrat Variable"', // Used on h1-h6, nav, badges
    body: '"Inter Variable"',         // Used on paragraphs, form fields, small text
  },
  radius: {
    card: '0.75rem',  // Cards, form inputs, image containers
    cta: '9999px',    // Pill-shaped buttons (use '0.5rem' for squared-off)
  },
},
```

**Recommended palettes by trade:**

| Trade | primary | accent | cta |
|---|---|---|---|
| Plumber | `#1a5276` (deep blue) | `#e67e22` (orange) | `#27ae60` (green) |
| Electrician | `#1b2a4a` (navy) | `#ffd100` (yellow) | `#e67e22` (orange) |
| HVAC | `#2563eb` (blue) | `#f97316` (orange) | `#dc2626` (red) |
| Roofer | `#1a1a2e` (near-black) | `#ffd100` (yellow) | `#dc2626` (red) |
| Landscaper | `#2e7d32` (forest green) | `#f99912` (gold) | `#e67e22` (orange) |
| Painter | `#f8fafc` (white) | multi-color accents | bold contrast |
| Handyman | `#e67e22` (warm orange) | `#2563eb` (blue) | `#27ae60` (green) |
| Pressure Wash | `#2563eb` (blue) | `#22c55e` (green) | `#2563eb` (blue) |

**Swapping fonts:** Place `.woff2` files in `public/fonts/`, update the `@font-face` declarations in `src/styles/global.css`, and change the font names in `branding.fonts`. Budget: 2 families max, under 100KB each.

### 3. Replace Content (30-60 minutes)

All content lives in `src/content/`. The Zod schemas in `src/content.config.ts` validate every field at build time — if you miss something, the build will tell you exactly what's wrong.

#### Services — `src/content/services/*.md`

Each service is a Markdown file. Delete the placeholder files and create one per service the contractor actually offers:

```markdown
---
title: Drain Cleaning
icon: plumbing
excerpt: Stubborn clogs cleared fast with professional hydro-jetting and camera inspection. Same-day service available.
order: 1
symptoms:
  - Slow-draining sinks or tubs
  - Gurgling sounds from pipes
  - Recurring clogs in the same drain
  - Sewage odor near drains
---

## Professional Drain Cleaning

Write 3-4 paragraphs about the service here. Use ## headings to break up sections.
This Markdown body becomes the full service detail page at /services/drain-cleaning.
```

The `icon` field maps to an SVG file in `src/assets/icons/`. The template ships with: `kitchen`, `bathroom`, `plumbing`, `electrical`, `hvac`, `painting`. To add a new icon, drop an SVG file (24x24 viewBox, `stroke="currentColor"`) into that folder and reference its filename (without `.svg`).

The `order` field controls sort position across the site.

The `symptoms` list renders as a highlighted "Signs You May Need This Service" box on the detail page — great for SEO and for helping homeowners self-diagnose.

#### Testimonials — `src/content/testimonials/testimonials.json`

```json
[
  {
    "id": "review-1",
    "name": "Sandra K.",
    "rating": 5,
    "text": "The actual review text from Google, Yelp, etc.",
    "service": "Drain Cleaning",
    "date": "2025-11-15",
    "location": "Austin, TX"
  }
]
```

Use real reviews. 4-6 is the sweet spot. Each needs a unique `id`.

#### Team — `src/content/team/team.json`

```json
[
  {
    "id": "carlos-ramirez",
    "name": "Carlos Ramirez",
    "role": "Owner & Master Plumber",
    "bio": "2-3 sentences about this person.",
    "certifications": ["TX Master Plumber", "Backflow Certified"]
  }
]
```

Team member photos go in `public/images/` as `team-{id-suffix}.svg` (or `.jpg`/`.webp`). The About component references them by ID.

#### FAQ — `src/content/faq/faq.json`

```json
[
  {
    "id": "faq-1",
    "question": "Do you charge for estimates?",
    "answer": "No — all estimates are free with no obligation.",
    "category": "pricing"
  }
]
```

The `category` field is used for filtering on service detail pages. Use short lowercase slugs like `general`, `pricing`, `scheduling`, `warranty`.

#### Gallery — `src/content/gallery/gallery.json`

```json
[
  {
    "id": "gallery-1",
    "title": "Kitchen Sink Replacement",
    "service": "Plumbing",
    "description": "Replaced corroded cast-iron drain with PVC and installed a new undermount sink. North Austin."
  }
]
```

Replace the SVG placeholders in `public/images/` with real project photos. Use AVIF or WebP for best performance (aim for under 200KB per image).

### 4. Deeper Customization (optional)

For a truly unique feel, go beyond config and content into the components themselves.

#### Rearrange homepage sections

Open **`src/pages/index.astro`**. The homepage is a stack of imported components. Reorder, remove, or duplicate them:

```astro
<BaseLayout title="Home">
  <Hero />
  <TrustBar />
  <ServicesGrid />
  <!-- Moved testimonials above how-it-works for this client -->
  <Testimonials />
  <HowItWorks />
  <!-- Removed Gallery for this client -->
  <About preview />
  <ServiceArea />
  <CTABanner />
  <FAQ limit={5} />
</BaseLayout>
```

#### Modify a section component

All components are in `src/components/`. Each is a self-contained `.astro` file with no external dependencies beyond the config and content collections. Common customizations:

- **Hero.astro** — Change from split layout to full-width background image, add a lead form instead of CTA buttons, swap stat numbers
- **TrustBar.astro** — Change badge icons and labels, add/remove badges, adjust styling
- **HowItWorks.astro** — Change step count, titles, descriptions, colors
- **ServicesGrid.astro** — Switch from 3-column to 2-column, change card style
- **FAQ.astro** — Adjust limit, filter by category

#### Add a new page

Create a file in `src/pages/`. It automatically becomes a route:

```astro
---
// src/pages/financing.astro
import BaseLayout from '@/layouts/BaseLayout.astro';
import CTABanner from '@/components/CTABanner.astro';
---

<BaseLayout title="Financing Options" description="Flexible financing for your home project.">
  <section class="py-16 lg:py-24">
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-4xl font-heading font-bold text-heading">Financing</h1>
      <!-- your content -->
    </div>
  </section>
  <CTABanner />
</BaseLayout>
```

Then add it to the nav in `src/config/site.ts` by editing the `navLinks` array.

#### Toggle features

In `src/config/site.ts`:

```ts
features: {
  enableGallery: false,        // Hides gallery page and nav link
  enableEmergencyBanner: true, // Fixed bottom bar with phone on mobile
},
```

---

## Setting Up the Contact Form

The template uses [Web3Forms](https://web3forms.com/) (free, no backend required).

1. Go to https://web3forms.com/ and enter the contractor's email address
2. Copy the access key from the confirmation email
3. Paste it into `src/config/site.ts`:

```ts
form: {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: 'paste-real-key-here',
},
```

Submissions go directly to the contractor's email inbox. No server, no database, no monthly fee.

To use a different form service (Formspree, Basin, etc.), change the `endpoint` URL and adjust the hidden fields in `src/components/ContactForm.astro`.

---

## Replacing Placeholder Images

The template ships with SVG placeholders. For a real site, replace these:

| Image | Location | Recommended size |
|---|---|---|
| Hero photo | `public/images/hero-placeholder.svg` | 1600x900, AVIF/WebP, < 150KB |
| Team photos | `public/images/team-*.svg` | 800x800, AVIF/WebP, < 80KB |
| Gallery photos | `public/images/gallery-*.svg` | 1200x800, AVIF/WebP, < 150KB |
| Logo | `public/images/logo.svg` | SVG preferred, or PNG with transparency |
| Favicon | `public/favicon.svg` | Update the SVG with the brand's primary color |

Photography tips for contractors without professional photos:
- Smartphone photos in good light are better than stock images
- Before/after pairs are the single most effective visual for conversions
- Show the crew in branded shirts, real job sites, real completed work
- One genuine owner headshot builds more trust than ten stock photos

---

## Deployment

The build outputs a static `dist/` folder that works on any host.

**Cloudflare Pages (recommended for free tier):**
```bash
# Connect repo, or use direct upload:
bunx wrangler pages deploy dist/
```

**Netlify:**
```bash
bunx netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
bunx vercel --prod
```

**Any static host:** Upload the contents of `dist/` to any web server, S3 bucket, or static host.

Before deploying, update `site` in `astro.config.mjs` and the `Sitemap` URL in `public/robots.txt` to the real domain.

---

## Project Structure

```
src/
├── config/
│   └── site.ts              # All business info, branding, features, SEO
├── content/
│   ├── services/*.md         # One Markdown file per service (generates detail pages)
│   ├── testimonials.json     # Customer reviews
│   ├── team.json             # Team member bios
│   ├── faq.json              # FAQ entries
│   └── gallery.json          # Project gallery items
├── content.config.ts         # Zod schemas — validates all content at build time
├── styles/
│   └── global.css            # Tailwind v4 + @font-face + design token theme
├── layouts/
│   └── BaseLayout.astro      # HTML shell, injects brand CSS vars, wraps all pages
├── components/
│   ├── Header.astro          # Sticky header: logo, nav, phone, CTA
│   ├── MobileNav.astro       # Off-canvas mobile menu
│   ├── Footer.astro          # 4-column footer with contact, links, service area
│   ├── EmergencyBanner.astro # Fixed bottom "Call Now" bar (mobile)
│   ├── Hero.astro            # Split hero: headline + CTA left, image right
│   ├── TrustBar.astro        # Icon badges: Licensed, Free Estimates, 5-Star, etc.
│   ├── ServicesGrid.astro    # 3-column service cards from content collection
│   ├── HowItWorks.astro      # 3-step process with numbered circles
│   ├── Testimonials.astro    # Review cards with star ratings
│   ├── Gallery.astro         # Project photo grid with service tags
│   ├── About.astro           # Owner story + team (preview mode for homepage)
│   ├── ServiceArea.astro     # City list from config
│   ├── FAQ.astro             # <details> accordion, zero JS, emits FAQPage JSON-LD
│   ├── CTABanner.astro       # Full-width call-to-action section
│   ├── ContactForm.astro     # Quote request form → Web3Forms
│   └── SEO.astro             # Meta tags, Open Graph, JSON-LD structured data
├── pages/
│   ├── index.astro           # Homepage (composes all section components)
│   ├── about.astro           # Full about page with team details
│   ├── contact.astro         # Contact form + business info sidebar
│   ├── gallery.astro         # Full project gallery
│   └── services/
│       ├── index.astro       # Services listing page
│       └── [...slug].astro   # Dynamic service detail pages from Markdown
├── assets/
│   ├── icons/*.svg           # Service icons (stroke-based, currentColor)
│   └── images/*.svg          # Placeholder images (replace with real photos)
public/
├── fonts/                    # Self-hosted WOFF2 variable fonts
├── images/                   # Static images served as-is
├── favicon.svg
└── robots.txt
```

---

## How the Theming System Works

The branding flows through three layers:

1. **`src/config/site.ts`** — TypeScript source of truth for all brand values
2. **`src/layouts/BaseLayout.astro`** — reads the config and injects `:root` CSS custom properties (`--site-color-primary`, etc.) as an inline `<style>` block
3. **`src/styles/global.css`** — `@theme inline` maps those CSS vars to Tailwind utilities (`bg-primary`, `text-cta`, `font-heading`, `rounded-card`)

This means changing `primary: '#1a5276'` to `primary: '#2e7d32'` in the config instantly recolors every heading, link, icon, section background, and button border across the entire site. No find-and-replace required.

---

## SEO Built In

Every page automatically includes:
- `HomeAndConstructionBusiness` JSON-LD structured data (from config)
- Open Graph and Twitter Card meta tags
- Canonical URLs
- XML sitemap (via `@astrojs/sitemap`)

Service detail pages add `Service` and `BreadcrumbList` schemas. FAQ sections add `FAQPage` schema. All of this is populated from the config and content collections — no manual JSON-LD editing needed.
