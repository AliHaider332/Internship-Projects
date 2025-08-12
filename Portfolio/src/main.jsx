import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';

import Home from './Components/Home.jsx';
import Skills from './Components/Skills.jsx';
import Projects from './Components/Projects.jsx';
import About from './Components/About.jsx';
import Contact from './Components/Contect.jsx';
import ProjectDetail from './Components/ProjectDetail.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,RouterProvider
} from 'react-router';
import STORE from './Store/content.js';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Home />} /> {/* default route */}
      <Route path="skills" element={<Skills />} />
      <Route path="projects" element={<Projects/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='contact' element={<Contact/>}></Route>
      <Route path='details' element={<ProjectDetail/>}></Route>
    </Route>
  )
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={STORE}>
    <RouterProvider router={route}></RouterProvider>
    </Provider>
    
  </StrictMode>
);
