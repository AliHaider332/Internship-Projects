import React, { useContext } from 'react';
import clear from '../assets/Pics/clear.svg';
import top from '../assets/Icons/n1.png';
import { DATA } from '../MainData/ContextContainer';
import { countryTimezones } from '../MainData/CountryZone';
import clouds from '../assets/Pics/clouds.svg';
import drizzle from '../assets/Pics/drizzle.svg';
import rain from '../assets/Pics/rain.svg';
import snow from '../assets/Pics/snow.svg';
import thunderstorm from '../assets/Pics/thunderstorm.svg';
import atmosphere from '../assets/Pics/atmosphere.svg';
import night from '../assets/Pics/night.png';
import moon from '../assets/Pics/moon.png';
import '../App.css'
const HourslyForcasting = () => {
  const { hourlyForcast, Current_Day } = useContext(DATA);

  function formatedate(para) {
    const countryCode = Current_Day.sys.country;
    const countryZone = countryTimezones[countryCode];
    const date = new Date(para * 1000);
    return date.toLocaleTimeString(`en-${countryCode}`, {
      minute: '2-digit',
      hour: 'numeric',
      hour12: true,
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

  function direction(deg) {
    if (deg % 180 > 90) return -45;
    if (deg % 180 < 90) return 45;
    return 0;
  }

  function selectColor(icon) {
    return icon.endsWith('n')
      ? 'from-[#443D64] to-[#6582C6]'
      : 'from-[#F88508] to-[#F6FAD9]';
  }

  return (
    <div className="bg-[#D9D9D9] dark:bg-[#444444] text-black dark:text-[#D9D9D9] w-full max-w-full  flex flex-col items-center rounded-2xl shadow-lg p-4">
      <h1 className="text-xl font-bold mb-4 font-Roboto text-center">
        Next 24 Hours Weather Map
      </h1>

      {/* Scrollable container */}
      <div id="scroller" className="w-full overflow-x-auto pb-1">
        <div className="flex gap-4 min-w-fit">
          {hourlyForcast.slice(0, 9).map((item, index) => (
            <div
              key={index}
              className={`min-w-[110px] sm:min-w-[120px] md:min-w-[130px] h-[240px] flex-shrink-0
              flex flex-col items-center justify-around rounded-2xl p-2 
              bg-gradient-to-b ${selectColor(item.weather[0].icon)}
              dark:bg-[#373636] dark:from-transparent dark:to-transparent`}
            >
              <span className="font-Roboto font-semibold text-sm">
                {formatedate(item.dt)}
              </span>
              <img
                src={pickimg(item.weather[0])}
                alt="weather"
                className="h-[80px] md:h-[100px]"
              />
              <span className="text-base font-semibold font-Archivo">
                {Math.round(item.main.temp)}°C
              </span>
              <img
                src={top}
                alt="direction"
                className={`h-[35px] w-[35px] md:h-[40px] md:w-[40px] rotate-[-${direction(
                  item.wind.deg
                )}deg]`}
              />
              <span className="font-semibold text-xs">
                {item.wind.speed.toFixed(1)} km/h
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourslyForcasting;
