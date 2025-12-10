import React from 'react';
import Typed from 'typed.js';
import { useEffect, useRef } from 'react';
import {
  SiLinkedin,
  SiLeetcode,
  SiWhatsapp,
  SiGithub,
  SiInstagram,
} from 'react-icons/si';
import { Link } from 'react-router';

function LeftDiscription({ isParentVisible }) {
  const el = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    if (!isParentVisible) return;

    // Initialize Typed.js with enhanced options
    const typed = new Typed(el.current, {
      strings: [
        'Full Stack Developer',
        'Mern Stack Developer',
        'React Developer',
        'UI/UX Developer',
        'Front End Developer',
        'Back End Developer',
      ],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      smartBackspace: true,
      fadeOut: false,
      startDelay: 300,
    });

    typedRef.current = typed;

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, [isParentVisible]);

  const socialLinks = [
    {
      Icon: SiLinkedin,
      href: 'https://www.linkedin.com/in/alihaider332/',
      name: 'LinkedIn',
    },
    { Icon: SiGithub, href: 'https://github.com/AliHaider332', name: 'GitHub' },
    {
      Icon: SiLeetcode,
      href: 'https://leetcode.com/u/alihaider332gb/',
      name: 'LeetCode',
    },
    {
      Icon: SiInstagram,
      href: 'https://www.instagram.com/ch_ali_haider_332?igsh=NnY2a2JjZmlhamlu',
      name: 'Instagram',
    },
    { Icon: SiWhatsapp, href: 'https://wa.me/+923193238467', name: 'WhatsApp' },
  ];

  // Animation classes based on parent visibility
  const getAnimationClass = (delay) => {
    return `transition-all duration-700 ease-out transform ${
      isParentVisible
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
    }`;
  };

  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 md:gap-6 lg:gap-8 w-full max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
      {/* Name Section */}
      <div
        className={getAnimationClass('200ms')}
        style={{ transitionDelay: '300ms' }}
      >
        <div className="flex flex-col gap-2 md:gap-3 w-full">
          <span className="Roboto text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 font-light tracking-wide">
            Hello, I'm
          </span>
          <span className="Roboto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold dr:text-gray-800 dark:text-white leading-tight bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Ali Haider
          </span>
        </div>
      </div>

      {/* Typed Animation Section */}
      <div
        className={getAnimationClass('400ms')}
        style={{ transitionDelay: '500ms' }}
      >
        <div className="App Roboto font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl min-h-[1.2em] md:min-h-[1.3em] flex items-center justify-center lg:justify-start">
          <span
            ref={el}
            className="animated-text bg-gradient-to-r from-orange-400 to-orange-600 dark:from-orange-500 dark:to-orange-700 bg-clip-text text-transparent text-center lg:text-left"
          />
        </div>
      </div>

      {/* Social Links */}
      <div
        className={getAnimationClass('600ms')}
        style={{ transitionDelay: '700ms' }}
      >
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 md:gap-4">
          {socialLinks.map(({ Icon, href, name }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2.5 sm:p-3 md:p-3 rounded-xl border border-gray-200 dark:border-gray-700 
                       bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
                       hover:bg-gradient-to-br hover:from-orange-400 hover:to-orange-600 
                       dark:hover:from-orange-500 dark:hover:to-orange-700
                       hover:text-white hover:border-orange-400 dark:hover:border-orange-600
                       shadow-md hover:shadow-lg
                       hover:shadow-orange-400/20 dark:hover:shadow-orange-600/20
                       transform transition-all duration-400 ease-out
                       hover:scale-105 hover:-translate-y-1
                       active:scale-100
                       group overflow-hidden"
              aria-label={name}
              style={{
                animationDelay: isParentVisible
                  ? `${800 + index * 100}ms`
                  : '0ms',
              }}
            >
              {/* Background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-800"></div>

              <Icon
                size={20}
                className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />

              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-0.5 whitespace-nowrap">
                {name}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div
        className={getAnimationClass('800ms')}
        style={{ transitionDelay: '900ms' }}
      >
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4 w-full">
          {/* Hire Me Button */}
          <Link
            to={'/contact'}
            className="relative group bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700  
                     text-white font-medium
                     py-2.5 md:py-3 px-5 md:px-6 rounded-lg cursor-pointer 
                     transform transition-all duration-300 ease-out
                     hover:scale-[1.02] hover:shadow-md
                     hover:shadow-orange-500/25 dark:hover:shadow-orange-600/25
                     active:scale-98
                     border border-orange-500/20 hover:border-orange-300
                     text-center
                     flex items-center justify-center
                     min-w-[130px] md:min-w-[140px]
                     text-sm
                     overflow-hidden
                     shadow-sm"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-all duration-300 ease-out"></div>

            <span className="relative z-10 flex items-center gap-1.5">
              Hire Me
              <svg
                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300 ease-out"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>

          {/* Download CV Button */}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/Ali-Haider.pdf';
              link.download = 'Ali_Haider_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="relative group border border-gray-300 dark:border-gray-600 
                     px-5 md:px-6 rounded-lg py-2.5 md:py-3
                     transform transition-all duration-300 ease-out
                     hover:scale-[1.02] hover:shadow-md
                     hover:border-orange-400 dark:hover:border-orange-500
                     hover:bg-gradient-to-r hover:from-orange-50/80 hover:to-orange-100/80 
                     dark:hover:from-gray-800 dark:hover:to-gray-700
                     active:scale-98
                     font-medium
                     text-gray-700 dark:text-gray-300
                     hover:text-orange-600 dark:hover:text-orange-400
                     text-center
                     flex items-center justify-center
                     min-w-[130px] md:min-w-[140px]
                     text-sm
                     overflow-hidden
                     shadow-sm"
          >
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out"></div>

            {/* Background transition */}
            <div className="absolute inset-0 rounded-lg bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-300 ease-out"></div>

            <span className="relative z-10 flex items-center gap-1.5">
              Download CV
              <svg
                className="w-3 h-3 group-hover:translate-y-0.5 transition-transform duration-300 ease-out"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeftDiscription;
