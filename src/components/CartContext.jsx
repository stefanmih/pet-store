import React, { createContext, useContext, useState } from 'react';
import { initialReservations } from '../data/reservations';
import { petsData } from '../data/pets';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [reservations, setReservations] = useState(initialReservations);

  const addToCart = (pet) => {
    setCart((prevCart) => {
      return [...prevCart, pet];
    });
  };

  const removeFromCart = (petIndex) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== petIndex));
  };

  const addReservation = (newReservation) => {
    setReservations((prevReservations) => [...prevReservations, newReservation]);
    setCart([]); // Očistite korpu nakon kreiranja nove rezervacije
    console.log('Nova rezervacija dodata:', newReservation);
  };

  const removeReservation = (reservationId) => {
    setReservations((prevReservations) =>
      prevReservations.filter((reservation) => reservation.id !== reservationId)
    );
  };

  const updateReservationReviews = (petId, newReview) => {
    // Ažuriraj `petsData` sa novom recenzijom
    const petIndex = petsData.findIndex((pet) => pet.id === petId);
    if (petIndex !== -1) {
      petsData[petIndex].reviews = [...(petsData[petIndex].reviews || []), newReview];
    }

    // Ažuriraj rezervacije za doslednost
    setReservations((prevReservations) =>
      prevReservations.map((reservation) => ({
        ...reservation,
        pets: reservation.pets.map((pet) =>
          pet.id === petId
            ? { ...pet, reviews: [...(pet.reviews || []), newReview] }
            : pet
        ),
      }))
    );
    console.log('Recenzija dodata za ljubimca:', petId, newReview);
  };

  const updateReservation = (reservationId, updatedPets) => {
    setReservations((prevReservations) =>
      prevReservations.map((reservation) =>
        reservation.id === reservationId
          ? { ...reservation, pets: updatedPets }
          : reservation
      )
    );
    console.log('Rezervacija ažurirana:', reservationId, updatedPets);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        reservations,
        addReservation,
        addToCart,
        removeFromCart,
        updateReservationReviews,
        updateReservation,
        removeReservation
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
