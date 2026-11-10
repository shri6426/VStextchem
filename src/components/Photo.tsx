import { useState } from 'react'
import type { SiteImage } from '../data/types'
import { images, type ImageKey } from '../data/images'
import { sized, srcSet } from '../utils/image'

const toneBg: Record<NonNullable<SiteImage['tone']>, string> = {
  ink: 'from-[#2b302d] to-[#202522]',
  slate: 'from-[#5b6662] to-[#3c4542]',
  clay: 'from-[#b88a76] to-[#8b5c4c]',
  stone: 'from-[#c9cbc4] to-[#a7aaa2]',
  moss: 'from-[#7d8b62] to-[#55623f]',
}

/**
 * Responsive photo with lazy loading and a graceful fallback panel.
 * `priority` loads eagerly (use for the hero only).
 */
export function Photo({
  image,
  className = '',
  sizes = '100vw',
  priority = false,
  width = 1200,
}: {
  image: ImageKey | SiteImage
  className?: string
  sizes?: string
  priority?: boolean
  width?: number
}) {
  const img: SiteImage = typeof image === 'string' ? images[image] : image
  const [failed, setFailed] = useState(false)
  const tone = toneBg[img.tone ?? 'stone']

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${tone} ${className}`}>
      {failed ? (
        <div role="img" aria-label={img.alt} className="bg-grid absolute inset-0 opacity-60" />
      ) : (
        <img
          src={sized(img.src, width)}
          srcSet={srcSet(img.src)}
          sizes={sizes}
          alt={img.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </div>
  )
}
