import React, { useEffect, useState } from 'react';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  function MobileOptions() {
    return (
      <div className="absolute  mt-2 bg-orange-400 dark:bg-orange-600 shadow-lg rounded-lg md:hidden">
        <div className="absolute -top-2 left-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-orange-400 dark:border-b-orange-600"></div>

        {/* Menu Items */}
        <ul className="p-2 text-white font-serif space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'block bg-orange-300 dark:bg-orange-500 rounded'
                : 'block'
            }
          >
            <li
              className="p-1 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Home
            </li>
          </NavLink>

          <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive
                ? 'block bg-orange-300 dark:bg-orange-500 rounded'
                : 'block'
            }
          >
            <li
              className="p-1 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Skills
            </li>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? 'block bg-orange-300 dark:bg-orange-500 rounded'
                : 'block'
            }
          >
            <li
              className="p-1 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Projects
            </li>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'block bg-orange-300 dark:bg-orange-500 rounded'
                : 'block'
            }
          >
            <li
              className="p-1 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              About Me
            </li>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'block bg-orange-300 dark:bg-orange-500 rounded'
                : 'block'
            }
          >
            <li
              className="p-1 cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Contact Me
            </li>
          </NavLink>
        </ul>
      </div>
    );
  }

  useEffect(() => {
    function handleEvent() {
      if (isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('mousedown', handleEvent);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('mousedown', handleEvent);
    };
  });

  return (
    <div>
      <span
        className="sm:text-2xl text-black  dark:text-gray-400 text-xl  md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross2 /> : <HiMiniBars3CenterLeft />}
      </span>

      {isOpen && MobileOptions()}
    </div>
  );
};

export default MobileMenu;
