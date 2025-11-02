import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LuExternalLink } from 'react-icons/lu';
import { Link } from 'react-router';
import { setDetails } from '../Store/content';

const ProjectCard = ({ project, section, onSelect }) => {
  return (
    <Link to="/details" key={project.id}>
      <div
        className="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-orange-600/20 
             overflow-hidden border border-gray-200 dark:border-orange-600/30
             hover:scale-105 hover:shadow-xl dark:hover:shadow-orange-600/30 
             transition-all duration-300 ease-out cursor-pointer"
        onClick={() => onSelect(section, project.id)}
      >
        {/* Image Container */}
        <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2">
          <img
            src={
              Array.isArray(project.image) ? project.image[0] : project.image
            }
            alt={project.title}
            className="w-full h-full object-contain transition-all duration-300 
                 group-hover:scale-110 group-hover:opacity-70"
          />
        </div>

        {/* Content */}
        <div className="p-4 relative z-10 bg-white dark:bg-gray-900">
          <h3
            className="Roboto font-semibold text-gray-800 dark:text-white 
                   transition-colors duration-300 group-hover:text-orange-600 dark:group-hover:text-orange-400"
          >
            {project.title}
          </h3>

          {/* Optional description */}
          {project.description && (
            <p className="Roboto text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
              {project.description}
            </p>
          )}
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-orange-500 dark:bg-orange-600 opacity-0 
                  group-hover:opacity-10 transition-opacity duration-300"
        />

        {/* Visit Button */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  opacity-0 group-hover:opacity-100 transition-all duration-300 
                  scale-90 group-hover:scale-100"
        >
          <span
            className="bg-orange-500 dark:bg-orange-600 text-white Roboto font-medium 
                     text-sm px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 
                     hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
          >
            Visit Project
            <LuExternalLink size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProjectSection = ({ title, projects, section, onSelect }) => (
  <div className="w-full max-w-6xl">
    <h2 className="text-3xl font-bold dark:text-white py-5 caprasimo text-left">
      {title}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          section={section}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>
);

const Projects = () => {
  const dispatcher = useDispatch();
  const webProjects = useSelector((state) => state.WebDevelopment);
  const desktopProjects = useSelector((state) => state.DesktopDevelopment);
  const consoleProjects = useSelector((state) => state.ConsoleApp);

  const handleSelect = (section, ID) => {
    dispatcher(setDetails({ section, ID }));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 px-4 md:pt-20 mb-10 lg:mt-0">
      <h1 className="text-4xl font-bold dark:text-white py-5 caprasimo">
        My Projects
      </h1>

      <ProjectSection
        title="Web Development"
        projects={webProjects}
        section="WEB"
        onSelect={handleSelect}
      />

      <ProjectSection
        title="Desktop Development"
        projects={desktopProjects}
        section="DESKTOP"
        onSelect={handleSelect}
      />

      <ProjectSection
        title="Console Base Projects"
        projects={consoleProjects}
        section="CONSOLE"
        onSelect={handleSelect}
      />
    </div>
  );
};

export default Projects;
