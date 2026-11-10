import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { Photo } from '../components/Photo'
import { ButtonLink } from '../components/ui'
import { company } from '../data/company'
import { primaryIndustries } from '../data/industries'
import { categoriesFor } from '../data/products'

export function HomeHero() {
  const reduce = useReducedMotion()
  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] as const } }

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-site relative grid gap-12 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:pb-20 lg:pt-20">
        <div>
          <m.p {...fade(0)} className="eyebrow">
            Specialty chemical manufacturer · {company.location.city}
          </m.p>
          <m.h1 {...fade(0.08)} className="mt-6 text-[2.5rem] font-extrabold leading-[1.04] text-ink sm:text-6xl lg:text-[4.1rem]">
            Specialty chemical solutions for <span className="text-accent">diverse industries.</span>
          </m.h1>
          <m.p {...fade(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Delivering application-specific specialty chemical solutions for textile, detergent, paint and agricultural industries.
          </m.p>
          <m.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/products" arrow>
              Explore Our Products
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Contact Us
            </ButtonLink>
          </m.div>
        </div>

        <m.div {...fade(0.12)} className="relative">
          <Photo image="hero" priority sizes="(min-width: 1024px) 48vw, 100vw" width={1400} className="aspect-[4/3] w-full sm:aspect-[16/11]" />
          {/* Catalogue index — real data from products.ts */}
          <div className="relative -mt-16 ml-4 mr-4 border border-line bg-white p-5 shadow-[0_12px_40px_rgb(32_37_34/0.12)] sm:absolute sm:-bottom-8 sm:-left-8 sm:mx-0 sm:mt-0 sm:w-80">
            <div className="flex items-baseline justify-between border-b border-line pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Product range</p>
              <p className="text-sm font-bold text-ink">{company.productCountLabel} products</p>
            </div>
            <ul className="mt-2 divide-y divide-line">
              {primaryIndustries.map((ind) => (
                <li key={ind.id}>
                  <Link to={`/industries/${ind.id}`} className="group flex items-center justify-between py-2.5 text-sm">
                    <span className="font-semibold text-ink group-hover:text-accent">{ind.shortName}</span>
                    <span className="flex items-center gap-2 text-xs text-muted">
                      {categoriesFor(ind.id).length} {categoriesFor(ind.id).length === 1 ? 'category' : 'categories'}
                      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </m.div>
      </div>
    </section>
  )
}
