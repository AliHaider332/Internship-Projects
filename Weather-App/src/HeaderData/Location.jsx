import React from 'react';
import { ImLocation2 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../MainData/Store';

const Location = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        updateLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        })
      );
    });
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-full text-2xl text-gray-700 dark:text-gray-300 
                 hover:bg-gray-200 dark:hover:bg-gray-800 
                 active:bg-gray-300 dark:active:bg-gray-700 
                 shadow-lg transition-all duration-200 ease-in-out cursor-pointer"
      aria-label="Location"
    >
      <ImLocation2 />
    </button>
  );
};

export default Location;
