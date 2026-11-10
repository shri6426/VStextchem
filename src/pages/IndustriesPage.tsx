import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { ButtonLink } from '../components/ui'
import { ProductCard } from '../components/ProductCard'
import { CtaBand } from '../components/CtaBand'
import { industries, industryById, primaryIndustries } from '../data/industries'
import { categoriesFor, productsForIndustry } from '../data/products'
import type { ImageKey } from '../data/images'
import type { Industry, IndustryId } from '../data/types'
import { useSeo, breadcrumbLd } from '../hooks/useSeo'

/** /industries — overview with a full section for each industry */
export function IndustriesPage() {
  useSeo({
    title: 'Industries — Textile, Detergent, Paint & Agro Chemicals',
    description:
      'Specialty chemicals for textile processing, detergent manufacturing, water-based paints and agricultural spraying, from V.S. TEX CHEM, Tiruppur.',
    jsonLd: breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Industries', path: '/industries' },
    ]),
  })

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Industries' }]}
        eyebrow="Industries"
        title="Specialty chemicals for four core industries."
        intro="Textile, detergent, paint and agro — each with products developed for the processes and performance needs of that industry."
      >
        <nav aria-label="Jump to industry" className="flex flex-wrap gap-2">
          {primaryIndustries.map((i) => (
            <a key={i.id} href={`#${i.id}`} className="rounded-[var(--radius-sm)] border border-line-strong bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-ink">
              {i.shortName}
            </a>
          ))}
        </nav>
      </PageHero>

      {primaryIndustries.map((ind, i) => (
        <IndustryBlock key={ind.id} industry={ind} index={i} />
      ))}

      <section className="border-t border-line bg-mist py-14">
        <div className="container-site flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">{industryById.cleaning.name}</h2>
            <p className="mt-2 text-muted">{industryById.cleaning.intro}</p>
          </div>
          <ButtonLink to="/products?industry=cleaning" variant="secondary" arrow className="shrink-0">
            View product
          </ButtonLink>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

function IndustryBlock({ industry, index }: { industry: Industry; index: number }) {
  const list = productsForIndustry(industry.id)
  const flip = index % 2 === 1
  return (
    <section id={industry.id} className="scroll-mt-28 border-t border-line py-20 sm:py-24" aria-labelledby={`${industry.id}-h`}>
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className={flip ? 'lg:order-2' : ''}>
            <Photo image={industry.image as ImageKey} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="code text-sm font-bold text-accent">0{index + 1}</p>
            <h2 id={`${industry.id}-h`} className="mt-3 text-3xl font-bold sm:text-4xl">
              {industry.name}
            </h2>
            <p className="mt-5 leading-relaxed text-muted">{industry.intro}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Applications</h3>
                <ul className="mt-3 space-y-2">
                  {industry.applicationAreas.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-ink">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Product categories</h3>
                <ul className="mt-3 space-y-2">
                  {categoriesFor(industry.id).map((c) => (
                    <li key={c}>
                      <Link
                        to={`/products?industry=${industry.id}&category=${encodeURIComponent(c)}`}
                        className="link-underline text-sm font-semibold text-ink hover:text-accent"
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={`/industries/${industry.id}`} arrow>
                {industry.shortName} products
              </ButtonLink>
              <ButtonLink to={`/contact?industry=${industry.id}#enquiry`} variant="secondary">
                Enquire
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <p className="mt-12 text-sm text-muted">
          {list.length} product{list.length === 1 ? '' : 's'} listed:{' '}
          {list.map((p, i) => (
            <span key={p.id}>
              <Link to={`/products/${p.id}`} className="font-semibold text-ink hover:text-accent">
                {p.name}
              </Link>
              {i < list.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

/** /industries/:slug — indexable page per industry with its full product list */
export function IndustryDetailPage() {
  const { slug } = useParams()
  const industry = industries.find((i) => i.id === slug)
  const list = industry ? productsForIndustry(industry.id) : []

  useSeo({
    title: industry ? `${industry.shortName} Chemicals — ${categoriesFor(industry.id).slice(0, 3).join(', ')}` : 'Industry',
    description: industry ? `${industry.summary} Manufactured by V.S. TEX CHEM, Tiruppur.` : '',
    jsonLd: industry
      ? breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: industry.name, path: `/industries/${industry.id}` },
        ])
      : undefined,
  })

  if (!industry) return <Navigate to="/industries" replace />

  const cats = categoriesFor(industry.id)
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Industries', to: '/industries' }, { label: industry.shortName }]}
        eyebrow="Industry"
        title={industry.name}
        intro={industry.intro}
        image={industry.image as ImageKey}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={`/contact?industry=${industry.id}#enquiry`} arrow>
            Enquire about {industry.shortName.toLowerCase()} chemicals
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-site space-y-16">
          {cats.map((cat) => {
            const inCat = list.filter((p) => p.listings.some((l) => l.industry === industry.id && l.category === cat))
            return (
              <div key={cat}>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
                  <h2 className="text-2xl font-bold">{cat}</h2>
                  <Link to={`/products?industry=${industry.id}&category=${encodeURIComponent(cat)}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent">
                    Open in catalogue <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </div>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {inCat.map((p) => (
                    <li key={p.id}>
                      <ProductCard product={p} preferIndustry={industry.id as IndustryId} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-t border-line bg-mist py-14">
        <div className="container-site">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Other industries</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {primaryIndustries
              .filter((i) => i.id !== industry.id)
              .map((i) => (
                <li key={i.id}>
                  <Link to={`/industries/${i.id}`} className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-line-strong bg-white px-4 py-2.5 text-sm font-semibold hover:border-ink">
                    {i.name} <ArrowRight aria-hidden className="size-4" />
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Need a ${industry.shortName.toLowerCase()} chemical for a specific process?`} />
    </>
  )
}
