/**
 * ===== LogoEmblem — обёртка над GyurzaLogo с парением и свечением =====
 */
import { motion } from 'framer-motion'
import GyurzaLogo from './GyurzaLogo'

type Props = {
  size?: number
  variant?: 'full' | 'icon'
  floating?: boolean
}

export default function LogoEmblem({ size = 320, variant = 'full', floating = true }: Props) {
  return (
    <motion.figure
      className="logo-emblem"
      style={{ width: size }}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="logo-emblem__wrap"
        animate={floating ? { y: [0, -10, 0] } : undefined}
        transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
      >
        <motion.span
          className="logo-emblem__glow"
          aria-hidden="true"
          animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        />
        <GyurzaLogo size={size} variant={variant} />
      </motion.div>
    </motion.figure>
  )
}
