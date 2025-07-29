import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react'; // Lucide icons

const Rating = ({ rating, outOf = 5 }) => {
  const stars = [];

  for (let i = 1; i <= outOf; i++) {
    if (rating >= i) {
      stars.push(<Star key={i} className="text-yellow-400 w-3 h-3 fill-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(<StarHalf key={i} className="text-yellow-400 w-3 h-3 fill-yellow-400" />);
    } 
  }

  return <span className="flex items-center gap-1 shadow-2xl shadow-black">{stars}</span>;
};

export default Rating;