import React, { useEffect, useState, useContext } from 'react';
import City_Date from './City_Date';
import { DATA } from '../MainData/ContextContainer';

const Main = () => {
  const Current_Day = useContext(DATA);
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);

  return (
    // && Current_Day && Current_Day.main
    <>
      {state  ? (
        <div>
          <City_Date />
        </div>
      ) : (
        <div className="text-center p-4 text-gray-500 dark:text-gray-300">
          Loading weather...
        </div>
      )}
    </>
  );
};

export default Main;
