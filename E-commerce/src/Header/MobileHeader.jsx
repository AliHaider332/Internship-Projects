import React from 'react'
import LOGO from '../assets/SHOP.CO.png';
import manu from '../assets/1.png';
import search from '../assets/2.png';
import CART from '../assets/3.png';
import Profile from '../assets/4.png';

const MobileHeader = () => {
  return (
    <div className='flex m-3 h-7 justify-between items-center md:hidden'>
        <div className='flex gap-4'>
            
            <img src={manu} alt="manu"className='h-[24px] w-[24px]' />
            <img src={LOGO} alt="Logo" className='w-[120px]' />
        </div>
        <div className='flex flex-row gap-4'>
             <img src={search} alt="Search" className='h-[24px] w-[24px]'/>
             <img src={CART} alt="cart" className='h-[24px] w-[24px]'/>
             <img src={Profile} alt="profile" className='h-[24px] w-[24px]'/>
        </div>
    </div>
  )
}

export default MobileHeader