import React from 'react';
import Picture from '../assets/Pictures/Picture.png';

const RightPicture = () => {
  return (
    <div className="relative group">
      {/* Background Glow Effect */}
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                     dark:from-amber-500 dark:via-orange-500 dark:to-red-500 
                     rounded-full blur-lg opacity-75 group-hover:opacity-100 
                     transition-all duration-500 animate-tilt"
      ></div>

      {/* Main Image Container */}
      <div
        className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] 
                     md:h-[360px] md:w-[360px] lg:h-[400px] lg:w-[400px]
                     rounded-full p-2 
                     bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                     dark:from-amber-500 dark:via-orange-500 dark:to-red-500
                     shadow-2xl group-hover:shadow-3xl
                     transition-all duration-500 ease-in-out
                     group-hover:scale-105"
      >
        {/* Image */}
        <img
          src={Picture}
          alt="Ali Haider - Full Stack Developer"
          className="h-full w-full rounded-full object-cover 
                     border-4 border-white dark:border-gray-800
                     shadow-inner"
        />

        {/* Floating Elements (Optional) */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default RightPicture;
