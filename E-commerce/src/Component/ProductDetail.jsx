import React from 'react'
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { DATA } from '../ContextContainer/data';
import { FaSpinner } from "react-icons/fa";
const ProductDetail = () => {
    const ID=useSelector(store=>store.Detail);
    const {products} = useContext(DATA);


    if (!products || products.length === 0) {
        return <div className='text-center flex justify-around my-10'><FaSpinner className="animate-spin text-2xl text-gray-800" /></div>;
      }


      const PRODUCT=products.filter(item=>item.id===ID)

      console.log(PRODUCT)

  return (
    <div className='my-100'>ProductDetail {PRODUCT[0].title}</div>
  )
}

export default ProductDetail;