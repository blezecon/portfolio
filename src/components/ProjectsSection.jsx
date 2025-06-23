import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiTag } from 'react-icons/fi';

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Sample projects - you should replace these with your actual projects
  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website built with React, Tailwind CSS, and Vite. Features interactive animations and dark/light themes.",
      tags: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
      image: "https://via.placeholder.com/600x400?text=Portfolio+Website",
      github: "#",
      live: "#"
    },
    {
      title: "E-commerce Dashboard",
      description: "Admin dashboard for an e-commerce platform with real-time analytics, inventory management, and order processing features.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      image: "https://via.placeholder.com/600x400?text=E-commerce+Dashboard",
      github: "#",
      live: "#"
    },
    {
      title: "Weather Forecast App",
      description: "A weather application that provides real-time forecasts, historical data, and location-based services.",
      tags: ["JavaScript", "RESTful APIs", "CSS3", "HTML5"],
      image: "https://via.placeholder.com/600x400?text=Weather+App",
      github: "#",
      live: "#"
    },
    {
      title: "Task Management System",
      description: "A collaborative task management platform with user authentication, task assignment, and progress tracking.",
      tags: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
      image: "https://via.placeholder.com/600x400?text=Task+Management",
      github: "#",
      live: "#"
    }
  ];

  const [filter, setFilter] = useState('all');
  
  // Get unique tags for filter buttons
  const allTags = [...new Set(projects.flatMap(project => project.tags))];
  
  // Filter projects based on selected tag
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="py-20 bg-light-dark/50 dark:bg-dark-light/10">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary-DEFAULT text-white'
                : 'bg-light-dark dark:bg-dark-light text-dark-DEFAULT dark:text-light-DEFAULT hover:bg-primary-light/50 dark:hover:bg-primary-dark/50'
            }`}
          >
            All
          </button>
          
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === tag
                  ? 'bg-primary-DEFAULT text-white'
                  : 'bg-light-dark dark:bg-dark-light text-dark-DEFAULT dark:text-light-DEFAULT hover:bg-primary-light/50 dark:hover:bg-primary-dark/50'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              className="card overflow-hidden group"
            >
              <div className="relative overflow-hidden mb-4 rounded-lg h-60">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <div className="flex gap-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dark-light/80 hover:bg-primary-DEFAULT text-white p-3 rounded-full transition-colors"
                      >
                        <FiGithub />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-dark-light/80 hover:bg-primary-DEFAULT text-white p-3 rounded-full transition-colors"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="skill-badge flex items-center gap-1">
                    <FiTag size={12} />
                    {tag}
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

export default ProjectsSection;