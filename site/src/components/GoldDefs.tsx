/**
 * ===== GoldDefs — общие SVG-градиенты для синхронного перелива =====
 * Один gradient id на всю страницу — GoldShimmerSync двигает его.
 */
export default function GoldDefs() {
  return (
    <svg className="gold-defs" aria-hidden="true">
      <defs>
        <linearGradient id="globalGold" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a6418" />
          <stop offset="25%" stopColor="#9a7b1e" />
          <stop offset="45%" stopColor="#f0d98c" />
          <stop offset="55%" stopColor="#e8c766" />
          <stop offset="75%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9a7b1e" />
        </linearGradient>
        <linearGradient id="fragGold" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
          <stop offset="0%" stopColor="#9a7b1e" />
          <stop offset="50%" stopColor="#f0d98c" />
          <stop offset="100%" stopColor="#9a7b1e" />
        </linearGradient>
      </defs>
    </svg>
  )
}
