import { FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light-dark dark:bg-dark-light py-10">
      <div className="section-container">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <a href="#home" className="text-2xl font-bold text-primary-DEFAULT">
              <span className="font-mono">Blezecon</span>
            </a>
          </div>
          
          <nav className="mb-8">
            <ul className="flex flex-wrap justify-center gap-4 sm:gap-8">
              <li>
                <a 
                  href="#home" 
                  className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="flex gap-6 mb-8">
            <a 
              href="https://github.com/blezecon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a 
              href="https://linkedin.com/in/your-profile" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a 
              href="https://twitter.com/your-handle" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
            <a 
              href="mailto:your-email@example.com" 
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
          
          <div className="text-center text-dark-DEFAULT/70 dark:text-light-DEFAULT/70">
            <p className="flex items-center justify-center gap-1">
              Made with <FiHeart className="text-secondary-DEFAULT" /> by Dipendu Ray
            </p>
            <p className="mt-2">
              &copy; {currentYear} Blezecon. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;