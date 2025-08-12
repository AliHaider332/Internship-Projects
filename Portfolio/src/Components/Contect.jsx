import React from 'react';

const Contact = () => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4">
      <div className="w-full lg:w-[80%]">
        <h1 className="text-4xl font-bold dark:text-white caprasimo mb-6 text-center">
          Contact Me
        </h1>
        <div className="w-full flex flex-col gap-2 Roboto">
          <input
            type="email"
            placeholder="Enter Email"
            className="dark:bg-[#2f2f2f] bg-gray-200 w-full p-3 rounded-md dark:text-white text-gray-600 placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Subject"
            className="dark:bg-[#2f2f2f] bg-gray-200 w-full p-3 rounded-md dark:text-white text-gray-600 placeholder-gray-400 focus:outline-none "
          />
          <textarea
            placeholder="Your Message"
            className="dark:bg-[#2f2f2f] bg-gray-200 w-full p-3 rounded-md dark:text-white text-gray-600 placeholder-gray-400 focus:outline-none  resize-y"
            rows="4"
          ></textarea>
          <div className='flex flex-row-reverse dark:text-white mt-3'>
          <span className='px-5 py-0.5 dark:bg-orange-600 bg-transparent border shadow-md dark:border-none rounded-[5px] text-[14px] hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer'>Submit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
