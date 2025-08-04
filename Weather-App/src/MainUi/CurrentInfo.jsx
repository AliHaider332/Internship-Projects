import React, { useState, useEffect } from 'react';
import { WiSunrise } from 'react-icons/wi';
import clear from '../assets/Pics/clear.svg';
import { LuWaves, LuWind, LuGauge } from 'react-icons/lu';
import { useContext } from 'react';
import { DATA } from '../MainData/ContextContainer';
import { countryTimezones } from '../MainData/CountryZone';
import { BsClouds } from 'react-icons/bs';
import clouds from '../assets/Pics/clouds.svg';
import drizzle from '../assets/Pics/drizzle.svg';
import rain from '../assets/Pics/rain.svg';
import snow from '../assets/Pics/snow.svg';
import thunderstorm from '../assets/Pics/thunderstorm.svg';
import atmosphere from '../assets/Pics/atmosphere.svg';
import { LuSunrise } from 'react-icons/lu';
import { LuSunset } from 'react-icons/lu';

const CurrentInfo = () => {
  const { Current_Day } = useContext(DATA);
  const countryCode = Current_Day.sys.country;
  const sr = new Date(Current_Day.sys.sunrise * 1000);
  const ss = new Date(Current_Day.sys.sunset * 1000);
  const timeZone = countryTimezones[countryCode];
  const fsr = sr.toLocaleTimeString(`en-${countryCode}`, {
    minute: '2-digit',
    hour: 'numeric',
    hour12: true,
    timeZone,
  });
  const fss = ss.toLocaleTimeString(`en-${countryCode}`, {
    minute: '2-digit',
    hour: 'numeric',
    hour12: true,
    timeZone,
  });
  const [pic, updatePic] = useState();

  useEffect(() => {
    const code = Current_Day.weather[0].id; // Use 'id' from weather, not 'cod'
    if (code <= 232) {
      updatePic(thunderstorm);
    } else if (code <= 321) {
      updatePic(drizzle);
    } else if (code <= 531) {
      updatePic(rain);
    } else if (code <= 622) {
      updatePic(snow);
    } else if (code <= 781) {
      updatePic(atmosphere);
    } else if (code === 800) {
      updatePic(clear);
    } else {
      updatePic(clouds);
    }
  }, [Current_Day]);

  return (
    <div className="w-full  px-3 bg-[#D9D9D9] dark:bg-[#444444] text-black dark:text-[#D9D9D9] rounded-2xl lg:w-[45vw] md:[60vh] shadow-lg shadow-black">
      <div className="md:hidden mb-5">
        <div className="flex justify-between pt-7 ">
          <span className="flex flex-row items-center justify-between gap-1">
            <LuSunrise className="text-3xl" style={{ strokeWidth: 1 }} />
            <span className="flex flex-col gap-0 font-sans text-[12px] font-semibold">
              <span>Sun Rise</span>
              <span>{fsr}</span>
            </span>
          </span>

          <span className="flex flex-row items-center justify-between gap-1">
            <LuSunset className="text-3xl" style={{ strokeWidth: 1 }} />
            <span className="flex flex-col gap-0 font-sans text-[12px] font-semibold">
              <span>Sunset</span>
              <span>{fss}</span>
            </span>
          </span>
        </div>

        <div className="flex mt-8 flex-col items-center">
          <span
            className="font-Archivo text-5xl bg-gradient-to-r from-black to-transparent
        dark:bg-gradient-to-r dark:from-[#D9D9D9] dark:to-transparent bg-clip-text text-transparent text-center"
          >
            {Math.round(Current_Day.main.temp)}°C
          </span>
          <span className="text-center font-sans text-[12px]">
            Feel like:{' '}
            <span className="text-[14px] font-semibold">
              {Math.round(Current_Day.main.feels_like)}°C
            </span>
          </span>
        </div>

        <div className="flex justify-around items-center mt-5">
          <img src={pic} alt="icon" />
          <span className="font-Roboto text-2xl">
            {Current_Day.weather[0].main}
          </span>
        </div>
        <div className="h-full flex justify-between gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Humidity */}
            <span className="flex flex-col items-center text-[12px] text-center">
              <LuWaves className="text-4xl " />
              <span className="font-semibold">
                {Current_Day.main.humidity}%
              </span>
              <span className="text-[10px]">Humidity</span>
            </span>
            {/* Wind */}
            <span className="flex flex-col items-center text-[12px] text-center">
              <LuWind className="text-4xl " />
              <span className="font-semibold">
                {Current_Day.wind.speed} km/h
              </span>
              <span className="text-[10px]">Wind</span>
            </span>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Pressure */}
            <span className="flex flex-col items-center text-[12px] text-center">
              <LuGauge className="text-4xl " />
              <span className="font-semibold">
                {Current_Day.main.pressure} hPa
              </span>
              <span className="text-[10px]">Pressure</span>
            </span>
            {/* UV Index */}
            <span className="flex flex-col items-center text-[12px] text-center">
              <BsClouds className="text-4xl " />
              <span className="font-semibold">{Current_Day.clouds.all}%</span>
              <span className="text-[10px]">Clouds</span>
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-[60%] lg:w-[40%] p-5 ">
        <div className="flex w-full justify-between  gap-[26%] lg:gap-[28%]">
          {/* LEFT: Temperature Info */}
          <div className="flex flex-col gap-2 justify-between items-baseline">
            <div className="flex flex-col">
              <span className="font-Archivo text-5xl lg:text-6xl bg-gradient-to-r from-black to-transparent dark:from-[#D9D9D9] bg-clip-text text-transparent text-center">
                {Math.round(Current_Day.main.temp)}°C
              </span>
              <span className="text-center font-sans text-[12px] lg:text-[14px]">
                Feels like:
                <span className="text-[14px] lg:text-[16px] font-semibold">
                  {Math.round(Current_Day.main.feels_like)}°C
                </span>
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="flex flex-row items-center justify-between gap-1">
                <LuSunrise className="text-4xl" style={{ strokeWidth: 1 }} />
                <span className="flex flex-col gap-0 font-sans text-[14px] font-semibold">
                  <span>Sun Rise</span>
                  <span>{fsr}</span>
                </span>
              </span>

              <span className="flex flex-row items-center justify-between gap-1">
                <LuSunset className="text-4xl" style={{ strokeWidth: 1 }} />
                <span className="flex flex-col gap-0 font-sans text-[14px] font-semibold">
                  <span>Sunset</span>
                  <span>{fss}</span>
                </span>
              </span>
            </div>
          </div>

          {/* MIDDLE: Weather Icon */}
          <div className="flex flex-col  justify-center gap-1">
            <img src={pic} alt="icon" />
            <span className="font-robotoSlab text-2xl">
              {Current_Day.weather[0].main}
            </span>
          </div>

          {/* RIGHT TOP: Humidity & Wind */}
          <div className="flex flex-col gap-6">
            <span className="flex flex-col items-center text-[12px] lg:text-[14px] text-center">
              <LuWaves
                className="text-3xl lg:text-5xl "
                style={{ strokeWidth: 1 }}
              />
              <span className="font-semibold">{Current_Day.main.humidity}%</span>
              <span className="text-[10px] lg:text-[12px]">Humidity</span>
            </span>
            <span className="flex flex-col items-center text-[12px] lg:text-[14px] text-center">
              <LuWind
                className="text-3xl lg:text-5xl"
                style={{ strokeWidth: 1 }}
              />
              <span className="font-semibold">
                {Current_Day.wind.speed} km/h
              </span>
              <span className="text-[10px] lg:text-[12px]">Wind</span>
            </span>
          </div>

          {/* RIGHT BOTTOM: Pressure & UV */}
          <div className="flex flex-col gap-6">
            <span className="flex flex-col items-center text-[12px] lg:text-[14px] text-center">
              <LuGauge
                className="text-3xl lg:text-5xl"
                style={{ strokeWidth: 1 }}
              />
              <span className="font-semibold">
                {Current_Day.main.pressure} hPa
              </span>
              <span className="text-[10px] lg:text-[12px]">Pressure</span>
            </span>
            <span className="flex flex-col items-center text-[12px] lg:text-[14px] text-center">
              <BsClouds className="text-3xl lg:text-5xl" />
              <span className="font-semibold">{Current_Day.clouds.all}%</span>
              <span className="text-[10px] lg:text-[12px]">Clouds</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentInfo;
