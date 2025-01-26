import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { petsData } from '../data/pets';

const Home = () => {
  const navigate = useNavigate();

  // Uzeti prvih 4 ljubimca za prikaz na početnoj strani
  const featuredPets = petsData.slice(0, 4);

  return (
    <Box sx={{ padding: 2 }}>
      {/* Dobrodošlica */}
      <Typography variant="h3" gutterBottom align="center">
        Dobrodošli u Pet Store
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Pronađite savršenog ljubimca za vašu porodicu!
      </Typography>

      {/* Istaknuti ljubimci */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Naša preporuka
        </Typography>
        <Grid container spacing={2}>
          {featuredPets.map((pet) => (
            <Grid item xs={12} sm={6} md={3} key={pet.id}>
              <Card>
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Sekcija preporuka */}
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

      {/* Poziv na akciju */}
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
