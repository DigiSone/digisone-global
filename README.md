# DigiSone Global

[![Live](https://img.shields.io/badge/live-digisone.com-2563eb)](https://digisone.com)
[![Astro](https://img.shields.io/badge/built_with-Astro-ff5d01)](https://astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/deploy-Cloudflare_Pages-f38020)](https://pages.cloudflare.com)
[![Sanity](https://img.shields.io/badge/CMS-Sanity-f03e2f)](https://www.sanity.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Premium insights on AI, business strategy, startups, technology, and digital growth.**

DigiSone Global is an independent online publication for founders, operators, and technology leaders. We publish practical analysis on Artificial Intelligence, business strategy, startups, cybersecurity, cloud computing, the future of work, digital transformation, and the creator economy.

| | |
| --- | --- |
| **Website** | [https://digisone.com](https://digisone.com) |
| **Contact** | [info@digisone.com](mailto:info@digisone.com) |
| **Stack** | [Astro](https://astro.build) · [Sanity](https://www.sanity.io) · Cloudflare Pages · GitHub |
| **Feed** | [RSS](https://digisone.com/rss.xml) |
| **Sitemap** | [sitemap-0.xml](https://digisone.com/sitemap-0.xml) |

---

## Mission

Deliver clear, actionable technology and business writing—beyond headlines—with frameworks, context, and honest caveats. Content is original, structured for humans first, and maintained with transparent policies suitable for a serious publisher.

---

## What’s on the site

### Core routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage — featured & latest posts, categories, newsletter CTA |
| `/blog/` | Full article index (Sanity + Markdown) |
| `/blog/[slug]/` | Individual post |
| `/categories/` | Category directory with counts and topic links |
| `/categories/[...slug]/` | Category & subcategory landings (related articles) |
| `/resources/` | Curated tools directory |
| `/subscribe/` | Newsletter signup |
| `/about/` | About DigiSone Global |
| `/contact/` | Contact |
| `/privacy/` | Privacy Policy |
| `/terms/` | Terms of Use |
| `/donate/` | Support |
| `/404` | Custom not-found page (proper HTTP 404) |

### Content pillars (categories)

- Artificial Intelligence  
- Business Strategy  
- Startups  
- Cybersecurity  
- Cloud Computing  
- Future of Work  
- Creator Economy  
- Digital Transformation  

Each pillar supports sub-topics (e.g. AI Agents, Zero Trust, Fundraising) via nested routes under `/categories/[...slug]/`.

### Product features

- **Dual content sources** — Sanity CMS (primary) + Markdown/MDX via Astro Content Collections (archive)
- **Categories system** — Shared data model, unified post merging, subcategory support
- **SEO** — Canonical URLs, Open Graph, Twitter cards, JSON-LD, robots meta, sitemap, RSS
- **Newsletter** — Dedicated subscribe UX; optional Cloudflare D1 + Pages Function API
- **Analytics** — Google Analytics 4 (`G-H0KPNYR03Q`), consent-aware / delayed loading
- **Cookie consent** — Accept all / Reject optional / Customize (Essential · Analytics · Advertising) with Consent Mode v2 defaults
- **Performance** — Static HTML, Brotli, edge caching, self-hosted fonts with `font-display: swap`
- **Security** — HSTS (preload), CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy
- **Hosting** — Cloudflare Pages + custom domain `digisone.com`
- **Email** — `info@digisone.com` via Cloudflare Email Routing

---

## AI / agent discovery (`llms.txt`)

DigiSone publishes a curated [`/llms.txt`](https://digisone.com/llms.txt) at the site root so language models and AI agents can orient quickly without scraping every HTML page.

| File | Audience | Role |
| --- | --- | --- |
| [`/robots.txt`](https://digisone.com/robots.txt) | Crawlers | Allow rules + sitemap pointer |
| [`/sitemap-0.xml`](https://digisone.com/sitemap-0.xml) | Search engines & agents | Canonical URL list |
| [`/llms.txt`](https://digisone.com/llms.txt) | LLMs & AI agents | Markdown index of purpose, pillars, and key routes |

The `llms.txt` format follows the [llmstxt.org](https://llmstxt.org) convention: H1 title, blockquote summary, then H2 sections with annotated links. Source file: `public/llms.txt`.


### Content architecture (for maintainers)

| Layer | Tool | Role |
| --- | --- | --- |
| Primary CMS | Sanity + `@sanity/astro` | New posts, categories, authors, images |
| Archive | Astro Content Collections (`src/content/blog/`) | Legacy Markdown/MDX |
| Unify | `src/lib/posts.ts` | Merge → `UnifiedPost[]` for blog & categories |
| Taxonomy | `src/data/categories.ts` | Slugs, keywords, Sanity title maps, subtopics |

**Sanity (static builds):** `useCdn: false`, GROQ at build time, thin projections on list pages, parameterized slug queries on detail pages.  
**Collections:** Zod-validated frontmatter; always sort by date after `getCollection()`.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Astro (static site generation) |
| CMS | Sanity (`@sanity/astro`) |
| Legacy content | Astro Content Collections + Zod |
| Language | TypeScript / Astro / Markdown |
| Styling | Scoped CSS, design tokens, responsive layout |
| Images | `astro:assets` + Sanity CDN / WebP |
| Hosting | Cloudflare Pages |
| DNS / CDN / SSL | Cloudflare (Google Trust Services) |
| Repo | GitHub (`DigiSone/digisone-global`) |
| Optional API | Cloudflare Pages Functions + D1 (newsletter) |
| Analytics | Google Analytics 4 + Consent Mode v2 |
| Search | Google Search Console + sitemap |

---

## Project structure

```text
digisone-global/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── assets/                     # Fonts, source images
│   │
│   ├── components/
│   │   ├── BaseHead.astro          # Meta, OG, GA, consent defaults
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CookieConsent.astro
│   │   └── …
│   │
│   ├── content/
│   │   └── blog/                   # Legacy Markdown / MDX posts
│   │
│   ├── content.config.ts           # Blog collection schema
│   │
│   ├── data/
│   │   └── categories.ts           # Single source of truth for categories + topics
│   │
│   ├── lib/
│   │   └── posts.ts                # Merge Sanity + Markdown → UnifiedPost
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── subscribe.astro
│   │   ├── resources.astro
│   │   ├── privacy.astro
│   │   ├── terms.astro
│   │   ├── donate.astro
│   │   ├── 404.astro               # Real HTTP 404
│   │   ├── categories/
│   │   │   ├── index.astro         # /categories/
│   │   │   └── [...slug].astro     # /categories/ai/ , /categories/ai/agents/ …
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro     # Post pages
│   │   └── rss.xml.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── consts.ts                   # SITE_TITLE, SITE_DESCRIPTION
│
├── functions/                      # Cloudflare Pages Functions (optional)
│   └── api/
│       └── subscribe.ts
│
├── astro.config.mjs                # site, trailingSlash, sitemap, Sanity
├── package.json
├── tsconfig.json
└── README.md
