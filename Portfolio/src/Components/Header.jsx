import React from 'react';
import Logo from '../Header/Logo';
import Toggle from '../Header/Toggle';
import MobileManu from '../Header/MobileManu';
import DesktopManu from '../Header/DesktopManu';
const Header = () => {
  return (
    // Header.jsx
    <header className="fixed top-0 left-0 right-0 w-[90%] mx-auto px-2 rounded-2xl bg-[rgb(255,255,255,0.9)] dark:bg-[rgb(31,31,31,0.8)] shadow-md z-50">
      <div className="my-3">
        <div className="flex justify-between md:hidden">
          <MobileManu />
          <Logo />
          <Toggle />
        </div>
        <div className="md:flex justify-between hidden items-center">
          <Logo />
          <DesktopManu />
          <Toggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
