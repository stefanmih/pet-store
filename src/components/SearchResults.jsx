import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { petsData } from '../data/pets';
import PetCard from '../components/PetCard';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleOriginChange = (e) => {
    setSelectedOrigin(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleAgeChange = (e) => {
    setSelectedAge(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  const types = [...new Set(petsData.map((pet) => pet.type))];
  const origins = [...new Set(petsData.map((pet) => pet.origin))];
  const sizes = [...new Set(petsData.map((pet) => pet.size))];

  const filteredPets = petsData.filter((pet) => {
    const matchesSearch =
      searchQuery === '' ||
      Object.values(pet).some((value) =>
        value.toString().toLowerCase().includes(searchQuery)
      );

    const matchesType = selectedType === '' || pet.type === selectedType;
    const matchesOrigin = selectedOrigin === '' || pet.origin === selectedOrigin;
    const matchesSize = selectedSize === '' || pet.size === selectedSize;

    const matchesAge =
      selectedAge === '' ||
      (selectedAge === 'mlad' && pet.age <= 2) ||
      (selectedAge === 'odrastao' && pet.age > 2 && pet.age <= 7) ||
      (selectedAge === 'star' && pet.age > 7);

    const matchesPrice =
      selectedPrice === '' ||
      (selectedPrice === 'low' && pet.price < 5000) ||
      (selectedPrice === 'medium' && pet.price >= 5000 && pet.price <= 15000) ||
      (selectedPrice === 'high' && pet.price > 15000);

    return (
      matchesSearch &&
      matchesType &&
      matchesOrigin &&
      matchesSize &&
      matchesAge &&
      matchesPrice
    );
  });

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dobrodošli u Pet Store
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          marginBottom: 3,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          placeholder="Pretražite ljubimce po nazivu, opisu..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Vrsta</InputLabel>
          <Select value={selectedType} onChange={handleTypeChange} label="Vrsta">
            <MenuItem value="">Sve vrste</MenuItem>
            {types.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Poreklo</InputLabel>
          <Select value={selectedOrigin} onChange={handleOriginChange} label="Poreklo">
            <MenuItem value="">Sva porekla</MenuItem>
            {origins.map((origin) => (
              <MenuItem key={origin} value={origin}>
                {origin}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Veličina</InputLabel>
          <Select value={selectedSize} onChange={handleSizeChange} label="Veličina">
            <MenuItem value="">Sve veličine</MenuItem>
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Starost</InputLabel>
          <Select value={selectedAge} onChange={handleAgeChange} label="Starost">
            <MenuItem value="">Sve starosti</MenuItem>
            <MenuItem value="mlad">Mlađi od 2 godine</MenuItem>
            <MenuItem value="odrastao">2 - 7 godina</MenuItem>
            <MenuItem value="star">Stariji od 7 godina</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Cena</InputLabel>
          <Select value={selectedPrice} onChange={handlePriceChange} label="Cena">
            <MenuItem value="">Sve cene</MenuItem>
            <MenuItem value="low">Manje od 5000</MenuItem>
            <MenuItem value="medium">5000 - 15000</MenuItem>
            <MenuItem value="high">Više od 15000</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {filteredPets.map((pet) => (
          <Grid item key={pet.id} xs={12} sm={6} md={4} lg={3}>
            <PetCard pet={pet} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SearchResults;
