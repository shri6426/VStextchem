/** Builds a resized URL for Unsplash images; leaves local images untouched. */
export function sized(src: string, width: number, quality = 70) {
  if (!src.startsWith('https://images.unsplash.com/')) return src
  const base = src.split('?')[0]
  return `${base}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** srcset for responsive loading — phones on slower networks get small files. */
export function srcSet(src: string, widths = [480, 800, 1200, 1800]) {
  if (!src.startsWith('https://images.unsplash.com/')) return undefined
  return widths.map((w) => `${sized(src, w)} ${w}w`).join(', ')
}
