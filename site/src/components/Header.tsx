/**
 * ===== Header — фиксированная шапка со стеклянным блюром =====
 * Появляется плавно сверху, на скролле уплотняется (glassmorphism).
 */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GyurzaLogo from './GyurzaLogo'
import { COMPANY } from '../data/company'

/* Пункты навигации: якоря на секции */
const NAV_ITEMS = [
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  // Следим за скроллом, чтобы уплотнить шапку
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container header__inner">
        {/* Логотип: мини-сота + название */}
        <a href="#top" className="header__logo" aria-label="ГЮРЗА — на главную">
          <GyurzaLogo size={42} variant="icon" animated={false} />
          <span>
            <b className="gold-text">{COMPANY.name}</b>
            <small>{COMPANY.tagline}</small>
          </span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA — телефон, главное целевое действие (паттерн Trust & Authority) */}
        <a href={COMPANY.phones[0].href} className="header__cta">
          {COMPANY.phones[0].value}
        </a>
      </div>
    </motion.header>
  )
}
