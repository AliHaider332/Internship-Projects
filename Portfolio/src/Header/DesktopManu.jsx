import React from 'react';
import { NavLink } from 'react-router-dom'; // ✅ Correct import

const DesktopMenu = () => {
  return (
    <div>
      <ul className="flex font-Nunito gap-x-10 text-[14px] lg:text-[15px] xl:text-[16px] lg:gap-x-12 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'border-b-2 border-orange-400 text-orange-400 dark:border-orange-600 dark:text-orange-600 font-semibold px-1 '
              : ''
          }
        >
          <li>Home</li>
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) =>
            isActive
              ? 'border-b-2 border-orange-400 px-1 text-orange-400 dark:border-orange-600 dark:text-orange-600 font-semibold'
              : ''
          }
        >
          <li>Skills</li>
        </NavLink>

        <NavLink
          to={'/projects'}
          className={({ isActive }) =>
            isActive
              ? 'border-b-2 border-orange-400 px-1 text-orange-400 dark:border-orange-600 dark:text-orange-600 font-semibold'
              : ''
          }
        >
          <li>Projects</li>
        </NavLink>

        <NavLink
          to={'/about'}
          className={({ isActive }) =>
            isActive
              ? 'border-b-2 border-orange-400 px-1 text-orange-400 dark:border-orange-600 dark:text-orange-600 font-semibold'
              : ''
          }
        >
          <li>About Us</li>
        </NavLink>

        <NavLink
          to={'/contact'}
          className={({ isActive }) =>
            isActive
              ? 'border-b-2 border-orange-400 px-1 text-orange-400 dark:border-orange-600 dark:text-orange-600 font-semibold'
              : ''
          }
        >
          <li>Contact Us</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default DesktopMenu;
