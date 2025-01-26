import React from 'react';
import ReactDOM from 'react-dom/client'; // Obrati pažnju na ovo: 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Uvezi Router

import App from './App'; // Tvoj glavni App komponenta
import { CartProvider } from './components/CartContext';
import { NotificationProvider } from './components/NotificationProvider';
import { initializeLocalStorage } from './data/LocalStorageManagement';

const root = ReactDOM.createRoot(document.getElementById('root')); // Kreira root za React 18+
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
