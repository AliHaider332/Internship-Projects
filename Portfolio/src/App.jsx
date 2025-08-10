import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router";
import Footer from "./Components/Footer";
const App = () => {
  return (
    <>
    <Header/>
    <dir className='flex  items-center min-h-[100vh] mt-[20%] sm:mt-[12%] md:mt-0 '>
    <Outlet/>
    </dir>
    <Footer/>
    </>
  );
};

export default App;
