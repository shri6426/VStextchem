import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { company, siteUrl } from '../data/company'

interface SeoOptions {
  title: string
  description: string
  /** Absolute or root-relative image for social previews */
  image?: string
  /** JSON-LD objects for this page */
  jsonLd?: object | object[]
  noindex?: boolean
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Sets title, description, Open Graph tags, canonical URL and JSON-LD per page.
 * Canonical URLs are only emitted once VITE_SITE_URL (the production domain) is set.
 */
export function useSeo({ title, description, image, jsonLd, noindex }: SeoOptions) {
  const { pathname } = useLocation()
  const ld = JSON.stringify(jsonLd ?? null)

  useEffect(() => {
    const fullTitle = title.includes(company.brandName) ? title : `${title} | ${company.brandName}`
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow')
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', company.brandName)
    setMeta('name', 'twitter:card', 'summary_large_image')
    const url = siteUrl ? `${siteUrl}${pathname === '/' ? '/' : pathname}` : null
    if (url) setMeta('property', 'og:url', url)
    setLink('canonical', url)
    if (image) setMeta('property', 'og:image', image.startsWith('http') ? image : `${siteUrl}${image}`)

    document.head.querySelectorAll('script[data-seo-ld]').forEach((s) => s.remove())
    const parsed = JSON.parse(ld) as object | object[] | null
    if (parsed) {
      for (const obj of Array.isArray(parsed) ? parsed : [parsed]) {
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.dataset.seoLd = ''
        s.textContent = JSON.stringify(obj)
        document.head.appendChild(s)
      }
    }
  }, [title, description, image, ld, noindex, pathname])
}

/** Organization / LocalBusiness structured data, built from company.ts */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: company.brandName,
    description: company.shortDescription,
    ...(siteUrl ? { url: siteUrl } : {}),
    email: company.emails[0],
    telephone: `+${company.phones[0].e164}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.location.lines.join(', '),
      addressLocality: company.location.city,
      addressRegion: company.location.state,
      postalCode: company.location.postalCode,
      addressCountry: 'IN',
    },
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(siteUrl ? { item: `${siteUrl}${it.path}` } : {}),
    })),
  }
}
