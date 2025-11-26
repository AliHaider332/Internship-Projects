import React, { useEffect, useRef } from 'react';
import Picture from '../assets/Pictures/Picture.png';

const RightPicture = () => {
  const imageRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // Add entrance animation
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
      imageRef.current.style.transform = 'scale(0.8)';

      setTimeout(() => {
        imageRef.current.style.transition =
          'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        imageRef.current.style.opacity = '1';
        imageRef.current.style.transform = 'scale(1)';
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
    <div className="relative group" ref={imageRef}>
      {/* Enhanced Background Glow Effect - Smaller and contained */}
      <div
        ref={glowRef}
        className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                   dark:from-amber-500 dark:via-orange-500 dark:to-red-500 
                   rounded-full blur-lg opacity-50 group-hover:opacity-70 
                   transition-all duration-1000 ease-out"
      ></div>

      {/* Floating Elements - Smaller and positioned better */}
      <div className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full animate-float">
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
      </div>

      <div className="absolute -bottom-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full animate-float-delayed">
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
      </div>

      <div className="absolute -top-3 -left-3 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full animate-float-slow">
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Main Image Container - Better responsive sizing */}
      <div
        className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] 
                   md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] 
                   xl:h-[360px] xl:w-[360px] rounded-full p-1.5 sm:p-2
                   bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                   dark:from-amber-500 dark:via-orange-500 dark:to-red-500
                   shadow-xl group-hover:shadow-2xl
                   transition-all duration-500 ease-in-out
                   group-hover:scale-105
                   border border-transparent group-hover:border-white/30
                   cursor-pointer mx-auto"
      >
        {/* Image with Enhanced Effects */}
        <img
          src={Picture}
          alt="Ali Haider - Full Stack Developer"
          className="h-full w-full rounded-full object-cover 
                   border-3 sm:border-4 border-white dark:border-gray-800
                   shadow-inner group-hover:shadow-lg
                   transition-all duration-500 ease-in-out
                   group-hover:border-white/80"
        />
      </div>
    </div>
  );
};

export default RightPicture;