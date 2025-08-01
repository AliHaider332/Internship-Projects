import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DATA } from '../ContextContainer/data';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { deleteFromCart, totalAmount } from '../Store/cart';

const Cart = () => {
  const { products } = useContext(DATA);
  const AllProducts = useSelector((store) => store.CART.arr);
  const TOTAL_AMOUNT = useSelector((store) => store.CART.totalAmount);
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(totalAmount());
  }, [AllProducts]);

  if (AllProducts.length === 0) {
    return (
      <div className="mx-4 md:mx-[5%] h-auto pb-10">
        <h1 className="text-xl md:text-2xl font-serif capitalize font-semibold my-15 text-center">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-[5%] h-auto pb-10">
      <h1 className="text-xl md:text-2xl font-sans font-extrabold my-4">
        YOUR CART
      </h1>
      <div className="flex flex-wrap max-w-full justify-between">
        <div>
          {AllProducts.map((cartItem) => {
            const product = products.find((p) => p.id === cartItem.ID);
            if (!product) return null;

            return (
              <div
                key={product.id}
                className="flex flex-col md:flex-row border w-full md:max-w-[100%] p-3 rounded-2xl border-gray-300 relative gap-3 items-center mb-4"
              >
                <span
                  className="absolute top-1 right-1.5 text-red-500 cursor-pointer hover:shadow rounded-full p-1"
                  onClick={() => {
                    dispatch(deleteFromCart({ id: product.id }));
                    dispatch(totalAmount());
                  }}
                >
                  <RiDeleteBin6Fill />
                </span>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-[100px] w-[100px] md:h-[120px] md:w-[120px] bg-gray-100 rounded-2xl object-cover"
                />

                <div className="flex flex-col justify-between gap-2 text-sm md:text-base">
                  <div className="font-semibold">{product.title}</div>
                  <div className="text-gray-400">
                    <span className="font-semibold">Shipping: </span>
                    {product.shippingInformation}
                  </div>
                  <div className="text-gray-400">
                    <span className="font-semibold">Return Policy: </span>
                    {product.returnPolicy}
                  </div>
                  <div className="text-base md:text-lg font-bold">
                    ${Math.round(product.price)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Quantity: {cartItem.count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full md:w-[300px] px-4 py-6 bg-gray-100 rounded-xl h-fit gap-5 flex flex-col">
          <h2 className="text-lg font-extrabold mb-2">Total Summary</h2>
          <div className="flex justify-between text-base font-medium">
            <span>Price:</span>
            <span>${Math.round(TOTAL_AMOUNT)}</span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span>Discount(20%):</span>
            <span className='text-red-600'>-${Math.round(TOTAL_AMOUNT*20/100)}</span>
          </div>
          <div className="flex justify-between text-base font-medium">
            <span>Delivery Charges:</span>
            <span>$15</span>
          </div>
          <hr className='text-gray-300'/>
          <div className="flex justify-between text-lg font-extrabold">
            <span>Total Charges:</span>
            <span>${Math.round(TOTAL_AMOUNT-(Math.round(TOTAL_AMOUNT*20/100))+15)}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Cart;
