import React, { useState } from 'react';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  function MobileOptions() {
    return (
      <div className="absolute  mt-2 bg-orange-400 shadow-lg rounded-lg md:hidden">
        <div className="absolute -top-2 left-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-orange-400"></div>

        {/* Menu Items */}
        <ul className="p-2 text-white font-serif space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'block bg-amber-600 rounded' : 'block'
            }
          >
            <li className="p-1 cursor-pointer">Home</li>
          </NavLink>

          <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive ? 'block bg-amber-600 rounded' : 'block'
            }
          >
            <li className="p-1 cursor-pointer">Skills</li>
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? 'block bg-amber-600 rounded' : 'block'
            }
          >
            <li className="p-1 cursor-pointer">Projects</li>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'block bg-amber-600 rounded' : 'block'
            }
          >
            <li className="p-1 cursor-pointer">About Me</li>
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'block bg-amber-600 rounded' : 'block'
            }
          >
            <li className="p-1 cursor-pointer">Contact Me</li>
          </NavLink>
        </ul>
      </div>
    );
  }

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
