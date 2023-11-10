import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserProvider from './context/UserContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </BrowserRouter>

);

