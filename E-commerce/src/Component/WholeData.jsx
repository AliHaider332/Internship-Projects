import React from 'react'
import { useContext } from 'react'
import { DATA } from '../ContextContainer/data'
import { NavLink } from 'react-router-dom'
import Rating from '../Shop/Rating'
import { useDispatch } from 'react-redux'
import { updateDetail } from '../Store/productDetail';
const WholeData = () => {
  const dispath=useDispatch();
  const {products}=useContext(DATA);
  return (
    <NavLink to="/Detail">
        <div className="flex flex-wrap justify-center gap-6 my-5 cursor-pointer">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[150px] md:w-[220px] flex  flex-col gap-[4px] my-5"
              onClick={() => {
                dispath(updateDetail({ id: product.id}));
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
              <h3 className=" mt-2 font-satoshi md:font-semibold text-[12px] md:text-[16px] truncate">
                {product.title}
              </h3>

              <div className="flex   gap-1 mt-1">
                <Rating rating={product.rating} />
                <span className="text-xs text-gray-600 font-normal">
                  {product.rating.toFixed(1)}/5
                </span>
              </div>

              <div>
                <span className="md:text-[24px] font-bold">
                  ${product.price.toFixed()}
                </span>

                <span className="sm:text-[18px] font-sans md:text-[22px] font-bold line-through text-gray-300 ml-2">
                  $
                  {(
                    (product.discountPercentage / 100) * product.price +
                    product.price
                  ).toFixed(1)}
                </span>
                <span className="border-red-400 p-[1.25px] px-[3px] border-[1.5px] rounded-2xl bg-red-100 text-[8px] md:text-[12px] ml-2 text-red-500">
                  -{product.discountPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </NavLink>
  )
}

export default WholeData