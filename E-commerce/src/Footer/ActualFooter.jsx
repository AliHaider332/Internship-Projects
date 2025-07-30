import React from 'react';
import LOGO from '../assets/SHOP.CO.png';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import P1 from '../assets/P1.png';
import P2 from '../assets/P2.png';
import P3 from '../assets/P3.png';
import P4 from '../assets/P4.png';
import P5 from '../assets/P5.png';
const ActualFooter = () => {
  return (
    <>
      <div className="lg:mt-32 md:mt-60 mt-70   mb-20   px-4  text-center text-gray-600 text-sm sm:text-base flex lg:flex-nowrap flex-wrap mx-[5%]">
        <div className="lg:w-1/5 flex flex-col gap-5 my-3">
          <img src={LOGO} alt="LOGO" className="w-36" />
          <div className="text-[10px] text-gray-600 mt-2 text-left">
            We have clothes that suit your style and that you’re proud to wear —
            from women to men.
          </div>
          <div className="flex gap-2">
            <span className="font-black bg-white shadow-md shadow-black rounded-full w-6 h-6 flex items-center justify-center">
              <FaTwitter className="text-black" />
            </span>
            <span className="font-black bg-white shadow-md shadow-black rounded-full w-6 h-6 flex items-center justify-center">
              <FaFacebook className="text-black" />
            </span>
            <span className="font-black bg-white shadow-md shadow-black rounded-full w-6 h-6 flex items-center justify-center">
              <FaInstagram className="text-black" />
            </span>
            <span className="font-black bg-white shadow-md shadow-black rounded-full w-6 h-6 flex items-center justify-center">
              <FaGithub className="text-black" />
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between w-full gap-y-8 lg:justify-center lg:gap-12 my-3">
          <div className="flex flex-nowrap gap-12 shrink-0">
            <div>
              <h1 className="uppercase text-[16px] text-black font-semibold mb-2 text-left">
                Company
              </h1>
              <ul className="capitalize text-[12px] text-left flex flex-col gap-2">
                <li className="cursor-pointer hover:underline">about</li>
                <li className="cursor-pointer hover:underline">features</li>
                <li className="cursor-pointer hover:underline">works</li>
                <li className="cursor-pointer hover:underline">career</li>
              </ul>
            </div>

            <div>
              <h1 className="uppercase text-[16px] text-black font-semibold mb-2 text-left">
                Help
              </h1>
              <ul className="capitalize text-[12px] text-left flex flex-col gap-2">
                <li className="cursor-pointer hover:underline">
                  customer support
                </li>
                <li className="cursor-pointer hover:underline">
                  delivery details
                </li>
                <li className="cursor-pointer hover:underline">
                  terms & conditions
                </li>
                <li className="cursor-pointer hover:underline">
                  privacy policy
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-nowrap gap-12 shrink-0">
            <div>
              <h1 className="uppercase text-[16px] text-black font-semibold mb-2 text-left">
                FAQ
              </h1>
              <ul className="capitalize text-[12px] text-left flex flex-col gap-2">
                <li className="cursor-pointer hover:underline">account</li>
                <li className="cursor-pointer hover:underline">
                  manage deliveries
                </li>
                <li className="cursor-pointer hover:underline">orders</li>
                <li className="cursor-pointer hover:underline">payments</li>
              </ul>
            </div>

            <div>
              <h1 className="uppercase text-[16px] text-black font-semibold mb-2 text-left">
                Resources
              </h1>
              <ul className="capitalize text-[12px] text-left flex flex-col gap-2">
                <li className="cursor-pointer hover:underline">free ebooks</li>
                <li className="cursor-pointer hover:underline">
                  development tutorial
                </li>
                <li className="cursor-pointer hover:underline">
                  how to - blog
                </li>
                <li className="cursor-pointer hover:underline">
                  youtube playlist
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-300 mx-[5%]" />

      <div className="flex justify-between  text-[12px] font-semibold text-gray-400 mx-[5%] my-10 flex-wrap">
        <span>© 2000-2021, All rights reserved</span>
        <div className='flex my-3'> 
          <img src={P1} alt="P1" className="h-[30px]" />
          <img src={P2} alt="P2" className="h-[30px]" />
          <img src={P3} alt="P3" className="h-[30px]" />
          <img src={P4} alt="P4" className="h-[30px]" />
          <img src={P5} alt="P5" className="h-[30px]" />
        </div>
      </div>
    </>
  );
};

export default ActualFooter;
