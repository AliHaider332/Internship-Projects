import React from 'react';
import { MdOutlineEmail } from 'react-icons/md';
import ActualFooter from '../Footer/ActualFooter';
const Footer = () => {
  return (
    <div className="relative h-full rounded-3xl mt-20 flex flex-col justify-around bg-gray-100">
    
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[80%] bg-black rounded-3xl flex p-10 justify-between lg:gap-10 flex-wrap lg:flex-nowrap shadow-xl">
        <div className="font-sans md-text-4xl text-2xl text-white font-extrabold w-full md:w-1/2 text-center md:text-left leading-tight">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </div>

        <div className="flex flex-col gap-5 w-full lg:w-1/2 lg:shrink-0 mt-8 lg:mt-0 lg:items-end items-center">
          <div className="relative w-full md:w-80">
            <MdOutlineEmail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              id="email"
              type="email"
              placeholder="Enter Your e-mail"
              className="bg-gray-100 w-full h-10 rounded-3xl pl-10 pr-4 outline-none"
            />
          </div>
          <button className="w-full md:w-80 bg-gray-100 h-10 flex justify-center items-center rounded-3xl cursor-pointer font-semibold text-gray-700 hover:bg-gray-200 transition">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      <ActualFooter/>
      
      
    </div>
  );
};

export default Footer;
