/**
 * ===== HexField3D — «дышащие» 3D-соты на чёрном фоне =====
 *
 * Чёрные соты + золотые акцентные. Возле курсора соты «вспыхивают»
 * золотом (динамический instanceColor). Фон — чистый чёрный.
 */
import { useLayoutEffect, useMemo, useRef, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const HEX_RADIUS = 0.52
const GAP = 1.06
const COLS = 28
const ROWS = 18

type Cell = { x: number; y: number; seed: number; isGold: boolean }

/** Детерминированная сетка — одинаковая для призм и золотых колец */
function buildGrid(): Cell[] {
  const positions: Cell[] = []
  const w = HEX_RADIUS * Math.sqrt(3) * GAP
  const h = HEX_RADIUS * 1.5 * GAP

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const offsetX = row % 2 === 0 ? 0 : w / 2
      const x = (col - COLS / 2) * w + offsetX
      const y = (row - ROWS / 2) * h
      const seed = (((row * 17 + col * 31) % 100) / 100) * Math.PI * 2
      const wave = Math.sin(x * 0.55 + y * 0.4) * 0.5 + 0.5
      const isGold = wave > 0.58 || Math.sin(x * 1.7 + y * 2.1) > 0.72
      positions.push({ x, y, seed, isGold })
    }
  }
  return positions
}

const GRID = buildGrid()
const GOLD_CELLS = GRID.filter((c) => c.isGold)

/* Базовые цвета сот */
const COLOR_BLACK = new THREE.Color('#0d0d10')   // чёрные соты (не чистый #000 — чтобы грани читались)
const COLOR_GOLD = new THREE.Color('#c9a227')
const COLOR_GOLD_BRIGHT = new THREE.Color('#f0d98c')
const COLOR_HOVER = new THREE.Color('#f5e6a8')   // яркая вспышка под курсором
const COLOR_HOVER_DEEP = new THREE.Color('#d4af37')

type HexInstancesProps = {
  pointerRef: RefObject<{ x: number; y: number }>
}

function HexInstances({ pointerRef }: HexInstancesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmpColor = useMemo(() => new THREE.Color(), [])

  /* Базовый цвет каждой соты (чёрная или золотая) */
  const baseColors = useMemo(
    () =>
      GRID.map((cell) =>
        cell.isGold
          ? COLOR_GOLD.clone().lerp(COLOR_GOLD_BRIGHT, Math.sin(cell.x + cell.y) * 0.5 + 0.5)
          : COLOR_BLACK,
      ),
    [],
  )

  const colors = useMemo(() => {
    const arr = new Float32Array(GRID.length * 3)
    baseColors.forEach((c, i) => c.toArray(arr, i * 3))
    return arr
  }, [baseColors])

  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(HEX_RADIUS, HEX_RADIUS, 0.42, 6)
    geo.rotateX(Math.PI / 2)
    return geo
  }, [])

  useLayoutEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    mesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3)
  }, [colors])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh?.instanceColor) return
    const t = clock.getElapsedTime()

    const ptr = pointerRef.current
    const px = (ptr?.x ?? 0) * 8
    const py = (ptr?.y ?? 0) * 4

    GRID.forEach((cell, i) => {
      const wave =
        Math.sin(t * 0.7 + cell.x * 0.45 + cell.seed * 0.25) * 0.38 +
        Math.sin(t * 0.4 + cell.y * 0.6) * 0.28

      // Близость курсора: чем ближе — тем ярче золото
      const proximity = Math.max(0, 1 - Math.hypot(cell.x - px, cell.y - py) / 4.8)
      const glow = proximity * proximity

      const goldLift = cell.isGold ? 0.15 : 0
      dummy.position.set(cell.x, cell.y, wave + glow * 1.1 + goldLift)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)

      if (cell.isGold) {
        tmpColor.copy(baseColors[i]).lerp(COLOR_HOVER, glow * 0.95)
      } else {
        tmpColor.copy(COLOR_BLACK).lerp(COLOR_HOVER_DEEP, glow * 0.92)
      }
      tmpColor.toArray(mesh.instanceColor!.array as Float32Array, i * 3)
    })

    mesh.instanceMatrix.needsUpdate = true
    mesh.instanceColor.needsUpdate = true
    mesh.rotation.z = Math.sin(t * 0.05) * 0.025
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, GRID.length]}>
      <meshStandardMaterial
        vertexColors
        metalness={0.8}
        roughness={0.35}
        flatShading
        emissive="#d4af37"
        emissiveIntensity={0.12}
      />
    </instancedMesh>
  )
}

/** Тонкие золотые контуры поверх золотых сот */
function GoldHexRings() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      const px = HEX_RADIUS * 1.06 * Math.cos(angle)
      const py = HEX_RADIUS * 1.06 * Math.sin(angle)
      if (i === 0) shape.moveTo(px, py)
      else shape.lineTo(px, py)
    }
    shape.closePath()
    return new THREE.ShapeGeometry(shape)
  }, [])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()
    GOLD_CELLS.forEach((cell, i) => {
      const wave =
        Math.sin(t * 0.7 + cell.x * 0.45 + cell.seed * 0.25) * 0.38 +
        Math.sin(t * 0.4 + cell.y * 0.6) * 0.28
      dummy.position.set(cell.x, cell.y, wave + 0.28)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  if (!GOLD_CELLS.length) return null

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, GOLD_CELLS.length]}>
      <meshBasicMaterial color="#f0d98c" transparent opacity={0.4} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

type Props = {
  pointerRef: RefObject<{ x: number; y: number }>
}

export default function HexField3D({ pointerRef }: Props) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* Чёрный туман — соты растворяются в чёрном фоне */}
      <fog attach="fog" args={['#000000', 10, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 8]} intensity={0.6} color="#fff4d6" />
      <pointLight position={[-5, 3, 6]} intensity={50} color="#d4af37" />
      <pointLight position={[8, -3, 5]} intensity={35} color="#f0d98c" />

      <HexInstances pointerRef={pointerRef} />
      <GoldHexRings />
    </Canvas>
  )
}
