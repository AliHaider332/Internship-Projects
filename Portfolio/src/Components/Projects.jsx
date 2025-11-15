import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuExternalLink, LuGithub } from 'react-icons/lu';
import { Link } from 'react-router';
import { setDetails } from '../Store/content';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProjectCard = ({ project, section, onSelect, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, threshold: 0.1 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link to="/details" key={project.id}>
        <div
          className="group relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-orange-600/10 
               overflow-hidden border border-gray-200 dark:border-gray-700
               hover:scale-105 hover:shadow-2xl dark:hover:shadow-orange-600/20 
               transition-all duration-500 ease-out cursor-pointer h-full flex flex-col"
          onClick={() => onSelect(section, project.id)}
        >
          {/* Category Badge - Top Left */}
          <motion.div 
            className="absolute top-3 left-3 z-10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600 capitalize">
              {section.toLowerCase()}
            </span>
          </motion.div>

          {/* Featured Badge - Top Left (if featured) */}
          {project.featured && (
            <motion.div 
              className="absolute top-12 left-3 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            >
              <span className="px-2 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded shadow-lg flex items-center gap-1">
                <motion.span
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  ⭐
                </motion.span>
                FEATURED
              </span>
            </motion.div>
          )}

          {/* Image Container with Gradient Overlay */}
          <div className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            <motion.img
              src={
                Array.isArray(project.image) ? project.image[0] : project.image
              }
              alt={project.title}
              className="w-full h-full object-contain transition-all duration-500 
                   group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
            />
            {/* Gradient Overlay on Hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            <motion.h3
              className="Roboto font-bold text-lg sm:text-xl text-gray-800 dark:text-white 
                     transition-colors duration-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 mb-2 sm:mb-3 line-clamp-2"
              whileHover={{ color: "#ea580c" }}
            >
              {project.title}
            </motion.h3>

            {/* Optional description */}
            {project.description && (
              <motion.p 
                className="Roboto text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {project.description}
              </motion.p>
            )}

            {/* Tech Stack Tags */}
            {project.techStack && (
              <motion.div 
                className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4"
                layout
              >
                {project.techStack.slice(0, 3).map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 
                           text-xs rounded-full font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + techIndex * 0.1 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#fed7aa" }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.techStack.length > 3 && (
                  <motion.span 
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    +{project.techStack.length - 3}
                  </motion.span>
                )}
              </motion.div>
            )}

            {/* Project Links */}
            <motion.div 
              className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.span 
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium"
                whileHover={{ color: "#ea580c" }}
              >
                View Details
              </motion.span>
              <div className="flex items-center gap-1 sm:gap-2">
                {project.github && (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                    className="p-1 sm:p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 
                           transition-colors duration-200"
                    title="View Code"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LuGithub size={14} className="text-gray-600 dark:text-gray-300" />
                  </motion.button>
                )}
                {project.liveLink && (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(project.liveLink, '_blank');
                    }}
                    className="p-1 sm:p-2 bg-orange-500 dark:bg-orange-600 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-700 
                           transition-colors duration-200"
                    title="Live Demo"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LuExternalLink size={14} className="text-white" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-500/5 opacity-0 
                    group-hover:opacity-100 pointer-events-none"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectSection = ({ title, projects, section, onSelect }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto mb-8 sm:mb-16"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4">
          <motion.div 
            className="w-1 h-8 sm:h-12 bg-orange-500 rounded-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold dark:text-white caprasimo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {title}
          </motion.h2>
        </div>
        <motion.span 
          className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full self-start sm:self-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
        </motion.span>
      </div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        layout
      >
        <AnimatePresence>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              section={section}
              onSelect={onSelect}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Section Divider */}
      {section !== 'CONSOLE' && (
        <motion.div 
          className="mt-8 sm:mt-12 border-b border-gray-200 dark:border-gray-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      )}
    </motion.section>
  );
};

const Projects = () => {
  const dispatcher = useDispatch();
  const webProjects = useSelector((state) => state.WebDevelopment);
  const desktopProjects = useSelector((state) => state.DesktopDevelopment);
  const consoleProjects = useSelector((state) => state.ConsoleApp);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const containerRef = useRef(null);

  const handleSelect = (section, ID) => {
    dispatcher(setDetails({ section, ID }));
  };

  // Update window height on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter out empty sections
  const hasWebProjects = webProjects && webProjects.length > 0;
  const hasDesktopProjects = desktopProjects && desktopProjects.length > 0;
  const hasConsoleProjects = consoleProjects && consoleProjects.length > 0;

  const isShortScreen = windowHeight < 700;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col justify-start items-center gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 ${
        isShortScreen ? 'py-4 min-h-0' : 'py-8 md:pt-20'
      } mb-8 lg:mt-0 max-w-full overflow-x-hidden`}
      style={{ minHeight: isShortScreen ? 'auto' : '100vh' }}
    >
      {/* Header Section - Compact for short screens */}
      <motion.div 
        className={`text-center max-w-4xl mx-auto w-full ${
          isShortScreen ? 'mb-4' : 'mb-8'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className={`font-bold dark:text-white caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent ${
            isShortScreen ? 'text-3xl sm:text-4xl py-2' : 'text-4xl sm:text-5xl md:text-6xl py-4 sm:py-6'
          }`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          My Projects
        </motion.h1>
        <motion.p 
          className={`text-gray-600 dark:text-gray-300 Roboto max-w-2xl mx-auto ${
            isShortScreen ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          A collection of my work across different platforms and technologies. 
          Each project represents unique challenges and learning experiences.
        </motion.p>
      </motion.div>

      {/* Projects Sections with conditional spacing */}
      <motion.div 
        className="w-full space-y-8 sm:space-y-12 md:space-y-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {hasWebProjects && (
          <ProjectSection
            title="Web Development"
            projects={webProjects}
            section="WEB"
            onSelect={handleSelect}
          />
        )}

        {hasDesktopProjects && (
          <ProjectSection
            title="Desktop Applications"
            projects={desktopProjects}
            section="DESKTOP"
            onSelect={handleSelect}
          />
        )}

        {hasConsoleProjects && (
          <ProjectSection
            title="Console Applications"
            projects={consoleProjects}
            section="CONSOLE"
            onSelect={handleSelect}
          />
        )}

        {/* Empty State */}
        {!hasWebProjects && !hasDesktopProjects && !hasConsoleProjects && (
          <motion.div 
            className={`text-center ${
              isShortScreen ? 'py-10' : 'py-16 sm:py-20'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className={`${isShortScreen ? 'text-4xl' : 'text-6xl'} mb-3 sm:mb-4`}
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚧
            </motion.div>
            <h3 className={`font-bold dark:text-white mb-2 ${
              isShortScreen ? 'text-xl' : 'text-2xl'
            }`}>
              Projects Under Construction
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              New projects are being added soon!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Call to Action - Only show if there's space */}
      {!isShortScreen && (
        <motion.div 
          className="text-center max-w-2xl mx-auto mt-4 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-gray-600 dark:text-gray-300 Roboto mb-3 sm:mb-4 text-sm sm:text-base">
            Interested in collaborating or have a project in mind?
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                     text-white font-medium px-5 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 hover:shadow-lg text-sm sm:text-base shadow-lg"
            >
              Let's Work Together
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <LuExternalLink size={16} />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Projects;