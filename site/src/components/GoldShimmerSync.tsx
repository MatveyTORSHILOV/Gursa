/**
 * ===== GoldShimmerSync — единый бесшовный «пульс» золота =====
 *
 * Градиенты циклические (первый цвет == последний), поэтому сдвиг
 * ровно на один период (200% при background-size:200%) даёт идеально
 * бесшовный вечный цикл — без видимого «перезапуска».
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function GoldShimmerSync() {
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const state = { pos: 0 }
    const globalGold = document.getElementById('globalGold')
    const fragGold = document.getElementById('fragGold')

    tweenRef.current = gsap.to(state, {
      pos: 1,
      duration: 6,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        // CSS: сдвиг на полный тайл (200% при size 200%) за цикл
        document.documentElement.style.setProperty('--shimmer-pos', `${state.pos * 200}%`)

        // SVG: сдвиг координат на один период, spreadMethod="repeat" зашивает шов
        if (globalGold) {
          globalGold.setAttribute('x1', String(state.pos))
          globalGold.setAttribute('x2', String(state.pos + 1))
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
