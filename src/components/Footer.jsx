import { FiHeart, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light-dark dark:bg-dark-light py-10">
      <div className="section-container">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <a href="#home" className="text-3xl font-bold text-primary-DEFAULT">
              <span className="font-minecraft">BLEZECON</span>
            </a>
          </div>
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
              href="https://www.linkedin.com/in/blezecon7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
            <a 
              href="https://x.com/blezecon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="Twitter"
            >
              <FiTwitter />
            </a>
            <a 
              href="mailto:blezecon007x@outlook.com?subject=Hello&body=Hi%20there!" 
              className="text-dark-DEFAULT dark:text-light-DEFAULT hover:text-primary-DEFAULT dark:hover:text-primary-DEFAULT transition-colors text-xl"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
          <div className="text-center text-dark-DEFAULT/70 dark:text-light-DEFAULT/70">
            <p className="mt-2">
              &copy; {currentYear} Blezecon. All Rights Reserved.
            </p>
            
            {/* Attribution for 3D Model */}
            <p className="mt-4 text-sm border-t border-dark/10 dark:border-light/10 pt-4 max-w-md mx-auto">
              3D Model by <a 
                href="https://sketchfab.com/DualVission" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-DEFAULT hover:underline"
              >
                DualVission
              </a>, licensed under <a 
                href="https://creativecommons.org/licenses/by/4.0/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-DEFAULT hover:underline"
              >
                CC BY 4.0
              </a>
            </p>
            
            <p className="mt-1 text-xs">
              Last updated: 2025-06-25
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;