import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let mousePosition = { x: null, y: null };
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-create particles when canvas resizes
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth / 20), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          color: isDarkMode ? 
            `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.1})` : 
            `rgba(59, 130, 246, ${Math.random() * 0.3 + 0.05})`
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;
        
        // Connect to nearby particles
        connectParticles(particle, index);
        
        // React to mouse
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 1500;
            particle.speedX -= Math.cos(angle) * force;
            particle.speedY -= Math.sin(angle) * force;
          }
        }
      });
    };
    
    const connectParticles = (particle, index) => {
      for (let i = index + 1; i < particles.length; i++) {
        const dx = particle.x - particles[i].x;
        const dy = particle.y - particles[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = isDarkMode ? 
            `rgba(96, 165, 250, ${0.1 * (1 - distance/120)})` : 
            `rgba(59, 130, 246, ${0.05 * (1 - distance/120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particles[i].x, particles[i].y);
          ctx.stroke();
        }
      }
    };
    
    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e) => {
      mousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    const handleMouseLeave = () => {
      mousePosition = {
        x: null,
        y: null
      };
    };
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="particles-container"
    />
  );
};

export default InteractiveBackground;