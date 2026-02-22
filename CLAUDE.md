# CLAUDE.md — Vlah Software House Website

This document describes the codebase structure, development conventions, and workflows for the Vlah Software House marketing/portfolio website. It is intended to give AI assistants the context needed to work effectively in this repository.

---

## Project Overview

This is the public-facing website for **Vlah Software House**, a software development agency. It is a Next.js 14 site that showcases the company's portfolio (case studies), blog articles, team, and a contact form. It is built on a customised [Tailwind UI Studio](https://tailwindui.com/templates/studio) template.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3.4 + PostCSS |
| Content | MDX (Markdown + JSX) |
| Animations | Framer Motion 10 |
| Icons | Heroicons 2 |
| Forms / Validation | React Server Actions + Zod |
| Email | Resend (HTTP API) |
| Syntax Highlighting | Shiki (`css-variables` theme) |
| Image Optimisation | Next.js Image + Sharp |
| Analytics | Google Tag Manager (`GTM-PP5FTFPP`) |

---

## Repository Structure

```
/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root HTML layout (GTM, metadata, fonts)
│   │   ├── page.tsx          # Home page
│   │   ├── not-found.tsx     # 404 page
│   │   ├── about/            # About page
│   │   ├── contact/          # Contact page
│   │   ├── process/          # Process/methodology page
│   │   ├── blog/             # Blog listing + MDX articles
│   │   │   ├── page.tsx      # Listing page
│   │   │   ├── wrapper.tsx   # Per-article layout wrapper
│   │   │   └── <slug>/page.mdx  # Individual articles
│   │   └── work/             # Case studies listing + MDX entries
│   │       ├── page.tsx      # Listing page
│   │       ├── wrapper.tsx   # Per-case-study layout wrapper
│   │       └── <slug>/page.mdx  # Individual case studies
│   ├── components/           # Reusable React components (25 files)
│   ├── lib/
│   │   ├── mdx.ts            # MDX loading utilities + type definitions
│   │   └── formatDate.ts     # Date formatting helper
│   ├── actions/
│   │   └── contact.tsx       # Server action for contact form (Zod + Resend)
│   ├── styles/
│   │   ├── tailwind.css      # Tailwind entry (base/components/utilities)
│   │   ├── base.css          # Mona Sans font-face
│   │   ├── typography.css    # Prose styles for MDX content
│   │   ├── components.css    # Component-level CSS overrides
│   │   └── utilities.css     # Utility CSS overrides
│   ├── images/
│   │   ├── clients/          # Client logo images
│   │   └── team/             # Team member photos
│   └── fonts/
│       └── MonaSans[...]woff2  # Variable font
├── next.config.mjs           # Next.js + MDX pipeline configuration
├── tailwind.config.ts        # Tailwind theme (custom fonts, sizes, radii)
├── tsconfig.json             # TypeScript config (strict, @/* path alias)
├── prettier.config.js        # Prettier (single quotes, no semicolons)
├── postcss.config.js         # PostCSS (Tailwind nesting + autoprefixer)
└── .eslintrc.json            # ESLint (next/core-web-vitals)
```

---

## Development Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build for Vercel (outputs to .next/)
npm run start        # Start production server (requires prior build)
npm run lint         # Run ESLint (next/core-web-vitals ruleset)
npm run pages:build  # Build for Cloudflare Pages (outputs to .vercel/output/static/)
```

There is **no test suite**. Validation is done via `npm run lint` and a production build check (`npm run build`).

### Cloudflare Pages deployment

The site deploys to both **Vercel** and **Cloudflare Pages**. The Cloudflare build uses `@cloudflare/next-on-pages` which wraps the standard Next.js build and produces Workers-compatible output.

In the Cloudflare Pages dashboard configure:
- **Build command:** `npm run pages:build`
- **Build output directory:** `.vercel/output/static`
- **Environment variables:** same as `.env.local` (see Contact Form section below)

The `wrangler.toml` at the project root contains the runtime configuration (`nodejs_compat` compatibility flag, output directory). This file is also used by `wrangler pages dev` for local Cloudflare preview.

---

## Code Conventions

### TypeScript
- Strict mode is enabled — avoid `any` where possible; the codebase uses it sparingly only in server action error handling.
- Use the `@/*` path alias (maps to `./src/*`) for all internal imports.

### Formatting (Prettier)
- **Single quotes**, **no semicolons**.
- `prettier-plugin-tailwindcss` enforces Tailwind class ordering — run Prettier before committing.

### Styling
- Use **Tailwind utility classes** for all styling. Do not add inline styles.
- Tailwind `nesting` is enabled via PostCSS — nested selectors are allowed in CSS files.
- Custom typography for MDX content lives in `src/styles/typography.css`.
- Custom font sizes are defined in `tailwind.config.ts` as `{ fontSize: { ... } }` pairs with line-heights.
- The primary font is `Mona Sans` (variable weight/width). Font display uses `125%` width via CSS `font-variation-settings`.

### Components
- Components are in `src/components/`. Prefer editing existing components over creating new ones.
- `RootLayout.tsx` is a **client component** (`'use client'`) — it handles the animated mobile menu and logo hover state via React context.
- All other layout/page components are **server components** by default.
- `FadeIn.tsx` wraps content in a Framer Motion fade-in. Use it for any new visible content sections.

### Path alias
All imports use `@/` to reference `src/`:
```ts
import { Container } from '@/components/Container'
import { loadArticles } from '@/lib/mdx'
```

---

## Content: Blog Articles

Blog articles are MDX files at `src/app/blog/<slug>/page.mdx`.

Each article **must** export an `article` metadata object:

```mdx
import heroImage from './hero.jpg'

export const article = {
  date: '2024-06-01',          // ISO date string, used for sorting
  title: 'Your Article Title',
  description: 'One-sentence description shown in the listing.',
  author: {
    name: 'Author Name',
    role: 'Job Title',
    image: { src: require('./author-photo.jpg') },
  },
}

export const metadata = {
  title: article.title,
  description: article.description,
}

## Introduction

Article body starts here...
```

- Articles are sorted **newest-first** by `date`.
- The `wrapper.tsx` automatically adds the article header (title, date, author), related articles, and the `<ContactSection />` footer.
- Images used in MDX are imported directly and handled by `recma-import-images`.

---

## Content: Case Studies

Case studies are MDX files at `src/app/work/<slug>/page.mdx`.

Each case study **must** export a `caseStudy` metadata object:

```mdx
import heroImage from './hero.jpg'
import clientLogo from './logo.svg'

export const caseStudy = {
  date: '2024',                // Year string displayed in the header
  client: 'Client Name',
  title: 'What We Built',
  description: 'Short description for the listing page.',
  summary: [
    'Bullet point 1 about the project.',
    'Bullet point 2 about results.',
  ],
  logo: clientLogo,
  image: { src: heroImage, alt: 'Description of hero image' },
  service: 'Web Development',
  testimonial: {
    author: { name: 'Person Name', role: 'Their Role, Company' },
    content: 'Quote from the client.',
  },
}

export const metadata = {
  title: caseStudy.title,
  description: caseStudy.description,
}

## Project overview

Body content...
```

- Case studies are sorted **newest-first** by `date`.
- The `wrapper.tsx` automatically renders the page header, client/year/service metadata bar, hero image, related case studies, and `<ContactSection />`.

---

## MDX Pipeline (next.config.mjs)

The MDX pipeline is configured in `next.config.mjs`:

- **remark-gfm** — GitHub Flavored Markdown (tables, strikethrough, etc.)
- **remark-unwrap-images** — removes `<p>` wrappers around images.
- **unifiedConditional** — applies different layout wrappers based on file path:
  - Files under `src/app/blog/` → wraps with `@/app/blog/wrapper` as `article`.
  - Files under `src/app/work/` → wraps with `@/app/work/wrapper` as `caseStudy`.
- **rehype-shiki** — syntax highlighting using the `css-variables` theme (colours defined as CSS variables in `typography.css`).
- **remarkRehypeWrap** — wraps consecutive non-component MDX nodes in a `<Typography>` component for consistent prose styling.
- **recma-import-images** — allows direct image imports inside MDX at the recma (JS AST) stage.

---

## Contact Form & Server Action

The contact form uses a **React Server Action** (`src/actions/contact.tsx`).

- **Validation:** Zod schema requires `name`, `company`, `email` (valid email), `phone`, `message`, and `budget`.
- **Email delivery:** [Resend](https://resend.com) HTTP API — works in both Node.js (Vercel) and edge/serverless (Cloudflare Pages) runtimes.
- Returns `{ success: boolean, message: string, errors: Array<{for: string, message: string}> }`.

### Required Environment Variables

Create a `.env.local` file (never commit it) with:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=noreply@yourdomain.com
RECEIVER_EMAIL=receiver@example.com
MAILERLITE_API_KEY=your_mailerlite_key
```

- `RESEND_API_KEY` — obtain from [resend.com](https://resend.com). The free tier covers 3 000 emails/month.
- `SENDER_EMAIL` — must be an address on a domain **verified in your Resend account**.
- `RECEIVER_EMAIL` — where contact form submissions are delivered.
- `MAILERLITE_API_KEY` — used by the newsletter subscription action (`src/actions/form.tsx`).

---

## Key Components Reference

| Component | Purpose |
|---|---|
| `RootLayout` | Main shell: navigation, mobile menu, footer (client component) |
| `Container` | Max-width content wrapper |
| `PageIntro` | Page header with eyebrow text and title |
| `SectionIntro` | Section header used within pages |
| `FadeIn` / `FadeInStagger` | Framer Motion fade-in animation wrappers |
| `Button` | Polymorphic button/link component |
| `ContactSection` | CTA section appended to most pages |
| `ContactForm` | The actual contact form UI (uses `contactUs` server action) |
| `Testimonial` | Client quote block |
| `StatList` / `StatListItem` | Key stats display |
| `TagList` / `TagListItem` | Tag display (e.g. services used) |
| `GrayscaleTransitionImage` | Image with greyscale-to-colour hover transition |
| `StylizedImage` | Decorative image with container-query-based styling |
| `GridPattern` | SVG decorative background grid |
| `MDXComponents` | Custom component overrides passed to MDX |
| `Logo` / `Logomark` | Site logo components |
| `Offices` | Office location list |
| `SocialMedia` | Social media icon links |

---

## Adding New Pages

1. Create `src/app/<route>/page.tsx`.
2. Export a `metadata` object for SEO:
   ```ts
   export const metadata: Metadata = {
     title: 'Page Title',
     description: 'Page description.',
   }
   ```
3. Use `<PageIntro>` for the page header, `<Container>` for content width, and append `<ContactSection />` at the bottom.
4. Add the route to the navigation in `src/components/RootLayout.tsx` if it should appear in the menu.

---

## Git Workflow

- Main production branch: `main` (remote `origin/main`)
- Development default branch: `master`
- Feature/task branches follow the pattern `claude/<description>-<id>`
- Commit messages use imperative style with `feat:`, `fix:`, or `chore:` prefixes where appropriate.
- There is no CI pipeline. Validate work locally with `npm run lint && npm run build` before pushing.

---

## What Does Not Exist (Intentionally)

- **No test suite** — no Jest, Vitest, Cypress, or Playwright configuration.
- **No CMS** — all content is file-based MDX; changes require a code commit.
- **No internationalisation** — site is English-only.
- **No authentication** — the site is fully public.
- **No API routes** — the only server-side logic is the contact Server Action.
