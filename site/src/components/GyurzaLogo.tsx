/**
 * ===== GyurzaLogo — эмблема как на визитке =====
 *
 * Детальная гравюрная змея (растр) + золотая сота с синхронным
 * переливом (SVG-обводка url(#globalGold)) + подпись «Гюрза».
 */
import { motion } from 'framer-motion'
import { useId } from 'react'

type Props = {
  size?: number
  variant?: 'full' | 'icon'
  animated?: boolean
}

export default function GyurzaLogo({ size = 200, variant = 'full', animated = true }: Props) {
  const maskId = useId().replace(/:/g, '')
  const h = size * (variant === 'full' ? 1.12 : 1)

  return (
    <motion.div
      className="gyurza-logo"
      style={{ width: size, height: h }}
      role="img"
      aria-label="ЧОО Гюрза — змея в золотом шестиграннике"
      initial={animated ? { opacity: 0, scale: 0.94 } : undefined}
      whileInView={animated ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Гравюрная змея — детальная, как на фото визитки */}
      <img
        className="gyurza-logo__snake"
        src={size > 120 ? '/logo/gyurza-emblem.webp' : '/logo/gyurza-emblem-512.webp'}
        alt=""
        width={size}
        height={h}
        loading="lazy"
        decoding="async"
      />

      {/* Золотая сота поверх — переливается синхронно со всем сайтом */}
      <svg className="gyurza-logo__frame" viewBox="0 0 200 224" fill="none" aria-hidden="true">
        <defs>
          <clipPath id={maskId}>
            <path d="M100 10 L178 55 L178 145 L100 190 L22 145 L22 55 Z" />
          </clipPath>
        </defs>
        <motion.path
          className="gold-stroke"
          d="M100 10 L178 55 L178 145 L100 190 L22 145 L22 55 Z"
          stroke="url(#globalGold)"
          strokeWidth="3.5"
          initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
          whileInView={animated ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <path
          d="M100 22 L166 58 L166 142 L100 178 L34 142 L34 58 Z"
          stroke="url(#globalGold)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      {/* Рукописная подпись внутри соты (full) */}
      {variant === 'full' && (
        <span className="gyurza-logo__script" aria-hidden="true">
          Гюрза
        </span>
      )}
    </motion.div>
  )
}
