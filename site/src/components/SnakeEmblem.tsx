/**
 * ===== SnakeEmblem — фирменная эмблема: змея в золотой соте =====
 *
 * Стилизованная SVG-версия логотипа с визитки (змея гюрза в шестиграннике).
 * Змея нарисована плавной S-образной кривой с головой и языком,
 * контур анимируется отрисовкой (stroke-dashoffset через framer-motion).
 *
 * Если появится оригинальный вектор/фото логотипа — просто заменить
 * этот компонент на <img>, интерфейс останется тем же.
 */
import { motion } from 'framer-motion'

type Props = {
  /** Размер стороны квадрата, в который вписана эмблема */
  size?: number
  /** Анимировать ли отрисовку контура при появлении */
  animated?: boolean
}

export default function SnakeEmblem({ size = 180, animated = true }: Props) {
  // Параметры анимации «отрисовки» контура
  const draw = animated
    ? {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true },
      }
    : {}

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      role="img"
      aria-label="Эмблема ЧОО Гюрза — змея в шестиграннике"
      initial={animated ? { scale: 0.9, opacity: 0 } : undefined}
      whileInView={animated ? { scale: 1, opacity: 1 } : undefined}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a7b1e" />
          <stop offset="45%" stopColor="#d4af37" />
          <stop offset="55%" stopColor="#f0d98c" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>
      </defs>

      {/* --- Внешняя сота (двойной контур, как на папке) --- */}
      <motion.path
        d="M100 6 L180 52 L180 148 L100 194 L20 148 L20 52 Z"
        stroke="url(#goldGrad)"
        strokeWidth="3.5"
        {...draw}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />
      <path
        d="M100 20 L168 59 L168 141 L100 180 L32 141 L32 59 Z"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        opacity="0.45"
      />

      {/* --- Змея: S-образное тело --- */}
      <motion.path
        d="M138 58
           C 150 66, 150 80, 138 88
           C 120 100, 82 92, 66 104
           C 52 115, 54 132, 68 140
           C 84 149, 108 147, 122 138"
        stroke="url(#goldGrad)"
        strokeWidth="9"
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeInOut' }}
      />

      {/* --- Голова змеи (атакующая поза, как у гюрзы на логотипе) --- */}
      <motion.g
        initial={animated ? { opacity: 0 } : undefined}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        {/* Череп — треугольная форма гадюки */}
        <path
          d="M122 138 C 128 134, 138 133, 144 138 C 150 143, 150 152, 143 156 C 135 161, 124 158, 120 151 C 117 146, 118 141, 122 138 Z"
          fill="url(#goldGrad)"
        />
        {/* Глаз */}
        <circle cx="136" cy="145" r="2.6" fill="#0a0d12" />
        {/* Раздвоенный язык */}
        <path
          d="M144 152 L158 158 M158 158 L164 154 M158 158 L162 164"
          stroke="url(#goldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.g>

      {/* --- Хвост с характерным кончиком --- */}
      <motion.path
        d="M138 58 C 134 50, 126 46, 118 48"
        stroke="url(#goldGrad)"
        strokeWidth="5"
        strokeLinecap="round"
        {...draw}
        transition={{ duration: 0.6, delay: 1.9, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}
