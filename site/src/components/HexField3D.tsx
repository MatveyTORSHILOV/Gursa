/**
 * ===== HexField3D — «дышащие» 3D-соты (React Three Fiber) =====
 */
import { useLayoutEffect, useMemo, useRef } from 'react'
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
      const seed = ((row * 17 + col * 31) % 100) / 100 * Math.PI * 2
      const wave = Math.sin(x * 0.55 + y * 0.4) * 0.5 + 0.5
      const isGold = wave > 0.58 || Math.sin(x * 1.7 + y * 2.1) > 0.72
      positions.push({ x, y, seed, isGold })
    }
  }
  return positions
}

const GRID = buildGrid()
const GOLD_CELLS = GRID.filter((c) => c.isGold)

function HexInstances() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const colors = useMemo(() => {
    const arr = new Float32Array(GRID.length * 3)
    const dark = new THREE.Color('#1a2230')
    const gold = new THREE.Color('#c9a227')
    const goldBright = new THREE.Color('#e8c766')
    GRID.forEach((cell, i) => {
      const c = cell.isGold
        ? gold.clone().lerp(goldBright, Math.sin(cell.x + cell.y) * 0.5 + 0.5)
        : dark
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    })
    return arr
  }, [])

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

  useFrame(({ clock, pointer }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()

    GRID.forEach((cell, i) => {
      const wave =
        Math.sin(t * 0.7 + cell.x * 0.45 + cell.seed * 0.25) * 0.38 +
        Math.sin(t * 0.4 + cell.y * 0.6) * 0.28
      const mouseInfluence =
        Math.max(0, 1 - Math.hypot(cell.x - pointer.x * 8, cell.y - pointer.y * 4) / 4) * 0.7
      const goldLift = cell.isGold ? 0.15 : 0
      dummy.position.set(cell.x, cell.y, wave + mouseInfluence + goldLift)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
    mesh.rotation.z = Math.sin(t * 0.05) * 0.025
  })

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, GRID.length]}>
      <meshStandardMaterial
        vertexColors
        metalness={0.78}
        roughness={0.32}
        flatShading
        emissive="#d4af37"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  )
}

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

export default function HexField3D() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <fog attach="fog" args={['#161b24', 10, 22]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 8]} intensity={0.85} color="#fff8e8" />
      <pointLight position={[-5, 3, 6]} intensity={55} color="#d4af37" />
      <pointLight position={[8, -3, 5]} intensity={40} color="#f0d98c" />
      <pointLight position={[0, 0, 8]} intensity={20} color="#e8c766" />
      <HexInstances />
      <GoldHexRings />
    </Canvas>
  )
}
