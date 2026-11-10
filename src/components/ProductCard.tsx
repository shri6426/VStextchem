import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { IndustryId, Product } from '../data/types'
import { industryById } from '../data/industries'
import { primaryListing } from '../data/products'

/**
 * Spec-sheet style product tile. Products have no photography (none supplied),
 * so the card leads with the product name and its catalogue classification.
 */
export function ProductCard({ product, preferIndustry }: { product: Product; preferIndustry?: IndustryId | null }) {
  const listing = primaryListing(product, preferIndustry)
  const otherIndustries = product.listings.filter((l) => l.industry !== listing.industry)

  return (
    <Link
      to={`/products/${product.id}`}
      className="group relative flex h-full flex-col border border-line bg-white p-6 transition-colors duration-200 hover:border-ink/40"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {industryById[listing.industry].shortName}
          <span className="mx-1.5 text-line-strong">/</span>
          {listing.category}
        </p>
        <ArrowUpRight aria-hidden className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
      </div>
      <h3 className="code mt-5 text-xl font-extrabold text-ink">{product.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{listing.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-sm">
        <span className="font-semibold text-ink group-hover:text-accent">View details</span>
        {otherIndustries.length > 0 && (
          <span className="text-xs text-muted">Also: {otherIndustries.map((l) => industryById[l.industry].shortName).join(', ')}</span>
        )}
      </div>
    </Link>
  )
}
