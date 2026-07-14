/**
 * ===== Hero — первый экран с 3D-сотами =====
 * Фон: HexField3D (дышащие соты). Поверх — заголовок, CTA
 * и золотая вертикальная полоса как на фирменной папке.
 */
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import LogoEmblem from '../components/LogoEmblem'
import { COMPANY } from '../data/company'

// 3D-сцена грузится лениво: не блокирует первую отрисовку (80/20 по скорости)
const HexField3D = lazy(() => import('../components/HexField3D'))

/* Каскадное появление строк заголовка */
const parentStagger = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const fadeUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* --- 3D-фон --- */}
      <Suspense fallback={null}>
        <HexField3D />
      </Suspense>

      {/* Градиентная вуаль: затемняет соты под текстом, контраст 4.5:1+ */}
      <div className="hero__veil" aria-hidden="true" />

      {/* --- Контент --- */}
      <motion.div className="container hero__content" variants={parentStagger} initial="initial" animate="animate">
        <motion.p className="hero__kicker" variants={fadeUp}>
          Частная охранная организация · с {COMPANY.foundedYear} года
        </motion.p>

        <motion.h1 variants={fadeUp}>
          <span className="gold-text">{COMPANY.name}</span>
          <br />
          Безопасность, проверенная временем
        </motion.h1>

        <motion.p className="hero__subtitle" variants={fadeUp}>
          Охрана административных зданий, строительных объектов, складов и
          агропредприятий в Воронеже и Воронежской области.
        </motion.p>

        <motion.div className="hero__actions" variants={fadeUp}>
          <a href="#contacts" className="btn btn--gold">
            Получить консультацию
          </a>
          <a href="#services" className="btn btn--ghost">
            Наши услуги
          </a>
        </motion.div>
      </motion.div>

      {/* --- Эмблема со змеёй справа (скрыта на мобильных) --- */}
      <motion.div
        className="hero__emblem"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <LogoEmblem size={430} variant="icon" />
      </motion.div>
    </section>
  )
}
