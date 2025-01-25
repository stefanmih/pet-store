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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserId } from '../utils/userUtils';

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    reservations,
    removeReservation,
    updateReservation,
    addReservation,
  } = useCart();

  const [selectedReservation, setSelectedReservation] = useState('');
  const navigate = useNavigate();
  const currentUserId = getCurrentUserId();

  const calculateTotalPrice = (items) =>
    Array.isArray(items) ? items.reduce((total, item) => total + item.price, 0) : 0;

  // Filtriraj narudžbine za trenutno prijavljenog korisnika
  const userReservations = reservations.filter(
    (reservation) => String(reservation.userId) === String(currentUserId)
  );

  const handleAddToReservation = () => {
    if (!selectedReservation) {
      alert('Izaberite narudžbinu ili kreirajte novu.');
      return;
    }

    const reservationToUpdate = reservations.find(
      (reservation) => reservation.id === selectedReservation
    );

    if (reservationToUpdate) {
      const updatedPets = [...(reservationToUpdate.pets || []), ...cart];
      updateReservation(selectedReservation, updatedPets);
      alert('Dodato u postojeću narudžbinu.');
      setSelectedReservation('');
    } else {
      alert('Narudžbina nije pronađena.');
    }
  };

  const handleCreateNewReservation = () => {
    if (!cart.length) {
      alert('Korpa je prazna.');
      return;
    }

    const newReservation = {
      id: Date.now().toString(),
      userId: currentUserId,
      pets: cart,
      status: 'u toku',
    };

    addReservation(newReservation);
    alert('Nova narudžbina kreirana.');
    setSelectedReservation('');
  };

  const totalCartPrice = calculateTotalPrice(cart);
  const totalReservationsPrice = calculateTotalPrice(
    userReservations.flatMap((reservation) => reservation.pets) || []
  );

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Vaša Korpa
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ukupna cena korpe: {totalCartPrice} RSD
      </Typography>
      <List>
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((pet, index) => (
            <ListItem key={`${pet.id}-${index}`}>
              <ListItemText primary={pet.name} secondary={`Cena: ${pet.price}`} />
              <Button
                onClick={() => removeFromCart(index)}
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
        sx={{ marginTop: 2 }}
      >
        Dodaj u narudžbinu
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
        Predefinisane Narudžbine
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ukupna cena svih narudžbina: {totalReservationsPrice} RSD
      </Typography>
      <List>
        {Array.isArray(userReservations) &&
          userReservations.map((reservation) => (
            <Box key={reservation.id} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">{`Narudžbina: ${reservation.id}`}</Typography>
              <Typography variant="subtitle1">{`Status: ${reservation.status}`}</Typography>
              <Typography variant="subtitle2">
                Ukupna cena narudžbine: {calculateTotalPrice(reservation.pets || [])} RSD
              </Typography>
              <List sx={{ marginLeft: 2 }}>
                {Array.isArray(reservation.pets) &&
                  reservation.pets.map((pet, index) => (
                    <ListItem key={`${reservation.id}-${index}`}>
                      <ListItemText
                        primary={pet.name}
                        secondary={`Cena: ${pet.price}, Vrsta: ${pet.type}, Starost: ${pet.age}, Velicina: ${pet.size}`}
                      />
                      {reservation.status === 'preuzeto' && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate(`/rate/${pet.id}`)}
                          sx={{ marginLeft: 2 }}
                        >
                          Oceni
                        </Button>
                      )}
                    </ListItem>
                  ))}
              </List>
              {reservation.status === 'preuzeto' && (
                <Button
                  onClick={() => removeReservation(reservation.id)}
                  color="secondary"
                >
                  Ukloni Narudžbinu
                </Button>
              )}
              <Divider sx={{ marginTop: 2 }} />
            </Box>
          ))}
      </List>
    </div>
  );
};

export default CartPage;
