import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Rating } from '@mui/material';
import { getCurrentUserId, getCurrentUsername } from '../utils/userUtils';
import { useCart } from './CartContext';

const ReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = getCurrentUserId();
  const username = getCurrentUsername();
  const { updateReservationReviews } = useCart();

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddReview = () => {
    if (!reviewText.trim() || rating === 0) {
      alert('Molimo unesite recenziju i ocenu.');
      return;
    }

    if (!isSubmitting) {
      setIsSubmitting(true); // Spreči višestruke klikove
      const newReview = {
        userId,
        username: username,
        text: reviewText,
        rating: rating,
      };

      console.log(`Dodavanje recenzije za ljubimca ${id}:`, newReview);
      updateReservationReviews(parseInt(id), newReview); // Ažuriraj recenzije
      alert('Recenzija uspešno dodata!');
      navigate(`/pets/${id}`); // Vrati korisnika na stranicu ljubimca
      setIsSubmitting(false); // Omogući ponovno slanje
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Oceni ljubimca
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
