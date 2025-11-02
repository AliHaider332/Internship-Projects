import React from 'react';
import LeftDiscription from '../Home/LeftDiscription';
import RightPicture from '../Home/RightPicture';
const Home = () => {
  return (
    <div className="w-full flex flex-col md:flex-row flex-wrap  md:flex-nowrap md:justify-between items-center gap-10 justify-around mb-10 md:mb-0 pt-8 md:pt-2 lg:pt-0">
      <LeftDiscription />
      <RightPicture />
    </div>
  );
};

export default Home;
