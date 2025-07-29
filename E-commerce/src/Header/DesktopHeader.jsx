import React from 'react';
import LOGO from '../assets/SHOP.CO.png';
import searchIcon from '../assets/search.png';
import { NavLink } from 'react-router-dom';
import { FaChevronUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from 'react-router-dom';
const DesktopHeader = () => {
  const options = useSelector(store=> store.pages);

  return (
    <div className="hidden w-full h-[60px] items-center justify-between my-5 gap-5 px-5 lg:gap-5 lg:px-20 md:flex">
      {/* Logo */}
      <Link to='/'>
      <img
        src={LOGO}
        alt="SHOP.CO Logo"
        className="w-[160px] h-[22px] shrink-1 cursor-pointer"
      />
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="flex gap-6 justify-around mr-10 md:mr-10">
          {options.map((item, index) => (
            <li key={index} className="whitespace-nowrap">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `font-satoshi font-normal text-sm cursor-pointer hover:font-semibold flex items-center ${
                    isActive ? 'font-semibold' : 'text-gray-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.layout}
                    {isActive && <FaChevronUp className="ml-1" />}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/*  */}

      {/* Search Input */}
      <div className="relative w-[40%] shrink-1">
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

      {/* Icons */}
      <div className="flex items-center gap-4 shrink-0 h-5">
      <LuShoppingCart />

        <FaRegCircleUser />
      </div>
    </div>
  );
};

export default DesktopHeader;
