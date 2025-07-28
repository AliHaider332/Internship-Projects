import React from 'react';
import LOGO from '../assets/SHOP.CO.png';
import cart from '../assets/Frame.png';
import profile from '../assets/Profile.png';
import searchIcon from '../assets/search.png';
const DesktopHeader = () => {
    const options = [
        { layout: 'Shop' },
        { layout: 'On Sale' },
        { layout: 'New Arrival' },
        { layout: 'Brands' },
      ];
  return (
    <div className="hidden md:flex w-full h-[60px] items-center justify-between my-5 md:gap-5 lg:gap-5 md:px-5 align-bottom lg:px-20">
      {/* Logo */}
      <img
        src={LOGO}
        alt="SHOP.CO Logo"
        className="w-[160px] h-[22px] shrink-1 cursor-pointer"
      />

      {/* Navigation */}
      <nav>
        <ul className="flex gap-6 shrink-0 justify-aroun3 md:mr-10">
          {options.map((item, index) => (
            <li
              key={index}
              className="font-satoshi font-normal text-sm cursor-pointer hover:underline shrink-0 "
            >
              {item.layout}
            </li>
          ))}
        </ul>
      </nav>

      {/* Search Input */}
      <div className="relative w-[40%] shrink-1 ">
        <img
          src={searchIcon}
          alt="Search Icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
        />
        <input
          type="text"
          placeholder="Search For Products..."
          className="bg-gray-100 w-full h-9 rounded-3xl pl-10 pr-4 py-[6px] outline-none text-sm placeholder-gray-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 shrink-0">
        <img src={cart} alt="Cart" className="w-5 h-5 cursor-pointer" />
        <img src={profile} alt="Profile" className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default DesktopHeader;
