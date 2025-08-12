import React, { useEffect, useState } from 'react';

import { FiSun, FiMoon } from 'react-icons/fi';
const Toggle = () => {
  const [theme, updateTheme] = useState('dark');

  useEffect(() => {
    theme === 'dark'
      ? window.document.documentElement.classList.add('dark')
      : window.document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <div
      className="text-xl sm:text-2xl md:text-3xl xl:text-4xl cursor-pointer 
              xl:p-2 rounded-full 
             transition-colors duration-300 ease-in-out"
      onClick={() => {
        theme === 'light' ? updateTheme('dark') : updateTheme('light');
      }}
    >
      {theme === 'dark' ? (
        <FiSun className="text-yellow-500 transition-all duration-300 ease-in-out transform rotate-0 hover:rotate-90 " />
      ) : (
        <FiMoon className="text-black  hover:rounded-full hover:shadow-lg hover:shadow-gray-400" />
      )}
    </div>
  );
};

export default Toggle;
