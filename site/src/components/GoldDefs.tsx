/**
 * ===== GoldDefs — общие SVG-градиенты для синхронного перелива =====
 * spreadMethod="repeat" + одинаковый первый/последний цвет
 * = бесшовный бесконечный сдвиг.
 */
export default function GoldDefs() {
  return (
    <svg className="gold-defs" aria-hidden="true">
      <defs>
        <linearGradient
          id="globalGold"
          gradientUnits="objectBoundingBox"
          spreadMethod="repeat"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#9a7b1e" />
          <stop offset="30%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f0d98c" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7b1e" />
        </linearGradient>
        <linearGradient
          id="fragGold"
          gradientUnits="userSpaceOnUse"
          spreadMethod="repeat"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
        >
          <stop offset="0%" stopColor="#9a7b1e" />
          <stop offset="50%" stopColor="#f0d98c" />
          <stop offset="100%" stopColor="#9a7b1e" />
        </linearGradient>
      </defs>
    </svg>
  )
}
