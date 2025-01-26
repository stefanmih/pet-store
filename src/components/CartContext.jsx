import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const cartFromStorage = localStorage.getItem('cart');
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
  });

  const [reservations, setReservations] = useState(() => {
    const reservationsFromStorage = localStorage.getItem('reservations');
    return reservationsFromStorage ? JSON.parse(reservationsFromStorage) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const addToCart = (pet) => {
    setCart((prevCart) => [...prevCart, pet]);
  };

  const removeFromCart = (uniqueId) => {
    setCart((prevCart) => prevCart.filter((pet) => pet.uniqueId !== uniqueId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addReservation = (newReservation) => {
    setReservations((prevReservations) => [...prevReservations, newReservation]);
  };

  const updateReservation = (reservationId, updatedPets) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, pets: updatedPets }
          : reservation
      )
    );
  };

  const removeReservation = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== reservationId)
    );
  };

  const addPetToReservation = (reservationId, pet) => {
    setReservations((prevReservations) => {
      const reservationExists = prevReservations.find(
        (reservation) => reservation.id === reservationId
      );
  
      if (!reservationExists) {
        // Kreiraj novu rezervaciju ako ne postoji
        return [
          ...prevReservations,
          {
            id: reservationId,
            userId: null,
            status: 'korpa',
            pets: [pet],
          },
        ];
      } else {
        // Dodaj ljubimca u postojeću rezervaciju
        return prevReservations.map((reservation) =>
          reservation.id === reservationId
            ? { ...reservation, pets: [...reservation.pets, pet] }
            : reservation
        );
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        reservations,
        addToCart,
        removeFromCart,
        clearCart,
        addReservation,
        updateReservation,
        addPetToReservation,
        removeReservation
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
