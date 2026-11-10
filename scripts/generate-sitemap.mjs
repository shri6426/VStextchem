// Generates dist/sitemap.xml and dist/robots.txt from the product and industry data.
// Runs automatically after `npm run build`. Set VITE_SITE_URL to the production domain.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const env = existsSync('.env') ? readFileSync('.env', 'utf8') : ''
const fromFile = env.match(/^VITE_SITE_URL=(.*)$/m)?.[1]?.trim()
const site = (process.env.VITE_SITE_URL || fromFile || 'https://www.example.com').replace(/\/$/, '')

const ids = (file, re) => [...readFileSync(file, 'utf8').matchAll(re)].map((m) => m[1])
const productIds = ids('src/data/products.ts', /\bid: '([a-z0-9-]+)'/g)
const industryIds = ids('src/data/industries.ts', /\bid: '([a-z]+)',\s*\n\s*name:[^\n]*\n\s*shortName:[^\n]*\n\s*primary: true/g)

const paths = ['/', '/about', '/industries', '/products', '/capabilities', '/contact',
  ...industryIds.map((i) => `/industries/${i}`), ...productIds.map((p) => `/products/${p}`)]
const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`
writeFileSync('dist/sitemap.xml', xml)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
if (site.includes('example.com')) console.warn('⚠ sitemap: VITE_SITE_URL not set — using placeholder domain.')
console.log(`sitemap: ${paths.length} URLs (${industryIds.length} industries, ${productIds.length} products)`)
