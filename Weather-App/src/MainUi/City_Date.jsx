import React from 'react';
import { useContext } from 'react';
import { DATA } from '../MainData/ContextContainer';
import { countryTimezones } from '../MainData/CountryZone';
const City_Date = () => {
  const { Current_Day } = useContext(DATA);

  const countryCode = Current_Day.sys.country;
  const timeZone = countryTimezones[countryCode]; 

  const localDateTime = new Date(Current_Day.dt * 1000);

  const formattedTime = localDateTime.toLocaleTimeString(`en-${countryCode}`, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone,
  });

  const formattedDate = localDateTime.toLocaleDateString(`en-${countryCode}`, {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    timeZone,
  });

  return (
    <div className="bg-[#D9D9D9] dark:bg-[#444444] text-black dark:text-[#D9D9D9] w-full md:w-[30%] flex justify-center rounded-2xl shadow-lg shadow-gray-950">
      <div className="flex flex-col mt-15 mb-7 gap-8">
        <span className="font-Roboto Slab text-2xl font-bold text-center">
          {Current_Day.name}
        </span>
        <span className="flex flex-col">
          <span className="font-Archivo text-4xl text-center uppercase">
            {formattedTime}
          </span>
          <span className="font-serif text-center">{formattedDate}</span>
        </span>
      </div>
    </div>
  );
};

export default City_Date;
