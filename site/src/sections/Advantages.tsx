/**
 * ===== Advantages — цифры-факты с GSAP-анимацией =====
 * Паттерн Trust & Authority: метрики как доказательство надёжности.
 * Числа «доезжают» до значения при скролле (GSAP ScrollTrigger).
 */
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ADVANTAGES } from '../data/company'
import HoneycombFragments from '../components/HoneycombFragments'

gsap.registerPlugin(ScrollTrigger)

export default function Advantages() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Карточки выплывают снизу с каскадом
      gsap.from('.advantage', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })

      // Золотая полоса-разделитель растягивается на всю ширину
      gsap.from('.advantages__rule', {
        scaleX: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="advantages section--light" id="advantages" ref={sectionRef}>
      <HoneycombFragments />
      <div className="container">
        <span className="section-label">Почему мы</span>
        <h2>
          Сотрудничая с нами, <span className="gold-text">вы получаете</span>
        </h2>

        <div className="advantages__rule" aria-hidden="true" />

        <div className="advantages__grid">
          {ADVANTAGES.map((item) => (
            <div className="advantage" key={item.label}>
              <span className="advantage__value gold-text">{item.value}</span>
              <span className="advantage__label">{item.label}</span>
            </div>
          ))}
        </div>

        <ul className="advantages__list">
          <li>Специалисты высокого класса, имеющие большой опыт работы</li>
          <li>Аккуратность исполнения и высокое качество работ</li>
          <li>Экспертная оценка объекта и анализ потенциальных угроз</li>
          <li>Консультации профессионалов на каждом этапе</li>
        </ul>
      </div>
    </section>
  )
}
