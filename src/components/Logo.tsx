import { Link } from 'react-router-dom'
import { company } from '../data/company'

/**
 * Company logo mark using the VS Advanced Foundation emblem.
 * The `inverse` prop is used in the dark Footer — the logo is shown in a
 * small white pill so the circular emblem (white bg) blends seamlessly.
 */
export function Logo({ inverse = false, onClick }: { inverse?: boolean; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label={`${company.brandName} — home`}>
      <span
        className={`shrink-0 flex items-center justify-center rounded-full ${inverse ? 'bg-white/10 p-1' : ''}`}
      >
        <img
          src="/images/logo.png"
          alt={`${company.brandName} logo`}
          className="h-11 w-auto object-contain"
          style={{ maxWidth: '44px' }}
        />
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
