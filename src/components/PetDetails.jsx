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
import { useNotification } from './NotificationProvider';

const PetDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Koristi addPetToReservation iz konteksta
  const [pet, setPet] = useState(null);
  const { showInfo } = useNotification();

  useEffect(() => {
    const petsFromStorage = JSON.parse(localStorage.getItem('pets')) || [];
    const foundPet = petsFromStorage.find((p) => p.id === parseInt(id));
    setPet(foundPet || null);
  }, [id]);

  const handleAddToCart = () => {
    const uniquePet = {
      ...pet,
      uniqueId: `${pet.id}-${Date.now()}-${Math.random()}`,
    };
    addToCart(uniquePet);
    showInfo("Dodato u korpu", "success")
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
                  <strong>Korisnik:</strong> {review.username || JSON.parse(localStorage.getItem("users")).filter((user)=>{return String(user.id) === String(review.userId)})[0].name}
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
