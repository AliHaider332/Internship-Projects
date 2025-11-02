import React from 'react';
import { Link } from 'react-router-dom';
import logo_L from '../assets/Pictures/logo_L.png'; // Light mode logo
import logo_D from '../assets/Pictures/logo_D.png'; // Dark mode logo

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
      aria-label="HAIDER - Home"
    >
      {/* Light Mode Logo */}
      <img
        src={logo_L}
        alt="HAIDER Logo Light"
        className="block dark:hidden w-10 sm:w-12 md:w-14 lg:w-16 h-auto object-contain"
      />

      {/* Dark Mode Logo */}
      <img
        src={logo_D}
        alt="HAIDER Logo Dark"
        className="hidden dark:block w-10 sm:w-12 md:w-14 lg:w-16 h-auto object-contain"
      />
    </Link>
  );
};

export default Logo;
