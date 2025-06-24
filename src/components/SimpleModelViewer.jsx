import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Import the model directly
import modelPath from '../assets/model.glb';

const SimpleModelViewer = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create a simple Three.js scene
    const scene = new THREE.Scene();
    
    // Use a wider field of view for a more dramatic appearance
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    
    // Larger size for the renderer
    renderer.setSize(550, 550); // Increased from 500x500
    renderer.setClearColor(0x000000, 0); // Transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Enhanced lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(0, 5, 5); // Light from front-top
    scene.add(directionalLight);
    
    // Add a soft blue/purple light to match your site's aesthetic
    const blueLight = new THREE.PointLight(0x4f46e5, 3, 10);
    blueLight.position.set(0, 0, 5); // Light from front for face highlighting
    scene.add(blueLight);
    
    // Add a soft teal accent light for better depth
    const tealLight = new THREE.PointLight(0x06b6d4, 2, 10);
    tealLight.position.set(-3, -1, 3);
    scene.add(tealLight);
    
    // Create a group to hold the model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    
    // Position camera to view from the front
    camera.position.z = 4;
    
    // Load the 3D model
    const loader = new GLTFLoader();
    
    try {
      // Use the imported model path
      loader.load(
        modelPath, 
        (gltf) => {
          // Center and size the model
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          // Scale model larger
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4.0 / maxDim; // Increased from 3.5 to 4.0
          gltf.scene.scale.multiplyScalar(scale);
          
          // Center model
          gltf.scene.position.sub(center.multiplyScalar(scale));
          
          // Perfect rotation found by the user
          gltf.scene.rotation.y = -Math.PI / 5;
          
          // Add model to group
          modelGroup.add(gltf.scene);
          
          // Render once the model is loaded
          renderer.render(scene, camera);
        },
        undefined,
        (error) => {
          console.error('An error occurred loading the model:', error);
        }
      );
    } catch (e) {
      console.error('Error in model loading setup:', e);
    }
    
    // Animation loop without rotation
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      try {
        // Just render the scene in its current state
        renderer.render(scene, camera);
      } catch (e) {
        console.error('Animation error:', e);
        cancelAnimationFrame(animationId);
      }
    };
    
    // Start animation loop
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          console.error('Cleanup error:', e);
        }
      }
      
      // Dispose resources
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default SimpleModelViewer;