import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import STORE from './MainData/Store.js';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={STORE}>
      <App />
    </Provider>
  </StrictMode>
);
