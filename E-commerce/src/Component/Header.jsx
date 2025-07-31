import React from 'react';
import DesktopHeader from '../Header/DesktopHeader';
import MobileHeader from '../Header/MobileHeader';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Header = () => {
  const dispatch=useDispatch();
  const arrow=useSelector(store=>store.HomeToDetail);

  return (
    <>
    
    <DesktopHeader/>
    <MobileHeader/>

   
    </>
    



  );
};

export default Header;
