import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Import the model directly
import modelPath from '../assets/model.glb';

// Check if model should be visible based on screen width
const shouldShowModel = () => {
  return window.innerWidth >= 768; // Show when width is >= 768px
};

// Check if we're at 3072px width
const is3072Width = () => {
  return (window.innerWidth >= 3072 && window.innerWidth < 3800);
};

// Check if we're at 4K resolution (3840 x 2160)
const is4KResolution = () => {
  return (window.innerWidth >= 3800 && window.innerWidth <= 3900);
};

const SimpleModelViewer = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const modelGroupRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [is3K, setIs3K] = useState(is3072Width());
  const [is4K, setIs4K] = useState(is4KResolution());
  
  // Get appropriate scale based on screen size
  const getResponsiveScale = () => {
    const width = window.innerWidth;
    
    // Special case for 4K resolution (3840 x 2160) - much larger
    if (is4KResolution()) {
      return { size: 900, modelOffset: 0.1 }; // Increased from 700 to 900
    }
    // Special case for 3072px width screens - middle point between previous positions
    if (is3072Width()) {
      return { size: 750, modelOffset: 0.25 }; // Middle point between 0.1 and 0.4
    }
    // Special case for 2560x1440 resolution
    if (width >= 2500 && width <= 2600) return { size: 650, modelOffset: 0.2 }; 
    // Special case for 1366x768 resolution
    if (width >= 1024 && width <= 1440) return { size: 400, modelOffset: 0.5 }; 
    if (width < 1024) return { size: 400, modelOffset: 0.25 }; // lg
    if (width < 1280) return { size: 450, modelOffset: 0.3 }; // xl
    return { size: 550, modelOffset: 0.3 }; // 2xl and above
  };
  
  useEffect(() => {
    // Early return if screen width < 768px to save resources
    if (!shouldShowModel() || !containerRef.current) return;
    
    // Update resolution states
    setIs3K(is3072Width());
    setIs4K(is4KResolution());
    
    // Get responsive sizing
    const { size, modelOffset } = getResponsiveScale();
    setDimensions({ width: size, height: size });
    
    // Create a scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Use a wider field of view for a more dramatic appearance
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    cameraRef.current = camera;
    
    // Create renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance' // Request dedicated GPU if available
    });
    rendererRef.current = renderer;
    
    // Set initial size - will be updated on resize
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
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
    modelGroupRef.current = modelGroup;
    
    // Move the entire model group horizontally - responsive offset
    modelGroup.position.x = modelOffset;
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
      const divisorX = window.innerWidth / 2;
      const divisorY = window.innerHeight / 2;
      
      const mouseX = (event.clientX - centerX) / divisorX;
      const mouseY = (event.clientY - centerY) / divisorY;
      
      // Set target rotations with limits
      targetRotationY = -Math.PI / 5 + mouseX * 0.5; // Base + mouse influence
      targetRotationX = mouseY * 0.3; // Limit vertical rotation
      
      // Clamp the rotation values to prevent extreme angles
      targetRotationY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetRotationY));
      targetRotationX = Math.max(-Math.PI / 6, Math.min(Math.PI / 6, targetRotationX));
    };
    
    // Window resize handler for responsive canvas
    const handleResize = () => {
      // If screen width is now too small, don't update anything
      if (!shouldShowModel()) return;
      
      // Update resolution states
      setIs3K(is3072Width());
      setIs4K(is4KResolution());
      
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      
      // Update dimensions based on screen size
      const { size, modelOffset } = getResponsiveScale();
      setDimensions({ width: size, height: size });
      
      // Update renderer size
      rendererRef.current.setSize(size, size);
      
      // Update model position
      if (modelGroupRef.current) {
        modelGroupRef.current.position.x = modelOffset;
      }
      
      // Re-render immediately to prevent flickering
      if (sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    // Add event listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
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
    
    // Handle initial resize
    handleResize();
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && rendererRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          console.error('Cleanup error:', e);
        }
      }
      
      // Dispose resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  // If screen width is less than 768px, don't render anything
  if (!shouldShowModel()) {
    return null;
  }
  
  // Set the container styles
  const getContainerStyle = () => {
    const baseStyle = {
      width: `${dimensions.width}px`, 
      height: `${dimensions.height}px`,
      margin: '0 auto',
      background: 'transparent', 
      border: 'none', 
      outline: 'none', 
      boxShadow: 'none',
      transition: 'width 0.3s, height 0.3s'
    };
    
    // If it's exactly 3072px width, position between previous values
    if (is3K) {
      baseStyle.marginLeft = '105px'; // Middle between 60px and 150px
      baseStyle.position = 'relative';
      baseStyle.right = '-50px'; // Middle between -20px and -80px
    }
    
    // If it's 4K resolution, apply special styling
    if (is4K) {
      baseStyle.position = 'relative';
      baseStyle.right = '-30px';  // Specific positioning for 4K
    }
    
    return baseStyle;
  };
  
  // The container style now uses the calculated dimensions with special positioning
  return (
    <div 
      ref={containerRef} 
      style={getContainerStyle()} 
    />
  );
};

export default SimpleModelViewer;