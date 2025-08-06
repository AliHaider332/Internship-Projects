import React, { useEffect, useState, useContext } from 'react';
import City_Date from './City_Date';
import { DATA } from '../MainData/ContextContainer';
import CurrentInfo from './CurrentInfo';
import Second from './Second';
import { FaSpinner } from 'react-icons/fa';
const Main = () => {
  const { Current_Day } = useContext(DATA);
  
  return (
   
    <>
      { Current_Day ? (
        <div className=" mt-15  ">
          <div className="flex flex-col md:flex-row md:gap-3 justify-between gap-10 lg:justify-center">
            <City_Date />
            <CurrentInfo />
          </div>
          <div className="w-full flex justify-center mt-5">
            <Second></Second>
          </div>
        </div>
      ) : (
        <div className="text-center flex justify-around mt-50">
          <FaSpinner className="animate-spin text-2xl text-gray-800 dark:text-gray-200" />
        </div>
      )}
    </>
  );
};

export default Main;
