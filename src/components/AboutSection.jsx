import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUser, FiCode, FiBook, FiAward } from 'react-icons/fi';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg">
              I'm a second-year student at <span className="font-semibold">Techno Main SaltLake</span>, 
              passionate about web development and software engineering. As a creative problem-solver 
              with a keen eye for detail, I enjoy building modern web applications and exploring new technologies.
            </p>
            <p className="text-lg">
              My journey in programming began with C, and I've since expanded my skills to include a wide range 
              of technologies including JavaScript, React, Node.js, and Python. I'm particularly interested in 
              creating responsive, user-friendly interfaces and robust backend systems.
            </p>
            <p className="text-lg">
              When I'm not coding, I enjoy exploring new programming concepts, contributing to open-source 
              projects, and continuously improving my skills through hands-on projects.
            </p>
            
            <div className="pt-4">
              <a href="#contact" className="btn-primary">Get In Touch</a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="card flex flex-col items-center text-center p-6 hover:border-l-4 hover:border-primary transition-all">
              <div className="w-16 h-16 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center mb-4">
                <FiUser className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personal</h3>
              <p>A creative and analytical mind with a passion for technology and innovation.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6 hover:border-l-4 hover:border-primary transition-all">
              <div className="w-16 h-16 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center mb-4">
                <FiCode className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Development</h3>
              <p>Skilled in frontend and backend technologies with a focus on user experience.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6 hover:border-l-4 hover:border-primary transition-all">
              <div className="w-16 h-16 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center mb-4">
                <FiBook className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Education</h3>
              <p>Pursuing a degree in Computer Science at Techno Main SaltLake.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center p-6 hover:border-l-4 hover:border-primary transition-all">
              <div className="w-16 h-16 rounded-full bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center mb-4">
                <FiAward className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soft Skills</h3>
              <p>Critical thinking, time management, problem-solving, teamwork, adaptability.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;