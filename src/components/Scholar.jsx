import { useRef } from 'react'
import * as THREE from 'three'

function Scholar() {
  const groupRef = useRef()

  // Create a simplified humanoid figure using basic geometry
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.5]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 3.2, 0]} castShadow>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Hat - traditional scholar's hat */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.5, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Hat top */}
      <mesh position={[0, 4.1, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
      <mesh position={[0.6, 2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.2, 1.2, 0.2]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.25, 0.75, 0]} castShadow>
        <boxGeometry args={[0.25, 1.5, 0.3]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0.25, 0.75, 0]} castShadow>
        <boxGeometry args={[0.25, 1.5, 0.3]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>

      {/* Robe/Cape for scholarly appearance */}
      <mesh position={[0, 2.2, -0.3]} castShadow>
        <boxGeometry args={[1.2, 1.8, 0.1]} />
        <meshStandardMaterial color="#8b0000" opacity={0.9} transparent />
      </mesh>
    </group>
  )
}

export default Scholar
