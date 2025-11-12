import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import { Loader } from '@react-three/drei'
import ErrorBoundary from './components/ErrorBoundary'

function LoadingFallback() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      fontSize: '24px',
      fontFamily: 'sans-serif'
    }}>
      Loading Winter City...
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
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

        <Suspense fallback={<LoadingFallback />}>
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
    </ErrorBoundary>
  )
}

export default App
