import React from 'react';
import Toggal from './Toggal.jsx';
import SearchBar from './SearchBar.jsx';
import Location from './Location.jsx';
const Header = () => {
  return (
   <div className='flex justify-center'>
    <div className='flex flex-nowrap justify-between items-center w-full md:w-[70vw] lg:w[60vw]'>
      <Toggal />
      <SearchBar />
      <Location/>
      </div>
   </div>
  );
};

export default Header;
