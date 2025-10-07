import React from 'react';
import Typed from 'typed.js';
import { useEffect } from 'react';
import {
  SiLinkedin,
  SiLeetcode,
  SiWhatsapp,
  SiGithub,
  SiInstagram,
} from 'react-icons/si';
import { Link } from 'react-router';
function LeftDiscription() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Web Application Developer',
        'Mern Stack Developer',
        'React Developer',
        'UI/UX Developer',
        'Front End Developer',
        'Back End Developer',
      ],
      typeSpeed: 70, // typing speed (lower = faster)
      backSpeed: 50, // backspace speed
      backDelay: 1000, // pause before deleting
      loop: true,
      showCursor: true,
    });

    return () => {
      typed.destroy(); // cleanup on unmount
    };
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center md:items-baseline gap-7 lg:gap-9">
      <span className="flex flex-col justify-between gap-3 md:w-full items-center md:items-baseline">
        <span className="Roboto text-[14px] lg:text-[16px]">Hi I am</span>
        <span className="Roboto text-2xl lg:text-3xl">Ali Haider</span>
      </span>
      <span className="App Roboto font-extrabold text-3xl lg:text-4xl text-orange-400 dark:text-orange-600">
        <span ref={el} className="" />
      </span>

      <span className="flex gap-3">
        <a
          href="https://www.linkedin.com/in/alihaider332/"
          target="_blank"
          className="p-2 rounded-full border  inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600 "
        >
          <SiLinkedin size={24} />
        </a>
        <a
          href="https://github.com/AliHaider332"
          target="_blank"
          className="p-2 rounded-full border  inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiGithub size={24} />
        </a>
        <a
          href="https://leetcode.com/u/alihaider332gb/"
          target="_blank"
          className="p-2 rounded-full border  inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiLeetcode size={24} />
        </a>
        <a
          href="https://www.instagram.com/ch_ali_haider_332?igsh=NnY2a2JjZmlhamlu"
          target="_blank"
          className="p-2 rounded-full border  inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiInstagram size={24} />
        </a>
        <a
          href="https://wa.me/+923193238467 "
          target="_blank"
          className="p-2 rounded-full border  inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiWhatsapp size={24} />
        </a>
      </span>

      <span className="flex gap-2 text-[12px] lg:text-[14px]">
        <Link
          to={'/contact'}
          className="dark:bg-orange-600 font-sans text-white bg-orange-400  py-0.5  px-5 rounded-[5px] cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out"
        >
          Hire Me
        </Link>
        <button
          className="border px-6 rounded-[5px] py-0.5 active:bg-orange-600 hover:shadow-orange-600 active:text-white shadow-md cursor-pointer"
          onClick={() => {
            const link = document.createElement('a');
            link.href = '/Ali-Haider.pdf'; // file in public folder
            link.download = 'Ali_Haider_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Download Resume
        </button>
      </span>
    </div>
  );
}

export default LeftDiscription;
