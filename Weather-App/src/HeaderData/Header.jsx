import React from 'react';
import Toggal from './Toggal.jsx';
import SearchBar from './SearchBar.jsx';
import Location from './Location.jsx';
const Header = () => {
  return (
    <>
      <div className='flex flex-nowrap justify-between items-center'>
      <Toggal />
      <SearchBar />
      <Location/>
      </div>
    </>
  );
};

export default Header;
