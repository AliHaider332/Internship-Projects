import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
