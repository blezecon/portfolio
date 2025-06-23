import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, FiDatabase, FiLayers, FiTool, FiGlobe, FiServer, 
  FiTerminal, FiCloud, FiSmartphone 
} from 'react-icons/fi';

const SkillsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <FiCode />,
      skills: ["C", "JavaScript", "Python", "HTML5", "CSS3"]
    },
    {
      title: "Frontend Development",
      icon: <FiGlobe />,
      skills: ["React", "Tailwind CSS", "W3 CSS", "Responsive Design", "Figma"]
    },
    {
      title: "Backend Development",
      icon: <FiServer />,
      skills: ["Node.js", "Express.js", "MongoDB", "RESTful APIs"]
    },
    {
      title: "Tools & Environments",
      icon: <FiTool />,
      skills: ["Git", "Docker", "Postman", "Vite", "Bash/Shell"]
    },
    {
      title: "Operating Systems",
      icon: <FiTerminal />,
      skills: ["Linux (Arch)", "Windows"]
    },
    {
      title: "Cloud & Services",
      icon: <FiCloud />,
      skills: ["Google Cloud"]
    },
    {
      title: "Mobile Development",
      icon: <FiSmartphone />,
      skills: ["Android Studio", "React Native basics"]
    },
    {
      title: "Data & Analytics",
      icon: <FiDatabase />,
      skills: ["Jupiter Notebook", "Data Analysis basics"]
    },
    {
      title: "Soft Skills",
      icon: <FiLayers />,
      skills: ["Critical Thinking", "Time Management", "Problem-Solving", "Teamwork", "Adaptability"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={item}
              className="card hover:shadow-md hover:shadow-primary-light/20 dark:hover:shadow-primary-dark/20 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-md bg-primary-light/20 dark:bg-primary-dark/20 flex items-center justify-center mr-3">
                  <span className="text-primary-DEFAULT text-xl">{category.icon}</span>
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;