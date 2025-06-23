import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { Suspense, lazy } from 'react';

// Lazily load the 3D model component
const BlackHoleModel = lazy(() => import('./BlackHoleModel'));

// Simple fallback component to use while the 3D component loads
const SimpleBlackHole = () => {
  return (
    <div className="w-full h-full bg-transparent">
      <div className="w-full h-full bg-gradient-to-r from-blue-900 to-indigo-900 opacity-20 animate-spin-slow"></div>
    </div>
  );
};

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side content */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left p-6 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Dipendu Ray</span>
              <span className="inline-block ml-2 animate-pulse-slow">👋</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
              Also known as <span className="text-secondary font-mono">Blezecon</span>
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
              A passionate second-year college student at Techno Main SaltLake with 
              a strong foundation in web development, programming, and problem-solving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#projects" className="btn-primary">View My Projects</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
          </motion.div>

          {/* Right side - Black Hole with minimal container */}
          <motion.div 
            className="w-full md:w-1/2 h-96 mt-12 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Suspense fallback={<SimpleBlackHole />}>
              <BlackHoleModel />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <a href="#about" className="flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
            <span className="mb-2 text-sm">Scroll Down</span>
            <FiArrowDown className="text-xl" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;