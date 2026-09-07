# 🏛️ Afaq Ahmad Real Estate — Ultra-Luxury Property Advisory

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel%20Deployment-c9a962?style=for-the-badge&logo=vercel&logoColor=white)](https://afaq-ahmad-real-estate.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/afaqahmadcs/AFAQ-AHMAD-REAL-ESTATE-)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Vanilla%20Stack-blue?style=for-the-badge)](https://afaq-ahmad-real-estate.vercel.app/)
[![Responsive](https://img.shields.io/badge/Responsive-320px%20to%204K-success?style=for-the-badge)](https://afaq-ahmad-real-estate.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

<br>

**A bespoke, high-performance web platform architected for ultra-high-net-worth real estate acquisitions, off-market advisory, and portfolio management.**

[**Explore Live Website »**](https://afaq-ahmad-real-estate.vercel.app/) · [Report Bug](https://github.com/afaqahmadcs/AFAQ-AHMAD-REAL-ESTATE-/issues) · [Request Feature](https://github.com/afaqahmadcs/AFAQ-AHMAD-REAL-ESTATE-/issues)

</div>

---

## 📖 Table of Contents
- [Executive Overview](#-executive-overview)
- [Core Aesthetic & Design Direction](#-core-aesthetic--design-direction)
- [Live Demo & Repository](#-live-demo--repository)
- [Page Catalog (11 Production Pages)](#-page-catalog-11-production-pages)
- [Responsive Engineering (Zero Overflow)](#-responsive-engineering-zero-overflow)
- [Interactive Features & Technology](#-interactive-features--technology)
- [Directory Structure](#-directory-structure)
- [Running Locally](#-running-locally)
- [Performance & SEO Best Practices](#-performance--seo-best-practices)
- [Academic & Professional Credits](#-academic--professional-credits)

---

## 🏛️ Executive Overview

**Afaq Ahmad Real Estate** is a production-grade, ultra-luxury real estate web application built with an uncompromising commitment to editorial elegance, architectural restraint, and lightning-fast user interaction. 

Drawing inspiration from world-renowned private client brokerages (*Sotheby's International Realty*, *Knight Frank Private Office*, *Christie's International Real Estate*), the application serves as a comprehensive portfolio engine, private wealth advisory portal, and client engagement hub.

### Key Architectural Highlights
- **Zero-Dependency Core**: Pure HTML5, modern vanilla CSS3 (Custom Properties & Fluid Clamp), and modular ES6+ JavaScript.
- **Instant Load Times**: Near-instantaneous page transitions without the overhead or hydration delays of heavy JavaScript frameworks.
- **Full-Fidelity Responsiveness**: Engineered and tested across every breakpoint from 320px mobile viewports up to 4K displays.
- **Dual Luxury Theme Engine**: Default Obsidian Dark mode with seamless one-click transition to Curated Alabaster Light mode, backed by persistent `localStorage` and zero Flash of Unstyled Content (FOUC).

---

## 🎨 Core Aesthetic & Design Direction

The visual identity follows an architectural, editorial design language engineered to evoke exclusivity, pedigree, and fiduciary trust:

| Element | Specification | Visual Purpose |
| :--- | :--- | :--- |
| **Primary Dark Palette** | `#0E0E0E` (Obsidian), `#161616` (Card Surfaces), `#222222` (Borders) | Establishes depth, high contrast, and a private-banking atmosphere. |
| **Warm Gold Accent** | `#C9A962` (Brushed Gold), `#DFC27D` (Hover Tint), `rgba(201, 169, 98, 0.15)` | Conveys refined wealth without gaudiness. |
| **Curated Light Mode** | `#F9F8F6` (Alabaster Warm White), `#0B1B2B` (Deep Navy Headlines) | Warm, gallery-like reading experience with crisp typographic contrast. |
| **Headline Typography** | *Playfair Display* (Serif, 400/600, Italic accents) | Editorial grandeur for page titles and luxury statement copy. |
| **Body Typography** | *Manrope* (Sans-Serif, 300/400/500/700) | Precision-engineered geometric readability for descriptions and metadata. |
| **Label Typography** | *DM Sans* (Uppercase, Letter-spacing `0.1em`–`0.14em`) | Crisp, architectural tagging for categories, pills, and badges. |

---

## 🌐 Live Demo & Repository

- **Production URL**: [https://afaq-ahmad-real-estate.vercel.app/](https://afaq-ahmad-real-estate.vercel.app/)
- **GitHub Repository**: [https://github.com/afaqahmadcs/AFAQ-AHMAD-REAL-ESTATE-.git](https://github.com/afaqahmadcs/AFAQ-AHMAD-REAL-ESTATE-.git)

---

## 🧭 Page Catalog (11 Production Pages)

The platform is structured into 11 distinct, interconnected web pages:

| # | Page | Direct File | Description & Functional Modules |
| :---: | :--- | :--- | :--- |
| 1 | **Home** | [`index.html`](index.html) | Immersive hero section, animated transactional counters, curated property showcase with favorites toggle, bento advisory highlights, founder feature, press ticker, testimonials preview, and intelligence newsletter. |
| 2 | **About** | [`about.html`](about.html) | Founder profile featuring authentic executive portrait (`images/images (16).jpg`), 15-year historical timeline milestones, institutional advisory philosophy, global presence metrics, and corporate values. |
| 3 | **Services** | [`services.html`](services.html) | 8 dedicated advisory verticals (Prime Acquisitions, Discreet Dispositions, Investment Advisory, Commercial Prime, Turnkey Management, Escrow & Legal, Sovereign Relocation, Development Marketing) and 4-phase client journey. |
| 4 | **Properties** | [`properties.html`](properties.html) | Live client-side portfolio engine: category pills (All, Villas, Apartments, Commercial, Plots), real-time search input, multi-factor numerical sorting (Price High-Low, Low-High, Area), and saved listing state. |
| 5 | **Property Detail** | [`property-detail.html`](property-detail.html) | Dynamic slug-based loader (`?slug=...`), multi-angle gallery carousel, custom fullscreen image lightbox with arrow & ESC controls, interactive Schedule Viewing modal, WhatsApp concierge dispatch, and similar listing suggestions. |
| 6 | **Team** | [`team.html`](team.html) | Leadership directory (Founder & CEO, Managing Partner, Practice Directors), executive bios, transactional track records, and direct confidential contact actions. |
| 7 | **Pricing** | [`pricing.html`](pricing.html) | 3 structured advisory engagement tiers (*Essential Advisory* $2,500, *Premium Portfolio* $8,500/qtr, *Private Client* Bespoke), side-by-side comparative feature matrix, and mandate consultation CTAs. |
| 8 | **Testimonials** | [`testimonials.html`](testimonials.html) | Performance metrics banner (98.4% retention, $2.4B+ volume), 6 in-depth verified international client reviews (Marbella, Dubai, Manhattan, Riyadh, London, Cap d'Antibes), and fiduciary privacy guarantee. |
| 9 | **FAQ** | [`faq.html`](faq.html) | Categorized accordion FAQ with interactive category filter tabs (Acquisitions, Investment, Management, Legal), accessible `aria-expanded` attributes, and direct concierge links. |
| 10 | **Contact** | [`contact.html`](contact.html) | Private consultation request form with real-time field validation, dynamic service pre-selection via URL parameters, Manhattan headquarters map iframe, operating schedule, and WhatsApp hotline. |
| 11 | **404 Error** | [`404.html`](404.html) | Architectural gold line-art SVG illustration, branded typography, error rationale, and quick navigation routes back into the active portfolio. |

---

## 📱 Responsive Engineering (Zero Overflow)

The entire website has been rigorously engineered to guarantee **zero horizontal overflow** and fluid, ergonomic usability across all device form factors:

```
├── 320px — Compact Mobile (iPhone SE 1st Gen, Galaxy Fold outer screen)
├── 375px — Standard Mobile (iPhone SE 2nd/3rd Gen, iPhone X/XS/11 Pro)
├── 390px — Modern Mobile (iPhone 12 / 13 / 14 / 15)
├── 414px — Large Mobile (iPhone Plus / Pro Max, Pixel XL, Galaxy Ultra)
├── 768px — Tablet Portrait (iPad 9.7", iPad Air, Surface Pro)
├── 1024px — Tablet Landscape & Small Laptop (iPad Pro, Chromebook)
└── 1440px+ — Desktop & 4K Ultra-Wide Monitors
```

### Key Technical Responsive Implementations:
1. **Adaptive Navigation**:
   - Desktop `.site-nav` cleanly hidden on screens $\le 1024\text{px}$ using CSS specificity rules to avoid layout shifting.
   - Hamburger button engineered with a minimum $44\times 44\text{px}$ touch target compliant with WCAG 2.1 AAA accessibility standards.
   - Mobile navigation drawer equipped with `overflow-y: auto`, smooth touch deceleration (`-webkit-overflow-scrolling: touch`), and fluid typography via CSS `clamp(1.2rem, 3.5vw, 1.75rem)`.
2. **Hero DOM Flow**:
   - Transformed absolute hero stats coordinates into clean flexbox flow beneath action buttons to completely eliminate element collisions on compact heights and mobile screens.
3. **Resilient Grids & Bento Layouts**:
   - Global `.grid-3` and bento card structures scale from 3 columns down to 2 columns on tablets ($\le 1024\text{px}$) and 1 column on mobile ($\le 680\text{px}$).
   - Bento service cards protected by baseline `min-height` rules, preventing zero-height layout collapses on mobile.
4. **Horizontal Scroll Prevention**:
   - Global `html, body { width: 100%; overflow-x: hidden; }` prevents accidental overflow from decorative background blurs.
   - Container padding utilizes fluid clamping: `clamp(1rem, 3.5vw, 2.5rem)`.
   - Feature comparison tables wrapped in self-contained horizontal swipe containers (`overflow-x: auto`) with minimum cell widths, preventing cramped table data.

---

## ⚡ Interactive Features & Technology

### 1. Zero-FOUC Dual Theme Engine
Theme preferences are stored in browser `localStorage` (`aa_theme`). An inline script placed at the very top of each page's `<head>` evaluates and sets the `data-theme` attribute before CSS paints, eliminating Flash of Unstyled Content (FOUC):
```javascript
(function(){
  const t = localStorage.getItem('aa_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();
```

### 2. Real-Time Global Search Overlay
Triggered from any page via the header search button or pressing `/`. It features a 200ms debounce that scans `data/properties.json` for titles, cities, categories, and price matches, rendering instant image thumbnails and metadata.

### 3. Client-Side Portfolio Engine (`properties.html`)
- **Category Filter**: Instant switching between All, Villas, Apartments, Commercial, and Plots without reloading.
- **Live Search**: Instant client-side filtering as you type.
- **Multi-Factor Sorting**: Sort by Featured, Price (High to Low, Low to High), or Square Footage.

### 4. Dynamic Property Detail Viewer (`property-detail.html`)
- Reads the URL search parameter `?slug=<property-slug>` and dynamically injects property images, descriptions, architectural specs, floor plans, and amenities.
- **Fullscreen Lightbox**: Includes slide counters, keyboard navigation (Left/Right arrow keys), and Escape key listeners.
- **Schedule Viewing Modal**: Form with date/time pickers and custom toast feedback.
- **WhatsApp Concierge**: Formats a pre-populated inquiry string containing the property name and reference code.

### 5. Persistent Saved Collection (Favorites)
Clicking the heart icon on any card synchronizes the property slug to `localStorage` (`aa_favorites`) with animated toast notifications, allowing users to curate their private shortlist across page sessions.

---

## 📁 Directory Structure

```
AFAQ-AHMAD-REAL-ESTATE-/
├── 404.html                      # Branded architectural 404 error page
├── about.html                    # Founder biography, history & corporate values
├── contact.html                  # Consultation booking, map iframe & hours
├── faq.html                      # Categorized accordion FAQ
├── index.html                    # Homepage showcase, hero & curated listings
├── pricing.html                  # Advisory retainers & feature matrix
├── properties.html               # Portfolio engine with filters & sort
├── property-detail.html          # Dynamic property viewer, gallery & modal
├── services.html                 # 8 Advisory verticals & client journey
├── team.html                     # Executive leadership directory
├── testimonials.html             # Client reviews, metrics & discretion protocol
├── server.js                     # Zero-dependency local development server
├── README.md                     # Comprehensive platform documentation
├── .gitignore                    # Git exclusions
├── data/
│   └── properties.json           # 12 Curated luxury assets with full metadata
├── assets/
│   ├── css/
│   │   ├── variables.css         # Theme tokens (Dark default, Light editorial)
│   │   ├── base.css              # Global resets, typography & buttons
│   │   ├── layout.css            # Grid system, modals, lightboxes & toasts
│   │   ├── animations.css        # Keyframes, fade-ins & micro-transitions
│   │   └── components/
│   │       ├── header.css        # Sticky header, search & mobile drawer
│   │       ├── footer.css        # 4-Column luxury footer & newsletter
│   │       ├── hero.css          # Hero layouts & breadcrumbs
│   │       ├── cards.css         # Property cards, pricing cards, team cards
│   │       ├── forms.css         # Contact inputs, FAQ accordions & tabs
│   │       ├── loader.css        # Branded preloader & scroll progress
│   │       └── sections.css      # Section layouts, stats & grids
│   └── js/
│       └── main.js               # Core interactive engine (theme, search, filters, modals)
└── images/                       # Local corporate & architectural assets
```

---

## 🚀 Running Locally

Because the project is built with zero runtime dependencies, you can run it using any standard static file server:

### Option 1: Built-in Node Server (Included)
```bash
# In the project root:
node server.js

# Server starts at: http://localhost:3000
```

### Option 2: Using `npx serve`
```bash
npx -y serve .
```

### Option 3: Using Python 3
```bash
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Option 4: VS Code Live Server
Right-click `index.html` in VS Code and click **"Open with Live Server"**.

---

## 📊 Performance & SEO Best Practices

- **Semantic HTML5**: Rigorous heading hierarchy (`h1` through `h4`), semantic `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, and `<footer>` elements.
- **Metadata & Open Graph**: Comprehensive `title`, `meta description`, `theme-color`, and accessibility tags across all 11 pages.
- **Fast Media Delivery**: High-resolution Unsplash assets optimized with WebP parameters (`q=80`) and lazy loading (`loading="lazy"`).
- **Zero CLS (Cumulative Layout Shift)**: Standardized aspect ratios on image wraps and pre-allocated card dimensions prevent jitter during asset loading.

---

## ⚖️ Academic & Professional Credits

- **Project Lead & Architecture**: Afaq Ahmad
- **Live Deployment**: Hosted on Vercel Edge Network
- **Photography Credits**: Architectural photography curated via royalty-free licenses from Unsplash Architecture.
- **Copyright**: &copy; 2026 **Afaq Ahmad Real Estate**. All rights reserved.

<div align="center">
  <sub>Built with precision, architectural discipline, and modern web standards.</sub>
</div>
