import { PageHero } from '../components/PageHero'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/ui'
import { CtaBand } from '../components/CtaBand'
import { approach } from '../data/company'
import { useSeo, breadcrumbLd } from '../hooks/useSeo'

/**
 * Capabilities. Content is limited to what the company has stated.
 * When the client supplies facility, quality-control or certification details,
 * add them to `futureSections` below — the layout already has a place for them.
 */
const process = [
  {
    title: 'Understand the requirement',
    body: 'We begin with the buyer’s process — the application, the machinery involved and the result required.',
  },
  {
    title: 'Formulate',
    body: 'Qualified professionals select or develop a formulation suited to that application, drawing on extensive research.',
  },
  {
    title: 'Customise where needed',
    body: 'Where a standard product does not fit, we develop an application-specific, customised product for the buyer.',
  },
  {
    title: 'Manufacture and supply',
    body: 'We manufacture the specialty chemical and supply it with a focus on quality and economical cost.',
  },
]

export default function CapabilitiesPage() {
  useSeo({
    title: 'Manufacturing & Formulation Capabilities',
    description:
      'How V.S. TEX CHEM develops specialty chemicals: formulations by qualified professionals, extensive research and application-specific, customised products for buyers.',
    jsonLd: breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Capabilities', path: '/capabilities' },
    ]),
  })

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Capabilities' }]}
        eyebrow="Manufacturing & formulation"
        title="Chemical formulations designed around industry requirements."
        intro="We manufacture specialty chemicals and develop formulations around how they will actually be used — in the buyer’s process, on the buyer’s machinery."
        image="production"
      />

      <section className="py-20 sm:py-28" aria-labelledby="process">
        <div className="container-site">
          <SectionHeading id="process" eyebrow="How we work" title="From requirement to product" />
          <ol className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="relative bg-white p-7">
                <p className="code text-5xl font-extrabold text-line-strong">0{i + 1}</p>
                <h3 className="mt-6 text-lg font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="What guides our formulations" title="Quality, economy and fit for purpose" />
            <dl className="mt-10 space-y-8">
              {approach.map((a) => (
                <div key={a.title} className="border-l-2 border-accent pl-5">
                  <dt className="font-bold text-ink">{a.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{a.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <Photo image="formulation" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]" />
            <p className="mt-3 text-xs text-muted">Representative image of formulation work.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="range">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="range" eyebrow="Product range" title="Specialty chemicals across five application areas" />
          <ul className="grid gap-x-10 gap-y-4 text-ink sm:grid-cols-2">
            {[
              'Textile wetting agents',
              'Lubricants and crease inhibitors',
              'Levelling & sequestering agents',
              'Pretreatment additives',
              'Washing-off agents',
              'Dye fixing agents',
              'Detergent additives',
              'Paint dispersing & anti-settling agents',
              'Agro wetting & spreading agents',
              'Multipurpose cleanser',
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 border-b border-line pb-4 font-semibold">
                <span aria-hidden className="size-1.5 shrink-0 bg-accent" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Have a specific process requirement?" body="Share your application details and we will discuss a suitable product or a customised formulation." />
    </>
  )
}
