import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Simplified 3D model component
const SimpleModelViewer = lazy(() => import('./SimpleModelViewer'));

// Check if we're on a high resolution display (3072x1620 or higher)
const isHighResolution = () => {
  return window.innerWidth >= 3072;
};

// Check if we're at 3072px width
const is3072Width = () => {
  return (window.innerWidth >= 3072 && window.innerWidth < 3800);
};

// Check if we're at 4K resolution (3840 x 2160)
const is4KResolution = () => {
  return (window.innerWidth >= 3800 && window.innerWidth <= 3900);
};

// Get responsive sizing for model container
const getResponsiveModelContainer = () => {
  const width = window.innerWidth;
  
  // Special case for 4K resolution (3840 x 2160) - optimized positioning
  if (is4KResolution()) {
    return { right: '10%', top: '25%' }; // Adjusted positioning for 4K
  }
  // Special case for 3072px width screens - middle point position
  if (is3072Width()) {
    return { right: '12.5%', top: '25%' }; // Middle between 15% and 10%
  }
  // Special case for 2560x1440 resolution
  if (width >= 2500 && width <= 2600) return { right: '15%', top: '25%' }; 
  // Special case for 1366x768 resolution
  if (width >= 1024 && width <= 1440) return { right: '25%', top: '20%' }; 
  if (width < 1024) return { right: '15%', top: '20%' }; // lg
  return { right: '20%', top: '20%' }; // xl and above
};

// Check if model should be visible based on screen width
const shouldShowModel = () => {
  return window.innerWidth >= 768; // Show when width is >= 768px
};

// Fallback loading spinner with responsive size
const ModelFallback = () => {
  const { size } = (() => {
    const width = window.innerWidth;
    // Special case for 4K resolution
    if (is4KResolution()) return { size: 900 };  // Increased from 700 to 900
    // Special case for 3072x1620 and higher
    if (width >= 3072 && width < 3800) return { size: 750 };
    // Special case for 2560x1440
    if (width >= 2500 && width <= 2600) return { size: 650 };
    if (width < 1024) return { size: 400 }; // lg
    if (width < 1280) return { size: 450 }; // xl
    return { size: 550 }; // 2xl and above
  })();

  return (
    <div className="absolute flex items-center justify-center opacity-50" 
      style={{ 
        right: getResponsiveModelContainer().right, 
        top: getResponsiveModelContainer().top, 
        width: `${size}px`, 
        height: `${size}px`
      }}>
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const [modelVisible, setModelVisible] = useState(false);
  const [modelPosition, setModelPosition] = useState(getResponsiveModelContainer());
  const [showModel, setShowModel] = useState(shouldShowModel());
  const [isHighRes, setIsHighRes] = useState(isHighResolution());
  const [is3K, setIs3K] = useState(is3072Width());
  const [is4K, setIs4K] = useState(is4KResolution());

  // Delay loading the model to ensure the rest of the page loads properly first
  useEffect(() => {
    const timer = setTimeout(() => {
      setModelVisible(true && shouldShowModel());
    }, 1000);
    
    // Update position and visibility on resize
    const handleResize = () => {
      setModelPosition(getResponsiveModelContainer());
      setShowModel(shouldShowModel());
      setIsHighRes(isHighResolution());
      setIs3K(is3072Width());
      setIs4K(is4KResolution());
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Additional CSS classes for high resolution displays
  const getHighResClasses = () => {
    if (is4K) return " high-res ultra-hd-4k";
    if (isHighRes) return " high-res";
    return "";
  };

  // Special style for model container based on resolution
  const getModelContainerStyle = () => {
    const baseStyle = {
      right: modelPosition.right,
      top: modelPosition.top,
      zIndex: 40,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      transition: 'right 0.3s, top 0.3s'
    };
    
    // Add special transform if it's 3072px width - middle position
    if (is3K) {
      baseStyle.transform = 'translateX(100px)';
    }
    
    // Special 4K positioning
    if (is4K) {
      baseStyle.transform = 'translateX(80px)'; // Adjusted for 4K
    }
    
    return baseStyle;
  };

  // Get text sizes based on resolution
  const getTextSizes = () => {
    if (is4K) {
      return {
        heading: 'text-7xl md:text-8xl lg:text-9xl',
        subheading: 'text-5xl md:text-6xl lg:text-7xl',
        paragraph: 'text-3xl md:text-4xl mb-12',
        button: 'text-2xl py-4 px-10'
      };
    }
    
    if (isHighRes) {
      return {
        heading: 'text-6xl md:text-7xl lg:text-8xl',
        subheading: 'text-4xl md:text-5xl lg:text-6xl',
        paragraph: 'text-2xl md:text-3xl mb-10',
        button: 'text-xl py-3 px-8'
      };
    }
    
    return {
      heading: 'text-4xl md:text-5xl lg:text-6xl',
      subheading: 'text-2xl md:text-3xl lg:text-4xl',
      paragraph: 'text-lg md:text-xl mb-8',
      button: ''
    };
  };
  
  const textSizes = getTextSizes();

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden${getHighResClasses()}`}>
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-70 pointer-events-none z-0">
        <div className="relative w-full h-full">
          {/* Using CSS gradients and animations - bigger for 4K */}
          <div className={`absolute top-1/4 right-1/4 ${is4K ? 'w-[40rem] h-[40rem]' : isHighRes ? 'w-96 h-96' : 'w-64 h-64'} rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl animate-pulse-slow`}></div>
          <div className={`absolute top-1/3 right-1/3 ${is4K ? 'w-[30rem] h-[30rem]' : isHighRes ? 'w-72 h-72' : 'w-48 h-48'} rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 blur-xl animate-float`}></div>
          
          {/* SVG elements for decoration - bigger for 4K */}
          <svg className={`absolute top-20 right-20 ${is4K ? 'w-[40rem] h-[40rem]' : isHighRes ? 'w-[30rem] h-[30rem]' : 'w-80 h-80'} text-primary opacity-20`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40,-51.4C51.2,-41.8,59.2,-28.3,64.2,-12.7C69.2,2.9,71.1,20.5,64.6,34.6C58,48.7,42.9,59.3,26.8,63.1C10.8,67,-6.2,64.1,-22.7,59.1C-39.3,54.1,-55.5,47,-63.4,34.1C-71.3,21.2,-71,2.5,-66.4,-14.7C-61.9,-31.9,-53.2,-47.5,-40.7,-56.8C-28.2,-66.1,-14.1,-69.2,0.5,-69.8C15.1,-70.4,30.2,-68.6,40,-51.4Z" transform="translate(100 100)" />
          </svg>
          
          <svg className={`absolute bottom-20 right-40 ${is4K ? 'w-[35rem] h-[35rem]' : isHighRes ? 'w-[25rem] h-[25rem]' : 'w-64 h-64'} text-secondary opacity-20 animate-spin-very-slow`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M41.3,-59.1C53,-49.9,61.5,-37.7,67.2,-23.6C72.9,-9.5,75.9,6.6,71.5,20.5C67.2,34.5,55.7,46.3,42.4,53.8C29.1,61.3,14.5,64.5,-0.7,65.5C-16,66.5,-32,65.3,-44.5,57.5C-57,49.7,-66,35.2,-70.3,19.5C-74.5,3.8,-74,-13.1,-67.7,-27.2C-61.5,-41.4,-49.5,-52.7,-36.2,-61.1C-22.8,-69.5,-8.2,-74.9,3.7,-79.8C15.5,-84.7,31,-84.1,41.3,-59.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      
      {/* 3D Model - Only show when screen width >= 768px */}
      {modelVisible && showModel && (
        <ErrorBoundary FallbackComponent={() => null}>
          <div 
            className="absolute pointer-events-none hidden md:block" 
            style={getModelContainerStyle()}
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
            className={`w-full md:w-1/2 text-center md:text-left p-6 rounded-lg bg-white/50 dark:bg-dark/50 backdrop-blur-sm ${is4K ? 'p-10' : isHighRes ? 'p-8' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`${textSizes.heading} font-bold mb-4`}>
              <span className="font-minecraft text-dark dark:text-white">HI, I-M</span> <span className="font-minecraft text-primary">DIPENDU RAY</span>
              <span className="inline-block ml-2 animate-pulse-slow">👋</span>
            </h1>
            <h2 className={`${textSizes.subheading} mb-6`}>
              <span className="font-header text-dark dark:text-white">ALSO KNOWN AS</span> <span className="font-header text-secondary">BLEZECON</span>
            </h2>
            <p className={`${textSizes.paragraph} text-gray-600 dark:text-gray-300`}>
              A passionate second-year college student at Techno Main SaltLake with 
              a strong foundation in web development, programming, and problem-solving.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start ${is4K ? 'gap-8' : isHighRes ? 'gap-6' : 'gap-4'}`}>
              <a href="#projects" className={`btn-primary ${textSizes.button}`}>View My Projects</a>
              <a href="#contact" className={`btn-outline ${textSizes.button}`}>Contact Me</a>
            </div>
          </motion.div>

          {/* Right side content area with code snippets */}
          <motion.div 
            className={`w-full md:w-1/2 mt-12 md:mt-0 relative hidden md:block ${is4K ? 'h-[40rem]' : isHighRes ? 'h-[32rem]' : 'h-96'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Code snippet decoration */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
              <pre className={`${is4K ? 'text-lg md:text-xl' : isHighRes ? 'text-base md:text-lg' : 'text-xs md:text-sm'} font-mono text-primary dark:text-primary-light p-4 bg-white/10 dark:bg-dark/30 backdrop-blur-sm rounded-md transform rotate-3 absolute top-10 right-32 z-20`}>
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
              
              <pre className={`${is4K ? 'text-lg md:text-xl' : isHighRes ? 'text-base md:text-lg' : 'text-xs md:text-sm'} font-mono text-secondary dark:text-secondary-light p-4 bg-white/10 dark:bg-dark/30 rounded-md transform -rotate-2 absolute bottom-10 right-44 z-20`}>
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
          <a href="#about" className={`flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors ${is4K ? 'text-xl' : isHighRes ? 'text-lg' : 'text-sm'}`}>
            <span className="mb-2">Scroll Down</span>
            <FiArrowDown className={`${is4K ? 'text-4xl' : isHighRes ? 'text-3xl' : 'text-xl'}`} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;