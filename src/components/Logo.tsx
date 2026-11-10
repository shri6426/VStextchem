import { Link } from 'react-router-dom'
import { company } from '../data/company'

/**
 * Typographic wordmark. No logo artwork was supplied; replace the mark with the
 * client's logo file (e.g. <img src="/logo.svg">) once available.
 */
export function Logo({ inverse = false, onClick }: { inverse?: boolean; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label={`${company.brandName} — home`}>
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent text-[0.8rem] font-extrabold tracking-tight text-white"
      >
        VS
      </span>
      <span className="leading-none">
        <span className={`block text-[1.05rem] font-extrabold tracking-[0.02em] ${inverse ? 'text-white' : 'text-ink'}`}>
          {company.brandName}
        </span>
        <span className={`mt-1 block text-[0.66rem] font-semibold uppercase tracking-[0.18em] ${inverse ? 'text-white/60' : 'text-muted'}`}>
          Specialty Chemicals · {company.location.city}
        </span>
      </span>
    </Link>
  )
}
