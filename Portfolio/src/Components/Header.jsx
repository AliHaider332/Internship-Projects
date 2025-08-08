import React from 'react';
import Logo from '../Header/Logo';
import Toggle from '../Header/Toggle';
import MobileManu from '../Header/MobileManu';
import DesktopManu from '../Header/DesktopManu';
const Header = () => {
  return (
    <header className='fixed top-0   w-[90%] px-2 rounded-2xl bg-[rgb(256,256,256,0.9)] mt-1 dark:bg-[#1f1f1f] shadow-md'>
      <div className="my-3  ">
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
