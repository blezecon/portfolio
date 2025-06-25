import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiTag } from 'react-icons/fi';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Sample projects - you should replace these with your actual projects 600*400
  const projects = [
    {
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website built with React, Tailwind CSS, and Vite. Features interactive animations and dark/light themes.",
      tags: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
      image: "https://i.ibb.co/WWfK5DpG/New-Project-4.png",
      github: "https://www.youtube.com/watch?v=xvFZjo5PgG0"
    },
    {
      title: "Retro game",
      description: " A retro-style game built with Pygame, featuring classic gameplay mechanics and pixel art graphics.",
      tags: ["Python", "Pygame"],
      image: "https://i.ibb.co/vCdtTDKC/retro.png",
      github: "https://github.com/blezecon/PyGame",
      
    },
    {
      title: "Chat web app",
      description: "A real-time chat application using WebSockets, allowing users to join rooms and send messages instantly.",
      tags: ["React", "RESTful APIs", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Vite"],
      image: "https://i.ibb.co/3mXx3Fcc/New-Project.png",
      github: "https://github.com/blezecon/ChatApp",
      // live: "#"
    },
    {
      title: "Service Website Clone",
      description: " Just made this for learning purpose, a clone of a service website with a focus on responsive design and user experience.",
      tags: ["React", "Vite", "Tailwind CSS"],
      image: "https://i.ibb.co/ccZ8XW6r/Idk.png",
      github: "https://github.com/blezecon/Tech-Company-Clone"
    },
    // Additional projects as mentioned in your request
    {
      title: "Nike First Copy",
      description: "A clone of the Nike website showcasing first copy products with a focus on responsive design and user experience.",
      tags: ["React", "CSS3", "Vite"],
      image: "https://i.ibb.co/qLPTVZN8/nike.png",
      github: "https://github.com/blezecon/Nike-First-Copy"
    },
    {
      title: "Quote Generator",
      description: "A web application that generates random quotes with a simple and elegant design, allowing users to share their favorite quotes.",
      tags: ["HTML5", "CSS3", "API Integration", "JavaScript"],
      image: "https://i.ibb.co/1GTmnpnW/Quote.png",
      github: "https://github.com/blezecon/Quote-generator"
    },
    {
      title: "Recipe Finder",
      description: "A recipe discovery Web that allows users to search for recipes based on ingredients, dietary preferences, and cooking time.",
      tags: ["HTML5", "CSS3", "API Integration", "JavaScript"],
      image: "https://i.ibb.co/1G5f1y2Y/New-Project-1.png",
      github: "https://github.com/blezecon/Recipe-Finder"
    },
    {
      title: "Qr Code Generator",
      description: " Can Generate QR codes for URLs, text",
      tags: ["HTML5", "CSS3", "API Integration", "JavaScript"],
      image: "https://i.ibb.co/hxxfDLF4/New-Project-2.png",
      github: "https://github.com/blezecon/Qr-Code-generator"
    },
    {
      title: "Image generator",
      description: "A web application that generates images based on user input or predefined templates",
      tags: ["HTML5", "CSS3", "API Integration", "JavaScript"],
      image: "https://i.ibb.co/6dphr0H/New-Project-3.pngc",
      github: "https://github.com/blezecon/Image-Generator"
    },
    {
      title: "Weather Forecast App",
      description: "A weather forecasting application that provides real-time weather updates and forecasts for any location.",
      tags: ["HTML5", "CSS3", "API Integration", "JavaScript"],
      image: "https://i.ibb.co/twb3TP9X/New-Project.png",
      github: "https://github.com/blezecon/Weather-Checker"
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
            className={`filter-button ${
              filter === 'all'
                ? 'filter-button-active'
                : 'filter-button-inactive'
            }`}
          >
            All
          </button>
          
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`filter-button ${
                filter === tag
                  ? 'filter-button-active'
                  : 'filter-button-inactive'
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
          className="w-full"
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1536: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {filteredProjects.map((project, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  variants={item}
                  className="card overflow-hidden group h-full"
                >
                  <div className="relative overflow-hidden mb-4 rounded-lg h-60">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
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
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;