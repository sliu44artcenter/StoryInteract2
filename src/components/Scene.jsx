import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import ChoiceIcons from './ChoiceIcons'
import Environment from './Environment'
import Scholar from './Scholar'
import { playStoneEnding, playWoodEnding, playStrawEnding } from '../utils/animations'

function Terrain() {
  const meshRef = useRef()

  // Create terrain geometry with heightmap
  const geometry = new THREE.PlaneGeometry(100, 100, 50, 50)
  const positions = geometry.attributes.position

  // Add some gentle elevation variation
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i)
    const y = positions.getY(i)
    const height = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 1.5 + Math.random() * 0.5
    positions.setZ(i, height)
  }

  geometry.computeVertexNormals()

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color="#e8f4f8"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

function Lighting({ lightingRef }) {
  const directionalRef = useRef()
  const ambientRef = useRef()
  const hemisphereRef = useRef()

  // Expose lights to parent for animation control
  if (lightingRef) {
    lightingRef.current = {
      directional: directionalRef,
      ambient: ambientRef,
      hemisphere: hemisphereRef
    }
  }

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.4} />
      <hemisphereLight
        ref={hemisphereRef}
        args={['#87ceeb', '#f0f8ff', 0.6]}
        position={[0, 50, 0]}
      />
      <directionalLight
        ref={directionalRef}
        position={[20, 30, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
    </>
  )
}

function CameraController({ isAnimating, selectedChoice }) {
  const { camera } = useThree()

  useFrame((state) => {
    if (!isAnimating) {
      // Cinematic orbit animation before choice
      const time = state.clock.getElapsedTime() * 0.08
      const radius = 28
      const heightOffset = 16
      const verticalMotion = Math.sin(time * 0.6) * 3

      camera.position.x = Math.sin(time) * radius
      camera.position.z = Math.cos(time) * radius
      camera.position.y = heightOffset + verticalMotion

      // Look slightly above center for cinematic feel
      camera.lookAt(0, 3, 0)
    }
  })

  return null
}

function Scene() {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [houses, setHouses] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)

  const sceneRef = useRef()
  const lightingRef = useRef()
  const environmentRef = useRef()
  const { scene, camera } = useThree()

  const handleChoice = (choice) => {
    if (isAnimating) return

    setSelectedChoice(choice)
    setIsAnimating(true)

    // Get references for animation
    const refs = {
      scene,
      camera,
      lighting: lightingRef.current,
      environment: environmentRef.current,
      setHouses
    }

    // Play the corresponding animation
    switch (choice) {
      case 'stone':
        playStoneEnding(refs)
        break
      case 'wood':
        playWoodEnding(refs)
        break
      case 'straw':
        playStrawEnding(refs)
        break
    }
  }

  return (
    <group ref={sceneRef}>
      <Lighting lightingRef={lightingRef} />
      <Terrain />

      <Scholar />

      {!selectedChoice && (
        <ChoiceIcons onChoice={handleChoice} />
      )}

      <Environment
        environmentRef={environmentRef}
        selectedChoice={selectedChoice}
      />

      {/* Render houses dynamically */}
      {houses.map((house, index) => (
        <primitive key={index} object={house} />
      ))}

      <OrbitControls
        enabled={!isAnimating}
        enablePan={false}
        minDistance={15}
        maxDistance={40}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        target={[0, 2, 0]}
      />

      <CameraController
        isAnimating={isAnimating}
        selectedChoice={selectedChoice}
      />
    </group>
  )
}

export default Scene
