import React from 'react';
import HourslyForcasting from './HourslyForcasting';
import DaysWeather from './daysWeather';

const Second = () => {
  return (
    <div className="flex flex-col md:flex-row  items-center 
                    w-full md:w-full lg:w-[82%] gap-3  ">
      <div className="w-full md:w-2/3">
        <HourslyForcasting />
      </div>
      
        <DaysWeather />
      
    </div>
  );
};

export default Second;


// md:flex-row md:gap-3 justify-between gap-10 lg:justify-center md:w-[100%] lg:w-[82%]