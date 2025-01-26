import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Rating } from '@mui/material';
import { getCurrentUserId, getCurrentUsername } from '../utils/userUtils';
import { useNotification } from './NotificationProvider';

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const username = getCurrentUsername();
  const { showInfo } = useNotification();

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [pet, setPet] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const petsFromStorage = JSON.parse(localStorage.getItem('pets')) || [];
    const foundPet = petsFromStorage.find((p) => p.id === parseInt(id));
    if (foundPet) {
      setPet(foundPet);
    } else {
      showInfo('Ljubimac nije pronađen.', 'error');
      navigate(-1); // Vrati korisnika na prethodnu stranicu ako ljubimac ne postoji
    }
  }, [id, navigate, showInfo]);

  const handleAddReview = () => {
    if (!reviewText.trim() || rating === 0) {
      showInfo('Molimo unesite recenziju i ocenu.', 'warning');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true); // Spreči višestruke klikove

    const newReview = {
      userId,
      username: username,
      text: reviewText,
      rating: rating,
    };

    try {
      const petsFromStorage = JSON.parse(localStorage.getItem('pets')) || [];
      const updatedPets = petsFromStorage.map((p) =>
        p.id === parseInt(id)
          ? { ...p, reviews: [...(p.reviews || []), newReview] }
          : p
      );

      localStorage.setItem('pets', JSON.stringify(updatedPets));
      showInfo('Recenzija uspešno dodata!', 'success');
      navigate(-1); // Vrati korisnika na prethodnu stranicu
    } catch (error) {
      console.error('Greška prilikom dodavanja recenzije:', error);
      showInfo('Došlo je do greške prilikom dodavanja recenzije.', 'error');
    } finally {
      setIsSubmitting(false); // Omogući ponovno slanje
    }
  };

  if (!pet) {
    return null; // Prazan prikaz dok se ljubimac ne učita
  }

  return (
    <Box sx={{ padding: 2}}>
      <Typography variant="h5" gutterBottom>
        Oceni ljubimca: {pet.name}
      </Typography>
      <Rating
        value={rating}
        onChange={(e, newValue) => setRating(newValue)}
        precision={1}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Unesite recenziju"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddReview}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Dodavanje...' : 'Dodaj recenziju'}
      </Button>
    </Box>
  );
};

export default ReviewPage;
