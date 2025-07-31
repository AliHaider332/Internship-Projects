import React from 'react'
import TopData from '../ProductDetails/TopData'


import { useDispatch } from 'react-redux';

import Review from '../ProductDetails/Review';
const ProductDetail = () => {
  return (
    <>
      

      <TopData />
      <Review></Review>
    </>
  )
}

export default ProductDetail
