/**
 * ===== Contacts — контакты + 3D-визитка =====
 * Слева: реквизиты (адрес, телефоны, почта, директор).
 * Справа: интерактивная «визитка» — наклоняется за курсором (3D tilt
 * на framer-motion), оформлена в стиле реальной визитки компании.
 */
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import GyurzaLogo from '../components/GyurzaLogo'
import { COMPANY } from '../data/company'

/** Интерактивная визитка с эффектом наклона за курсором */
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  // Позиция курсора относительно центра карточки → углы наклона
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  // spring сглаживает движение — карточка «доплывает» плавно
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 })

  const handleMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div className="tilt-scene" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div
        ref={cardRef}
        className="business-card"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Шапка визитки: эмблема + название */}
        <div className="business-card__head">
          <GyurzaLogo size={76} variant="icon" animated={false} />
          <div>
            <b className="gold-text">{COMPANY.name}</b>
            <small>{COMPANY.tagline}</small>
          </div>
        </div>

        {/* ФИО и должность директора */}
        <div className="business-card__person">
          <strong>{COMPANY.director.name}</strong>
          <span>{COMPANY.director.position}</span>
        </div>

        {/* Реквизиты */}
        <address className="business-card__details">
          <span>{COMPANY.address.full}</span>
          {COMPANY.phones.map((phone) => (
            <a key={phone.href} href={phone.href}>
              {phone.value}
            </a>
          ))}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </address>

        {/* Декоративный блик, движется вместе с наклоном */}
        <div className="business-card__shine" aria-hidden="true" />
      </motion.div>
    </div>
  )
}

export default function Contacts() {
  return (
    <section className="contacts" id="contacts">
      <div className="container contacts__grid">
        {/* --- Левая колонка: реквизиты --- */}
        <div className="contacts__info">
          <span className="section-label">Контакты</span>
          <h2>
            Обсудим охрану <span className="gold-text">вашего объекта?</span>
          </h2>
          <p>
            Позвоните или напишите — проведём экспертную оценку объекта и
            предложим оптимальный вариант охраны под ваш бюджет.
          </p>

          <ul className="contacts__list">
            <li>
              <span className="contacts__label">Адрес</span>
              <span>{COMPANY.address.full}</span>
            </li>
            <li>
              <span className="contacts__label">Телефоны</span>
              <span>
                {COMPANY.phones.map((phone) => (
                  <a key={phone.href} href={phone.href} className="contacts__link">
                    {phone.value}
                  </a>
                ))}
              </span>
            </li>
            <li>
              <span className="contacts__label">E-mail</span>
              <a href={`mailto:${COMPANY.email}`} className="contacts__link">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <span className="contacts__label">Режим работы</span>
              <span>Охрана объектов — круглосуточно, 24/7</span>
            </li>
          </ul>

          <a href={COMPANY.phones[0].href} className="btn btn--gold">
            Позвонить сейчас
          </a>
        </div>

        {/* --- Правая колонка: 3D-визитка --- */}
        <TiltCard />
      </div>
    </section>
  )
}
