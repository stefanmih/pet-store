import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { petsData } from '../data/pets';

const Home = () => {
  const navigate = useNavigate();

  // Izračunavanje prosečne ocene za svakog ljubimca
  const calculateAverageRating = (reviews) =>
    reviews && reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
      : 0;

  // Dodavanje prosečne ocene svakom ljubimcu i sortiranje po oceni
  const petsWithRatings = petsData.map((pet) => ({
    ...pet,
    averageRating: calculateAverageRating(pet.reviews),
  }));
  const featuredPets = petsWithRatings
    .sort((a, b) => b.averageRating - a.averageRating) // Sortiraj po prosečnoj oceni
    .slice(0, 4); // Prikaži samo prva 4 ljubimca

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h3" gutterBottom align="center">
        Dobrodošli u Pet Store
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Pronađite savršenog ljubimca za vašu porodicu!
      </Typography>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Naša preporuka
        </Typography>
        <Grid container spacing={2}>
          {featuredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={3} key={pet.id}>
              <Card
                sx={{
                  position: 'relative', // Omogućava apsolutni položaj za ocenu
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.image}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography variant="h6">{pet.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.description}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    Cena: {pet.price} RSD
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate(`/pets/${pet.id}`)}
                  >
                    Detalji
                  </Button>
                </CardContent>
                {/* Prosečna ocena u donjem desnom uglu */}
                {pet.averageRating > 0 && (
                  <Chip
                    label={`⭐ ${pet.averageRating.toFixed(1)}`}
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: '#ffc107',
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  />
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ marginTop: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Zašto odabrati nas?
        </Typography>
        <Typography variant="body1" gutterBottom>
          🌟 Širok izbor ljubimaca <br />
          🌟 Najbolje cene u regionu <br />
          🌟 Sigurni saveti za odgoj <br />
          🌟 Zadovoljni kupci i pozitivne recenzije
        </Typography>
      </Box>

      <Box sx={{ marginTop: 6, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Pretražite našu kolekciju i pronađite idealnog ljubimca!
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/search')}
        >
          Pretražite ljubimce
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
