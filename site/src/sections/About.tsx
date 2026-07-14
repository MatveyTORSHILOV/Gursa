/**
 * ===== About — «О компании»: белая секция с эмблемой-змеёй =====
 * Контент из фирменного буклета. Появление блоков — GSAP ScrollTrigger.
 */
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LogoEmblem from '../components/LogoEmblem'
import HoneycombFragments from '../components/HoneycombFragments'
import { COMPANY } from '../data/company'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  // GSAP: текстовые блоки въезжают по очереди при входе секции во вьюпорт
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about__col > *', {
        y: 36,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="about section--light" id="about" ref={sectionRef}>
      <HoneycombFragments />
      <div className="container about__grid">
        {/* --- Левая колонка: текст --- */}
        <div className="about__col">
          <span className="section-label">О компании</span>
          <h2>
            Работаем с {COMPANY.foundedYear} года — и знаем цену{' '}
            <span className="gold-text">доверию</span>
          </h2>
          <p>
            {COMPANY.fullName} создано в {COMPANY.foundedYear} году и
            предоставляет качественные охранные услуги по доступным ценам —
            физическим и юридическим лицам, как на разовой основе, так и по
            длительному договору.
          </p>
          <p>
            Сфера деятельности охватывает Воронеж и Воронежскую область: административные
            здания, строительные объекты, складские помещения, организация
            контрольно-пропускного и внутриобъектового режима.
          </p>
          <p>
            Одно из ключевых преимуществ — специализация на охране{' '}
            <strong>
              сельскохозяйственных предприятий и баз по приёмке, подработке,
              хранению и отпуску зерновой и масличной продукции
            </strong>
            .
          </p>
        </div>

        {/* --- Правая колонка: фирменная эмблема со змеёй --- */}
        <div className="about__emblem">
          <LogoEmblem size={320} />
          <p className="about__emblem-caption">
            Гюрза — символ молниеносной реакции и абсолютного контроля территории
          </p>
        </div>
      </div>
    </section>
  )
}
