import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import type { ImageKey } from '../data/images'
import { Photo } from './Photo'

export interface Crumb {
  label: string
  to?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-muted">
        {items.map((c, i) => (
          <li key={c.label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 text-line-strong" />}
            {c.to ? (
              <Link to={c.to} className="hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Inner-page header: breadcrumb, title, intro and an optional photo band. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  crumbs: Crumb[]
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  image?: ImageKey
  children?: ReactNode
}) {
  return (
    <section className="relative border-b border-line bg-mist">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
      <div className={`container-site relative grid gap-10 py-12 sm:py-16 ${image ? 'lg:grid-cols-[1.1fr_0.9fr] lg:items-end' : ''}`}>
        <div>
          <Breadcrumbs items={crumbs} />
          {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && <Photo image={image} priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[16/10] w-full lg:aspect-[4/3]" />}
      </div>
    </section>
  )
}
