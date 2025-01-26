import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [reservations, setReservations] = useState(() => {
    const reservationsFromStorage = localStorage.getItem('reservations');
    return reservationsFromStorage ? JSON.parse(reservationsFromStorage) : [];
  });

  const [cart, setCart] = useState(() => {
    const cartFromStorage = localStorage.getItem('cart');
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pet) => {
    const uniquePet = {
      ...pet,
      uniqueId: `${pet.id}-${Date.now()}-${Math.random()}`,
    };
    setCart((prevCart) => [...prevCart, uniquePet]);
  };

  const removeFromCart = (uniqueId) => {
    setCart((prevCart) => prevCart.filter((pet) => pet.uniqueId !== uniqueId));
  };

  return (
    <CartContext.Provider
      value={{
        reservations,
        cart,
        setCart,
        setReservations,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
