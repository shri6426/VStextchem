import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHero } from '../components/PageHero'
import { EnquiryForm } from '../components/EnquiryForm'
import { buttonClass } from '../components/ui'
import { company, fullAddress, mapsEmbed, mapsLink } from '../data/company'
import { industryById } from '../data/industries'
import { productById } from '../data/products'
import type { IndustryId } from '../data/types'
import { productEnquiryText, telHref, whatsappHref } from '../utils/contact'
import { useSeo, organizationLd } from '../hooks/useSeo'

export default function ContactPage() {
  const [params] = useSearchParams()
  const { hash } = useLocation()
  const productId = params.get('product') ?? undefined
  const product = productId ? productById(productId) : undefined
  const industryId = params.get('industry') as IndustryId | null
  const industry = industryId && industryId in industryById ? industryById[industryId] : undefined

  useSeo({
    title: 'Contact Us — Enquiries & Quotations',
    description: `Contact ${company.brandName}, Tiruppur, for product enquiries, quotations and technical information. Call, email, WhatsApp or send an enquiry.`,
    jsonLd: organizationLd(),
  })

  useEffect(() => {
    if (hash === '#enquiry') {
      const t = setTimeout(() => document.getElementById('enquiry')?.scrollIntoView({ block: 'start' }), 50)
      return () => clearTimeout(t)
    }
  }, [hash, productId])

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
        eyebrow="Contact"
        title="Talk to us about your requirement."
        intro="For product enquiries, quotations or technical information, send us an enquiry or reach us directly by phone, email or WhatsApp."
      />

      <section className="py-14 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Contact details */}
          <div className="space-y-10">
            <Detail icon={<MapPin className="size-5" />} title="Address">
              <address className="not-italic leading-relaxed text-ink-soft">
                {company.brandName}
                <br />
                {fullAddress.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark">
                Open in Google Maps <ExternalLink aria-hidden className="size-3.5" />
              </a>
            </Detail>

            <Detail icon={<Phone className="size-5" />} title="Phone">
              <ul className="space-y-1.5">
                {company.phones.map((p) => (
                  <li key={p.e164}>
                    <a href={telHref(p.e164)} className="font-semibold text-ink hover:text-accent">
                      +91 {p.display}
                    </a>
                  </li>
                ))}
              </ul>
            </Detail>

            <Detail icon={<Mail className="size-5" />} title="Email">
              <ul className="space-y-1.5">
                {company.emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`} className="break-all font-semibold text-ink hover:text-accent">
                      {e}
                    </a>
                  </li>
                ))}
              </ul>
            </Detail>

            <a href={whatsappHref(productEnquiryText(product?.name))} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', 'w-full')}>
              <MessageCircle aria-hidden className="size-4" /> Enquire on WhatsApp
            </a>

            <dl className="border-t border-line pt-6 text-sm">
              <div className="flex justify-between gap-4 py-1">
                <dt className="text-muted">Proprietor</dt>
                <dd className="font-semibold">{company.owner}</dd>
              </div>
              <div className="flex justify-between gap-4 py-1">
                <dt className="text-muted">GSTIN</dt>
                <dd className="code font-semibold">{company.gstin}</dd>
              </div>
            </dl>
          </div>

          {/* Form */}
          <div id="enquiry" className="scroll-mt-28">
            <h2 className="text-2xl font-bold">Send an enquiry</h2>
            <p className="mt-2 text-muted">
              {product ? (
                <>
                  Enquiring about <strong className="text-ink">{product.name}</strong>. Add any details about your application below.
                </>
              ) : industry ? (
                <>Tell us about your {industry.shortName.toLowerCase()} application and we’ll recommend suitable products.</>
              ) : (
                'Tell us what you need — a product, a quotation or technical information.'
              )}
            </p>
            <div className="mt-6">
              <EnquiryForm key={productId ?? industryId ?? 'general'} initialProductId={productId} initialIndustryId={industryId ?? undefined} />
            </div>
          </div>
        </div>
      </section>

      {company.location.verified && (
        <section aria-label="Map" className="border-t border-line">
          <iframe title={`Map showing ${company.brandName}`} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[420px] w-full grayscale-[0.4]" />
        </section>
      )}
    </>
  )
}

function Detail({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span aria-hidden className="grid size-10 shrink-0 place-items-center bg-accent-tint text-accent">
        {icon}
      </span>
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{title}</h2>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  )
}
