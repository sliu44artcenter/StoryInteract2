import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import { Loader } from '@react-three/drei'

function App() {
  return (
    <>
      <Canvas
        camera={{ position: [0, 15, 25], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        shadows
      >
        <color attach="background" args={['#485563']} />
        <fog attach="fog" args={['#485563', 30, 80]} />

        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <Loader
        containerStyles={{
          background: '#1a1a2e'
        }}
        dataStyles={{
          color: '#ffffff'
        }}
      />
    </>
  )
}

export default App
