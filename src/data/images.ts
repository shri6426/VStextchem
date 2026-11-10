import type { SiteImage } from './types'

/**
 * SITE IMAGERY
 * ------------
 * Generic industry photography from Unsplash (free to use commercially under the
 * Unsplash License). None of these depict V.S. TEX CHEM's own facility or staff.
 *
 * To use the company's own photographs: put the files in /public/images/ and
 * change `src` to e.g. '/images/factory.jpg'. Keep the `alt` text accurate.
 *
 * Unsplash URLs are resized on the fly (see utils/image.ts), so phones download
 * small versions. If a photo fails to load, a neutral panel is shown instead.
 */
const u = (id: string) => `https://images.unsplash.com/${id}`

export const images = {
  hero: {
    src: u('photo-1731688687548-16c5da917c11'),
    alt: 'Rows of stainless steel process tanks in an industrial production hall',
    credit: 'Keith Tanner / Unsplash',
    tone: 'slate',
  },
  textile: {
    src: '/images/textile.jpg',
    alt: 'Industrial textile dyeing machines and fabric processing in a production facility',
    tone: 'slate',
  },
  textileAlt: {
    src: u('photo-1782828152833-e49c0d363683'),
    alt: 'Rows of coloured thread spools mounted on a textile machine',
    tone: 'clay',
  },
  textileMill: {
    src: u('photo-1758272024360-a95be2abe403'),
    alt: 'Industrial weaving loom winding finished fabric onto a roll',
    tone: 'stone',
  },
  detergent: {
    src: '/images/detergent.jpg',
    alt: 'Liquid detergent chemical formulation with fine foam in laboratory glassware with industrial processing equipment in the background',
    tone: 'slate',
  },
  paint: {
    src: '/images/paint.jpg',
    alt: 'Assorted open cans of vibrant colored paints arranged in rows',
    tone: 'clay',
  },
  agro: {
    src: u('photo-1656407410275-e63e689bcd90'),
    alt: 'Aerial view of a tractor spraying a large green crop field',
    tone: 'moss',
  },
  cleaning: {
    src: u('photo-1635274605638-d44babc08a4f'),
    alt: 'A stack of clean, folded shirts',
    tone: 'stone',
  },
  formulation: {
    src: u('photo-1617155093730-a8bf47be792d'),
    alt: 'A gloved hand holding a glass beaker of clear liquid during formulation work',
    tone: 'ink',
  },
  production: {
    src: u('photo-1731688687548-16c5da917c11'),
    alt: 'Stainless steel process vessels in a production hall',
    tone: 'slate',
  },
} satisfies Record<string, SiteImage>

export type ImageKey = keyof typeof images
