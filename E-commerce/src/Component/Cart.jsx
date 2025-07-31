import React from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { DATA } from '../ContextContainer/data';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const Cart = () => {
  const { products } = useContext(DATA);
  const AllProducts = useSelector((store) => store.CART);
  console.log(AllProducts);

  const temp = products[8];
  console.log(temp);
  return (
    <div className="mx-4 md:mx-[5%]">
    <h1 className="text-xl md:text-2xl font-sans font-extrabold mb-4">YOUR CART</h1>
  
    <div className="flex flex-col md:flex-row border w-full md:max-w-[600px] p-3 rounded-2xl border-gray-300 relative gap-3
    msm:items-start items-center">
      {/* Delete icon */}
      <span className="absolute top-1 right-1.5 text-red-500 cursor-pointer hover:shadow rounded-full p-1">
        <RiDeleteBin6Fill />
      </span>
  
      {/* Image */}
      <img
        src={temp.thumbnail}
        alt="Pic"
        className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] bg-gray-100 rounded-2xl object-cover"
      />
  
      {/* Info */}
      <div className="flex flex-col justify-between gap-2 text-sm md:text-base">
        <div className="font-semibold">{temp.title}</div>
  
        <div className="text-gray-400">
          <span className="font-semibold">Shipping: </span>
          <span className="font-light">{temp.shippingInformation}</span>
        </div>
  
        <div className="text-gray-400">
          <span className="font-semibold">Return Policy: </span>
          <span className="font-light">{temp.returnPolicy}</span>
        </div>
  
        <div className="text-base md:text-lg font-bold">{temp.price}$</div>
      </div>
    </div>
  </div>
  
  );
};

export default Cart;
