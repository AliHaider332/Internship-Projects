import React from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Me' },
  { to: '/contact', label: 'Contact Me' },
];

const DesktopMenu = () => {
  return (
    <nav aria-label="Main Navigation">
      <ul className="flex font-Nunito gap-x-8 lg:gap-x-12 text-[14px] lg:text-[15px] xl:text-[19px] font-semibold">
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `px-1 transition-colors duration-200 ${
                  isActive
                    ? 'border-b-2 border-orange-400 text-orange-400 dark:border-orange-600 dark:text-orange-600 font-semibold'
                    : 'hover:text-orange-500 dark:hover:text-orange-400'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
