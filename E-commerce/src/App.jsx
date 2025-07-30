import React from 'react';
import TopBar from './Component/TopBar';
import Header from './Component/Header';
import { Outlet } from 'react-router-dom';
import DataProvider from './ContextContainer/DataProvider';
import './App.css'
import './index.css'
import Footer from './Component/Footer';
const App = () => {
  return (
    <div className="">
      <DataProvider>
      <TopBar />
      <Header />
      <Outlet></Outlet>
      </DataProvider>
      <Footer></Footer>
      
    </div>
  );
};

export default App;
