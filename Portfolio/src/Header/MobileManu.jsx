import React, { useEffect, useRef, useState } from 'react';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { NavLink } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const MobileOptions = () => (
    <div
      ref={menuRef}
      className="absolute mt-2 bg-orange-400 dark:bg-orange-600 shadow-lg rounded-lg md:hidden"
    >
      <div className="absolute -top-2 left-3 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-orange-400 dark:border-b-orange-600"></div>

      <ul className="p-2 text-white font-serif space-y-1">
        {[
          { to: '/', label: 'Home' },
          { to: '/skills', label: 'Skills' },
          { to: '/projects', label: 'Projects' },
          { to: '/about', label: 'About Me' },
          { to: '/contact', label: 'Contact Me' },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? 'block bg-orange-300 dark:bg-orange-500 rounded'
                : 'block'
            }
          >
            <li
              className="p-1 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <span
        className="sm:text-2xl text-black dark:text-gray-400 text-xl md:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <RxCross2 /> : <HiMiniBars3CenterLeft />}
      </span>

      {isOpen && <MobileOptions />}
    </div>
  );
};

export default MobileMenu;
