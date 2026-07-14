/**
 * ===== TiltCard — переиспользуемый 3D-наклон за курсором =====
 * Та же механика, что у визитки в контактах: карточка плавно
 * наклоняется вслед за мышью (spring-сглаживание).
 */
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
  children: React.ReactNode
  className?: string
  /** Максимальный угол наклона, градусы */
  maxTilt?: number
}

export default function TiltCard({ children, className, maxTilt = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 22,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 22,
  })

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
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
      <motion.div ref={ref} className={className} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}
