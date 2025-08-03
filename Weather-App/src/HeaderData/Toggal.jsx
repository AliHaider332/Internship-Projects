import React, { useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { TbBrightnessUp } from 'react-icons/tb';
import { MdBrightness2 } from 'react-icons/md';

const Toggal = () => {
  const [theme, setTheme] = useState('bright');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'bright' ? 'dark' : 'bright'));
  };

  return (
    <>
      <div
        onClick={toggleTheme}
        className="hidden md:block w-[8%] h-6 rounded-full border cursor-pointer bg-gray-200 dark:bg-gray-600 relative transition-colors duration-300"
      >
        <GoDotFill
          className={`absolute top-[2px] dark:text-yellow-400 text-xl text-black transition-all duration-300 ${
            theme === 'bright' ? 'left-[2px]' : 'right-[2px]'
          }`}
        />
      </div>

      <div
        onClick={toggleTheme}
        className="md:hidden w-10 h-10 rounded-full  flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 
                 active:bg-gray-300 dark:active:bg-gray-700 cursor-pointer shadow-lg transition-all duration-200 ease-in-out"
      >
        {theme === 'bright' ? (
          <TbBrightnessUp className="text-yellow-500 text-xl" />
        ) : (
          <MdBrightness2 className="text-white text-xl" />
        )}
      </div>
    </>
  );
};

export default Toggal;
