import React from 'react';
import Typed from 'typed.js';
import { useEffect, useRef, useState } from 'react';
import {
  SiLinkedin,
  SiLeetcode,
  SiWhatsapp,
  SiGithub,
  SiInstagram,
} from 'react-icons/si';
import { Link } from 'react-router';

function LeftDiscription() {
  const el = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Initialize Typed.js
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
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const socialLinks = [
    { Icon: SiLinkedin, href: 'https://www.linkedin.com/in/alihaider332/' },
    { Icon: SiGithub, href: 'https://github.com/AliHaider332' },
    { Icon: SiLeetcode, href: 'https://leetcode.com/u/alihaider332gb/' },
    {
      Icon: SiInstagram,
      href: 'https://www.instagram.com/ch_ali_haider_332?igsh=NnY2a2JjZmlhamlu',
    },
    { Icon: SiWhatsapp, href: 'https://wa.me/+923193238467' },
  ];

  return (
    <div className="flex flex-col items-center justify-center md:items-baseline gap-7 lg:gap-9">
      {/* Name Section */}
      <div
        className={`flex flex-col justify-between gap-3 md:w-full items-center md:items-baseline transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '100ms' }}
      >
        <span className="Roboto text-[14px] lg:text-[16px] text-gray-600 dark:text-gray-400">
          Hi I am
        </span>
        <span className="Roboto text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-white">
          Ali Haider
        </span>
      </div>

      {/* Typed Animation Section */}
      <div
        className={`transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '300ms' }}
      >
        <span className="App Roboto font-extrabold text-3xl lg:text-4xl text-orange-400 dark:text-orange-600 min-h-[1.5em] inline-block">
          <span ref={el} className="animated-text" />
        </span>
      </div>

      {/* Social Links */}
      <div
        className={`flex gap-4 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '500ms' }}
      >
        {socialLinks.map(({ Icon, href }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-gray-300 dark:border-gray-600 inline-block 
                       bg-white dark:bg-gray-800
                       hover:bg-orange-400 dark:hover:bg-orange-600 
                       hover:text-white hover:border-orange-400 dark:hover:border-orange-600
                       shadow-md hover:shadow-lg
                       hover:shadow-orange-400/30 dark:hover:shadow-orange-600/30
                       transform transition-all duration-300 ease-out
                       hover:scale-110 hover:-translate-y-1
                       active:scale-95
                       group"
          >
            <Icon
              size={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        ))}
      </div>

      {/* Action Buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-3 text-[14px] lg:text-[16px] transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '700ms' }}
      >
        <Link
          to={'/contact'}
          className="dark:bg-orange-600 font-sans text-white bg-orange-400  
                     py-3 px-8 rounded-lg cursor-pointer 
                     transform transition-all duration-300 ease-out
                     hover:scale-105 hover:shadow-xl
                     hover:shadow-orange-400/40 dark:hover:shadow-orange-600/40
                     active:scale-95
                     border border-transparent hover:border-orange-300 dark:hover:border-orange-500
                     font-medium text-center
                     flex items-center justify-center
                     min-w-[140px]"
        >
          Hire Me
        </Link>
        <button
          className="border border-gray-300 dark:border-gray-600 px-8 rounded-lg py-3 
                     transform transition-all duration-300 ease-out
                     hover:scale-105 hover:shadow-lg
                     hover:border-orange-400 dark:hover:border-orange-600
                     hover:bg-orange-50 dark:hover:bg-orange-950/30
                     active:bg-orange-600 active:text-white
                     active:scale-95
                     font-medium
                     text-gray-700 dark:text-gray-300
                     hover:text-orange-600 dark:hover:text-orange-400
                     text-center
                     flex items-center justify-center
                     min-w-[140px]"
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/Ali-Haider.pdf';
            link.download = 'Ali_Haider_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Download Resume
        </button>
      </div>
    </div>
  );
}

export default LeftDiscription;
