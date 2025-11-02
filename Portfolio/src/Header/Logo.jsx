import React from 'react';
import { Link } from 'react-router-dom';
import logo_L from '../assets/Pictures/logo_L.png';
import logo_D from '../assets/Pictures/logo_D.png';

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-1"
      aria-label="Haider - Home"
    >
      <img
        src={logo_L}
        alt="HAIDER Logo Light"
        className="block dark:hidden w-12 md:w-14 lg:w-16 object-contain"
      />
      <img
        src={logo_D}
        alt="HAIDER Logo Dark"
        className="hidden dark:block w-12 md:w-14 lg:w-16 object-contain"
      />
    </Link>
  );
};

export default Logo;
