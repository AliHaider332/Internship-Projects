import React, { useEffect, useState, useContext } from 'react';
import City_Date from './City_Date';
import { DATA } from '../MainData/ContextContainer';
import CurrentInfo from './CurrentInfo';
import Second from './Second';
const Main = () => {
  const { Current_Day } = useContext(DATA);
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);

  return (
    //  && Current_Day.main
    <>
      {state && Current_Day ? (
        <div className=" mt-15">
          <div className="flex flex-col md:flex-row md:gap-3 justify-between gap-10 lg:justify-center ">
            <City_Date />
            <CurrentInfo />
          </div>
          <Second></Second>
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
