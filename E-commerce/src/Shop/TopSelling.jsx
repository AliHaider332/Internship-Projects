import React, { useContext } from 'react';
import { DATA } from '../ContextContainer/data';
import Rating from './Rating';
import { NavLink } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { updateDetail } from '../Store/productDetail';
const TopSelling = () => {
  const {products} = useContext(DATA);


  const dispath=useDispatch();

  if (!products || products.length === 0) {
    return <div></div>;
  }

  return (
    <div className="mx-[5%]">
      <h1 className="font-sans font-extrabold text-5xl  text-center align-middle  my-10">
        TOP SELLING
      </h1>
      
      <NavLink to='/Detail'>
      <div className="flex flex-wrap justify-center gap-6 my-5 cursor-pointer">
        {products.slice(4, 8).map((product) => (
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

      <div className=" text-center align-middle  my-20 mx-[5%]">
        <NavLink to="/sales">
          <span className="  border-[1px] border-gray-300 px-[60px] py-[10px] rounded-3xl cursor-pointer hover:bg-gray-100">
            View All
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default TopSelling;
