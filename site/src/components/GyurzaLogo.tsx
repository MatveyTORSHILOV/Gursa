/**
 * ===== GyurzaLogo — эмблема: золото-чёрная змея в золотой соте =====
 *
 * Змея — трафаретный стиль с визитки, перекрашена в золото,
 * фон прозрачный. Сота — SVG-обводка с синхронным переливом.
 * Подпись «Гюрза» — только в variant="full" (блок «О компании»).
 */
import { motion } from 'framer-motion'
import { asset } from '../utils/asset'

type Props = {
  size?: number
  /** full — с подписью «Гюрза», icon — только змея в соте */
  variant?: 'full' | 'icon'
  animated?: boolean
}

export default function GyurzaLogo({ size = 200, variant = 'icon', animated = true }: Props) {
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
          d="M100 8 L180 54 L180 146 L100 192 L20 146 L20 54 Z"
          stroke="url(#globalGold)"
          strokeWidth="3.5"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <path
          d="M100 19 L170 60 L170 140 L100 181 L30 140 L30 60 Z"
          stroke="url(#globalGold)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      {/* Золото-чёрная змея (прозрачный PNG) */}
      <img
        className="gyurza-logo__snake"
        src={size > 160 ? asset('logo/snake-gold.webp') : asset('logo/snake-gold-small.webp')}
        alt=""
        loading="lazy"
        decoding="async"
      />

      {/* Рукописная подпись — только в блоке «О компании» */}
      {variant === 'full' && (
        <span className="gyurza-logo__script" aria-hidden="true">
          Гюрза
        </span>
      )}
    </motion.div>
  )
}
