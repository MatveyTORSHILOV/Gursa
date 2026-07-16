/**
 * ===== GyurzaLogo — эмблема: золото-чёрная змея в золотой соте =====
 */
import { motion } from 'framer-motion'
import { asset } from '../utils/asset'

type Props = {
  size?: number
  animated?: boolean
}

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
      {/* Золотая сота — переливается синхронно со всем сайтом */}
      <svg
        className="gyurza-logo__frame"
        viewBox="-6 -6 212 212"
        fill="none"
        overflow="visible"
        aria-hidden="true"
      >
        <motion.path
          className="gold-stroke"
          d="M100 -2 L189 49 L189 151 L100 202 L11 151 L11 49 Z"
          stroke="url(#globalGold)"
          strokeWidth="4"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="20"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <path
          d="M100 10 L178 56 L178 144 L100 190 L22 144 L22 56 Z"
          stroke="url(#globalGold)"
          strokeWidth="1.25"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeMiterlimit="20"
          opacity="0.5"
        />
      </svg>

      {/* Золото-чёрная змея (прозрачный PNG) */}
      <img
        className="gyurza-logo__snake"
        src={
          size > 160
            ? asset('logo/snake-gold-premium-super.webp')
            : asset('logo/snake-gold-premium-super-small.webp')
        }
        alt=""
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  )
}
