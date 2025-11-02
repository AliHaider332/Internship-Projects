import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const Toggle = () => {
  const [theme, setTheme] = useState(() => {
    // Load saved theme or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  // Apply theme to <html> tag
  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div
      onClick={toggleTheme}
      className="text-2xl md:text-3xl xl:text-4xl cursor-pointer p-2 rounded-full transition-all duration-300 ease-in-out"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <FiSun className="text-yellow-500 transition-transform duration-500 transform hover:rotate-90" />
      ) : (
        <FiMoon className="text-gray-800 dark:text-gray-200 hover:scale-110 transition-transform duration-300" />
      )}
    </div>
  );
};

export default Toggle;
