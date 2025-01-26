import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom'; 

import App from './App';
import { CartProvider } from './components/CartContext';
import { NotificationProvider } from './components/NotificationProvider';
import { initializeLocalStorage } from './data/LocalStorageManagement';

const root = ReactDOM.createRoot(document.getElementById('root'));
initializeLocalStorage();
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
