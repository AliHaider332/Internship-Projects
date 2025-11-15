import React from 'react';
import './App.css';
import Header from './Components/Header';
import { Outlet } from 'react-router';
import Footer from './Components/Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Main content with safe area for fixed header */}
      <main className="flex-1 w-full pt-20 md:pt-24 lg:pt-28 safe-area-top">
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] w-full py-4 md:py-8">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;