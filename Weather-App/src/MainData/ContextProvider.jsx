// ContextProvider.js
import React, { useState, useEffect } from 'react';
import { DATA } from './ContextContainer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateLocation } from './Store';
const ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [Current_Day, updateData] = useState(true);

  const Location = useSelector((store) => store.LOCATION_DATA);
  const City = useSelector((store) => store.CITY_NAME);

  const lat = Location.lat;
  const long = Location.long;

  const key = '70bc1d916cfa7aecb0aa807562987070';
  const URL1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  const URL2 = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${key}&units=metric`;

  useEffect(() => {
    async function fetchData() {
      try {
        if (lat != null && long != null) {
          const response = await fetch(URL1);
          const data = await response.json();
          updateData(data);
          console.log('Weather from coordinates:', data);
          dispatch(updateLocation({ x: null, y: null }));
        } else if (City) {
          const response = await fetch(URL2);
          const data = await response.json();
          updateData(data);
          console.log('Weather from city name:', data);
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      }
    }

    fetchData();
  }, [City, lat, long]); // re-fetch if location or city changes

  return <DATA.Provider value={Current_Day}>{children}</DATA.Provider>;
};

export default ContextProvider;
