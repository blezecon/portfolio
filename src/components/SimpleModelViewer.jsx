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
      antialias: true,
      powerPreference: 'high-performance' // Request dedicated GPU if available
    });
    
    // Keep the renderer size at 550x550 to match container
    renderer.setSize(550, 550);
    renderer.setClearColor(0x000000, 0); // Completely transparent background
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
    // Move the entire model group to the right
    modelGroup.position.x = 0.3; // Positive x moves to the right
    scene.add(modelGroup);
    
    // Position camera to view from the front
    camera.position.z = 4;
    
    // Throttling variables for mouse movement
    let lastMoveTime = 0;
    const throttleMs = 16; // ~60 fps
    
    // Variables for mouse tracking
    let targetRotationY = -Math.PI / 5; // Default rotation
    let targetRotationX = 0;
    let currentRotationY = targetRotationY;
    let currentRotationX = targetRotationX;
    
    // Get element position for accurate mouse tracking
    const getElementPosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      return {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height
      };
    };
    
    // Mouse move handler with throttling
    const onMouseMove = (event) => {
      // Add throttling to limit processing
      const now = Date.now();
      if (now - lastMoveTime < throttleMs) return;
      lastMoveTime = now;
      
      if (!containerRef.current) return;
      
      const elementPos = getElementPosition();
      
      // Calculate the center of the container
      const centerX = elementPos.left + elementPos.width / 2;
      const centerY = elementPos.top + elementPos.height / 2;
      
      // Calculate normalized mouse position from -1 to 1
      const mouseX = (event.clientX - centerX) / (window.innerWidth / 2);
      const mouseY = (event.clientY - centerY) / (window.innerHeight / 2);
      
      // Set target rotations with limits
      targetRotationY = -Math.PI / 5 + mouseX * 0.5; // Base + mouse influence
      targetRotationX = mouseY * 0.3; // Limit vertical rotation
      
      // Clamp the rotation values to prevent extreme angles
      targetRotationY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationY));
      targetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetRotationX));
    };
    
    // Add event listener for mouse movement - make it passive for better performance
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    
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
          const scale = 4.0 / maxDim;
          gltf.scene.scale.multiplyScalar(scale);
          
          // Center model
          gltf.scene.position.sub(center.multiplyScalar(scale));
          
          // Set initial rotation
          gltf.scene.rotation.y = currentRotationY;
          
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
    
    // Animation loop with smooth rotation tracking
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      try {
        // Smoothly interpolate current rotation towards target rotation
        currentRotationY += (targetRotationY - currentRotationY) * 0.1;
        currentRotationX += (targetRotationX - currentRotationX) * 0.1;
        
        // Apply the rotation to the model group
        if (modelGroup.children.length > 0) {
          modelGroup.children[0].rotation.y = currentRotationY;
          modelGroup.children[0].rotation.x = currentRotationX;
        }
        
        // Render the scene
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
      window.removeEventListener('mousemove', onMouseMove);
      
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
  
  // Make this container completely transparent with no visible box
  return <div 
    ref={containerRef} 
    style={{ 
      width: '100%', 
      height: '100%', 
      background: 'transparent', 
      border: 'none', 
      outline: 'none', 
      boxShadow: 'none' 
    }} 
  />;
};

export default SimpleModelViewer;