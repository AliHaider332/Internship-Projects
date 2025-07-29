// DataProvider.jsx
import React, { useEffect, useState } from 'react';
import { DATA } from './data.js'; // path to your createContext([])

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // start with empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products/search?q=phone');
        const data = await res.json();
        setProducts(data.products); // update state with fetched products
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // call async function
  }, []);

  return (
    <DATA.Provider value={products}>
      {children}
    </DATA.Provider>
  );
};

export default DataProvider;
