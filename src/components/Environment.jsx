import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function SnowParticles({ count = 2000, intensity = 1, wind = 0 }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = Math.random() * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      velocities[i] = Math.random() * 0.5 + 0.2
    }

    return { positions, velocities }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < count; i++) {
      // Fall down
      positions[i * 3 + 1] -= particles.velocities[i] * 0.05 * intensity

      // Wind effect
      positions[i * 3] += wind * 0.02
      positions[i * 3 + 2] += Math.sin(state.clock.getElapsedTime() + i) * 0.01 * wind

      // Reset when particles fall below ground
      if (positions[i * 3 + 1] < 0) {
        positions[i * 3 + 1] = 50
        positions[i * 3] = (Math.random() - 0.5) * 100
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        color="#f0f8ff"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FireParticles({ count = 500, sources = [] }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      if (sources.length > 0) {
        const source = sources[Math.floor(Math.random() * sources.length)]
        positions[i * 3] = source.x + (Math.random() - 0.5) * 2
        positions[i * 3 + 1] = source.y
        positions[i * 3 + 2] = source.z + (Math.random() - 0.5) * 2
      }

      // Fire colors (orange to yellow)
      const colorChoice = Math.random()
      if (colorChoice > 0.7) {
        colors[i * 3] = 1.0 // R
        colors[i * 3 + 1] = 0.5 // G
        colors[i * 3 + 2] = 0.0 // B
      } else {
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.8
        colors[i * 3 + 2] = 0.0
      }

      sizes[i] = Math.random() * 0.5 + 0.2

      velocities[i * 3] = (Math.random() - 0.5) * 0.1
      velocities[i * 3 + 1] = Math.random() * 0.3 + 0.2
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1
    }

    return { positions, colors, sizes, velocities }
  }, [count, sources])

  useFrame(() => {
    if (!pointsRef.current || sources.length === 0) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const sizes = pointsRef.current.geometry.attributes.size.array

    for (let i = 0; i < count; i++) {
      // Rise and drift
      positions[i * 3] += particles.velocities[i * 3]
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1]
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2]

      // Shrink as they rise
      sizes[i] *= 0.99

      // Reset when too high or too small
      if (positions[i * 3 + 1] > 15 || sizes[i] < 0.05) {
        const source = sources[Math.floor(Math.random() * sources.length)]
        positions[i * 3] = source.x + (Math.random() - 0.5) * 2
        positions[i * 3 + 1] = source.y
        positions[i * 3 + 2] = source.z + (Math.random() - 0.5) * 2
        sizes[i] = Math.random() * 0.5 + 0.2
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true
  })

  if (sources.length === 0) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function SmokeParticles({ count = 300, sources = [] }) {
  const pointsRef = useRef()

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const opacities = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      if (sources.length > 0) {
        const source = sources[Math.floor(Math.random() * sources.length)]
        positions[i * 3] = source.x + (Math.random() - 0.5) * 3
        positions[i * 3 + 1] = source.y + Math.random() * 5
        positions[i * 3 + 2] = source.z + (Math.random() - 0.5) * 3
      }

      sizes[i] = Math.random() * 2 + 1
      opacities[i] = Math.random() * 0.5 + 0.3
    }

    return { positions, sizes, opacities }
  }, [count, sources])

  useFrame(() => {
    if (!pointsRef.current || sources.length === 0) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const sizes = pointsRef.current.geometry.attributes.size.array

    for (let i = 0; i < count; i++) {
      // Rise and expand
      positions[i * 3 + 1] += 0.05
      sizes[i] += 0.02

      // Reset when too high
      if (positions[i * 3 + 1] > 25) {
        const source = sources[Math.floor(Math.random() * sources.length)]
        positions[i * 3] = source.x + (Math.random() - 0.5) * 3
        positions[i * 3 + 1] = source.y
        positions[i * 3 + 2] = source.z + (Math.random() - 0.5) * 3
        sizes[i] = Math.random() * 2 + 1
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.size.needsUpdate = true
  })

  if (sources.length === 0) return null

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={3}
        color="#2c2c2c"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Environment({ environmentRef, selectedChoice }) {
  const snowRef = useRef()
  const fireSourcesRef = useRef([])
  const smokeSourcesRef = useRef([])

  const snowIntensity = selectedChoice === 'straw' ? 3 : 1
  const wind = selectedChoice === 'straw' ? 2 : 0

  // Expose environment refs for animation control
  useEffect(() => {
    if (environmentRef) {
      environmentRef.current = {
        snow: snowRef,
        setFireSources: (sources) => {
          fireSourcesRef.current = sources
        },
        setSmokeSources: (sources) => {
          smokeSourcesRef.current = sources
        }
      }
    }
  }, [environmentRef])

  return (
    <group>
      <SnowParticles
        ref={snowRef}
        count={selectedChoice === 'straw' ? 4000 : 2000}
        intensity={snowIntensity}
        wind={wind}
      />

      {selectedChoice === 'wood' && (
        <>
          <FireParticles count={500} sources={fireSourcesRef.current} />
          <SmokeParticles count={300} sources={smokeSourcesRef.current} />
        </>
      )}
    </group>
  )
}

export default Environment
