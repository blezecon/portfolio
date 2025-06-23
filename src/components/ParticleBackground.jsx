import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId;
    let particles = [];
    let mouse = { x: undefined, y: undefined, radius: 150 };
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    
    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    // Handle mouse leave
    const handleMouseLeave = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };
    
    // Simple particle class
    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.color = color;
        
        // Random movement properties
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.moveRadius = Math.random() * 10; // How far from original position
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      
      update() {
        // Natural random movement
        this.baseX += this.speedX;
        this.baseY += this.speedY;
        
        // Bounce off edges
        if (this.baseX < 0 || this.baseX > canvas.width) {
          this.speedX *= -1;
        }
        
        if (this.baseY < 0 || this.baseY > canvas.height) {
          this.speedY *= -1;
        }
        
        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Default position with slight movement
        let targetX = this.baseX;
        let targetY = this.baseY;
        
        // If mouse is close, react to it
        if (mouse.x !== undefined && distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          // Push particles away from mouse
          targetX = this.x - forceDirectionX * force * this.density;
          targetY = this.y - forceDirectionY * force * this.density;
        }
        
        // Ease to the target position
        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
        
        this.draw();
      }
    }
    
    // Create particles
    function init() {
      particles = [];
      const particleCount = Math.min((canvas.width * canvas.height) / 8000, 100);
      const particleColor = isDarkMode ? 'rgba(148, 85, 255, 0.8)' : 'rgba(59, 130, 246, 0.8)';
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 2);
        const y = Math.random() * (canvas.height - size * 2);
        particles.push(new Particle(x, y, size, particleColor));
      }
    }
    
    // Connect particles with lines
    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < (canvas.width/7)) {
            const opacity = 1 - (distance / (canvas.width/7));
            ctx.strokeStyle = isDarkMode 
              ? `rgba(148, 85, 255, ${opacity * 0.5})`
              : `rgba(59, 130, 246, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    init();
    animate();
    
    // Event listeners
    window.addEventListener('resize', () => {
      setCanvasSize();
      init();
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: isDarkMode ? '#111827' : '#f9fafb'
      }}
    />
  );
};

export default ParticleBackground;