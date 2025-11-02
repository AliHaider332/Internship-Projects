import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegFileCode } from 'react-icons/fa';
import { IoIosLink } from 'react-icons/io';
import { Link } from 'react-router';

const ProjectDetail = () => {
  const DATA = useSelector((store) => store.PDetail);
  const [current, setCurrent] = useState(0);

  function nextImage() {
    setCurrent((prev) => (prev + 1) % DATA.image.length);
  }

  function prevImage() {
    setCurrent((prev) => (prev === 0 ? DATA.image.length - 1 : prev - 1));
  }

  return (
    <div className="flex flex-col px-4 py-8 md:pt-20 lg:pt-28 xl:pt-32 gap-10">
      <div className="flex flex-col justify-center items-center gap-10 w-full">
      <h1 className="text-5xl md:text-6xl font-bold dark:text-white py-6 caprasimo bg-gradient-to-r from-gray-800 to-orange-600 dark:from-white dark:to-orange-400 bg-clip-text text-transparent">
          {DATA.title}
        </h1>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 xl:gap-20 max-w-[1400px] w-full mx-auto Roboto">
          {/* Image Section */}
          <div className="relative w-full lg:w-[60%] xl:w-[55%] mx-auto flex justify-center group">
            <img
              src={DATA.image[current]}
              alt={DATA.title}
              className="w-full h-auto max-h-[650px] rounded-2xl shadow-2xl object-contain bg-gray-50 transition-all duration-300"
            />

            {/* Navigation Buttons (Show on Hover) */}
            {DATA.image.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-gray-900/60 to-gray-700/30 text-white backdrop-blur-sm hover:scale-110 rounded-full p-3 cursor-pointer shadow-lg transition-all duration-300"
                >
                  <span className="text-2xl font-bold select-none">
                    {'\u2039'}
                  </span>
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gradient-to-l from-gray-900/60 to-gray-700/30 text-white backdrop-blur-sm hover:scale-110 rounded-full p-3 cursor-pointer shadow-lg transition-all duration-300"
                >
                  <span className="text-2xl font-bold select-none">
                    {'\u203A'}
                  </span>
                </button>
              </>
            )}

            {/* Image Indicator Dots */}
            {DATA.image.length > 1 && (
              <div className="flex justify-center gap-2 absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {DATA.image.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current
                        ? 'bg-orange-500 scale-110'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col gap-6 w-full lg:w-[40%] xl:w-[45%] mt-6 lg:mt-0">
            <div className="flex justify-between w-full">
              {DATA.link && (
                <a
                  href={DATA.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[16px] gap-1 border px-4 py-1 rounded-[5px] shadow-md hover:scale-105 cursor-pointer transition-all duration-200 ease-in dark:shadow-orange-600 text-orange-600"
                >
                  <span className="text-[12px]">Live Here</span> <IoIosLink />
                </a>
              )}
              <a
                href={DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[16px] gap-1 border px-4 py-1 rounded-[5px] shadow-md hover:scale-105 cursor-pointer transition-all duration-200 ease-in dark:shadow-orange-600 text-orange-600"
              >
                <span className="text-[12px]">GitHub</span> <FaRegFileCode />
              </a>
            </div>

            <p className="text-gray-700 dark:text-gray-200 text-[16px] leading-relaxed">
              {DATA.summary}
            </p>

            {/* Tech Stack */}
            <div>
              <h3 className="text-xl font-semibold dark:text-orange-500 mb-2">
                Tech Stack:
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-[14px] space-y-1">
                {DATA.techStack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
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

      <Link to="/projects" className="flex-row-reverse hidden md:flex">
        <span className="w-[100px] text-center px-5 py-1 bg-orange-400 dark:bg-orange-600 rounded-[5px] text-white Roboto text-[14px] hover:scale-105 transition-all ease-in-out duration-400 shadow-md">
          Back
        </span>
      </Link>
    </div>
  );
};

export default ProjectDetail;
