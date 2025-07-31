import React from 'react'
import { useContext } from 'react'
import { DATA } from '../ContextContainer/data'
import Rating from '../Shop/Rating'
const Review = () => {
    const {reviews}=useContext(DATA)
  return (
    <div className='flex flex-col mx-[5%] pb-10'>
        <h1 className='text-center text-shadow-black text-shadow-2xs mb-0.5'>Rating & Reviews</h1>
        <hr className='text-gray-200'/>
        <h1 className='my-5 font-semibold text-[18px]'>All Reviews <span className='text-gray-300 text-[12px]'>(10)</span></h1>

        <div className='grid md:grid-cols-2 gap-3 h-auto'>
            {reviews.map((review,index)=>(
                 <div className="px-3" key={index}>
                 <div className="w-full border-gray-300 border-[1px] p-6 rounded-2xl flex gap-3 flex-col bg-white shadow-md">
                   <Rating rating={review.rating} />
                   <div className="font-semibold text-[16px]">{review.name}</div>
                   <div className="tracking-tighter text-gray-600 leading-5 font-sans text-[14px]">
                     {review.description}
                   </div>
                 </div>
               </div>
            ))}
        </div>




    </div>
  )
}

export default Review