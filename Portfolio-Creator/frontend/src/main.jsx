import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import Home from './pages/Home.jsx';
import Portfolio_Builder from './pages/PortfolioBuilder.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/Page404.jsx';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} />
      <Route path="portfolio-builder" element={<Portfolio_Builder />} />
      <Route path='about' element={<About/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
  </StrictMode>
);
