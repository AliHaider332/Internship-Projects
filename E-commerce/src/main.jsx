import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './Store/store.js';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from 'react-router-dom';

import Shop from './Component/Shop.jsx';
import Arivals from './Component/Arivals.jsx';
import Sales from './Component/Sales.jsx';
import Brands from './Component/Brands.jsx';

// Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Shop />} />
      <Route path='arrival' element={<Arivals />} />
      <Route path='sales' element={<Sales />} />
      <Route path='brands' element={<Brands />} />
    </Route>
  )
);

// Render app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
