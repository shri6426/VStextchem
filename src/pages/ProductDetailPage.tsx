import { Link, useParams } from 'react-router-dom'
import { FileText, Mail, MessageCircle, Phone } from 'lucide-react'
import { Breadcrumbs } from '../components/PageHero'
import { ProductCard } from '../components/ProductCard'
import { ButtonLink, Tag, buttonClass } from '../components/ui'
import { industryById } from '../data/industries'
import { productById, relatedProducts } from '../data/products'
import { company } from '../data/company'
import { mailHref, productEnquiryText, telHref, whatsappHref } from '../utils/contact'
import { useSeo, breadcrumbLd } from '../hooks/useSeo'
import NotFoundPage from './NotFoundPage'

export default function ProductDetailPage() {
  const { id = '' } = useParams()
  const product = productById(id)
  const first = product?.listings[0]

  useSeo({
    title: product && first ? `${product.name} — ${first.category}` : 'Product not found',
    description: product && first ? `${product.name}: ${first.description} Specialty chemical from V.S. TEX CHEM, Tiruppur.` : '',
    noindex: !product,
    jsonLd:
      product && first
        ? [
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Products', path: '/products' },
              { name: product.name, path: `/products/${product.id}` },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.name,
              description: product.listings.map((l) => l.description).join(' '),
              category: first.category,
              brand: { '@type': 'Brand', name: company.brandName },
              manufacturer: { '@type': 'Organization', name: company.brandName },
            },
          ]
        : undefined,
  })

  if (!product || !first) return <NotFoundPage message="We couldn’t find that product. It may have been renamed or removed from the catalogue." />

  const related = relatedProducts(product)
  const multi = product.listings.length > 1

  return (
    <>
      <section className="relative border-b border-line bg-mist">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
        <div className="container-site relative py-10 sm:py-14">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: industryById[first.industry].shortName, to: `/products?industry=${first.industry}` },
              { label: product.name },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                {product.listings.map((l) => (
                  <Tag key={l.industry + l.category}>
                    {industryById[l.industry].shortName} · {l.category}
                  </Tag>
                ))}
              </div>
              <h1 className="code mt-5 text-4xl font-extrabold text-ink sm:text-6xl">{product.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{first.description}</p>
            </div>

            {/* Enquiry panel */}
            <aside className="border border-line bg-white p-6" aria-label="Enquire about this product">
              <h2 className="text-lg font-bold">Enquire about {product.name}</h2>
              <p className="mt-1.5 text-sm text-muted">Pricing, availability, pack sizes and technical information on request.</p>
              <div className="mt-5 grid gap-3">
                <ButtonLink to={`/contact?product=${product.id}#enquiry`} arrow>
                  Send Enquiry
                </ButtonLink>
                <a href={whatsappHref(productEnquiryText(product.name))} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary')}>
                  <MessageCircle aria-hidden className="size-4" /> WhatsApp
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href={telHref(company.phones[0].e164)} className={buttonClass('secondary', '!px-3')}>
                    <Phone aria-hidden className="size-4" /> Call
                  </a>
                  <a href={mailHref(company.emails[0], `Enquiry — ${product.name}`, productEnquiryText(product.name))} className={buttonClass('secondary', '!px-3')}>
                    <Mail aria-hidden className="size-4" /> Email
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">Product information</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {product.listings.map((l) => (
                <div key={l.industry + l.category} className="grid gap-x-8 gap-y-4 py-6 sm:grid-cols-[11rem_1fr]">
                  {multi && (
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent sm:col-span-2">
                      Application: {industryById[l.industry].name}
                    </p>
                  )}
                  <dt className="text-sm font-semibold text-muted">Industry</dt>
                  <dd>
                    <Link to={l.industry === 'cleaning' ? '/products?industry=cleaning' : `/industries/${l.industry}`} className="font-semibold text-ink hover:text-accent">
                      {industryById[l.industry].name}
                    </Link>
                  </dd>
                  <dt className="text-sm font-semibold text-muted">Category</dt>
                  <dd>
                    <Link to={`/products?industry=${l.industry}&category=${encodeURIComponent(l.category)}`} className="font-semibold text-ink hover:text-accent">
                      {l.category}
                    </Link>
                  </dd>
                  <dt className="text-sm font-semibold text-muted">Description</dt>
                  <dd className="leading-relaxed text-ink-soft">{l.description}</dd>
                  {l.applications && (
                    <>
                      <dt className="text-sm font-semibold text-muted">Suitable for</dt>
                      <dd>
                        <ul className="flex flex-wrap gap-2">
                          {l.applications.map((a) => (
                            <li key={a}>
                              <Tag tone="accent">{a}</Tag>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </>
                  )}
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Technical documents</h2>
            {product.documents?.length ? (
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {product.documents.map((d) => (
                  <li key={d.url}>
                    <a href={d.url} className="flex items-center gap-3 py-4 font-semibold hover:text-accent">
                      <FileText aria-hidden className="size-5 text-muted" /> {d.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 border border-line bg-mist p-6">
                <FileText aria-hidden className="size-6 text-muted" />
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Technical data sheets (TDS) and safety data sheets (SDS) for {product.name} are available on request.
                </p>
                <Link to={`/contact?product=${product.id}#enquiry`} className="mt-4 inline-block text-sm font-semibold text-accent hover:text-accent-dark">
                  Request documents →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-mist py-14 sm:py-20" aria-labelledby="related">
          <div className="container-site">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related" className="text-2xl font-bold">
                Related products
              </h2>
              <Link to={`/products?industry=${first.industry}`} className="text-sm font-semibold text-muted hover:text-accent">
                All {industryById[first.industry].shortName.toLowerCase()} products →
              </Link>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} preferIndustry={first.industry} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  )
}
