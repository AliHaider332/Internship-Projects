import React from 'react';
import vectorIcon from '../assets/Vector.png'; 
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateTopBar } from '../Store/Topbar';
const TopBar = () => {
  const barState = useSelector((store) => store.topBarState);
  const dispatch=useDispatch();
  
  return (
    (!barState && (
      <div className="w-full h-8 bg-black relative flex items-center">
        <span className="absolute left-1/2  text-white transform -translate-x-1/2 font-satoshi font-normal text-xs md:text-xs  w-80 ">
          Sign up and get 20% off to your first order.{' '}
          <span className="font-medium underline cursor-pointer">
            Sign Up Now
          </span>
        </span>

        <img
          src={vectorIcon}
          alt="Close"
          className="ml-10 absolute right-3 md:right-15 cursor-pointer" onClick={()=>{dispatch(updateTopBar())}}
        />
      </div>
    ))
  );
};

export default TopBar;
