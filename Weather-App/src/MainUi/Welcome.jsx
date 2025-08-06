import React from 'react';

const Welcome = () => {
  return (
    <div className="dark:text-gray-200 text-gray-700 flex flex-col items-center mt-16 px-4 text-center">
      <h1 className="uppercase font-Archivo text-4xl font-bold tracking-wider mb-4">
        Welcome
      </h1>
      <div className="font-Roboto text-center">
        <p className="text-lg font-medium mb-2">
          Hi, I'm{' '}
          <span className="text-orange-600 dark:text-orange-400">
            Ali Haider
          </span>{' '}
          — a passionate developer working on real world projects and data
          visualization.
        </p>
        <p className=" text-base text-gray-700 dark:text-gray-400 mb-4 text-center">
          This project showcases live weather updates using few{' '}
          <strong>free weather API</strong>. It provides information about
          weather forcasting in a clean and responsive interface.
        </p>
        <p className="text-sm italic text-black dark:text-gray-300">
          ⚠️ Data updates every ~10 minutes — so expect slight delays in
          real-time accuracy.
        </p>
      </div>
    </div>
  );
};

export default Welcome;
