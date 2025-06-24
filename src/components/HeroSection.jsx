import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Simplified 3D model component
const SimpleModelViewer = lazy(() => import('./SimpleModelViewer'));

// Fallback loading spinner
const ModelFallback = () => (
  <div className="absolute flex items-center justify-center opacity-50" style={{ right: '20%', top: '20%', width: '550px', height: '550px' }}>
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const [modelVisible, setModelVisible] = useState(false);

  // Delay loading the model to ensure the rest of the page loads properly first
  useEffect(() => {
    const timer = setTimeout(() => {
      setModelVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-70 pointer-events-none z-0">
        <div className="relative w-full h-full">
          {/* Using CSS gradients and animations */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl animate-pulse-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 blur-xl animate-float"></div>
          
          {/* SVG elements for decoration */}
          <svg className="absolute top-20 right-20 w-80 h-80 text-primary opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40,-51.4C51.2,-41.8,59.2,-28.3,64.2,-12.7C69.2,2.9,71.1,20.5,64.6,34.6C58,48.7,42.9,59.3,26.8,63.1C10.8,67,-6.2,64.1,-22.7,59.1C-39.3,54.1,-55.5,47,-63.4,34.1C-71.3,21.2,-71,2.5,-66.4,-14.7C-61.9,-31.9,-53.2,-47.5,-40.7,-56.8C-28.2,-66.1,-14.1,-69.2,0.5,-69.8C15.1,-70.4,30.2,-68.6,40,-51.4Z" transform="translate(100 100)" />
          </svg>
          
          <svg className="absolute bottom-20 right-40 w-64 h-64 text-secondary opacity-20 animate-spin-very-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M41.3,-59.1C53,-49.9,61.5,-37.7,67.2,-23.6C72.9,-9.5,75.9,6.6,71.5,20.5C67.2,34.5,55.7,46.3,42.4,53.8C29.1,61.3,14.5,64.5,-0.7,65.5C-16,66.5,-32,65.3,-44.5,57.5C-57,49.7,-66,35.2,-70.3,19.5C-74.5,3.8,-74,-13.1,-67.7,-27.2C-61.5,-41.4,-49.5,-52.7,-36.2,-61.1C-22.8,-69.5,-8.2,-74.9,3.7,-79.8C15.5,-84.7,31,-84.1,41.3,-59.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      {/* 3D Model - Adjusting container size to match renderer size */}
      {modelVisible && (
        <ErrorBoundary FallbackComponent={() => null}>
          <div 
            className="absolute pointer-events-none" 
            style={{ 
              right: '20%',
              top: '20%',
              width: '550px',            // Match the renderer size in SimpleModelViewer
              height: '550px',           // Match the renderer size in SimpleModelViewer
              opacity: 1,
              zIndex: 40,                // Increased z-index
              background: 'transparent', // Ensure transparency
              border: 'none',            // Remove borders
              outline: 'none'            // Remove outlines
            }}
          >
            <Suspense fallback={<ModelFallback />}>
              <SimpleModelViewer />
            </Suspense>
          </div>
        </ErrorBoundary>
      )}
      
      <div className="section-container relative z-10">
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

          {/* Right side content area with code snippets */}
          <motion.div 
            className="w-full md:w-1/2 h-96 mt-12 md:mt-0 relative hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Code snippet decoration */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
              <pre className="text-xs md:text-sm font-mono text-primary dark:text-primary-light p-4 bg-white/10 dark:bg-dark/30 backdrop-blur-sm rounded-md transform rotate-3 absolute top-10 right-32 z-20">
                <code>{`
function Blezecon() {
  const [skills, setSkills] = useState([
    "React", "JavaScript", "CSS", "HTML"
  ]);
  
  useEffect(() => {
    console.log("Portfolio loaded!");
  }, []);

  return (
    <Developer name="Dipendu Ray" />
  );
}
                `}</code>
              </pre>
              
              <pre className="text-xs md:text-sm font-mono text-secondary dark:text-secondary-light p-4 bg-white/10 dark:bg-dark/30 rounded-md transform -rotate-2 absolute bottom-10 right-44 z-20">
                <code>{`
// The journey continues...
const myJourney = {
  education: "Techno Main SaltLake",
  passion: "Web Development",
  goal: "Creating amazing experiences"
};

export default myJourney;
                `}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
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