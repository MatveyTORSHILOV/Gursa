/**
 * ===== Services — сетка услуг на тёмном фоне =====
 * Карточки с золотой обводкой-сотой, hover: подъём + свечение.
 * SVG-иконки инлайном (без emoji — чеклист ui-ux-pro-max).
 */
import { motion } from 'framer-motion'
import TiltCard from '../components/TiltCard'
import { SERVICES } from '../data/company'
import { asset } from '../utils/asset'

/* --- Мини-набор SVG-иконок под наши услуги --- */
const ICONS: Record<string, React.ReactNode> = {
  building: (
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1" />
  ),
  crane: (
    <path d="M3 21h18M6 21V9m0 0L18 4v5M18 21V9m-6 3v3m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  ),
  warehouse: (
    <path d="M3 21V9l9-5 9 5v12M7 21v-6h4v6m2-6h4v6h-4zM7 11h10" />
  ),
  checkpoint: (
    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4zM9 12l2 2 4-4" />
  ),
  grain: (
    <path d="M12 21V11m0 0C12 7 9 5 5 5c0 4 3 6 7 6zm0 0c0-4 3-6 7-6 0 4-3 6-7 6zM12 21c0-3-2-5-5-5 0 3 2 5 5 5zm0 0c0-3 2-5 5-5 0 3-2 5-5 5z" />
  ),
  'shield-search': (
    <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4zm-1 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2.5-.5L16 17" />
  ),
}

/* Каскад карточек при появлении */
const gridStagger = {
  whileInView: { transition: { staggerChildren: 0.08 } },
}
const cardRise = {
  initial: { y: 40, opacity: 0 },
  whileInView: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <span className="section-label">Что мы охраняем</span>
        <h2>
          Услуги <span className="gold-text">под ключ</span>
        </h2>
        <p className="services__lead">
          От экспертной оценки угроз до круглосуточного поста охраны — любые
          варианты проектов: от экономичных до высокобюджетных.
        </p>

        <motion.div
          className="services__grid"
          variants={gridStagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={cardRise}>
              {/* Карточку можно «вертеть» курсором — как визитку в контактах */}
              <TiltCard className="service-card" maxTilt={9}>
                <article
                  className="service-card__inner"
                  style={{ backgroundImage: `url(${asset(service.bg)})` }}
                >
                  <div className="service-card__shade" aria-hidden="true" />
                  <div className="service-card__body">
                  <div className="service-card__icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {ICONS[service.icon]}
                    </svg>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  </div>
                </article>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
