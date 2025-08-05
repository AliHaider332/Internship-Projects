import React, { useContext } from 'react';
import clouds from '../assets/Pics/clouds.svg';
import drizzle from '../assets/Pics/drizzle.svg';
import rain from '../assets/Pics/rain.svg';
import snow from '../assets/Pics/snow.svg';
import thunderstorm from '../assets/Pics/thunderstorm.svg';
import atmosphere from '../assets/Pics/atmosphere.svg';
import night from '../assets/Pics/night.png';
import moon from '../assets/Pics/moon.png';
import clear from '../assets/Pics/clear.svg';
import { DATA } from '../MainData/ContextContainer';
import { countryTimezones } from '../MainData/CountryZone';

const DaysWeather = () => {
  const { daysForcast, Current_Day } = useContext(DATA);

  function formatedate(para) {
    const countryCode = Current_Day.sys.country;
    const countryZone = countryTimezones[countryCode];
    const date = new Date(para * 1000);
    return date.toLocaleDateString(`en-${countryCode}`, {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      timeZone: countryZone,
    });
  }

  function pickimg({ id, icon }) {
    if (id <= 232) return thunderstorm;
    if (id <= 321) return drizzle;
    if (id <= 531) return rain;
    if (id <= 622) return snow;
    if (id <= 781) return atmosphere;
    if (id === 800) return icon.endsWith('n') ? moon : clear;
    if (id >= 801 && id <= 804) return icon.endsWith('n') ? night : clouds;
    return clear;
  }

  return (
    <div className="bg-[#D9D9D9] dark:bg-[#444444] text-black dark:text-[#D9D9D9] 
                    w-full rounded-4xl shadow-lg shadow-black md:w-120">
      {
        daysForcast.map((day, index) => {
          const entry = day.entries[0];
          const weather = entry.weather[0];

          return (
            <div key={index} className="p-2 px-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600 last:border-b-0">
              <img
                src={pickimg(entry.weather[0])}
                alt="weather"
                className="w-[50px]"
              />
              <span className="font-Roboto font-semibold text-2xl md:text-xl lg:text-2xl">
                { Math.round(day.entries[0].main.temp)}°C
              </span>
              <span className="font-Roboto text-xl md:text-[12px] lg:text-[0.8.5rem] xl:text-xl">
                {formatedate( day.entries[0].dt)}
              </span>
            </div>
          );
        })
      }
    </div>
  );
};

export default DaysWeather;
