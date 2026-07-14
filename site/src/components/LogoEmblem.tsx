/**
 * ===== LogoEmblem — фирменная эмблема: гравюрная змея в золотой соте =====
 *
 * Использует сгенерированный логотип (public/logo/*.webp), максимально
 * близкий к оригинальной эмблеме с визитки: белая гравюрная гюрза
 * в атакующей позе внутри двойного золотого шестиугольника.
 *
 * Эффекты: плавное появление, «парение» вверх-вниз, золотое свечение,
 * подпись «Гюрза» рукописным шрифтом (как на фирменной продукции).
 */
import { motion } from 'framer-motion'

type Props = {
  /** Ширина эмблемы в px */
  size?: number
  /** Показывать ли рукописную подпись «Гюрза» под змеёй */
  withCaption?: boolean
  /** Включить бесконечное «парение» */
  floating?: boolean
}

export default function LogoEmblem({ size = 320, withCaption = true, floating = true }: Props) {
  return (
    <motion.figure
      className="logo-emblem"
      style={{ width: size }}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Обёртка с парением: медленное движение вверх-вниз */}
      <motion.div
        className="logo-emblem__img-wrap"
        animate={floating ? { y: [0, -10, 0] } : undefined}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
      >
        {/* Пульсирующее золотое свечение позади соты */}
        <motion.span
          className="logo-emblem__glow"
          aria-hidden="true"
          animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <img
          src={size > 400 ? '/logo/gyurza-emblem.webp' : '/logo/gyurza-emblem-512.webp'}
          alt="Эмблема ЧОО «Гюрза» — змея в золотом шестиграннике"
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
        />
      </motion.div>

      {withCaption && (
        <figcaption className="logo-emblem__caption" aria-hidden="true">
          Гюрза
        </figcaption>
      )}
    </motion.figure>
  )
}
