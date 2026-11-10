import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Photo } from '../components/Photo'
import { Reveal } from '../components/Reveal'
import { ButtonLink, SectionHeading } from '../components/ui'
import { ProductCard } from '../components/ProductCard'
import { approach, company, fullAddress, mapsLink } from '../data/company'
import { primaryIndustries } from '../data/industries'
import { featuredProducts, productsForIndustry } from '../data/products'
import type { ImageKey } from '../data/images'
import { productEnquiryText, telHref, whatsappHref } from '../utils/contact'

export function WhoWeAre() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="who-we-are">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <SectionHeading id="who-we-are" eyebrow="01 · Company" title="Who We Are" />
          <Photo image="textileAlt" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10 hidden aspect-[4/3] lg:block" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl font-medium leading-relaxed text-ink sm:text-2xl">{company.shortDescription}</p>
          <p className="mt-6 leading-relaxed text-muted">
            Our formulations are developed by qualified professionals and backed by extensive research. We take time to
            understand each buyer’s specific requirements, so the products we supply are suited to the application — and
            where needed, customised for it.
          </p>
          <dl className="mt-10 grid grid-cols-2 border-t border-line">
            {[
              ['Product range', `${company.productCountLabel} products`],
              ['Industries served', 'Textile, detergent, paint & agro'],
              ['Approach', 'Application-specific formulations'],
              ['Based in', `${company.location.city}, ${company.location.state}`],
            ].map(([k, v], i) => (
              <div key={k} className={`border-b border-line py-5 ${i % 2 === 0 ? 'pr-4' : 'border-l pl-5'}`}>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{k}</dt>
                <dd className="mt-1.5 font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink to="/about" variant="ghost" arrow className="mt-8">
            More about the company
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}

export function IndustriesOverview() {
  return (
    <section className="border-y border-line bg-mist py-20 sm:py-28" aria-labelledby="industries-heading">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="industries-heading"
            eyebrow="02 · Industries"
            title="Chemistry for the industries we serve"
            intro="Each product range is developed for the processes and performance requirements of its industry."
          />
          <ButtonLink to="/industries" variant="secondary" arrow className="shrink-0">
            All industries
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {primaryIndustries.map((ind, i) => (
            <Reveal as="li" key={ind.id} delay={i * 0.06} className="bg-white">
              <Link to={`/industries/${ind.id}`} className="group flex h-full flex-col">
                <div className="overflow-hidden">
                  <Photo
                    image={ind.image as ImageKey}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    width={800}
                    className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="code text-xs font-semibold text-muted">0{i + 1}</p>
                  <h3 className="mt-2 text-xl font-bold text-ink">{ind.shortName}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{ind.summary}</p>
                  <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-accent">
                    {productsForIndustry(ind.id).length} products <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="featured-heading">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="featured-heading"
            eyebrow="03 · Products"
            title="Featured products"
            intro="A selection from our catalogue across textile, detergent, paint and agro applications."
          />
          <ButtonLink to="/products" variant="secondary" arrow className="shrink-0">
            View full catalogue
          </ButtonLink>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 4) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ApproachSection({ withLink = true }: { withLink?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28" aria-labelledby="approach-heading">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow !text-white/60">04 · Our approach</p>
          <h2 id="approach-heading" className="mt-4 text-3xl font-bold leading-[1.15] sm:text-4xl">
            Chemical formulations designed around industry requirements.
          </h2>
          <p className="mt-5 leading-relaxed text-white/70">
            We manufacture specialty chemicals with one aim: products that perform in the buyer’s actual application, at an
            economical cost.
          </p>
          <Photo image="formulation" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10 aspect-[16/10] opacity-90" />
        </Reveal>
        <ol className="grid content-start gap-px bg-white/10 sm:grid-cols-2">
          {approach.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06} className="bg-ink p-7 sm:p-8">
              <p className="code text-sm font-bold text-accent">0{i + 1}</p>
              <h3 className="mt-6 text-lg font-bold">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{a.body}</p>
            </Reveal>
          ))}
          {withLink && (
            <li className="bg-ink p-7 sm:col-span-2 sm:p-8">
              <Link to="/capabilities" className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-white/80">
                How we develop formulations <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          )}
        </ol>
      </div>
    </section>
  )
}

export function ContactStrip() {
  return (
    <section className="border-t border-line py-16" aria-labelledby="contact-strip">
      <div className="container-site">
        <h2 id="contact-strip" className="sr-only">
          Contact information
        </h2>
        <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          <ContactTile icon={<MapPin className="size-5" />} label="Visit">
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {fullAddress.slice(0, 3).join(', ')}
            </a>
          </ContactTile>
          <ContactTile icon={<Phone className="size-5" />} label="Call">
            {company.phones.slice(0, 2).map((p) => (
              <a key={p.e164} href={telHref(p.e164)} className="block hover:text-accent">
                +91 {p.display}
              </a>
            ))}
          </ContactTile>
          <ContactTile icon={<Mail className="size-5" />} label="Email">
            {company.emails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="block break-all hover:text-accent">
                {e}
              </a>
            ))}
          </ContactTile>
          <ContactTile icon={<MessageCircle className="size-5" />} label="WhatsApp">
            <a href={whatsappHref(productEnquiryText())} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              Message us on WhatsApp
            </a>
          </ContactTile>
        </div>
      </div>
    </section>
  )
}

function ContactTile({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-2 text-accent" aria-hidden>
        {icon}
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <div className="mt-2 text-sm font-semibold leading-relaxed text-ink">{children}</div>
    </div>
  )
}
