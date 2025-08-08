import React from "react";
import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
    <Header/>
    <dir className='flex justify-center items-center h-[100vh] mt-[5%] '>
    <Outlet/>
    </dir>
    </>
  );
};

export default App;
