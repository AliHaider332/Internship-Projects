import React from 'react';
import TopBar from './Component/TopBar';
import Header from './Component/Header';
import { Outlet } from 'react-router-dom';
import DataProvider from './ContextContainer/DataProvider';
const App = () => {
  return (
    <div className="">
      <DataProvider>
      <TopBar />
      <Header />
      <Outlet></Outlet>
      </DataProvider>
      
    </div>
  );
};

export default App;
