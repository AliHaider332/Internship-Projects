import React, { useEffect, useRef } from 'react';
import Picture from '../assets/Pictures/Picture.png';

const RightPicture = ({ isParentVisible }) => {
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isParentVisible) return;

    // Enhanced entrance animation
    if (imageRef.current) {
      imageRef.current.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
      imageRef.current.style.opacity = '1';
      imageRef.current.style.transform = 'scale(1) rotate(0deg)';
    }

    // Enhanced pulsing glow effect
    const interval = setInterval(() => {
      if (glowRef.current) {
        glowRef.current.style.transform = 'scale(1.08)';
        glowRef.current.style.opacity = '0.6';
        
        setTimeout(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = 'scale(1)';
            glowRef.current.style.opacity = '0.5';
          }
        }, 1500);
      }
    }, 4000);

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(1.02) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
      }
      
      if (glowRef.current) {
        glowRef.current.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px) scale(1.05)`;
      }
    };

    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
      }
      if (glowRef.current) {
        glowRef.current.style.transform = 'scale(1)';
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(interval);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isParentVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative group"
      style={{
        opacity: isParentVisible ? 1 : 0,
        transform: isParentVisible ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transitionDelay: '400ms'
      }}
    >
      {/* Enhanced Background Glow Effect */}
      <div
        ref={glowRef}
        className="absolute -inset-2 sm:-inset-3 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                   dark:from-amber-500 dark:via-orange-500 dark:to-red-500 
                   rounded-full blur-xl opacity-50 group-hover:opacity-70 
                   transition-all duration-1000 ease-out"
      ></div>

      {/* Floating Elements with staggered animation */}
      <div 
        className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full animate-float"
        style={{
          animationDelay: isParentVisible ? '600ms' : '0ms',
          opacity: isParentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
      </div>

      <div 
        className="absolute -bottom-2 -left-2 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full animate-float-delayed"
        style={{
          animationDelay: isParentVisible ? '800ms' : '0ms',
          opacity: isParentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
      </div>

      <div 
        className="absolute -top-3 -left-3 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full animate-float-slow"
        style={{
          animationDelay: isParentVisible ? '1000ms' : '0ms',
          opacity: isParentVisible ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>

      {/* Main Image Container */}
      <div
        ref={imageRef}
        className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] 
                   md:h-[320px] md:w-[320px] lg:h-[340px] lg:w-[340px] 
                   xl:h-[360px] xl:w-[360px] rounded-full p-1.5 sm:p-2
                   bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 
                   dark:from-amber-500 dark:via-orange-500 dark:to-red-500
                   shadow-2xl group-hover:shadow-3xl
                   transition-all duration-500 ease-in-out
                   group-hover:scale-105
                   border border-transparent group-hover:border-white/30
                   cursor-pointer mx-auto
                   transform-gpu"
        style={{
          opacity: 0,
          transform: 'scale(0.8) rotate(-10deg)'
        }}
      >
        {/* Image with Enhanced Effects */}
        <img
          src={Picture}
          alt="Ali Haider - Full Stack Developer"
          className="h-full w-full rounded-full object-cover 
                   border-3 sm:border-4 border-white dark:border-gray-800
                   shadow-inner group-hover:shadow-xl
                   transition-all duration-500 ease-in-out
                   group-hover:border-white/80
                   transform-gpu"
        />
      </div>
    </div>
  );
};

export default RightPicture;