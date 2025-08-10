import React from 'react';

// import PIC from './assets/Pictures/xyz.png'
import Picture from '../assets/Pictures/Picture.png'
const RightPicture = () => {
  return (
    <div
    className="
      relative h-[300px] w-[300px] sm:h-[320px] sm:w-[320px] md:h-[340px] md:w-[340px] 
      lg:h-[360px] lg:w-[360px] xl:w-[380px] xl:h-[380px]
      rounded-full p-1 
      bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 
      dark:bg-gradient-to-tr dark:from-amber-500 dark:via-orange-500 dark:to-red-500
       shadow-xl hover:scale-105 transition-transform duration-500
      dark:shadow-orange-600
    "
  >  
    <img
      src={Picture}
      alt="Profile"
      className="h-full w-full rounded-full object-cover border-4 border-white dark:border-none shadow-md"
    />
  </div>
  );
};

export default RightPicture;
