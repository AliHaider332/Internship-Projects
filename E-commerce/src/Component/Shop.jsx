import React, { useContext } from 'react';
import Hero from '../Shop/Hero';
import NewArrival from '../Shop/NewArrival.jsx';
import TopSelling from '../Shop/TopSelling.jsx';
import DressingStyle from '../Shop/DressingStyle.jsx';
import Review from '../Shop/Review.jsx';
const Shop = () => {
  
  
  
  return (
    <>
      <Hero />
      
      <NewArrival></NewArrival>
      <TopSelling></TopSelling>
      <DressingStyle></DressingStyle>
      <Review></Review>
      
      
    </>
  );
};

export default Shop;
