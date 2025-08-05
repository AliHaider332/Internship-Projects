import React, { useState, useEffect } from 'react';
import { DATA } from './ContextContainer';
import { useSelector, useDispatch } from 'react-redux';
import { updateCity, updateLocation } from './Store';
import errorPic from '../assets/Pics/error.png'
const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [Current_Day, updateData] = useState(null);
  const [hourlyForcast, updateHourly] = useState(null);
  const [daysForcast, updatedays] = useState(null);
  const [error, setError] = useState(null); // <-- Track error here

  function getSevenDaysData(list) {
    const seen = new Set();
    const result = [];

    const today = new Date().toISOString().split('T')[0];

    for (const entry of list) {
      const [date, time] = entry.dt_txt.split(' ');

      if (date === today) continue;
      if (!seen.has(date) && time === '12:00:00') {
        seen.add(date);
        result.push({ date, entries: [entry] });
      }

      if (result.length === 7) break;
    }

    updatedays(result);
  }

  const Location = useSelector((store) => store.LOCATION_DATA);
  const City = useSelector((store) => store.CITY_NAME);

  const lat = Location.lat;
  const long = Location.long;

  const key = '70bc1d916cfa7aecb0aa807562987070';
  const URL1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  const URL1a = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  const URL2 = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${key}&units=metric`;
  const URL2a = `https://api.openweathermap.org/data/2.5/forecast?q=${City}&appid=${key}&units=metric`;

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null); // Reset previous error

        if (lat != null && long != null) {
          const response = await fetch(URL1);
          const forcastResponse = await fetch(URL1a);

          if (!response.ok || !forcastResponse.ok) throw new Error('Invalid location data');

          const data = await response.json();
          const forcastData = await forcastResponse.json();

          updateData(data);
          const fullData = forcastData.list;
          updateHourly(fullData.slice(0, 8));
          getSevenDaysData(fullData);

          dispatch(updateCity(null));
          dispatch(updateLocation({ lat: null, long: null }));
        } else if (City) {
          const response = await fetch(URL2);
          const forcastResponse = await fetch(URL2a);

          if (!response.ok || !forcastResponse.ok) throw new Error('Invalid city name');

          const data = await response.json();
          const forcastData = await forcastResponse.json();

          updateData(data);
          const fullData = forcastData.list;
          updateHourly(fullData.slice(0, 8));
          getSevenDaysData(fullData);
        }
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    }

    fetchData();
  }, [City, lat, long]);

  // Conditional render for error
  if (error) {
    return (
     <div className='flex justify-center items-center h-screen'>
       <img src={errorPic} alt="ERROR" />
     </div>
    );
  }

  return (
    <DATA.Provider value={{ Current_Day, hourlyForcast, daysForcast }}>
      {children}
    </DATA.Provider>
  );
};

export default ContextProvider;
