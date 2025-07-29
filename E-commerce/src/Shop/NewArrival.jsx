import React, { useContext } from 'react';
import { DATA } from '../ContextContainer/data';
import Rating from './Rating';

const NewArrival = () => {
  const products = useContext(DATA);

  if (!products || products.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {products.slice(0, 4).map((product) => (
        <div key={product.id} className="w-[150px] md:w-[220px]">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <h3 className=" mt-2 font-satoshi md:font-bold text-[12px] md:text-[16px] truncate">
            {product.title}
          </h3>
          <div className="flex   gap-1 mt-1">
            <Rating rating={product.rating} />
            <span className="text-xs text-gray-600 font-normal">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewArrival;
