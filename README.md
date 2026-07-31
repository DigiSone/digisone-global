# DigiSone Global

[![Live](https://img.shields.io/badge/live-digisone.com-2563eb)](https://digisone.com)
[![Astro](https://img.shields.io/badge/built_with-Astro-ff5d01)](https://astro.build)
[![Cloudflare Pages](https://img.shields.io/badge/deploy-Cloudflare_Pages-f38020)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

**Premium insights on technology, business, and digital growth.**

DigiSone Global is an independent online publication for founders, operators, and technology leaders. We publish practical analysis on Artificial Intelligence, business strategy, startups, cybersecurity, cloud computing, the future of work, digital transformation, and the creator economy.

| | |
| --- | --- |
| **Website** | [https://digisone.com](https://digisone.com) |
| **Contact** | [info@digisone.com](mailto:info@digisone.com) |
| **Stack** | [Astro](https://astro.build) · Cloudflare Pages · GitHub |
| **Feed** | [RSS](https://digisone.com/rss.xml) |
| **Sitemap** | [sitemap-0.xml](https://digisone.com/sitemap-0.xml) |

---

## Mission

Deliver clear, actionable technology and business writing—beyond headlines—with frameworks, context, and honest caveats. Content is original, structured for humans first, and maintained with transparent policies suitable for a serious publisher.

---

## What’s on the site

### Core pages

| Route | Purpose |
| --- | --- |
| `/` | Homepage — featured & latest posts, categories, newsletter CTA |
| `/blog` | Full article index |
| `/blog/[id]/` | Individual posts from the content collection |
| `/categories` | Category directory with counts and topic links |
| `/categories/[slug]` | Category landing (related articles) |
| `/categories/creator-economy` | In-depth Creator Economy guide (example pillar page) |
| `/resources` | Curated tools directory (AI, SEO, testing, IDEs, media, …) |
| `/subscribe` | Newsletter signup |
| `/about` | About DigiSone Global |
| `/contact` | Contact |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/donate` | Support (if enabled) |

### Content pillars (categories)

- Artificial Intelligence  
- Business Strategy  
- Startups  
- Cybersecurity  
- Cloud Computing  
- Future of Work  
- Creator Economy  
- Digital Transformation  

### Product features

- **Blog** — Markdown/MDX via Astro Content Collections  
- **SEO** — Canonical URLs, Open Graph, Twitter cards, robots meta, sitemap, RSS  
- **Newsletter** — Dedicated subscribe UX; optional Cloudflare D1 + Pages Function API  
- **Analytics** — Google Analytics 4 (`G-H0KPNYR03Q`), delayed / consent-aware loading  
- **Cookie consent** — Accept all / Reject optional / Customize (Essential · Analytics · Advertising) with Consent Mode-style defaults  
- **Performance** — Static HTML, scoped CSS, image optimization patterns (`astro:assets`)  
- **Hosting** — Cloudflare Pages + custom domain `digisone.com`  
- **Email** — Public address `info@digisone.com` (Cloudflare Email Routing → inbox)

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Astro (static site generation) |
| Content | Astro Content Collections + Zod schema |
| Language | TypeScript / Astro / Markdown |
| Styling | Scoped CSS, design tokens, responsive layout |
| Images | `astro:assets` / WebP-friendly pipelines |
| Hosting | Cloudflare Pages |
| DNS / CDN | Cloudflare |
| Repo | GitHub (`DigiSone/digisone-global`) |
| Optional API | Cloudflare Pages Functions + D1 (newsletter) |
| Search / discovery | Google Search Console + sitemap |
| Analytics | Google Analytics 4 |

---

## Full project structure

```text
digisone-global/
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── robots.txt              # Allow + Sitemap URL
│   └── llms.txt                # Optional agent-oriented site map
│
├── src/
│   ├── assets/                 # Source images for optimization
│   │   └── blog-placeholder-*.jpg
│   │
│   ├── components/
│   │   ├── BaseHead.astro      # Meta, OG, GA, consent defaults, AdSense hook
│   │   ├── Header.astro        # Nav + logo (href="/")
│   │   ├── Footer.astro        # Links + <CookieConsent />
│   │   ├── CookieConsent.astro # Banner + preference center
│   │   └── …                   # Shared UI pieces
│   │
│   ├── content/
│   │   └── blog/               # Markdown posts
│   │       ├── *.md
│   │       └── …
│   │
│   ├── content.config.ts       # Collection schema (title, description, pubDate, heroImage)
│   │
│   ├── layouts/                # Optional shared layouts
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
│   │   ├── categories.astro
│   │   ├── categories/
│   │   │   ├── [slug].astro
│   │   │   └── creator-economy.astro   # Long-form guide (example)
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro         # Theme-dependent post route
│   │   └── rss.xml.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── consts.ts               # SITE_TITLE, SITE_DESCRIPTION, etc.
│
├── functions/                  # Cloudflare Pages Functions
│   └── api/
│       └── subscribe.ts        # POST /api/subscribe → D1
│
├── astro.config.mjs            # site: 'https://digisone.com', sitemap integration
├── package.json
├── tsconfig.json
└── README.md
