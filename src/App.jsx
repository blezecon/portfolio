import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

// Error fallback component
const ErrorFallback = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-dark-light p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <p className="mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

function App() {
  // Add scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section > div > *').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('section > div > *').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <ParticleBackground />
      <div className="relative min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;