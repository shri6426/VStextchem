import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/ui'
import { CtaBand } from '../components/CtaBand'
import { ApproachSection } from '../sections/HomeSections'
import { company } from '../data/company'
import { industries } from '../data/industries'
import { categoriesFor } from '../data/products'
import { useSeo, breadcrumbLd } from '../hooks/useSeo'

export default function AboutPage() {
  useSeo({
    title: 'About Us',
    description:
      'V.S. TEX CHEM is a specialty chemical manufacturer in Tiruppur with a range of 50+ products for textile, detergent, paint and agro industries.',
    jsonLd: breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'About Us', path: '/about' },
    ]),
  })

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
        eyebrow="About V.S. TEX CHEM"
        title="A specialty chemical manufacturer focused on the application."
        intro={company.shortDescription}
        image="textileMill"
      />

      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Company overview" title="What we do" />
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-lg leading-relaxed text-ink-soft">
            <p>
              V.S. TEX CHEM manufactures specialty chemicals for industrial applications. From our base in Tiruppur, we
              supply a range of {company.productCountLabel} products that cater to the requirements of various industries —
              principally textile processing, detergents, paints and agriculture, along with multipurpose cleaning.
            </p>
            <p>
              Our business is built on a simple position: economical products, with good quality. Every product in our range
              is formulated by qualified professionals and developed through extensive research.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <Photo image="textile" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeading eyebrow="Working with buyers" title="We start with your requirement" />
            <div className="mt-6 space-y-5 leading-relaxed text-muted">
              <p>
                A chemical that works well in one process may not suit another. That is why we focus on understanding each
                buyer’s specific requirement — the process, the machinery, and the result they need.
              </p>
              <p>
                From there we recommend a suitable product from our range or develop an application-specific, customised
                product for the buyer.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {['Understanding specific buyer requirements', 'Application-specific products', 'Customised formulations where needed'].map((t) => (
                <li key={t} className="flex items-start gap-3 font-semibold text-ink">
                  <span aria-hidden className="mt-2.5 h-px w-5 shrink-0 bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ApproachSection />

      <section className="py-20 sm:py-28" aria-labelledby="coverage">
        <div className="container-site">
          <SectionHeading id="coverage" eyebrow="Industry coverage" title="Industries we serve" />
          <ul className="mt-12 divide-y divide-line border-y border-line">
            {industries.map((ind) => (
              <li key={ind.id}>
                <Link
                  to={ind.primary ? `/industries/${ind.id}` : `/products?industry=${ind.id}`}
                  className="group grid gap-2 py-6 sm:grid-cols-[14rem_1fr_auto] sm:items-center sm:gap-8"
                >
                  <span className="text-lg font-bold text-ink group-hover:text-accent">{ind.name}</span>
                  <span className="text-sm text-muted">{categoriesFor(ind.id).join(' · ')}</span>
                  <ArrowRight aria-hidden className="hidden size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
