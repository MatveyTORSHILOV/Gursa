/**
 * ===== HexField3D — «дышащие» 3D-соты (React Three Fiber) =====
 *
 * Фон hero-секции: поле шестигранных призм, которые волной уходят
 * вглубь и выступают наружу (та самая анимация сот с фирменной папки).
 * Реализация через InstancedMesh — сотни сот за один draw call,
 * поэтому работает быстро даже на слабых машинах.
 */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* --- Параметры поля сот --- */
const HEX_RADIUS = 0.52      // радиус одной соты
const GAP = 1.06             // множитель расстояния между сотами
const COLS = 26              // колонок
const ROWS = 16              // строк

/** Считаем позиции сот в гексагональной сетке (со смещением чётных рядов) */
function useHexGrid() {
  return useMemo(() => {
    const positions: { x: number; y: number; seed: number }[] = []
    const w = HEX_RADIUS * Math.sqrt(3) * GAP   // ширина ячейки
    const h = HEX_RADIUS * 1.5 * GAP            // высота ряда

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const offsetX = row % 2 === 0 ? 0 : w / 2
        positions.push({
          x: (col - COLS / 2) * w + offsetX,
          y: (row - ROWS / 2) * h,
          seed: Math.random() * Math.PI * 2, // фазовый сдвиг для «живости» волны
        })
      }
    }
    return positions
  }, [])
}

/** Само инстансированное поле сот с волновой анимацией */
function HexInstances() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const grid = useHexGrid()
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Геометрия: шестигранная призма (цилиндр с 6 сегментами)
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(HEX_RADIUS, HEX_RADIUS, 0.5, 6)
    geo.rotateX(Math.PI / 2) // кладём призму «лицом» к камере
    return geo
  }, [])

  useFrame(({ clock, pointer }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()

    grid.forEach((cell, i) => {
      // Волна: комбинация двух синусоид даёт органичное движение вглубь/наружу
      const wave =
        Math.sin(t * 0.7 + cell.x * 0.45 + cell.seed * 0.25) * 0.35 +
        Math.sin(t * 0.4 + cell.y * 0.6) * 0.25

      // Лёгкий параллакс от курсора — соты «тянутся» к мыши
      const mouseInfluence =
        Math.max(0, 1 - Math.hypot(cell.x - pointer.x * 8, cell.y - pointer.y * 4) / 4) * 0.6

      dummy.position.set(cell.x, cell.y, wave + mouseInfluence)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true

    // Медленный дрейф всего поля — сцена не выглядит статичной
    mesh.rotation.z = Math.sin(t * 0.05) * 0.03
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, grid.length]}>
      {/* Тёмный материал с лёгким металлическим отблеском — золото даёт свет */}
      <meshStandardMaterial
        color="#141926"
        metalness={0.85}
        roughness={0.35}
        flatShading
      />
    </instancedMesh>
  )
}

/** Обёртка с камерой, светом и туманом */
export default function HexField3D() {
  return (
    <Canvas
      // dpr ограничен для производительности (чеклист ui-ux-pro-max)
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      {/* Туман скрывает края поля — соты «растворяются» в фоне */}
      <fog attach="fog" args={['#0a0d12', 8, 16]} />

      {/* Свет: холодный заполняющий + два золотых акцентных источника */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 8]} intensity={0.5} color="#e8e4d8" />
      <pointLight position={[-6, 3, 5]} intensity={40} color="#d4af37" />
      <pointLight position={[7, -4, 4]} intensity={25} color="#9a7b1e" />

      <HexInstances />
    </Canvas>
  )
}
