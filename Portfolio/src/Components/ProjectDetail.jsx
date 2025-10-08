import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegFileCode } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { Link } from 'react-router';

const ProjectDetail = () => {
  const DATA = useSelector((store) => store.PDetail);
  const [current, setCurrent] = useState(0);
  function nextImage(params) {
    setCurrent((prev) => (prev + 1) % DATA.image.length);
  }

  function prevImage() {
    setCurrent((prev) => (prev === 0 ? DATA.image.length - 1 : prev - 1));
  }

  return (
    <div className=" flex flex-col px-4 py-8 md:pt-20 lg:pt-25 gap-5">
      <div className="flex flex-col justify-center items-center gap-8  ">
        <h1 className="text-4xl font-bold dark:text-white caprasimo">
          {DATA.title}
        </h1>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-6 max-w-5xl w-full Roboto">
          {/* Project Image */}

          <div className="relative w-full md:w-[70%] lg:w-1/2 mx-auto">
            <img
              src={DATA.image[current]}
              alt={DATA.title}
              className="w-full h-64 md:h-80 lg:h-96 rounded-2xl shadow-lg object-cover object-center"
            />
            {DATA.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 cursor-pointer"
                >
                  &#8592;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 cursor-pointer"
                >
                  &#8594;
                </button>
              </>
            )}
          </div>

          {/* Project Info */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className="flex justify-between w-full">
              {DATA.link && (
                <a
                  href={DATA.link}
                  target="_blank"
                  className="flex items-center text-[16px] gap-1 border px-4 py-0.5 rounded-[5px] shadow-md hover:scale-105 cursor-pointer transition-all duration-200 ease-in dark:shadow-orange-600 text-orange-600"
                >
                  <span className="text-[12px]">Live Here</span> <IoIosLink />
                </a>
              )}
              <a
                href={DATA.github}
                target="_blank"
                className="flex items-center text-[16px] gap-1 border px-4 py-0.5 rounded-[5px] shadow-md hover:scale-105 cursor-pointer transition-all duration-200 ease-in dark:shadow-orange-600 text-orange-600"
              >
                <span className="text-[12px]">GitHub</span> <FaRegFileCode />
              </a>
            </div>
            <p className="text-gray-700 dark:text-gray-200 text-lg text-[16px]">
              {DATA.summary}
            </p>

            {/* Tech Stack */}

            <div>
              <h3 className="text-xl font-semibold dark:text-orange-500">
                Tech Stack:
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-[14px]">
                {DATA.techStack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {DATA.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-orange-100 text-orange-700 dark:bg-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link to={'/projects'} className=" flex-row-reverse hidden md:flex">
        <span className="  w-[100px] text-center px-5 py-0.75 bg-orange-400 dark:bg-orange-600 rounded-[5px] text-white Roboto text-[14px]  hover:scale-105 transition-all ease-in-out duration-400 shadow-md">
          Back
        </span>
      </Link>
    </div>
  );
};

export default ProjectDetail;
