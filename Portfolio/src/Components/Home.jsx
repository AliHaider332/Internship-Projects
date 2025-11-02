import React from 'react';
import LeftDiscription from '../Home/LeftDiscription';
import RightPicture from '../Home/RightPicture';
import logo_D from '../assets/Pictures/logo_D.png';
import logo_L from '../assets/Pictures/logo_L.png';

const Home = () => {
  return (
    <div className="relative w-full flex flex-col md:flex-row flex-wrap md:flex-nowrap md:justify-between items-center gap-10 justify-around mb-10 md:mb-0 pt-8 md:pt-2 lg:pt-0 min-h-[80vh]">
      
      {/* Background logo that moves with page scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {/* Dark mode logo */}
        <img 
          src={logo_D} 
          alt="Background Logo Dark" 
          className="dark:block hidden opacity-10 max-w-[200px] md:max-w-[300px] lg:max-w-[400px] transition-opacity duration-300"
        />
        {/* Light mode logo */}
        <img 
          src={logo_L} 
          alt="Background Logo Light" 
          className="dark:hidden block opacity-10 max-w-[200px] md:max-w-[300px] lg:max-w-[400px] transition-opacity duration-300"
        />
      </div>
      
      {/* Content sections with higher z-index */}
      <div className="relative z-10 w-full">
        <LeftDiscription />
      </div>
      
      <div className="relative z-10">
        <RightPicture />
      </div>
    </div>
  );
};

export default Home;