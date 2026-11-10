import type { IndustryId, Product } from './types'

/**
 * PRODUCT CATALOGUE
 * -----------------
 * Names, categories and descriptions are taken verbatim from the company's
 * supplied document. The company states a range of 50+ products; only the
 * products below were listed, so only these are published.
 *
 * To add a product, copy an entry and change it. See README → "Adding a product".
 * - `id` becomes the URL: /products/<id>
 * - A product that serves several industries gets one listing per industry.
 * - Only add `applications` that the company has actually documented.
 * - Only add `documents` (TDS/SDS) that the client has supplied.
 */
export const products: Product[] = [
  // ── TEXTILE · Wetting Agents ────────────────────────────────────────────
  {
    id: 'altex-wvc',
    name: 'ALTEX WVC',
    featured: true,
    listings: [
      {
        industry: 'textile',
        category: 'Wetting Agents',
        description: 'Wetting agent cum detergent for Jigger, winch and drum washing machine.',
        applications: ['Jigger machines', 'Winch machines', 'Drum washing machines'],
      },
    ],
  },
  {
    id: 'altex-wva',
    name: 'ALTEX WVA',
    listings: [
      {
        industry: 'textile',
        category: 'Wetting Agents',
        description: 'Surfactants-based low-foaming wetting agent with high detergency.',
      },
    ],
  },
  {
    id: 'altex',
    name: 'ALTEX',
    listings: [
      { industry: 'textile', category: 'Wetting Agents', description: 'Low-foaming nonionic wetting agent.' },
    ],
  },
  // ── TEXTILE · Lubricants ────────────────────────────────────────────────
  {
    id: 'altex-lvu',
    name: 'ALTEX LVU',
    listings: [
      { industry: 'textile', category: 'Lubricants', description: 'Polymer-based lubricant and crease inhibitor.' },
    ],
  },
  // ── TEXTILE · Levelling & Sequestering Agents ───────────────────────────
  {
    id: 'altex-lvg',
    name: 'ALTEX LVG',
    featured: true,
    listings: [
      {
        industry: 'textile',
        category: 'Levelling & Sequestering Agents',
        description: 'Levelling, dispersing and sequestering agent with good chelation of iron and calcium.',
      },
    ],
  },
  {
    id: 'altex-lvsp',
    name: 'ALTEX LVSP',
    listings: [
      { industry: 'textile', category: 'Levelling & Sequestering Agents', description: 'Super levelling agent.' },
    ],
  },
  // ── TEXTILE · Pretreatment Additives ────────────────────────────────────
  {
    id: 'altex-psc',
    name: 'ALTEX PSC',
    featured: true,
    listings: [
      { industry: 'textile', category: 'Pretreatment Additives', description: 'High-performance peroxide stabilizer.' },
    ],
  },
  {
    id: 'altex-can',
    name: 'ALTEX CAN',
    listings: [{ industry: 'textile', category: 'Pretreatment Additives', description: 'Core alkali neutralizer.' }],
  },
  {
    id: 'altex-dms',
    name: 'ALTEX DMS',
    listings: [
      { industry: 'textile', category: 'Pretreatment Additives', description: 'Powerful demineralising agent.' },
    ],
  },
  // ── TEXTILE · Washing-off Agents ────────────────────────────────────────
  {
    id: 'altex-svpb',
    name: 'ALTEX SVPB',
    listings: [
      { industry: 'textile', category: 'Washing-off Agents', description: 'Non-foaming polymeric washing-off agent.' },
    ],
  },
  {
    // Appears twice in the source document: textile washing-off agent AND multipurpose cleanser.
    id: 'altex-svs',
    name: 'ALTEX SVS',
    featured: true,
    listings: [
      {
        industry: 'textile',
        category: 'Washing-off Agents',
        description: 'Powerful anionic surfactant-based washing-off agent, ideal for Jigger and Winch.',
        applications: ['Jigger machines', 'Winch machines'],
      },
      {
        industry: 'cleaning',
        category: 'Multipurpose Cleanser',
        description: 'A cleanser for vessels, cloths, glass and floors.',
        applications: ['Vessels', 'Cloths', 'Glass', 'Floors'],
      },
    ],
  },
  // ── TEXTILE · Dye Fixing Agents ─────────────────────────────────────────
  {
    id: 'altex-fvx',
    name: 'ALTEX FVX',
    featured: true,
    listings: [
      { industry: 'textile', category: 'Dye Fixing Agents', description: 'Non-formaldehyde dye fixing agent.' },
    ],
  },
  {
    id: 'altex-fvxf',
    name: 'ALTEX FVXF',
    listings: [
      {
        industry: 'textile',
        category: 'Dye Fixing Agents',
        description: 'Formaldehyde dye fixing agent for blue colour enhancement.',
      },
    ],
  },
  // ── AGRO · Wetting & Spreading Agents ───────────────────────────────────
  {
    id: 'altex-avgs',
    name: 'ALTEX AVGS',
    featured: true,
    listings: [
      { industry: 'agro', category: 'Wetting & Spreading Agents', description: 'Wetting cum superspreading agent.' },
    ],
  },
  // ── DETERGENT · Detergent Additives ─────────────────────────────────────
  {
    id: 'altex-dvt',
    name: 'ALTEX DVT',
    featured: true,
    listings: [
      {
        industry: 'detergent',
        category: 'Detergent Additives',
        description: 'Performance additive for phosphate-free detergents.',
        applications: ['Phosphate-free detergents'],
      },
    ],
  },
  // ── PAINT · Dispersing Agents ───────────────────────────────────────────
  {
    id: 'altex-dvtp',
    name: 'ALTEX DVTP',
    featured: true,
    listings: [
      {
        industry: 'paint',
        category: 'Dispersing Agents',
        description: 'High-performance polymeric dispersing agent for water-based paints.',
        applications: ['Water-based paints'],
      },
    ],
  },
  {
    id: 'altex-svsp',
    name: 'ALTEX SVSP',
    listings: [{ industry: 'paint', category: 'Dispersing Agents', description: 'Anti-settling agent for paints.' }],
  },
  // ── PAINT · Wetting Agents ──────────────────────────────────────────────
  {
    id: 'altex-515p',
    name: 'ALTEX 515P',
    listings: [{ industry: 'paint', category: 'Wetting Agents', description: 'Nonionic wetting agent.' }],
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────

export const productById = (id: string) => products.find((p) => p.id === id)

export const productsForIndustry = (industry: IndustryId) =>
  products.filter((p) => p.listings.some((l) => l.industry === industry))

/** The listing to show first for a product, optionally preferring a given industry. */
export const primaryListing = (p: Product, prefer?: IndustryId | null) =>
  (prefer && p.listings.find((l) => l.industry === prefer)) || p.listings[0]

/** Categories in catalogue order, optionally limited to one industry. */
export const categoriesFor = (industry?: IndustryId | null) => {
  const seen: string[] = []
  for (const p of products)
    for (const l of p.listings)
      if ((!industry || l.industry === industry) && !seen.includes(l.category)) seen.push(l.category)
  return seen
}

export const featuredProducts = products.filter((p) => p.featured)

/** Products that share an industry/category with the given one, closest matches first. */
export const relatedProducts = (p: Product, limit = 4) => {
  const cats = new Set(p.listings.map((l) => `${l.industry}|${l.category}`))
  const inds = new Set(p.listings.map((l) => l.industry))
  return products
    .filter((o) => o.id !== p.id)
    .map((o) => ({
      o,
      score:
        (o.listings.some((l) => cats.has(`${l.industry}|${l.category}`)) ? 2 : 0) +
        (o.listings.some((l) => inds.has(l.industry)) ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.o)
}
