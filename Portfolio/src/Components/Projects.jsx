import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuExternalLink } from 'react-icons/lu';
import { Link } from 'react-router';
import { setDetails } from '../Store/content';

const Projects = () => {
  const projects = useSelector((store) => store.WebDevelopment);
  const DesktopProject = useSelector((store) => store.DesktopDevelopment);
  const ConsoleProject = useSelector((store) => store.ConsoleApp);
  const dishpatcher = useDispatch();

  return (
    <div className="flex flex-col justify-center items-center gap-8 px-4 md:pt-20 lg:pt-25 pb-10">
      <h1 className="text-4xl font-bold dark:text-white py-5 caprasimo">
        My Projects
      </h1>

      <div>
        <h2 className="text-3xl font-bold dark:text-white py-5 caprasimo text-left">
          Web Development
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
          {projects.map((project, index) => (
            <Link to={'/details'}>
              <div
                key={index}
                className="group rounded-2xl shadow-md overflow-hidden dark:shadow-orange-600 duration-800 bg-transparent hover:bg-orange-400 dark:hover:bg-orange-600 hover:scale-105 hover:text-white relative transition-all"
                onClick={() => {
                  dishpatcher(setDetails({ section: 'WEB', ID: project.id }));
                }}
              >
                {/* Image */}
                <div className="h-[250px] w-full">
                  <img
                    src={project.image[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                  />
                </div>

                {/* Text */}
                <div className="p-4">
                  <span
                    className="Roboto text-orange-400 dark:text-orange-600 font-semibold transition-colors duration-300
                 group-hover:text-white group-hover:opacity-30"
                  >
                    {project.title}
                  </span>
                </div>

                <span className="absolute top-1/2 left-1/2 -translate-1/2 hidden group-hover:block cursor-pointer">
                  <span className=" bg-orange-400 Roboto text-[14px] px-15 py-1.5 rounded-[5px] relative text-white dark:bg-orange-600 flex flex-row items-center justify-between gap-2 hover:text-gray-300 ">
                    <span>Visit </span> <LuExternalLink />
                    <div className="h-3 w-3 bg-orange-400 rotate-45 absolute -bottom-1 right-3 dark:bg-orange-600"></div>
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold dark:text-white py-5 caprasimo text-left">
          Desktop Development
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
          {DesktopProject.map((project, index) => (
            <Link to={'/details'}>
              <div
                key={index}
                className="group rounded-2xl shadow-md overflow-hidden dark:shadow-orange-600 duration-800 bg-transparent hover:bg-orange-400 dark:hover:bg-orange-600 hover:scale-105 hover:text-white relative transition-all"
                onClick={() => {
                  dishpatcher(
                    setDetails({ section: 'DESKTOP', ID: project.id })
                  );
                }}
              >
                {/* Image */}
                <div className="lg:h-[250px] w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                  />
                </div>

                {/* Text */}
                <div className="p-4">
                  <span
                    className="Roboto text-orange-400 dark:text-orange-600 font-semibold transition-colors duration-300
                 group-hover:text-white group-hover:opacity-30"
                  >
                    {project.title}
                  </span>
                </div>

                <span className="absolute top-1/2 left-1/2 -translate-1/2 hidden group-hover:block cursor-pointer">
                  <span className=" bg-orange-400 Roboto text-[14px] px-15 py-1.5 rounded-[5px] relative text-white dark:bg-orange-600 flex flex-row items-center justify-between gap-2 hover:text-gray-300 ">
                    <span>Visit </span> <LuExternalLink />
                    <div className="h-3 w-3 bg-orange-400 rotate-45 absolute -bottom-1 right-3 dark:bg-orange-600"></div>
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold dark:text-white py-5 caprasimo text-left">
          Console Base Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
          {ConsoleProject.map((project, index) => (
            <Link to={'/details'}>
              <div
                key={index}
                className="group rounded-2xl shadow-md overflow-hidden dark:shadow-orange-600 duration-800 bg-transparent hover:bg-orange-400 dark:hover:bg-orange-600 hover:scale-105 hover:text-white relative transition-all"
                onClick={() => {
                  dishpatcher(
                    setDetails({ section: 'CONSOLE', ID: project.id })
                  );
                }}
              >
                {/* Image */}
                <div className="lg:h-[250px] w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                  />
                </div>

                {/* Text */}
                <div className="p-4">
                  <span
                    className="Roboto text-orange-400 dark:text-orange-600 font-semibold transition-colors duration-300
                 group-hover:text-white group-hover:opacity-30"
                  >
                    {project.title}
                  </span>
                </div>

                <span className="absolute top-1/2 left-1/2 -translate-1/2 hidden group-hover:block cursor-pointer">
                  <span className=" bg-orange-400 Roboto text-[14px] px-15 py-1.5 rounded-[5px] relative text-white dark:bg-orange-600 flex flex-row items-center justify-between gap-2 hover:text-gray-300 ">
                    <span>Visit </span> <LuExternalLink />
                    <div className="h-3 w-3 bg-orange-400 rotate-45 absolute -bottom-1 right-3 dark:bg-orange-600"></div>
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
