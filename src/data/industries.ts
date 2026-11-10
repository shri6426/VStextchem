import type { Industry, IndustryId } from './types'

/**
 * Industries served. `summary` and `intro` describe the industry and the role
 * our chemical categories play in it — they make no claims about specific
 * customers, volumes or certifications.
 */
export const industries: Industry[] = [
  {
    id: 'textile',
    name: 'Textile Industry',
    shortName: 'Textile',
    primary: true,
    summary:
      'Wetting, levelling, pretreatment, washing-off and dye fixing chemicals for textile processing and dyeing.',
    intro:
      'Textile processing depends on consistent chemistry at every stage — from preparing the fabric to fixing the final shade. Our textile range covers wetting agents, lubricants, levelling and sequestering agents, pretreatment additives, washing-off agents and dye fixing agents, with products suited to jigger, winch and drum machines.',
    applicationAreas: [
      'Fabric wetting and scouring',
      'Pretreatment and bleaching support',
      'Levelling and dispersion during dyeing',
      'Washing-off after dyeing',
      'Dye fixing and colour fastness',
      'Crease prevention during processing',
    ],
    image: 'textile',
  },
  {
    id: 'detergent',
    name: 'Detergent Industry',
    shortName: 'Detergent',
    primary: true,
    summary: 'Performance additives for detergent manufacturers, including phosphate-free formulations.',
    intro:
      'Detergent manufacturers increasingly formulate without phosphates while still needing dependable cleaning performance. Our detergent additive is designed to support performance in phosphate-free detergents.',
    applicationAreas: ['Phosphate-free detergent formulation', 'Detergent performance enhancement'],
    image: 'detergent',
  },
  {
    id: 'paint',
    name: 'Paint Industry',
    shortName: 'Paint',
    primary: true,
    summary: 'Dispersing, anti-settling and wetting agents for water-based paints and coatings.',
    intro:
      'Stable, uniform paints rely on pigments that disperse well and stay suspended in storage. Our paint range includes polymeric dispersing agents for water-based paints, anti-settling agents and nonionic wetting agents.',
    applicationAreas: ['Pigment dispersion', 'Preventing settling in storage', 'Wetting of pigments and surfaces'],
    image: 'paint',
  },
  {
    id: 'agro',
    name: 'Agro Industry',
    shortName: 'Agro',
    primary: true,
    summary: 'Wetting and superspreading agents for agricultural spray applications.',
    intro:
      'In agricultural spraying, how well a spray wets and spreads over a leaf surface affects coverage. Our agro product is a wetting cum superspreading agent for spray applications.',
    applicationAreas: ['Spray wetting', 'Spreading and coverage on leaf surfaces'],
    image: 'agro',
  },
  {
    id: 'cleaning',
    name: 'Multipurpose Cleanser',
    shortName: 'Cleaning',
    primary: false,
    summary: 'Multipurpose cleanser for vessels, cloths, glass and floors.',
    intro:
      'Alongside our industrial range, we supply a multipurpose cleanser suitable for vessels, cloths, glass and floors.',
    applicationAreas: ['Vessels', 'Cloths', 'Glass', 'Floors'],
    image: 'cleaning',
  },
]

export const industryById = Object.fromEntries(industries.map((i) => [i.id, i])) as Record<IndustryId, Industry>

export const primaryIndustries = industries.filter((i) => i.primary)
