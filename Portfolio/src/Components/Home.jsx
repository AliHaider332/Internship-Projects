import React from 'react';
import LeftDiscription from '../Home/LeftDiscription';
import RightPicture from '../Home/RightPicture';
import logo_D from '../assets/Pictures/logo_D.png';
import logo_L from '../assets/Pictures/logo_L.png';

const Home = () => {
  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-between lg:justify-between gap-8 md:gap-10 lg:gap-8 py-8 md:py-12 lg:py-4 min-h-[80vh]">
      
      {/* Background logo that moves with page scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {/* Dark mode logo */}
        <img 
          src={logo_D} 
          alt="Background Logo Dark" 
          className="dark:block hidden opacity-10 max-w-[150px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] transition-opacity duration-300"
        />
        {/* Light mode logo */}
        <img 
          src={logo_L} 
          alt="Background Logo Light" 
          className="dark:hidden block opacity-10 max-w-[150px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] transition-opacity duration-300"
        />
      </div>
      
      {/* Left Content - FIRST on small screens (top), left on large screens */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-1">
        <div className="w-full max-w-md lg:max-w-full">
          <LeftDiscription />
        </div>
      </div>
      
      {/* Right Picture - SECOND on small screens (bottom), right on large screens */}
      <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end order-2 lg:order-2">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex justify-center">
          <RightPicture />
        </div>
      </div>
    </div>
  );
};

export default Home;