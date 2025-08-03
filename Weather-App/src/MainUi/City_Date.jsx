import React from 'react';
import { useContext } from 'react';
import { DATA } from '../MainData/ContextContainer';
const City_Date = () => {
  const Current_Day = useContext(DATA);
  return (
    <div className="w-[300px] h-[100px] py-[100px] bg-[#D9D9D9] flex flex-col justify-between items-center box-border">
      <span>city</span>
      <span>city</span>
    </div>
  );
};

export default City_Date;
