# L'ORIAN MAISON — High & Fine Jewelry

> *Where Eternity Takes Form.*

**L'ORIAN** is a modern luxury digital flagship and e-commerce experience for a prestigious Paris haute joaillerie maison founded in 1898. Built with high-performance modern web technologies, responsive craftsmanship, and fluid aesthetic motion.

---

## 💎 Features & Highlights

### 1. High Jewelry Exhibition & Rare Stones
- **Three-Chapter Digital Gallery**: An immersive showcase (`/high-jewelry`) featuring unique high jewelry creations lit by single-beam studio imagery.
- **Unheated Gemstone Archive**: Comprehensive provenance data on rare Mogok Rubies, Muzo Emeralds, Kashmir Sapphires, and Type IIa Diamonds.

### 2. Interactive Ring Finder
- **Guided 4-Step Questionnaire**: Interactive bridal wizard (`/engagement`) tailoring ring recommendations according to style, stone shape, metal preference, and budget parameters.
- **Diamond Education Suite**: Detailed visual guide covering the 4 Cs (Cut, Color, Clarity, Carat) and ethical sourcing guarantees.

### 3. Salon Appointments & Concierge
- **Global Boutique Reservations**: Private salon booking (`/appointments`) for Paris, New York, London, Geneva, Tokyo, and Dubai boutiques.
- **Tailored Advisor Prep**: Pre-visit selection customization allowing clients to note specific requests prior to arrival.

### 4. Complete E-Commerce Experience
- **Interactive Quick View Modal**: Instant product exploration (`QuickView.tsx`) with image galleries, sizing selection, material toggles, and live cart addition.
- **Hand Engraving Preview**: Custom ring and pendant engraving tool with live font styling Cormorant & Script previews.
- **Seamless Cart & Checkout**: Multi-step checkout (`/checkout`) with automated delivery estimates, taxes, and complimentary insured shipment options.
- **Client Portal & Saved Wishlist**: Persistent wishlist management (`/wishlist`), order tracking (`/account`), and multi-currency (USD, EUR, GBP, CHF, JPY, AED) preferences.

### 5. Atelier Stories & Journal
- **Savoir-Faire & Craftsmanship**: In-depth editorial exploration (`/maison/craftsmanship`) detailing eight stages of setting, polishing, and quality control.
- **The Journal**: Long-form articles and campaign stories (`/journal`) on gemmology, provenance, and historical archives.

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 (SPA Architecture)
- **Routing**: React Router DOM (v7)
- **Build Tool**: Vite 8 with TypeScript
- **Styling**: Tailwind CSS v4 + Custom HSL Design Tokens
- **Icons & UI Utilities**: Lucide React Icons & Sonner Toasts
- **Typography**: Google Cormorant Garamond (Serif Display) & Manrope (Sans Body)

---

## 📁 Directory Structure

```text
lorian-maison/
├── index.html              # HTML entry point with luxury font imports
├── vite.config.ts          # Vite configuration & path aliases (@/)
├── package.json            # Project dependencies & scripts
├── public/                 # Static assets & favicon
└── src/
    ├── App.tsx             # Main App shell, BrowserRouter & route definitions
    ├── main.tsx            # React application entry point
    ├── styles.css          # Core CSS variables, typography & animation system
    ├── assets/             # Curated photography & product imagery
    ├── components/
    │   └── site/
    │       ├── Catalog.tsx      # Filtering & catalog grid component
    │       ├── Header.tsx       # Responsive luxury header navigation
    │       ├── Footer.tsx       # Maison footer with links & newsletter
    │       ├── Overlays.tsx     # Cart drawer & search overlay
    │       ├── ProductCard.tsx  # Product card & wishlist button
    │       ├── QuickView.tsx    # Modal quick view experience
    │       └── primitives.tsx   # Action buttons, headings, scroll reveal
    ├── lib/
    │   ├── catalog.ts       # Master dataset: products, collections & journal
    │   ├── store.ts         # LocalStorage persistent state & analytics
    │   └── utils.ts         # Classnames merger & price formatters
    └── routes/              # Page views
        ├── index.tsx                # Home page
        ├── product.$slug.tsx        # Product detail page
        ├── collections.index.tsx    # Signature collections index
        ├── collections.$slug.tsx    # Collection detail view
        ├── jewelry.index.tsx        # All jewelry catalogue
        ├── jewelry.$category.tsx    # Category filtering (Rings, Necklaces, etc.)
        ├── high-jewelry.tsx         # High jewelry exhibition
        ├── engagement.tsx           # Engagement & Ring Finder
        ├── maison.index.tsx         # Maison heritage & history
        ├── maison.craftsmanship.tsx # Atelier savoir-faire
        ├── journal.index.tsx        # Journal article index
        ├── journal.$slug.tsx        # Journal article view
        ├── boutiques.tsx            # Worldwide boutique locator
        ├── appointments.tsx         # Private salon booking
        ├── checkout.tsx             # Secure checkout flow
        ├── account.tsx              # Client account portal
        ├── bag.tsx                  # Shopping bag view
        ├── wishlist.tsx             # Saved wishlist
        ├── weddings.tsx             # Bridal trousseau & wedding sets
        ├── gifts.tsx                # Curated luxury gift guide
        ├── bespoke.tsx              # Custom commission inquiries
        ├── care.tsx                 # Jewelry care & spa servicing
        ├── services.tsx             # Concierge & insured shipping
        ├── responsibility.tsx       # Ethical sourcing & Fairmined gold
        └── privacy.tsx              # Privacy & data policy
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or pnpm / bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jigarsonani1012/lorian-maison.git
   cd lorian-maison
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Verify TypeScript & linting**:
   ```bash
   npx tsc --noEmit
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   The optimized production bundle will be generated in the `dist/` directory.

---

## 🌐 Deployment

### Vercel / Netlify / Cloudflare Pages
This application is pre-configured for instant single-page app deployment.
- Build command: `npm run build`
- Output directory: `dist`
- SPA Rewrite: All routes route to `/index.html` (handled by included `vercel.json` and `netlify.toml`).

---

## 📜 License

Copyright © 2026 L'ORIAN Maison. All rights reserved.
