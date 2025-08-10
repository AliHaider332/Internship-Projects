import React from 'react';
import { FaCode, FaLaptopCode, FaTools } from 'react-icons/fa';
import { MdOutlineLibraryBooks } from 'react-icons/md';

const Skills = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 md:pt-20 mb-5 lg:mt-0">
      <h1 className="text-4xl font-bold dark:text-white py-5 caprasimo"> My Skills</h1>

      <div className="grid h-auto gap-8 place-items-center items-stretch md:grid-cols-2 lg:grid-cols-3 w-auto ">

        {/* Web Development */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaLaptopCode className="text-4xl text-purple-500 mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">Web Development</span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>HTML5, CSS3, JavaScript (ES6+)</strong> <br /> Build responsive, semantic, and clean web pages.</li>
            <li><strong>Bootstrap, Tailwind CSS</strong> <br /> Create modern, interactive UIs with reusable components.</li>
            <li><strong>Responsive Design</strong> <br /> Cross-device and mobile-first development.</li>
          </ul>
        </div>

        {/* Frontend Libraries */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <MdOutlineLibraryBooks className="text-yellow-500 text-4xl mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">Frontend Libraries</span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>React</strong> <br /> Build dynamic, component-based single-page applications (SPAs).</li>
            <li><strong>React Router</strong> <br /> Implement seamless client-side navigation in SPAs.</li>
            <li><strong>Redux & Redux Toolkit</strong> <br /> Manage state efficiently with predictable patterns.</li>
          </ul>
        </div>

        {/* Programming & Problem Solving */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaCode className="text-green-500 text-4xl mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">Programming & Problem Solving</span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>C++, Python, C</strong> <br /> Strong foundation across languages.</li>
            <li><strong>OOP</strong> <br /> Modular, reusable, and scalable code design.</li>
            <li><strong>DSA</strong> <br /> Efficient algorithms & data structures.</li>
            <li><strong>Competitive Programming</strong> <br /> Logical and fast problem-solving.</li>
          </ul>
        </div>

        {/* Tools & Other Skills */}
        <div className="Roboto flex flex-col justify-between gap-5 border py-5 px-3 rounded-2xl shadow-lg h-full dark:border-white dark:shadow-orange-600 w-full cursor-pointer transition-transform duration-1000 hover:scale-105 hover:shadow-2xl">
          <FaTools className="text-blue-700 text-4xl mb-4 dark:text-white" />
          <span className="text-3xl font-extrabold dark:text-orange-600">Tools & Other Skills</span>
          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Git & GitHub</strong> <br /> Version control and collaborative development.</li>
            <li><strong>REST API Integration</strong> <br /> Fetching and handling external data in apps.</li>
            <li><strong>Wireshark</strong> <br /> Network packet analysis and troubleshooting.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Skills;
