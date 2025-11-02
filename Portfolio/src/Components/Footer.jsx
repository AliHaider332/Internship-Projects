import React, { useState, useEffect } from 'react';
import {
  SiLinkedin,
  SiLeetcode,
  SiWhatsapp,
  SiGithub,
  SiInstagram,
} from 'react-icons/si';
import { TfiEmail } from 'react-icons/tfi';
import { FiPhone } from 'react-icons/fi';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosArrowUp } from 'react-icons/io';
import logo_L from '../assets/Pictures/logo_L.png';
import logo_D from '../assets/Pictures/logo_D.png';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const location = useLocation();

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = async (text, setCopiedFunction) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFunction(true);
      setTimeout(() => setCopiedFunction(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const socialLinks = [
    {
      icon: SiLinkedin,
      href: 'https://www.linkedin.com/in/alihaider332/',
      label: 'LinkedIn',
      color: 'hover:bg-blue-600 dark:hover:bg-blue-700'
    },
    {
      icon: SiGithub,
      href: 'https://github.com/AliHaider332',
      label: 'GitHub',
      color: 'hover:bg-gray-700 dark:hover:bg-gray-600'
    },
    {
      icon: SiLeetcode,
      href: 'https://leetcode.com/u/alihaider332gb/',
      label: 'LeetCode',
      color: 'hover:bg-yellow-600 dark:hover:bg-yellow-700'
    },
    {
      icon: SiInstagram,
      href: 'https://www.instagram.com/ch_ali_haider_332?igsh=NnY2a2JjZmlhamlu',
      label: 'Instagram',
      color: 'hover:bg-pink-600 dark:hover:bg-pink-700'
    },
    {
      icon: SiWhatsapp,
      href: 'https://wa.me/+923193238467',
      label: 'WhatsApp',
      color: 'hover:bg-green-600 dark:hover:bg-green-700'
    },
  ];

  const navigationLinks = [
    { to: '/', label: 'Home' },
    { to: '/skills', label: 'Skills' },
    { to: '/projects', label: 'Projects' },
    { to: '/about', label: 'About Me' },
    { to: '/contact', label: 'Contact Me' },
  ];

  const contactInfo = [
    {
      icon: TfiEmail,
      text: 'bhaialihaider332@gmail.com',
      copy: () => copyToClipboard('bhaialihaider332@gmail.com', setEmailCopied),
      copied: emailCopied,
    },
    {
      icon: FiPhone,
      text: '+92319 3238467',
      copy: () => copyToClipboard('+923193238467', setPhoneCopied),
      copied: phoneCopied,
    },
    {
      icon: CiLocationOn,
      text: 'Pir Mahal, Pakistan',
      copy: null,
    },
  ];

  return (
    <footer className="relative dark:bg-[#2f2f2f] bg-gray-100 rounded-t-3xl flex flex-col items-center py-8 px-6 text-gray-600 dark:text-gray-400 gap-8 mt-16">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <IoIosArrowUp size={20} />
      </button>

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg p-2 transition-transform hover:scale-105"
        aria-label="HAIDER - Home"
      >
        <img
          src={logo_L}
          alt="HAIDER Logo Light"
          className="block dark:hidden w-8 sm:w-10 md:w-12 lg:w-14 h-auto object-contain"
        />
        <img
          src={logo_D}
          alt="HAIDER Logo Dark"
          className="hidden dark:block w-8 sm:w-10 md:w-12 lg:w-14 h-auto object-contain"
        />
      </Link>

      {/* Navigation Links */}
      <nav className="w-full max-w-4xl">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {navigationLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`Roboto text-sm md:text-base lg:text-lg font-medium transition-all duration-200 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-1 rounded-lg ${
                  location.pathname === to
                    ? 'text-orange-500 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-3">
        {socialLinks.map(({ icon: Icon, href, label, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3 rounded-full border border-gray-300 dark:border-gray-600 inline-block transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 ${color}`}
            aria-label={`Visit my ${label}`}
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      {/* Contact Information */}
      <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-16 justify-center text-sm w-full max-w-4xl">
        {contactInfo.map(({ icon: Icon, text, copy, copied }, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 Roboto px-3 py-2 rounded-lg transition-all duration-200 ${
              copy
                ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 group'
                : ''
            }`}
            onClick={copy}
          >
            <Icon className="flex-shrink-0" />
            <span className="text-xs sm:text-sm">{text}</span>
            {copy && (
              <span
                className={`text-xs px-2 py-1 rounded transition-all duration-200 ${
                  copied
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 opacity-0 group-hover:opacity-100'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Separator */}
      <hr className="w-full max-w-2xl border-gray-300 dark:border-gray-600 opacity-50" />

      {/* Bottom Note */}
      <div className="text-center">
        <p className="text-xs opacity-70 Roboto mb-2">
          © {new Date().getFullYear()} Ali Haider. All Rights Reserved.
        </p>
        <p className="text-xs opacity-50 Roboto">
          Crafted with passion and attention to detail
        </p>
      </div>
    </footer>
  );
};

export default Footer;