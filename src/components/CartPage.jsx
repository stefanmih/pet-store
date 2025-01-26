import React, { useState } from 'react';
import { useCart } from './CartContext';
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Divider,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../utils/userUtils';
import { useNotification } from './NotificationProvider';

const CartPage = () => {
  const {
    cart,
    reservations,
    addReservation,
    updateReservation,
    removeReservation,
    clearCart,
    removeFromCart,
  } = useCart();

  const [selectedReservation, setSelectedReservation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const currentUserId = getCurrentUserId();
  const navigate = useNavigate();
  const { showInfo } = useNotification();

  const calculateTotalPrice = (items) =>
    Array.isArray(items) ? items.reduce((total, item) => total + item.price, 0) : 0;

  const userReservations = reservations.filter(
    (reservation) => String(reservation.userId) === String(currentUserId)
  );

  const handleAddToReservation = () => {
    if (!selectedReservation) {
      showInfo('Izaberite narudžbinu ili kreirajte novu.', 'error');
      return;
    }

    const reservationToUpdate = reservations.find(
      (reservation) => reservation.id === selectedReservation
    );

    if (reservationToUpdate) {
      const updatedPets = [...(reservationToUpdate.pets || []), ...cart];
      updateReservation(selectedReservation, updatedPets);
      clearCart(); // Isprazni korpu
      showInfo('Dodato u postojeću narudžbinu.', 'success');
    } else {
      showInfo('Narudžbina nije pronađena.', 'error');
    }
  };

  const handleCreateNewReservation = () => {
    if (!cart.length) {
      showInfo('Korpa je prazna.', 'error');
      return;
    }

    const newReservation = {
      id: Date.now().toString(),
      userId: currentUserId,
      pets: cart.map((pet) => ({
        ...pet,
        uniqueId: pet.uniqueId || `${pet.id}-${Date.now()}-${Math.random()}`,
      })),
      status: 'u toku',
    };

    addReservation(newReservation);
    clearCart(); // Isprazni korpu
    showInfo('Nova narudžbina kreirana.', 'success');
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleRatePet = (petId) => {
    navigate(`/rate/${petId}`); // Navigacija na stranicu za ocenjivanje
  };

  const handleRemovePetFromReservation = (reservationId, uniqueId) => {
    const reservationToUpdate = reservations.find((res) => res.id === reservationId);
    if (!reservationToUpdate) return;

    const updatedPets = reservationToUpdate.pets.filter((pet) => pet.uniqueId !== uniqueId);

    if (updatedPets.length === 0) {
      removeReservation(reservationId); // Automatski ukloni narudžbinu ako nema ljubimaca
    } else {
      updateReservation(reservationId, updatedPets);
    }
  };

  const handleRemoveReservation = (reservationId) => {
    removeReservation(reservationId); // Ručno uklanjanje cele narudžbine
  };

  const filteredReservations = userReservations.filter((reservation) => {
    const reservationMatches = reservation.id.toLowerCase().includes(searchQuery);
    const petMatches = reservation.pets.some(
      (pet) =>
        pet.name.toLowerCase().includes(searchQuery) ||
        pet.type.toLowerCase().includes(searchQuery) ||
        String(pet.age).includes(searchQuery) ||
        pet.size.toLowerCase().includes(searchQuery) ||
        String(pet.price).includes(searchQuery)
    );
    return reservationMatches || petMatches;
  });

  const totalCartPrice = calculateTotalPrice(cart);
  const totalReservationsPrice = calculateTotalPrice(
    userReservations.flatMap((reservation) => reservation.pets) || []
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Vaša Korpa
      </Typography>
      <TextField
        label="Pretraga"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchQuery}
      />
      <Typography variant="h6" gutterBottom>
        Ukupna cena korpe: {totalCartPrice} RSD
      </Typography>
      <List>
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((pet) => (
            <ListItem key={pet.uniqueId}>
              <ListItemText primary={pet.name} secondary={`Cena: ${pet.price}`} />
              <Button
                onClick={() => navigate(`/pets/${pet.id}`)} // Dugme za detalje
                color="primary"
                sx={{ marginRight: 2 }}
              >
                Detalji
              </Button>
              <Button
                onClick={() => removeFromCart(pet.uniqueId)}
                color="secondary"
              >
                Ukloni
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">Korpa je trenutno prazna.</Typography>
        )}
      </List>

      <FormControl fullWidth sx={{ marginTop: 2 }}>
        <InputLabel id="select-reservation-label">Izaberite narudžbinu</InputLabel>
        <Select
          labelId="select-reservation-label"
          value={selectedReservation}
          onChange={(e) => setSelectedReservation(e.target.value)}
        >
          {userReservations
            .filter((reservation) => reservation.status === 'u toku')
            .map((reservation) => (
              <MenuItem key={reservation.id} value={reservation.id}>
                {reservation.id}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToReservation}
        disabled={!selectedReservation}
        sx={{ marginTop: 2, marginRight: 2 }}
      >
        Dodaj u postojecu narudžbinu
      </Button>

      <Button
        variant="contained"
        color="success"
        onClick={handleCreateNewReservation}
        sx={{ marginTop: 2 }}
      >
        Kreiraj novu narudžbinu
      </Button>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Prethodne Narudžbine
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ukupna cena svih narudžbina: {totalReservationsPrice} RSD
      </Typography>
      <List>
        {filteredReservations.map((reservation) => (
          <Box key={reservation.id} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{`Narudžbina: ${reservation.id}`}</Typography>
            <Typography variant="subtitle1">{`Status: ${reservation.status}`}</Typography>
            <Typography variant="subtitle2">
              Ukupna cena narudžbine: {calculateTotalPrice(reservation.pets || [])} RSD
            </Typography>
            <List sx={{ marginLeft: 2 }}>
              {Array.isArray(reservation.pets) &&
                reservation.pets.map((pet) => (
                  <ListItem key={pet.uniqueId}>
                    <ListItemText
                      primary={pet.name}
                      secondary={`Cena: ${pet.price}, Vrsta: ${pet.type}, Starost: ${pet.age}, Velicina: ${pet.size}`}
                    />
                    <Button
                      onClick={() => navigate(`/pets/${pet.id}`)} // Dugme za detalje
                      color="primary"
                      sx={{ marginRight: 2 }}
                    >
                      Detalji
                    </Button>
                    {reservation.status === 'u toku' && (
                      <Button
                        onClick={() => handleRemovePetFromReservation(reservation.id, pet.uniqueId)}
                        color="secondary"
                        sx={{ marginLeft: 2 }}
                      >
                        Ukloni
                      </Button>
                    )}
                    {reservation.status === 'preuzeto' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleRatePet(pet.id)}
                        sx={{ marginLeft: 2 }}
                      >
                        Oceni
                      </Button>
                    )}
                  </ListItem>
                ))}
            </List>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleRemoveReservation(reservation.id)} // Dugme za uklanjanje cele narudžbine
              sx={{ marginTop: 2, visibility: (!(String(reservation.status) === "preuzeto") ? "hidden" : "" )}}
            >
              Ukloni Narudžbinu
            </Button>
            <Divider sx={{ marginTop: 2 }} />
          </Box>
        ))}
      </List>
    </div>
  );
};

export default CartPage;
