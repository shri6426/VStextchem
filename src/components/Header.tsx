import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { Logo } from './Logo'
import { ButtonLink } from './ui'
import { company } from '../data/company'
import { telHref } from '../utils/contact'

export const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/industries', label: 'Industries' },
  { to: '/products', label: 'Products' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-sm transition-shadow ${
        scrolled ? 'border-line shadow-[0_1px_12px_rgb(32_37_34/0.06)]' : 'border-transparent'
      }`}
    >
      {/* Utility bar */}
      <div className="hidden border-b border-line bg-mist text-xs text-muted md:block">
        <div className="container-site flex h-9 items-center justify-between">
          <span>Specialty chemical manufacturer · Tiruppur, Tamil Nadu</span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${company.emails[0]}`} className="link-underline hover:text-ink">
              {company.emails[0]}
            </a>
            <a href={telHref(company.phones[0].e164)} className="inline-flex items-center gap-1.5 hover:text-ink">
              <Phone aria-hidden className="size-3.5" /> +91 {company.phones[0].display}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `relative block px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-ink after:absolute after:inset-x-3 after:-bottom-[1.05rem] after:h-0.5 after:bg-accent'
                        : 'text-muted hover:text-ink'
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink to="/contact#enquiry" className="hidden sm:inline-flex">
            Send Enquiry
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-[var(--radius-sm)] border border-line text-ink lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site py-4">
              <ul className="divide-y divide-line">
                {navItems.map((n) => (
                  <li key={n.to}>
                    <NavLink
                      to={n.to}
                      end={n.end}
                      className={({ isActive }) =>
                        `flex min-h-14 items-center justify-between text-lg font-semibold ${isActive ? 'text-accent' : 'text-ink'}`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-3">
                <ButtonLink to="/contact#enquiry">Send Enquiry</ButtonLink>
                <a href={telHref(company.phones[0].e164)} className="flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-line text-sm font-semibold">
                  <Phone aria-hidden className="size-4" /> Call +91 {company.phones[0].display}
                </a>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
