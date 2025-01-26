import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Divider,
  Rating,
  List,
  ListItem,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';

const PetDetails = () => {
  const { id } = useParams();
  const { reservations, addReservation, updateReservation } = useCart();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const petsFromStorage = JSON.parse(localStorage.getItem('pets')) || [];
    const foundPet = petsFromStorage.find((p) => p.id === parseInt(id));
    setPet(foundPet || null);
  }, [id]);

  const handleAddToCart = () => {
    if (pet) {
      const cartReservationId = 'cart';

      // Proveri da li korpa postoji
      const cartReservation = reservations.find(
        (reservation) => reservation.id === cartReservationId
      );

      const uniquePet = {
        ...pet,
        uniqueId: `${pet.id}-${Date.now()}-${Math.random()}`,
      };

      if (!cartReservation) {
        // Kreiraj novu korpu ako ne postoji
        addReservation({
          id: cartReservationId,
          userId: null,
          status: 'korpa',
          pets: [uniquePet],
        });
      } else {
        // Dodaj ljubimca u postojeću korpu
        const updatedPets = [...(cartReservation.pets || []), uniquePet];
        updateReservation(cartReservationId, updatedPets);
      }
    }
  };

  if (!pet) {
    return (
      <Typography variant="h6" color="error">
        Ljubimac nije pronađen!
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4, maxWidth: '800px', margin: 'auto' }}>
      <CardMedia
        component="img"
        height="500"
        image={pet.image}
        alt={pet.name}
        sx={{ objectFit: 'cover', marginBottom: 2, borderRadius: '8px' }}
      />
      <Typography variant="h4" gutterBottom>
        {pet.name}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body1" gutterBottom>
        <strong>Vrsta:</strong> {pet.type}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Starost:</strong> {pet.age} godina
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Veličina:</strong> {pet.size}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Cena:</strong> {pet.price} RSD
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Poreklo:</strong> {pet.origin}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Opis:</strong> {pet.description}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h5" gutterBottom>
        Recenzije:
      </Typography>
      {pet.reviews && pet.reviews.length > 0 ? (
        <List>
          {pet.reviews.map((review, index) => (
            <ListItem key={index}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1">
                  <strong>Korisnik:</strong> {review.username || 'Nepoznato'}
                </Typography>
                <Rating value={review.rating} readOnly />
                <Typography variant="body2">{review.text}</Typography>
                <Divider sx={{ marginY: 1 }} />
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">
          Još uvek nema recenzija za ovog ljubimca.
        </Typography>
      )}
      <Box sx={{ marginTop: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Nazad
        </Button>
        <Button variant="contained" color="secondary" onClick={handleAddToCart}>
          Dodaj u korpu
        </Button>
      </Box>
    </Box>
  );
};

export default PetDetails;
