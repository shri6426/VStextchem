import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { navItems } from './Header'
import { company, fullAddress } from '../data/company'
import { industries } from '../data/industries'
import { telHref } from '../utils/contact'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-white/75">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo inverse />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Manufacturer of specialty chemicals for textile, detergent, paint and agro industries, with a range of{' '}
            {company.productCountLabel} products.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navItems.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="link-underline hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Industries">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Industries</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {industries.map((i) => (
              <li key={i.id}>
                <Link to={i.primary ? `/industries/${i.id}` : `/products?industry=${i.id}`} className="link-underline hover:text-white">
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Contact</h2>
          <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed">
            <p>{fullAddress.join(', ')}</p>
            <p className="flex flex-col gap-1">
              {company.phones.map((p) => (
                <a key={p.e164} href={telHref(p.e164)} className="hover:text-white">
                  +91 {p.display}
                </a>
              ))}
            </p>
            <p className="flex flex-col gap-1">
              {company.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="break-all hover:text-white">
                  {e}
                </a>
              ))}
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.brandName}. All rights reserved.
          </p>
          <p>GSTIN: {company.gstin}</p>
        </div>
      </div>
    </footer>
  )
}
