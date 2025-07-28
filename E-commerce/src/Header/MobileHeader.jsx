import React, { useState } from 'react';
import LOGO from '../assets/SHOP.CO.png';
import manu from '../assets/1.png';
import search from '../assets/2.png';
import CART from '../assets/3.png';
import Profile from '../assets/4.png';
import searchIcon from '../assets/search.png';
import cross from '../assets/Vector.png';
import { RxCross2 } from 'react-icons/rx';

const MobileHeader = () => {
  const [barShow, setBarShow] = useState(false);
  const [optionsShow, setOption] = useState(false);

  const options = [
    { layout: 'Shop' },
    { layout: 'On Sale' },
    { layout: 'New Arrival' },
    { layout: 'Brands' },
  ];

  return (
    <>
      <div className="flex h-7 m-3 items-center justify-between md:hidden relative">
        {/* Left Section: Menu & Logo */}
        <div className="flex gap-4 relative">
          <div
            onClick={() => setOption(!optionsShow)}
            className="cursor-pointer"
          >
            {!optionsShow ? (
              <img src={manu} alt="menu" className="w-[24px] h-[24px]" />
            ) : (
              <RxCross2 className="w-[24px] h-[24px]" />
            )}
          </div>

          {/* Dropdown under menu */}
          {optionsShow && (
            <ul className="absolute top-8 left-0 z-50 w-[150px] p-4 rounded-2xl shadow-md shadow-gray-300 bg-white text-gray-800 space-y-2">
              {options.map((item, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 text-sm text-center"
                >
                  {item.layout}
                </li>
              ))}
            </ul>
          )}

          <img src={LOGO} alt="Logo" className="w-[120px] cursor-pointer" />
        </div>

        {/* Right Section: Icons */}
        <div className="flex gap-4">
          <img
            src={search}
            alt="Search"
            className="w-[24px] h-[24px] cursor-pointer"
            onClick={() => setBarShow(!barShow)}
          />
          <img
            src={CART}
            alt="Cart"
            className="w-[24px] h-[24px] cursor-pointer"
          />
          <img
            src={Profile}
            alt="Profile"
            className="w-[24px] h-[24px] cursor-pointer"
          />
        </div>
      </div>

      {/* Search Bar */}
      {barShow && (
        <div className="relative w-[80%] mx-auto mt-3 md:hidden">
          <img
            src={searchIcon}
            alt="Search Icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search For Products..."
            className="w-full h-9 rounded-3xl bg-gray-100 pl-10 pr-4 py-[6px] text-sm placeholder-gray-500 outline-none"
          />
        </div>
      )}
    </>
  );
};

export default MobileHeader;
