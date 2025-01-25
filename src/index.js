import React from 'react';
import ReactDOM from 'react-dom/client'; // Obrati pažnju na ovo: 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; // Uvezi Router

import App from './App'; // Tvoj glavni App komponenta
import { CartProvider } from './components/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Kreira root za React 18+
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
