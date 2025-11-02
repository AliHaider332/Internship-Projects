import React, { useEffect, useRef, useState } from 'react';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';
import { RxCross2 } from 'react-icons/rx';
import { NavLink, useLocation } from 'react-router-dom';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    }

    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    }

    function handleResize() {
      if (window.innerWidth > 768) {
        // md breakpoint
        closeMenu();
      }
    }

    if (isOpen) {
      // Add animation class after a tiny delay to ensure CSS transition works
      setTimeout(() => setIsAnimating(true), 10);
      window.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleEscapeKey);
      window.addEventListener('resize', handleResize);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsAnimating(false);
    // Small delay to allow close animation to complete
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleMenuItemClick = () => {
    closeMenu();
  };

  const MobileOptions = () => (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0  bg-opacity-50 z-40 md:hidden transition-opacity duration-150 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeMenu}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className={`fixed top-18 left-1/2 transform -translate-x-1/2 bg-orange-400 dark:bg-orange-600 shadow-xl rounded-lg md:hidden w-11/12 max-w-xs z-50 transition-all duration-150 ${
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2'
        }`}
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
      >
        <ul className="p-4 text-white font-serif space-y-2">
          {[
            { to: '/', label: 'Home' },
            { to: '/skills', label: 'Skills' },
            { to: '/projects', label: 'Projects' },
            { to: '/about', label: 'About Me' },
            { to: '/contact', label: 'Contact Me' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `block transition-all duration-200 rounded-lg hover:bg-orange-300 dark:hover:bg-orange-500 active:scale-95 ${
                  isActive
                    ? 'bg-orange-300 dark:bg-orange-500 shadow-inner'
                    : ''
                }`
              }
              onClick={handleMenuItemClick}
            >
              <li className="p-3 cursor-pointer font-medium text-lg">
                {label}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        className="sm:text-2xl text-black dark:text-gray-400 text-xl cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {isOpen ? <RxCross2 /> : <HiMiniBars3CenterLeft />}
      </button>

      {isOpen && <MobileOptions />}
    </div>
  );
};

export default MobileMenu;
