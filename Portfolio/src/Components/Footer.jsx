import React from 'react';
import {
  SiLinkedin,
  SiLeetcode,
  SiWhatsapp,
  SiGithub,
  SiInstagram,
} from 'react-icons/si';
import { TfiEmail } from 'react-icons/tfi';
import { FiPhone } from 'react-icons/fi';
import { CiLocationOn } from "react-icons/ci";


import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="dark:bg-[#2f2f2f] bg-gray-100 rounded-t-3xl flex flex-col items-center py-5 px-5 text-gray-500 gap-8 ">
      <span
        className="font-rubik text-[14px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-transparent dark:text-orange-600 bg-gradient-to-r
    from-orange-700 via-orange-600 to-orange-800 bg-clip-text uppercase"
      >
        Haider
      </span>

      <ul className="flex flex-wrap justify-between gap-3 md:gap-5 lg:gap-7">
        <Link to={'/'}>
          <li className="Roboto text-[12px] md:text-[14px] lg:text-[16px] ">
            Home
          </li>
        </Link>
        <Link to={'/skills'}>
          <li className="Roboto text-[12px] md:text-[14px] lg:text-[16px] ">
            Skills
          </li>
        </Link>
        <Link to={'/projects'}>
          <li className="Roboto text-[12px] md:text-[14px] lg:text-[16px] ">
            Projects
          </li>
        </Link>
        <Link to={'/about'}>
          <li className="Roboto text-[12px] md:text-[14px] lg:text-[16px] ">
            About Me
          </li>
        </Link>
        <Link to={'/contact'}>
          <li className="Roboto text-[12px] md:text-[14px] lg:text-[16px]">
            Contact Me
          </li>
        </Link>
      </ul>

      <span className="flex gap-3">
        <a
          href="https://www.linkedin.com/in/alihaider332/"
          target="_blank"
          className="p-2 rounded-full border inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiLinkedin size={14} />
        </a>
        <a
          href="https://github.com/AliHaider332"
          target="_blank"
          className="p-2 rounded-full border inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiGithub size={14} />
        </a>
        <a
          href="https://leetcode.com/u/alihaider332gb/"
          target="_blank"
          className="p-2 rounded-full border inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiLeetcode size={14} />
        </a>
        <a
          href="https://www.instagram.com/ch_ali_haider_332?igsh=NnY2a2JjZmlhamlu"
          target="_blank"
          className="p-2 rounded-full border inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiInstagram size={14} />
        </a>
        <a
          href="https://wa.me/+923193238467"
          target="_blank"
          className="p-2 rounded-full border inline-block hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-white hover:border-none shadow-md shadow-black hover:shadow-orange-400 dark:hover:shadow-orange-600"
        >
          <SiWhatsapp size={14} />
        </a>
      </span>

      <span className="flex flex-wrap gap-5 md:gap-10 lg:gap-15 justify-center text-[12px]">
        <span className="flex items-center justify-between gap-2 Roboto ">
          <TfiEmail /> <span>bhaialihaider332@gmail.com</span>
        </span>
        <span className="flex items-center justify-between gap-2  Roboto">
          <FiPhone />
          <span>+92319 3238467</span>
        </span>
        <span className="flex items-center justify-between gap-2 Roboto">
        <CiLocationOn />
          <span>Pir Mahal, Pakistan</span>
        </span>
      </span>

      <hr className="w-[70%] text-center border-gray-400 opacity-30" />

      {/* Bottom Note */}
      <p className="text-xs text-center opacity-70 Roboto">
        © {new Date().getFullYear()} Ali Haider. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
