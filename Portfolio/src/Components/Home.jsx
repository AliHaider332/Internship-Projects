import React, { useEffect, useRef, useState } from 'react';
import LeftDiscription from '../Home/LeftDiscription';
import RightPicture from '../Home/RightPicture';
import logo_D from '../assets/Pictures/logo_D.png';
import logo_L from '../assets/Pictures/logo_L.png';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full flex flex-col lg:flex-row items-center justify-between lg:justify-between gap-8 md:gap-10 lg:gap-8 py-8 md:py-12 lg:py-4 min-h-[80vh]"
    >
      
      {/* Background logo with parallax effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        {/* Dark mode logo */}
        <img 
          src={logo_D} 
          alt="Background Logo Dark" 
          className="dark:block hidden opacity-10 max-w-[150px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] transition-all duration-1000 ease-out transform"
          style={{
            transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
            opacity: isVisible ? 0.1 : 0
          }}
        />
        {/* Light mode logo */}
        <img 
          src={logo_L} 
          alt="Background Logo Light" 
          className="dark:hidden block opacity-10 max-w-[150px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] transition-all duration-1000 ease-out transform"
          style={{
            transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
            opacity: isVisible ? 0.1 : 0
          }}
        />
      </div>
      
      {/* Left Content */}
      <div 
        className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-1 transition-all duration-800 ease-out transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
          transitionDelay: '200ms'
        }}
      >
        <div className="w-full max-w-md lg:max-w-full">
          <LeftDiscription isParentVisible={isVisible} />
        </div>
      </div>
      
      {/* Right Picture */}
      <div 
        className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end order-2 lg:order-2 transition-all duration-800 ease-out transform"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
          transitionDelay: '400ms'
        }}
      >
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex justify-center">
          <RightPicture isParentVisible={isVisible} />
        </div>
      </div>
    </div>
  );
};

export default Home;