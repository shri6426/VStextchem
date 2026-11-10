import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { LayoutGrid, List, Search, X } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { ProductCard } from '../components/ProductCard'
import { CtaBand } from '../components/CtaBand'
import { buttonClass } from '../components/ui'
import { industries, industryById } from '../data/industries'
import { categoriesFor, primaryListing, products } from '../data/products'
import type { IndustryId } from '../data/types'
import { company } from '../data/company'
import { useSeo, breadcrumbLd } from '../hooks/useSeo'

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export default function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const reduce = useReducedMotion()
  const q = params.get('q') ?? ''
  const industryParam = params.get('industry')
  const industry = industries.some((i) => i.id === industryParam) ? (industryParam as IndustryId) : null
  const categoryParam = params.get('category')
  const availableCats = categoriesFor(industry)
  const category = categoryParam && availableCats.includes(categoryParam) ? categoryParam : null
  const view = params.get('view') === 'table' ? 'table' : 'grid'

  useSeo({
    title: industry ? `${industryById[industry].shortName} Products — Catalogue` : 'Product Catalogue',
    description:
      'Browse V.S. TEX CHEM specialty chemicals: textile wetting agents, levelling agents, peroxide stabilizers, washing-off and dye fixing agents, paint dispersing agents, detergent additives and agro spreading agents.',
    jsonLd: breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
    ]),
  })

  const set = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params)
    for (const [k, v] of Object.entries(patch)) (v ? next.set(k, v) : next.delete(k))
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    const nq = norm(q)
    return products.filter((p) =>
      p.listings.some(
        (l) =>
          (!industry || l.industry === industry) &&
          (!category || l.category === category) &&
          (!nq || norm(`${p.name} ${p.name.replace(/\s+/g, '')} ${l.category} ${l.description}`).includes(nq)),
      ),
    )
  }, [q, industry, category])

  const hasFilters = !!(q || industry || category)

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Products' }]}
        eyebrow="Product catalogue"
        title="Products"
        intro={`Browse by industry or product category, or search by product name. Our range includes ${company.productCountLabel} products — the catalogue below lists products currently published; contact us for anything not shown.`}
      />

      <section className="py-10 sm:py-14" aria-label="Catalogue">
        <div className="container-site">
          {/* Controls */}
          <div className="sticky top-[4.5rem] z-20 -mx-4 border-b border-line bg-white/95 px-4 pb-4 pt-3 backdrop-blur-sm sm:mx-0 sm:border sm:p-5 md:top-[6.75rem]">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="relative">
                <label htmlFor="product-search" className="sr-only">
                  Search products
                </label>
                <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  id="product-search"
                  type="search"
                  value={q}
                  onChange={(e) => set({ q: e.target.value || null })}
                  placeholder="Search by product name or type, e.g. LVG, dye fixing"
                  className="block min-h-11 w-full rounded-[var(--radius-sm)] border border-line-strong bg-white py-2.5 pl-10 pr-10 text-[0.95rem] placeholder:text-muted/80 focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20"
                />
                {q && (
                  <button type="button" aria-label="Clear search" onClick={() => set({ q: null })} className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center text-muted hover:text-ink">
                    <X className="size-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="category-filter" className="sr-only">
                  Product category
                </label>
                <select
                  id="category-filter"
                  value={category ?? ''}
                  onChange={(e) => set({ category: e.target.value || null })}
                  className="block min-h-11 w-full rounded-[var(--radius-sm)] border border-line-strong bg-white px-3 py-2.5 text-sm font-semibold focus:border-ink focus:outline-none lg:w-64"
                >
                  <option value="">All categories</option>
                  {availableCats.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <div className="hidden shrink-0 border border-line-strong sm:flex" role="group" aria-label="View">
                  {(['grid', 'table'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={view === v}
                      aria-label={v === 'grid' ? 'Grid view' : 'List view'}
                      onClick={() => set({ view: v === 'grid' ? null : v })}
                      className={`grid size-11 place-items-center ${view === v ? 'bg-ink text-white' : 'text-muted hover:text-ink'}`}
                    >
                      {v === 'grid' ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="group" aria-label="Filter by industry">
              <Chip active={!industry} onClick={() => set({ industry: null, category: null })}>
                All industries
              </Chip>
              {industries.map((i) => (
                <Chip key={i.id} active={industry === i.id} onClick={() => set({ industry: i.id, category: null })}>
                  {i.shortName}
                </Chip>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted" aria-live="polite">
              Showing <strong className="text-ink">{results.length}</strong> of {products.length} products
              {industry && <> in {industryById[industry].name}</>}
              {category && <> · {category}</>}
              {q && <> matching “{q}”</>}
            </p>
            {hasFilters && (
              <button type="button" onClick={() => setParams(view === 'table' ? { view: 'table' } : {}, { replace: true })} className="text-sm font-semibold text-accent hover:text-accent-dark">
                Clear all filters
              </button>
            )}
          </div>

          {results.length === 0 ? (
            <div className="mt-8 border border-dashed border-line-strong p-10 text-center">
              <p className="text-lg font-semibold">No products match your search.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                Our full range is wider than the products listed here. Tell us what you need and we’ll advise on a suitable product.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => setParams({}, { replace: true })} className={buttonClass('secondary')}>
                  Clear filters
                </button>
                <Link to="/contact#enquiry" className={buttonClass('primary')}>
                  Ask about a product
                </Link>
              </div>
            </div>
          ) : view === 'grid' ? (
            <m.ul layout={!reduce} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((p) => (
                  <m.li
                    key={p.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={p} preferIndustry={industry} />
                  </m.li>
                ))}
              </AnimatePresence>
            </m.ul>
          ) : (
            <div className="mt-6 overflow-x-auto border border-line">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-mist text-xs uppercase tracking-[0.12em] text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Product</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Industry</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Category</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {results.map((p) => {
                    const l = primaryListing(p, industry)
                    return (
                      <tr key={p.id} className="hover:bg-mist/60">
                        <th scope="row" className="whitespace-nowrap px-5 py-4">
                          <Link to={`/products/${p.id}`} className="code font-bold text-ink hover:text-accent">
                            {p.name}
                          </Link>
                        </th>
                        <td className="whitespace-nowrap px-5 py-4 text-muted">{industryById[l.industry].shortName}</td>
                        <td className="px-5 py-4 text-muted">{l.category}</td>
                        <td className="px-5 py-4 text-ink-soft">{l.description}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <CtaBand title="Can’t find the product you need?" body="Our range includes products beyond those listed here, and we develop application-specific formulations. Tell us your requirement." />
    </>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-10 shrink-0 rounded-[var(--radius-sm)] border px-4 text-sm font-semibold transition-colors ${
        active ? 'border-ink bg-ink text-white' : 'border-line-strong bg-white text-ink-soft hover:border-ink hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
