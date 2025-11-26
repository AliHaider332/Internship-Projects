import React from 'react';
import './App.css';
import Header from './Components/Header';
import { Outlet } from 'react-router';
import Footer from './Components/Footer';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full pt-16 md:pt-20 lg:pt-24">
        <div className="w-full max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="min-h-[60vh]">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;