import React from 'react';
import {
  FaCode,
  FaLaptopCode,
  FaTools,
  FaServer,
  FaDatabase,
  FaCloud,
  FaRobot,
} from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';

const Skills = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 md:pt-20 mb-10 lg:mt-0">
      <h1 className="text-4xl font-bold dark:text-white py-5 caprasimo">
        {' '}
        My Skills
      </h1>

      <div className="grid h-auto gap-8 place-items-center items-stretch md:grid-cols-2 lg:grid-cols-3 w-auto ">
        {/* Web Development */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaLaptopCode className="text-4xl text-purple-500 mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Web Development
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>HTML5, CSS3, JavaScript (ES6+)</strong> <br /> Build
              responsive, semantic, and clean web pages.
            </li>
            <li>
              <strong>Bootstrap, Tailwind CSS</strong> <br /> Create modern,
              interactive UIs with reusable components.
            </li>
            <li>
              <strong>Responsive Design</strong> <br /> Cross-device and
              mobile-first development.
            </li>
            <li>
              <strong>Performance Optimization</strong> <br /> Optimize loading
              times and user experience.
            </li>
          </ul>
        </div>

        {/* Frontend Libraries */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <MdOutlineLibraryBooks className="text-yellow-500 text-4xl mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Frontend Development
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>React</strong> <br /> Build dynamic, component-based
              single-page applications (SPAs).
            </li>
            <li>
              <strong>React Router</strong> <br /> Implement seamless
              client-side navigation in SPAs.
            </li>
            <li>
              <strong>Redux & Redux Toolkit</strong> <br /> Manage state
              efficiently with predictable patterns.
            </li>
            <li>
              <strong>State Management</strong> <br /> Advanced state handling
              with Context API and hooks.
            </li>
          </ul>
        </div>

        {/* Backend Development */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaServer className="text-4xl text-green-700 mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Backend Development
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Node.js & Express.js</strong> <br /> Build fast, scalable,
              and secure REST APIs.
            </li>
            <li>
              <strong>Authentication</strong> <br /> Implement secure login
              systems with JWT & bcrypt.
            </li>
            <li>
              <strong>Middleware</strong> <br /> Manage routes, errors, and
              requests efficiently.
            </li>
            <li>
              <strong>API Security</strong> <br /> Implement security best
              practices and protection.
            </li>
          </ul>
        </div>

        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaRobot className="text-4xl text-red-500 mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Generative AI
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>LLM Integration</strong> <br /> Integrate with OpenAI GPT,
              Claude, and other large language models
            </li>
            <li>
              <strong>AI Agent Development</strong> <br /> Create intelligent
              agents with reasoning capabilities
            </li>
            <li>
              <strong>Vector Databases</strong> <br /> Work with Pinecone for
              efficient similarity search
            </li>
            <li>
              <strong>RAG (Retrieval-Augmented Generation)</strong> <br /> Build
              AI systems with contextual knowledge retrieval
            </li>
          </ul>
        </div>

        {/* Database Management */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaDatabase className="text-4xl text-blue-500 mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Database Management
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>MongoDB & Mongoose</strong> <br /> Handle flexible NoSQL
              data models with schema validation.
            </li>
            <li>
              <strong>PostgreSQL</strong> <br /> Design and query relational
              databases using SQL.
            </li>
            <li>
              <strong>CRUD Operations</strong> <br /> Efficiently manage data
              with robust query handling.
            </li>
            <li>
              <strong>Database Optimization</strong> <br /> Performance tuning
              and query optimization techniques.
            </li>
          </ul>
        </div>

        {/* Cloud & Real-Time Services */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaCloud className="text-4xl text-sky-500 mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Cloud & Real-Time
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Cloudinary</strong> <br /> Store and optimize
              images/videos in the cloud.
            </li>
            <li>
              <strong>WebSocket & Socket.io</strong> <br /> Enable real-time
              communication in chat or notification systems.
            </li>
            <li>
              <strong>Deployment</strong> <br /> Deploy full-stack apps using
              Vercel, Render, or Netlify.
            </li>
            <li>
              <strong>Cloud Services</strong> <br /> Integrate various cloud
              platforms and services.
            </li>
          </ul>
        </div>

        {/* Programming & Problem Solving */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaCode className="text-green-500 text-4xl mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Programming & Problem Solving
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>C++, Python, C</strong> <br /> Strong foundation across
              languages.
            </li>
            <li>
              <strong>OOP</strong> <br /> Modular, reusable, and scalable code
              design.
            </li>
            <li>
              <strong>DSA</strong> <br /> Efficient algorithms & data
              structures.
            </li>
            <li>
              <strong>Competitive Programming</strong> <br /> Logical and fast
              problem-solving.
            </li>
          </ul>
        </div>

        {/* Tools & Other Skills */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaTools className="text-blue-700 text-4xl mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">
            Tools & Other Skills
          </span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Git & GitHub</strong> <br /> Version control and
              collaborative development.
            </li>
            <li>
              <strong>REST API Integration</strong> <br /> Fetching and handling
              external data in apps.
            </li>
            <li>
              <strong>Wireshark</strong> <br /> Network packet analysis and
              troubleshooting.
            </li>
            <li>
              <strong>Development Tools</strong> <br /> Proficiency with modern
              development workflows and tools.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
