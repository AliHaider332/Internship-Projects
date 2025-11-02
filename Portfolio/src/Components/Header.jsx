import React from 'react';
import Logo from '../Header/Logo';
import Toggle from '../Header/Toggle';
import MobileManu from '../Header/MobileManu';
import DesktopManu from '../Header/DesktopManu';
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-[90%] mx-auto px-3 md:px-6 rounded-2xl bg-white/90 dark:bg-neutral-900/80 shadow-md backdrop-blur-md transition-colors duration-300">
      <div className="flex justify-between items-center py-3 md:hidden">
        {/* Mobile Layout */}
        <MobileManu />
        <Logo />
        <Toggle />
      </div>

      <div className="hidden md:flex justify-between items-center py-3">
        {/* Desktop Layout */}
        <Logo />
        <DesktopManu />
        <Toggle />
      </div>
    </header>
  );
};

export default Header;
