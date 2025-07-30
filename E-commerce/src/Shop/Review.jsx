import React, { useContext } from 'react';
import { DATA } from '../ContextContainer/data';
import Rating from './Rating';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from 'react';
const Review = () => {
  const { reviews } = useContext(DATA);

  const [count, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlides();

    window.addEventListener('resize', updateSlides);
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: count,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      <h1 className="font-sans font-extrabold text-5xl  pl-[5%]  my-10">
      OUR HAPPY CUSTOMERS
      </h1>
      <div className="w-full flex justify-center py-10">
        <div className="w-full sm:w-[95%] md:w-[90%] ">
          <Slider {...settings}>
            {reviews.map((review, index) => (
              <div key={index} className="px-3">
                <div className="w-full border-gray-300 border-[1px] p-6 rounded-2xl flex gap-3 flex-col bg-white shadow-md">
                  <Rating rating={review.rating} />
                  <div className="font-semibold text-[16px]">{review.name}</div>
                  <div className="tracking-tighter text-gray-600 leading-5 font-sans text-[14px]">
                    {review.description}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Review;
