import React from 'react';
import D1 from '../assets/dress1.png';
import D2 from '../assets/dress2.png';
import D3 from '../assets/dress3.png';
import D4 from '../assets/dress4.png';

const DressingStyle = () => {
  return (
    <div className="mx-[5%] bg-[#F0F0F0] rounded-3xl">
      <h1 className="font-sans font-extrabold text-5xl text-center py-10 my-10 uppercase">
        BROWSE BY dress STYLE
      </h1>

      <div className="w-full grid  md:grid-cols-3 gap-5 p-10">
        {/* Casual */}
        <div className="relative h-72 rounded-2xl overflow-hidden">
          <img
            src={D2}
            alt="Dress Pic"
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute top-10 left-7 font-bold text-[20px] text-black">
            Casual
          </span>
        </div>

        {/* Formal */}
        <div className="relative h-72 md:col-span-2 rounded-2xl overflow-hidden">
          <img
            src={D1}
            alt="Dress Pic"
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute top-10 left-7 font-bold text-[20px] text-black">
            Formal
          </span>
        </div>

        {/* Party */}
        <div className="relative h-72 md:col-span-2 rounded-2xl overflow-hidden">
          <img
            src={D3}
            alt="Dress Pic"
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute top-10 left-7 font-bold text-[20px] text-black">
            Party
          </span>
        </div>

        {/* Gym */}
        <div className="relative h-72 rounded-2xl overflow-hidden">
          <img
            src={D4}
            alt="Dress Pic"
            className="w-full h-full object-cover rounded-2xl"
          />
          <span className="absolute top-10 left-7 font-bold text-[20px] text-black">
            Gym
          </span>
        </div>
      </div>
    </div>
  );
};

export default DressingStyle;
