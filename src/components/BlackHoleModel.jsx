import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

// The actual 3D model component
const BlackHoleModel = () => {
  const modelRef = useRef();
  
  // Model component - extracted to separate function
  const Model = () => {
    const { scene } = useGLTF('/src/assets/blackhole.glb');
    
    return (
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={0.7}
        position={[1, -1.45, 0]} // Adjusted from [1, -2, 0] to [1, -1.3, 0] for a more subtle downward movement
      />
    );
  };

  return (
    <Canvas
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent',
        zIndex: 10
      }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.7} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Model />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
    </Canvas>
  );
};

export default BlackHoleModel;