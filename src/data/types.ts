export type IndustryId = 'textile' | 'detergent' | 'paint' | 'agro' | 'cleaning'

export interface PhoneNumber {
  /** Display format, e.g. "94444 17041" */
  display: string
  /** E.164 digits without "+", e.g. "919444417041" */
  e164: string
  /** Where this number appears in the supplied material — kept for client verification */
  source: string
}

export interface CompanyInfo {
  brandName: string
  /** Other names that appear in supplied material. Not displayed until the client confirms. */
  alternateNames: string[]
  legalNote: string
  tagline: string
  shortDescription: string
  productCountLabel: string
  location: {
    lines: string[]
    city: string
    state: string
    postalCode: string
    country: string
    /** Free-text query used for the "Open in Google Maps" link */
    mapsQuery: string
    /** Set to true only once the client confirms the address. Enables the embedded map. */
    verified: boolean
  }
  emails: string[]
  phones: PhoneNumber[]
  /** Number used for WhatsApp enquiries (E.164 digits). Confirm with the client before launch. */
  whatsapp: string
  gstin: string
  owner: string
  /** Set to true once the client confirms which contact details are current. */
  contactDetailsVerified: boolean
}

/** One appearance of a product in the company's catalogue. A product can appear under several industries. */
export interface ProductListing {
  industry: IndustryId
  category: string
  description: string
  /** Application information only where the source document states it. */
  applications?: string[]
}

export interface ProductDocument {
  label: string
  url: string
}

export interface Product {
  /** URL slug, e.g. "altex-wvc" */
  id: string
  name: string
  listings: ProductListing[]
  /** Key into src/data/images.ts. Optional — products without photography use the catalogue tile. */
  image?: string
  featured?: boolean
  /** Technical / safety data sheets. Add only real documents supplied by the client. */
  documents?: ProductDocument[]
}

export interface Industry {
  id: IndustryId
  name: string
  shortName: string
  /** Four primary industries are shown on the home page; others only in the catalogue. */
  primary: boolean
  summary: string
  intro: string
  /** General application areas for the industry (not product claims). */
  applicationAreas: string[]
  image: string
}

export interface SiteImage {
  src: string
  alt: string
  /** Photographer credit — Unsplash licence does not require it but it is good practice. */
  credit?: string
  /** Base hue for the fallback panel shown if the photo cannot load. */
  tone?: 'ink' | 'clay' | 'stone' | 'moss' | 'slate'
}
