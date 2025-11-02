import React from 'react';
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

  return (
    <div className="flex flex-col justify-center items-center gap-8 md:pt-20 mb-10 pb-6 lg:mt-0 px-4 overflow-hidden ">
      <h1 className="text-5xl md:text-6xl font-bold dark:text-white py-6 caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent text-center">
        My Skills
      </h1>

      {/* Running Tool Strip */}
      <div className="w-full max-w-7xl mx-auto mb-12 overflow-hidden">
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white dark:from-[#1E1E1E] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white dark:from-[#1E1E1E] to-transparent z-10"></div>

          <div className="flex space-x-6 md:space-x-8 animate-marquee">
            {[...toolIcons, ...toolIcons].map((tool, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-w-[70px] md:min-w-[80px] group flex-shrink-0"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center p-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="text-xl md:text-2xl">{tool.icon}</div>
                </div>
                <span className="text-xs font-medium mt-2 text-gray-600 dark:text-gray-300 text-center">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 md:gap-8 place-items-center items-stretch md:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl mx-auto">
        {/* Web Development */}
        <div className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 group">
          <div className="flex items-center gap-3 md:gap-4">
            <FaLaptopCode className="text-3xl md:text-4xl text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Web Development
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  HTML5, CSS3, JavaScript (ES6+)
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Build responsive, semantic, and clean web pages.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Bootstrap, Tailwind CSS
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Create modern, interactive UIs with reusable components.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Responsive Design
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Cross-device and mobile-first development.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Frontend Development */}
        <div className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 group">
          <div className="flex items-center gap-3 md:gap-4">
            <MdOutlineLibraryBooks className="text-yellow-500 text-3xl md:text-4xl dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Frontend Development
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  React
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Build dynamic, component-based single-page applications.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Redux & State Management
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage state efficiently with predictable patterns.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  React Router
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Implement seamless client-side navigation in SPAs.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Backend Development */}
        <div className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 group">
          <div className="flex items-center gap-3 md:gap-4">
            <FaServer className="text-3xl md:text-4xl text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Backend Development
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Node.js & Express.js
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Build fast, scalable, and secure REST APIs.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Authentication
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Implement secure login with JWT & bcrypt.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  API Security
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Implement security best practices and protection.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Generative AI */}
        <div className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 group">
          <div className="flex items-center gap-3 md:gap-4">
            <FaRobot className="text-3xl md:text-4xl text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Generative AI
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  LLM Integration
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Integrate with OpenAI GPT, Claude, and other models.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  AI Agent Development
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Create intelligent agents with reasoning capabilities.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  RAG Systems
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Build AI systems with contextual knowledge retrieval.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Database Management */}
        <div className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 group">
          <div className="flex items-center gap-3 md:gap-4">
            <FaDatabase className="text-3xl md:text-4xl text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Database Management
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  MongoDB & PostgreSQL
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Handle both NoSQL and relational databases.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Database Design
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Design efficient data models and schemas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Performance Optimization
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Query optimization and performance tuning.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Tools & Other Skills */}
        <div className="Roboto flex flex-col justify-between gap-4 md:gap-5 border-2 py-5 md:py-6 px-4 rounded-3xl shadow-lg h-full dark:border-gray-600 dark:shadow-orange-600/20 w-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white dark:bg-gray-800 group">
          <div className="flex items-center gap-3 md:gap-4">
            <FaTools className="text-blue-600 text-3xl md:text-4xl dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-extrabold dark:text-orange-400">
              Tools & Other Skills
            </span>
          </div>
          <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Git & GitHub
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Version control and collaborative development.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  REST API Integration
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Fetching and handling external data in apps.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
              <div>
                <strong className="text-gray-800 dark:text-white text-sm md:text-base">
                  Development Tools
                </strong>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Modern development workflows and tools.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Add custom CSS for the marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default Skills;
