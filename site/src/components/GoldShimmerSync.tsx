/**
 * ===== GoldShimmerSync — единый «пульс» золотого перелива =====
 *
 * Одна GSAP-анимация двигает CSS-переменную --shimmer-pos на <html>.
 * Все золотые элементы (текст, кнопки, линии, SVG-обводки) читают
 * одну и ту же позицию градиента — переливаются синхронно, как единая
 * золотая поверхность на всём сайте.
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GoldShimmerSync() {
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const state = { pos: -0.4 }
    const globalGold = document.getElementById('globalGold')
    const fragGold = document.getElementById('fragGold')

    tweenRef.current = gsap.to(state, {
      pos: 1.4,
      duration: 5,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        const pct = `${state.pos * 100}%`
        document.documentElement.style.setProperty('--shimmer-pos', pct)

        // Двигаем SVG-градиенты синхронно с CSS
        if (globalGold) {
          globalGold.setAttribute('x1', String(state.pos - 0.3))
          globalGold.setAttribute('x2', String(state.pos + 0.7))
        }
        if (fragGold) {
          const shift = state.pos * 1440
          fragGold.setAttribute('x1', String(shift))
          fragGold.setAttribute('x2', String(shift + 1440))
        }
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  return null
}
