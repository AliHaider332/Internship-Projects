import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { DATA } from '../ContextContainer/data';
import Rating from '../Shop/Rating.jsx';
import { useDispatch } from 'react-redux';
import CART, { addToCart } from '../Store/cart.js';
const TopData = () => {
  const Data = useSelector((store) => store.Detail);
  const ID = Data.id;
  
  const { products } = useContext(DATA);
  const PRODUCT = products.filter((item) => item.id === ID);

  const dispatch = useDispatch();
  const [count, updateCount] = useState(1);

  return (
    <div className="flex justify-center">
      <div className="mb-30 mt-10 mx-[5%] md:flex gap-10">
        <div className="flex flex-col-reverse md:flex-row gap-5 items-center w-full">
          <div className="flex md:flex-col flex-row gap-3 justify-center md:w-32 w-full overflow-x-auto md:overflow-visible shrink-0">
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={PRODUCT[0].images?.[i] || PRODUCT[0].thumbnail}
                className="h-[100px] w-[100px] object-cover rounded-2xl border-2 hover:border-gray-400 transition"
              />
            ))}
          </div>

          <div className="w-[80%]   md:flex md:h-auto">
            <img
              src={PRODUCT[0].thumbnail}
              alt="main-product"
              className="w-full h-full object-contain bg-gray-100 rounded-2xl "
            />
          </div>
        </div>

        <div className="flex flex-col  mt-10 md:mt-0  max-w-[500px] gap-y-2.5 md-shrink-1">
          <div className="text-left text-3xl font-extrabold font-sans">
            {PRODUCT[0].title}
          </div>
          <div className="flex   gap-1 mt-1">
            <Rating rating={PRODUCT[0].rating} />
            <span className="text-xs text-gray-600 font-normal">
              {PRODUCT[0].rating.toFixed(1)}/5
            </span>
          </div>

          <div className="flex flex-nowrap gap-3 items-center">
            <span className="text-[22px] md:text-[26px] font-bold">
              ${PRODUCT[0].price.toFixed()}
            </span>

            <span className="sm:text-[20px] font-sans md:text-[22px] font-bold line-through text-gray-300 ml-2">
              $
              {(
                (PRODUCT[0].discountPercentage / 100) * PRODUCT[0].price +
                PRODUCT[0].price
              ).toFixed(1)}
            </span>
            <span className="border-red-400 md:h-6 p-[1.25px] px-[3px] border-[1.5px] rounded-2xl bg-red-100 text-[8px] md:text-[12px] ml-2 text-red-500">
              -{PRODUCT[0].discountPercentage.toFixed(1)}%
            </span>
          </div>

          <div className="text-[12px] text-gray-400  font-semibold">
            {PRODUCT[0].description}
          </div>
          <hr className="text-gray-200 " />

          <div className="my-2 text-gray-400 flex flex-col gap-2">
            <h1 className="text-[14px]">Choose Size</h1>
            <div className="flex gap-2">
              <span className="bg-gray-100 px-2 py-1 capitalize rounded-2xl text-[12px] hover:bg-gray-200 cursor-pointer border-black active:bg-black active:text-white">
                small
              </span>
              <span className="bg-gray-100 px-2 py-1 capitalize rounded-2xl text-[12px]  hover:bg-gray-200  cursor-pointer border-black active:bg-black active:text-white">
                medium
              </span>
              <span className="bg-gray-100 px-2 py-1 capitalize rounded-2xl text-[12px]  hover:bg-gray-200 cursor-pointer border-black active:bg-black active:text-white">
                large
              </span>
              <span className="bg-gray-100 px-2 py-1 capitalize rounded-2xl text-[12px]  hover:bg-gray-200 cursor-pointer border-black active:bg-black active:text-white">
                X-large
              </span>
            </div>
          </div>
          <hr className="text-gray-200 " />

          <div className="flex w-full justify-between items-center gap-5">
            <div className="flex justify-between gap-x-5 bg-gray-200  px-2 rounded-3xl items-center">
              <div
                className="text-gray-900 text-3xl active:bg-gray-300 cursor-pointer px-3 rounded-full"
                onClick={() => {
                  if (count > 1) {
                    updateCount(count - 1);
                  }
                }}
              >
                -
              </div>
              <div className="text-gray-900 text-2xl">{count}</div>
              <div
                className="text-gray-900 text-3xl active:bg-gray-300 cursor-pointer px-2 rounded-full"
                onClick={() => {
                  updateCount(count + 1);
                }}
              >
                +
              </div>
            </div>
            <div
              className="text-white w-full text-center bg-black px-6 py-2 rounded-full cursor-pointer hover:bg-gray-800 transition"
              onClick={() => {
                dispatch(addToCart({ ID, count ,price:PRODUCT[0].price}));
                updateCount(1);
                
              }}
            >
              ADD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopData;
