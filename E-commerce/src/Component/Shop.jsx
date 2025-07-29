import React, { useContext } from 'react';
import Hero from '../Shop/Hero';
import NewArrival from '../Shop/NewArrival.jsx';
const Shop = () => {
  
  // console.log(products);
  
  return (
    <>
      <Hero />
      <h1 className="font-sans font-extrabold text-3xl  text-center align-middle  my-5">
      NEW ARRIVALS
      </h1>
      <NewArrival></NewArrival>
      
    </>
  );
};

export default Shop;
