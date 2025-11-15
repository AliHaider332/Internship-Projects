import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaCode,
  FaLaptopCode,
  FaTools,
  FaServer,
  FaDatabase,
  FaCloud,
  FaRobot,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaPython,
  FaBootstrap,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiCplusplus,
  SiOpenai,
  SiCloudinary,
  SiSocketdotio,
} from 'react-icons/si';
import { MdOutlineLibraryBooks } from 'react-icons/md';

const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  // Tool icons data for the running strip using React Icons
  const toolIcons = [
    { name: 'HTML5', icon: <SiHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <SiCss3 className="text-blue-500" /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> },
    { name: 'React', icon: <FaReact className="text-cyan-400" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
    {
      name: 'Express',
      icon: <SiExpress className="text-gray-800 dark:text-white" />,
    },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-600" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-500" /> },
    { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-500" /> },
    { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
    { name: 'Python', icon: <FaPython className="text-blue-400" /> },
    { name: 'C++', icon: <SiCplusplus className="text-blue-600" /> },
    { name: 'OpenAI', icon: <SiOpenai className="text-green-600" /> },
    { name: 'Cloudinary', icon: <SiCloudinary className="text-blue-400" /> },
    {
      name: 'Socket.io',
      icon: <SiSocketdotio className="text-black dark:text-white" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="flex flex-col justify-center items-center min-h-screen w-full px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="text-center max-w-4xl mx-auto w-full mb-8 sm:mb-12"
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold dark:text-white py-4 sm:py-6 caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Skills
        </motion.h1>
        <motion.p 
          className="text-gray-600 dark:text-gray-300 Roboto text-base sm:text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Technologies and tools I use to bring ideas to life
        </motion.p>
      </motion.div>

      {/* Running Tool Strip */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-7xl mx-auto mb-12 sm:mb-16 overflow-hidden"
      >
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-[#1E1E1E] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-[#1E1E1E] to-transparent z-10"></div>

          <motion.div 
            className="flex space-x-6 md:space-x-8"
            animate={{ 
              x: [0, -((toolIcons.length * 90) / 2)]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              }
            }}
          >
            {[...toolIcons, ...toolIcons].map((tool, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] group flex-shrink-0"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center p-2 border border-gray-200 dark:border-gray-700"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="text-xl md:text-2xl">{tool.icon}</div>
                </motion.div>
                <motion.span 
                  className="text-xs font-medium mt-2 text-gray-600 dark:text-gray-300 text-center"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {tool.name}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div 
        className="grid gap-6 md:gap-8 place-items-center items-stretch md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto"
        variants={containerVariants}
      >
        {/* Web Development */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer bg-white dark:bg-gray-800 group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div variants={iconVariants}>
              <FaLaptopCode className="text-3xl md:text-4xl text-purple-500 dark:text-purple-400" />
            </motion.div>
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Web Development
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            {[
              {
                strong: "HTML5, CSS3, JavaScript (ES6+)",
                p: "Build responsive, semantic, and clean web pages."
              },
              {
                strong: "Bootstrap, Tailwind CSS",
                p: "Create modern, interactive UIs with reusable components."
              },
              {
                strong: "Responsive Design",
                p: "Cross-device and mobile-first development."
              }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <motion.span 
                  className="text-green-500 mt-1 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  •
                </motion.span>
                <div>
                  <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                    {item.strong}
                  </strong>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.p}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Frontend Development */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer bg-white dark:bg-gray-800 group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div variants={iconVariants}>
              <MdOutlineLibraryBooks className="text-yellow-500 text-3xl md:text-4xl dark:text-yellow-400" />
            </motion.div>
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Frontend Development
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            {[
              {
                strong: "React",
                p: "Build dynamic, component-based single-page applications."
              },
              {
                strong: "Redux & State Management",
                p: "Manage state efficiently with predictable patterns."
              },
              {
                strong: "React Router",
                p: "Implement seamless client-side navigation in SPAs."
              }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <motion.span 
                  className="text-green-500 mt-1 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  •
                </motion.span>
                <div>
                  <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                    {item.strong}
                  </strong>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.p}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Backend Development */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer bg-white dark:bg-gray-800 group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div variants={iconVariants}>
              <FaServer className="text-3xl md:text-4xl text-green-600 dark:text-green-400" />
            </motion.div>
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Backend Development
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            {[
              {
                strong: "Node.js & Express.js",
                p: "Build fast, scalable, and secure REST APIs."
              },
              {
                strong: "Authentication",
                p: "Implement secure login with JWT & bcrypt."
              },
              {
                strong: "API Security",
                p: "Implement security best practices and protection."
              }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <motion.span 
                  className="text-green-500 mt-1 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  •
                </motion.span>
                <div>
                  <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                    {item.strong}
                  </strong>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.p}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Generative AI */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer bg-white dark:bg-gray-800 group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div variants={iconVariants}>
              <FaRobot className="text-3xl md:text-4xl text-red-500 dark:text-red-400" />
            </motion.div>
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Generative AI
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            {[
              {
                strong: "LLM Integration",
                p: "Integrate with OpenAI GPT, Claude, and other models."
              },
              {
                strong: "AI Agent Development",
                p: "Create intelligent agents with reasoning capabilities."
              },
              {
                strong: "RAG Systems",
                p: "Build AI systems with contextual knowledge retrieval."
              }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <motion.span 
                  className="text-green-500 mt-1 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  •
                </motion.span>
                <div>
                  <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                    {item.strong}
                  </strong>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.p}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Database Management */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer bg-white dark:bg-gray-800 group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div variants={iconVariants}>
              <FaDatabase className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400" />
            </motion.div>
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Database Management
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            {[
              {
                strong: "MongoDB & PostgreSQL",
                p: "Handle both NoSQL and relational databases."
              },
              {
                strong: "Database Design",
                p: "Design efficient data models and schemas."
              },
              {
                strong: "Performance Optimization",
                p: "Query optimization and performance tuning."
              }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <motion.span 
                  className="text-green-500 mt-1 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  •
                </motion.span>
                <div>
                  <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                    {item.strong}
                  </strong>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.p}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Tools & Other Skills */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer bg-white dark:bg-gray-800 group"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div variants={iconVariants}>
              <FaTools className="text-blue-600 text-3xl md:text-4xl dark:text-blue-400" />
            </motion.div>
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Tools & Other Skills
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            {[
              {
                strong: "Git & GitHub",
                p: "Version control and collaborative development."
              },
              {
                strong: "REST API Integration",
                p: "Fetching and handling external data in apps."
              },
              {
                strong: "Development Tools",
                p: "Modern development workflows and tools."
              }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <motion.span 
                  className="text-green-500 mt-1 flex-shrink-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  •
                </motion.span>
                <div>
                  <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                    {item.strong}
                  </strong>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {item.p}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;