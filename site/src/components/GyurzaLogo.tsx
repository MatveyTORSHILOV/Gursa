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
      <svg className="gyurza-logo__frame" viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <motion.path
          className="gold-stroke"
          d="M100 4 L182 53 L182 147 L100 196 L18 147 L18 53 Z"
          stroke="url(#globalGold)"
          strokeWidth="4"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="12"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <path
          d="M100 15 L171 59 L171 141 L100 185 L29 141 L29 59 Z"
          stroke="url(#globalGold)"
          strokeWidth="1.25"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="12"
          opacity="0.5"
        />
      </svg>

      {/* Золото-чёрная змея (прозрачный PNG) */}
      <img
        className="gyurza-logo__snake"
        src={
          size > 160
            ? asset('logo/snake-gold-premium1.webp')
            : asset('logo/snake-gold-premium1-small.webp')
        }
        alt=""
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  )
}
