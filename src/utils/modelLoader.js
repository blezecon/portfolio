import { useGLTF } from '@react-three/drei';

// Preload the black hole model
useGLTF.preload('/src/assets/blackhole.glb');

// Export a function to get the optimized path
export const getBlackHolePath = () => '/src/assets/blackhole.glb';