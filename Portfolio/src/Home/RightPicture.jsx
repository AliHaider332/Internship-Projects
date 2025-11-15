import React, { useEffect, useRef } from 'react';
import Picture from '../assets/Pictures/Picture.png';

const RightPicture = () => {
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Add entrance animation
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
      imageRef.current.style.transform = 'scale(0.8) rotate(-5deg)';
      
      setTimeout(() => {
        imageRef.current.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        imageRef.current.style.opacity = '1';
        imageRef.current.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    }

    // Pulsing glow effect
    const interval = setInterval(() => {
      if (glowRef.current) {
        glowRef.current.style.transform = 'scale(1.05)';
        setTimeout(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = 'scale(1)';
          }
        }, 1000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="relative group" ref={imageRef}>
        {/* Enhanced Background Glow Effect */}
        <div
          ref={glowRef}
          className="absolute -inset-4 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                     dark:from-amber-500 dark:via-orange-500 dark:to-red-500 
                     rounded-full blur-xl opacity-60 group-hover:opacity-90 
                     transition-all duration-1000 ease-out
                     animate-pulse-slow"
          style={{
            transition: 'all 1s ease-out',
          }}
        ></div>

        {/* Floating Elements */}
        <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-500 rounded-full animate-float">
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500 rounded-full animate-float-delayed">
          <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
        </div>

        <div className="absolute -top-6 -left-6 w-4 h-4 bg-yellow-500 rounded-full animate-float-slow">
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>

        {/* Main Image Container */}
        <div
          className="relative h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] 
                     md:h-[350px] md:w-[350px] lg:h-[380px] lg:w-[380px]
                     rounded-full p-2 
                     bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                     dark:from-amber-500 dark:via-orange-500 dark:to-red-500
                     shadow-2xl group-hover:shadow-3xl
                     transition-all duration-500 ease-in-out
                     group-hover:scale-105
                     border-2 border-transparent group-hover:border-white/30
                     cursor-pointer mx-auto"
          style={{
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          {/* Image with Enhanced Effects */}
          <img
            src={Picture}
            alt="Ali Haider - Full Stack Developer"
            className="h-full w-full rounded-full object-cover 
                     border-4 border-white dark:border-gray-800
                     shadow-inner group-hover:shadow-xl
                     transition-all duration-500 ease-in-out
                     group-hover:border-white/80
                     group-hover:scale-102"
          />
        </div>
      </div>
    </div>
  );
};

export default RightPicture;