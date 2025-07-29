import React from 'react';
import HeroImage from '../assets/Hero.jpg';
import vector from '../assets/HeroVector.png';
import B1 from '../assets/B1.png';
import B2 from '../assets/B2.png';
import B3 from '../assets/B3.png';
import B4 from '../assets/B4.png';
import B5 from '../assets/B5.png';

const StatBox = ({ number, label }) => (
  <div className="flex flex-col items-center justify-center text-center flex-1 min-w-[100px] ">
    <span className="font-mono font-bold text-[1.75rem] sm:text-[2rem] leading-[100%]">
      {number}
    </span>
    <span className="font-Satoshi font-light text-[10px] text-gray-500 leading-tight mt-1">
      {label}
    </span>
  </div>
);

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F0F1] relative overflow-x-hidden">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row px-6 sm:px-10 md:px-14 lg:px-20 justify-between items-center gap-6 md:gap-4 pt-5 md:pt-10">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left py-4">
          <h1 className="font-integral font-extrabold text-3xl sm:text-4xl md:text-[32px] lg:text-5xl leading-snug tracking-normal max-w-[600px]">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>

          <p className="text-gray-600 mt-4 text-sm sm:text-base max-w-[500px] font-Satoshi">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <button className="mt-6 bg-black text-white px-10 py-3 rounded-3xl text-[15px] hover:bg-gray-800 transition duration-300">
            Shop Now
          </button>

          {/* Stats */}
          <div className="flex flex-wrap justify-between items-center gap-6 mt-10 mb-7">
            <StatBox number="200+" label="International Brands" />
            <StatBox number="2,000+" label="High-Quality Products" />
            <StatBox number="30,000+" label="Happy Customers" />
          </div>
        </div>

        {/* Right Section */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
          <img
            src={HeroImage}
            alt="Hero showing fashion clothes"
            className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] object-contain"
          />

          {/* Decorative Vectors */}
          <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
            <img
              src={vector}
              alt=""
              aria-hidden="true"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 sm:w-8"
            />
            <img
              src={vector}
              alt=""
              aria-hidden="true"
              className="absolute top-[50px] sm:top-[70px] right-2 w-12 sm:w-16"
            />
          </div>
        </div>
      </div>

      {/* Bottom Brand Strip */}
      <div className="relative mt-10 w-full px-6 sm:px-10 md:px-14 lg:px-20 py-5 bg-black flex flex-wrap items-center justify-center sm:justify-between gap-8">
        {[B1, B2, B3, B4, B5].map((brand, index) => (
          <img
            key={index}
            src={brand}
            alt={`Brand ${index + 1}`}
            role="presentation"
            className="h-[28px] sm:h-[32px]"
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
