import { m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Subtle fade-up on first scroll into view. Disabled for reduced-motion users. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const reduce = useReducedMotion()
  const Comp = m[as]
  if (reduce) return <Comp className={className}>{children}</Comp>
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  )
}
