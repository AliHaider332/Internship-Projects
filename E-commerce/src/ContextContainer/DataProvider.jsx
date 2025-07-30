
import React, { useEffect, useState } from 'react';
import { DATA } from './data.js'; 

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/search?q=phone');
        const data = await res.json();
        setProducts(data.products); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); 
  }, []);
  
  const reviews = [
    {
      name: "Ali Raza",
      description: "The product exceeded my expectations in terms of quality and usability. Highly recommend to anyone looking for reliability.",
      rating: 4.8,
    },
    {
      name: "Sara Khan",
      description: "Amazing value for the price. I’ve used it daily and found it to be efficient, stylish, and durable overall.",
      rating: 4.5,
    },
    {
      name: "Hamza Noor",
      description: "Works smoothly and the build quality feels premium. I didn’t expect it to perform this well for the cost.",
      rating: 4.6,
    },
    {
      name: "Ayesha Malik",
      description: "I really enjoy using this. It solves a problem I deal with every day and makes my workflow easier.",
      rating: 4.4,
    },
    {
      name: "Usman Tariq",
      description: "Performance is great. Setup was simple and everything works as advertised. I’m very satisfied with my purchase so far.",
      rating: 4.9,
    },
    {
      name: "Fatima Shah",
      description: "Looks good, performs well, and is easy to use. I would definitely buy again or recommend it to friends.",
      rating: 4.3,
    },
    {
      name: "Bilal Ahmed",
      description: "It has some minor issues, but overall a solid item. Could be improved with better instructions or packaging though.",
      rating: 3.8,
    },
    {
      name: "Zara Imran",
      description: "Exceeded expectations in terms of design and functionality. Comfortable and user-friendly for long-term regular usage every day.",
      rating: 4.7,
    },
    {
      name: "Ahmad Saeed",
      description: "Fantastic quality and works like a charm. I was pleasantly surprised by how useful and fast it actually is.",
      rating: 4.6,
    },
    {
      name: "Noor Fatima",
      description: "Average experience. It gets the job done but lacks a few important features. Still okay for the price though.",
      rating: 3.9,
    },
  ];
  

  return (
    <DATA.Provider value={{ products, reviews }}>
      {children}
    </DATA.Provider>
  );
};

export default DataProvider;
