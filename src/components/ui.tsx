import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse'

const base =
  'group inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-5 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-dark',
  secondary: 'border border-ink/80 text-ink hover:bg-ink hover:text-white',
  ghost: 'px-0 text-ink hover:text-accent',
  inverse: 'bg-white text-ink hover:bg-mist',
}

export const buttonClass = (variant: Variant = 'primary', extra = '') => `${base} ${variants[variant]} ${extra}`

export function ButtonLink({
  to,
  variant = 'primary',
  arrow,
  children,
  className = '',
  ...rest
}: { to: string; variant?: Variant; arrow?: boolean; children: ReactNode } & Omit<ComponentProps<typeof Link>, 'to'>) {
  return (
    <Link to={to} className={buttonClass(variant, className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />}
    </Link>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  id,
  as: As = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  id?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <As id={id} className="text-3xl font-bold leading-[1.15] text-ink sm:text-4xl">
        {title}
      </As>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  )
}

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-flex items-center rounded-[var(--radius-sm)] px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider ${
        tone === 'accent' ? 'bg-accent-tint text-accent-dark' : 'bg-mist text-ink-soft'
      }`}
    >
      {children}
    </span>
  )
}
