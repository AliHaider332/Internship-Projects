import React, { useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { updateCity } from '../MainData/Store';

const SearchBar = () => {
  const dispatch = useDispatch();
  const city_name = useRef();

  return (
    <div
      className="w-[70%] md:w-[80%] md:h-[40px] h-[30px] rounded-3xl relative 
      bg-gradient-to-l from-white via-gray-200 to-[#292929] 
      dark:from-[#3a3a3a] dark:via-[#2d2d2d] dark:to-[#1a1a1a] 
      border dark:border-none shadow-2xl shadow-black"
    >
      <input
        ref={city_name}
        type="text"
        placeholder="Search your preferred city..."
        className="h-full w-full pl-8 md:pl-10 rounded-3xl outline-none bg-transparent text-black dark:text-white placeholder-gray-900 dark:placeholder-gray-400 placeholder:capitalize"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            const value = city_name.current.value.trim();
            if (value !== '') {
              dispatch(updateCity(value));
              city_name.current.value = '';
            }
          }
        }}
      />
      <HiOutlineSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-900 dark:text-gray-300 md:text-2xl" />
    </div>
  );
};

export default SearchBar;
