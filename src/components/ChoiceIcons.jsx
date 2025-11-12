import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

function ChoiceIcon({ position, color, geometry, onClick, onHover }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const targetScale = useRef(new THREE.Vector3(1, 1, 1))
  const currentScale = useRef(new THREE.Vector3(1, 1, 1))

  useEffect(() => {
    // Float animation
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: position[1] + 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 8,
        repeat: -1,
        ease: 'none'
      })
    }
  }, [position])

  useFrame((state) => {
    if (meshRef.current && glowRef.current && groupRef.current) {
      // Pulsing glow effect
      const pulse = Math.sin(state.clock.getElapsedTime() * 2) * 0.3 + 1
      glowRef.current.scale.set(pulse, pulse, pulse)

      // Enhanced scale when hovered
      targetScale.current.set(
        hovered ? 1.3 : 1,
        hovered ? 1.3 : 1,
        hovered ? 1.3 : 1
      )

      currentScale.current.lerp(targetScale.current, 0.1)
      groupRef.current.scale.copy(currentScale.current)
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => {
        setHovered(true)
        onHover(true)
      }}
      onPointerLeave={() => {
        setHovered(false)
        onHover(false)
      }}
    >
      {/* Main geometry */}
      <mesh ref={meshRef} castShadow>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} scale={1.5}>
        {geometry}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Particle ring */}
      <points>
        <sphereGeometry args={[2, 32, 32]} />
        <pointsMaterial
          color={color}
          size={0.05}
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  )
}

function ChoiceIcons({ onChoice }) {
  const groupRef = useRef()
  const [selectedIcon, setSelectedIcon] = useState(null)

  useEffect(() => {
    // Fade in animation on mount
    if (groupRef.current) {
      gsap.from(groupRef.current.children, {
        scale: 0,
        duration: 1.5,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)'
      })
    }
  }, [])

  const handleClick = (choice) => {
    setSelectedIcon(choice)

    // Fade out non-selected icons
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const choiceNames = ['stone', 'wood', 'straw']
        if (choiceNames[index] !== choice) {
          gsap.to(child.scale, {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.8,
            ease: 'power2.in'
          })
        } else {
          // Selected icon pulses then fades
          gsap.to(child.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(child.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.8,
                delay: 0.5,
                ease: 'power2.in'
              })
            }
          })
        }
      })
    }

    // Trigger the choice after animation starts
    setTimeout(() => onChoice(choice), 300)
  }

  const handleHover = (isHovered) => {
    document.body.style.cursor = isHovered ? 'pointer' : 'default'
  }

  // Position icons in a circle around the scholar
  const radius = 6
  const angleStep = (Math.PI * 2) / 3
  const yOffset = 3

  return (
    <group ref={groupRef}>
      {/* Stone Icon */}
      <ChoiceIcon
        position={[
          Math.cos(angleStep * 0) * radius,
          yOffset,
          Math.sin(angleStep * 0) * radius
        ]}
        color="#7f8c8d"
        geometry={<dodecahedronGeometry args={[0.8, 0]} />}
        onClick={() => handleClick('stone')}
        onHover={handleHover}
      />

      {/* Wood Icon */}
      <ChoiceIcon
        position={[
          Math.cos(angleStep * 1) * radius,
          yOffset,
          Math.sin(angleStep * 1) * radius
        ]}
        color="#a0522d"
        geometry={<cylinderGeometry args={[0.5, 0.5, 1.2, 8]} />}
        onClick={() => handleClick('wood')}
        onHover={handleHover}
      />

      {/* Straw Icon */}
      <ChoiceIcon
        position={[
          Math.cos(angleStep * 2) * radius,
          yOffset,
          Math.sin(angleStep * 2) * radius
        ]}
        color="#f4d03f"
        geometry={<torusGeometry args={[0.6, 0.2, 8, 12]} />}
        onClick={() => handleClick('straw')}
        onHover={handleHover}
      />
    </group>
  )
}

export default ChoiceIcons
