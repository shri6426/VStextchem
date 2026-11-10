import type { CompanyInfo } from './types'

/**
 * CENTRAL BUSINESS CONFIGURATION
 * --------------------------------
 * Every component reads company details from here. Change a value once and it
 * updates across the header, footer, contact page, enquiry links and SEO data.
 *
 * ⚠ To confirm with the client before launch (see README → "Before launch"):
 *   - Final brand name (V.S. TEX CHEM vs YR Chem)
 *   - Which phone numbers and emails are current, and which number takes WhatsApp
 *   - Exact address for the map pin
 */
export const company: CompanyInfo = {
  brandName: 'V.S. TEX CHEM',
  alternateNames: ['YR Chem'],
  legalNote: 'Specialty chemical manufacturer',
  tagline: 'Formulating solutions. Supporting industries.',
  shortDescription:
    'V.S. TEX CHEM is a manufacturer of specialty chemicals based in Tiruppur. With a range of 50+ products, the company caters to the requirements of various industries, offering economical products with a focus on quality.',
  productCountLabel: '50+',
  location: {
    lines: ['134/1, Near TNK Vidhyalaya School', 'Pon Kovil Nagar, Dharapuram Road'],
    city: 'Tiruppur',
    state: 'Tamil Nadu',
    postalCode: '641665',
    country: 'India',
    mapsQuery: '134/1 Pon Kovil Nagar, Dharapuram Road, Tiruppur 641665, Tamil Nadu',
    verified: false,
  },
  emails: ['texchemvs@gmail.com', 'yrchem70@gmail.com'],
  phones: [
    { display: '94444 17041', e164: '919444417041', source: 'Supplied material' },
    { display: '96003 09519', e164: '919600309519', source: 'Supplied material' },
    { display: '99414 82220', e164: '919941482220', source: 'Supplied material' },
  ],
  whatsapp: '919444417041',
  gstin: '33AZQPR8302M1ZS',
  owner: 'C. Ramakrishnan',
  contactDetailsVerified: false,
}

export const fullAddress = [
  ...company.location.lines,
  `${company.location.city} – ${company.location.postalCode}`,
  `${company.location.state}, ${company.location.country}`,
]

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.location.mapsQuery)}`
export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(company.location.mapsQuery)}&z=15&output=embed`

/** Production origin, used for canonical URLs and structured data. Set VITE_SITE_URL at build time. */
export const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || ''

/** Company approach — wording taken from the company's own material. */
export const approach = [
  {
    title: 'Quality-focused formulations',
    body: 'Our products are formulated by qualified professionals, with a consistent focus on quality.',
  },
  {
    title: 'Economical solutions',
    body: 'Our aim is to offer economical products with good quality, so buyers get dependable performance at a sensible cost.',
  },
  {
    title: 'Research-backed development',
    body: 'Formulations are developed through extensive research into how each chemical performs in its application.',
  },
  {
    title: 'Application-specific customisation',
    body: 'We work to understand each buyer’s specific requirements and can tailor products to the application.',
  },
]
