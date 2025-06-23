import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
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

          <motion.div 
            className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Decorative blobs */}
              <div className="absolute inset-0 rounded-full bg-primary-light/30 dark:bg-primary-dark/30 animate-float blur-xl"></div>
              
              {/* Profile image */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark flex items-center justify-center overflow-hidden">
                <div className="text-8xl">👨‍💻</div>
              </div>
              
              {/* Removed the floating emojis that were causing lag */}
            </div>
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