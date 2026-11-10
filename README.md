# V.S. TEX CHEM — Website

Corporate website and product catalogue for V.S. TEX CHEM, specialty chemical manufacturer, Tiruppur.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion · Lucide icons · React Router 7

---

## 1. Run it

Requires Node.js 20.19+ (22 LTS recommended).

```bash
npm install
npm run dev        # local development at http://localhost:5173
npm run build      # production build into dist/ (+ sitemap.xml, robots.txt)
npm run preview    # serve the production build at http://localhost:4173
npm run typecheck  # TypeScript check only
```

## 2. Pages

| URL | Page |
|---|---|
| `/` | Home — hero, who we are, industries, featured products, approach, enquiry CTA, contact |
| `/about` | Company overview, buyer-requirement approach, industry coverage |
| `/industries` | All four industries, each with applications, categories and products |
| `/industries/textile` · `/detergent` · `/paint` · `/agro` | Indexable page per industry, products grouped by category |
| `/products` | Catalogue — search, industry filter, category filter, grid/list view. Filters live in the URL, so filtered views can be shared (e.g. `/products?industry=paint`) |
| `/products/<id>` | Product detail — classification, description, documented applications, TDS/SDS slot, related products, enquiry actions |
| `/capabilities` | Formulation and manufacturing approach |
| `/contact` | Address, phones, emails, WhatsApp, enquiry form. `?product=<id>` pre-fills the product; `?industry=<id>` pre-fills the industry |

## 3. Where things live

```
src/
  data/            ← ALL business content. Edit these, not the components.
    company.ts       name, address, phones, emails, WhatsApp, GSTIN, approach text
    products.ts      product catalogue
    industries.ts    industry descriptions and application areas
    images.ts        every photo used on the site
    types.ts         TypeScript types for the above
  services/enquiry.ts  enquiry form delivery (pluggable)
  components/      header, footer, product card, enquiry form, photo, buttons…
  sections/        home page sections
  pages/           one file per page
  hooks/useSeo.ts  titles, meta description, Open Graph, canonical, JSON-LD
  utils/           tel / mailto / WhatsApp link builders, image sizing
scripts/generate-sitemap.mjs   builds sitemap.xml + robots.txt from the data
```

## 4. Changing business information

Open `src/data/company.ts`. Every page reads from it.

- **Brand name** — `brandName` (currently `V.S. TEX CHEM`; `YR Chem` is recorded in `alternateNames` but not shown).
- **Phones** — the `phones` array. The first number is used in the header, the "Call" buttons and structured data.
- **WhatsApp** — `whatsapp`, as digits with country code (`919444417041`).
- **Emails** — the `emails` array. The first is used for mailto buttons and the form fallback.
- **Address** — `location.lines`, `city`, `postalCode`. Set `location.verified: true` to show the embedded Google Map on the Contact page (until then only an "Open in Google Maps" link is shown).
- **Logo** — no logo artwork was supplied; `src/components/Logo.tsx` uses a typographic wordmark. Replace the `VS` block with `<img src="/logo.svg" …>` and update `public/favicon.svg`.

## 5. Adding a product

In `src/data/products.ts`, copy an existing entry:

```ts
{
  id: 'altex-xyz',              // URL → /products/altex-xyz (lowercase, hyphens)
  name: 'ALTEX XYZ',
  featured: false,              // true → can appear on the home page
  listings: [
    {
      industry: 'textile',      // textile | detergent | paint | agro | cleaning
      category: 'Softeners',    // new category names appear in filters automatically
      description: 'Exact description from the company catalogue.',
      applications: ['Jigger machines'],   // optional — only if documented
    },
  ],
  documents: [                  // optional — only real files supplied by the client
    { label: 'Technical Data Sheet (PDF)', url: '/docs/altex-xyz-tds.pdf' },
  ],
},
```

- A product used in several industries gets **one listing per industry** (see `ALTEX SVS`, which is both a textile washing-off agent and a multipurpose cleanser).
- Put TDS/SDS PDFs in `public/docs/`. Without documents the page says sheets are "available on request" and links to the enquiry form.
- Search, filters, industry pages, related products, the enquiry dropdown and the sitemap all update automatically.

To add an industry, add it to `src/data/industries.ts` and to the `IndustryId` type in `types.ts`.

## 6. Images

All photographs are in `src/data/images.ts`. They are free-licence Unsplash photos of the relevant industries (textile, laundry/detergent, paint, crop spraying, process tanks, formulation). **None show V.S. TEX CHEM's own facility, staff or products**, and the site does not claim they do.

To use the company's own photos: put them in `public/images/` and set `src: '/images/<file>.jpg'`. Keep `alt` text accurate. Unsplash images are resized per screen size automatically; for local images, export at ~1800 px wide, JPEG/WebP quality ~75.

If an image fails to load, a neutral colour panel is shown instead of a broken image.

## 7. Enquiry form

The form validates (name, email format, optional phone format, message), has loading / success / error states, and includes spam protection (hidden honeypot field + minimum time before submit).

**It does not send anything until a delivery endpoint is configured.** Until then, after a valid submission it clearly says the enquiry *has not been sent* and offers one-click **Send by email** (pre-filled mailto) and **Send on WhatsApp** (pre-filled message). It never shows "sent" without a real success response.

To enable online delivery, create `.env` from `.env.example` and set:

```bash
VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/xxxxxxx      # or any JSON POST endpoint
VITE_ENQUIRY_ACCESS_KEY=                                   # if the provider needs one (Web3Forms)
```

Then rebuild. Tested-compatible providers: Formspree, Web3Forms (`https://api.web3forms.com/submit` + access key), Getform, or your own API. The POST body is JSON with `name, company, email, phone, industry, product, message, subject`. To connect a CRM instead, change `submitEnquiry` in `src/services/enquiry.ts` only.

## 8. SEO

- Per-page `<title>`, meta description, Open Graph tags, robots meta.
- JSON-LD: `LocalBusiness` (home/contact), `BreadcrumbList` (inner pages), `Product` (product pages).
- One `<h1>` per page, semantic landmarks, descriptive alt text.
- `npm run build` writes `dist/sitemap.xml` (28 URLs) and `dist/robots.txt`.
- **Set `VITE_SITE_URL=https://your-domain.in` before building** — this enables canonical URLs and real sitemap URLs (otherwise a placeholder domain is used and canonicals are omitted).

This is a single-page app: Google renders it, but for best indexing of product pages consider a host with prerendering, or add a prerender step later.

## 9. Deploying

`dist/` is a static site. Any static host works; all routes must fall back to `index.html`:

- **Netlify** — `public/_redirects` is included.
- **Vercel** — `vercel.json` is included.
- **Other / Apache / Nginx** — configure a rewrite of unknown paths to `/index.html`.

## 10. Before launch — confirm with the client

| Item | Current value | Where |
|---|---|---|
| Final brand name | V.S. TEX CHEM (YR Chem also appears in material) | `company.ts` → `brandName` |
| Which phone numbers are current | All three shown | `company.ts` → `phones` |
| WhatsApp number | 94444 17041 (assumed) | `company.ts` → `whatsapp` |
| Which emails are current | Both shown | `company.ts` → `emails` |
| Exact address / map pin | Address shown, map embed off | `company.ts` → `location.verified` |
| Logo artwork | Typographic placeholder wordmark | `Logo.tsx`, `favicon.svg` |
| Company photographs | Generic industry stock | `images.ts` |
| Remaining products of the "50+" range | 18 published | `products.ts` |
| TDS / SDS documents | None — "on request" | `products.ts` → `documents` |
| Enquiry delivery | Not connected (email/WhatsApp fallback) | `.env` |
| Production domain | Not set | `.env` → `VITE_SITE_URL` |
| Facility / QC / certification details for Capabilities | Not supplied — not claimed | `CapabilitiesPage.tsx` |

## 11. Content rules followed

No invented founding year, history, capacity, staff numbers, certifications, statistics, testimonials or client logos. Product names, categories and descriptions are verbatim from the supplied company document; "applications" are only shown where that document states them.
