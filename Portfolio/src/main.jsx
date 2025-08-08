import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import Home from './Components/Home.jsx';
import Skills from './Components/Skills.jsx';
import Projects from './Components/Projects.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contect.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,RouterProvider
} from 'react-router';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} /> {/* default route */}
      <Route path="skills" element={<Skills />} />
      <Route path="projects" element={<Projects/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='contact' element={<Contact/>}></Route>
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}></RouterProvider>
    
  </StrictMode>
);
