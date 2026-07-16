/**
 * ===== GyurzaLogo — эмблема: золото-чёрная змея в золотой соте =====
 */
import { motion } from 'framer-motion'
import { asset } from '../utils/asset'

type Props = {
  size?: number
  animated?: boolean
}

const CX = 100
const CY = 100

/** Вершина сверху — ровный шестиугольник без stroke-выпираний в углах */
function hexPath(cx: number, cy: number, radius: number): string {
  const points = [90, 30, -30, -90, -150, 150].map((deg) => {
    const rad = (deg * Math.PI) / 180
    return `${(cx + radius * Math.cos(rad)).toFixed(2)} ${(cy - radius * Math.sin(rad)).toFixed(2)}`
  })
  return `M${points[0]} L${points.slice(1).join(' L')} Z`
}

function hexRing(cx: number, cy: number, outerR: number, innerR: number): string {
  return `${hexPath(cx, cy, outerR)} ${hexPath(cx, cy, innerR)}`
}

const OUTER_RING = hexRing(CX, CY, 102, 98)
const INNER_RING = hexRing(CX, CY, 90, 88.75)

export default function GyurzaLogo({ size = 200, animated = true }: Props) {
  return (
    <motion.div
      className="gyurza-logo"
      style={{ width: size, height: size }}
      role="img"
      aria-label="ЧОО Гюрза — змея в золотом шестиграннике"
      initial={animated ? { opacity: 0, scale: 0.94 } : undefined}
      whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Золотая сота — цельные кольца (fill), без stroke-стыков в вершине */}
      <svg
        className="gyurza-logo__frame"
        viewBox="-6 -6 212 212"
        fill="none"
        overflow="visible"
        aria-hidden="true"
      >
        <motion.path
          className="gold-stroke"
          d={OUTER_RING}
          fill="url(#globalGold)"
          fillRule="evenodd"
          initial={animated ? { opacity: 0 } : undefined}
          whileInView={animated ? { opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <path
          d={INNER_RING}
          fill="url(#globalGold)"
          fillRule="evenodd"
          opacity="0.5"
        />
      </svg>

      {/* Золото-чёрная змея (прозрачный PNG) */}
      <img
        className="gyurza-logo__snake"
        src={
          size > 160
            ? asset('logo/snake-gold-premium-super-puper.webp')
            : asset('logo/snake-gold-premium-super-puper-small.webp')
        }
        alt=""
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  )
}
