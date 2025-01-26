import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from './NotificationProvider';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    favoritePets: '',
  });
  const navigate = useNavigate();
  const { showInfo } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    const {
      username,
      password,
      confirmPassword,
      name,
      email,
      phone,
      address,
      favoritePets,
    } = formData;

    if (!username || !password || !name || !email || !phone || !address) {
    showInfo('Sva polja su obavezna.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showInfo('Lozinke se ne poklapaju.', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usernameExists = users.some((user) => user.username === username);

    if (usernameExists) {
      showInfo('Korisničko ime je već zauzeto.', 'error');
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      name,
      email,
      phone,
      address,
      favoritePets: favoritePets.split(',').map((pet) => pet.trim()),
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    showInfo('Uspešno ste se registrovali!', 'success');
    navigate('/login');
  };

  return (
    <div className="register-container" style={{ paddingTop: '80px' }}>
      <Box className="register-form" sx={{ maxWidth: '400px', margin: '0 auto' }}>
        <Typography variant="h4">Registracija</Typography>
        <TextField
          label="Korisničko ime"
          variant="outlined"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Ime i prezime"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Telefon"
          variant="outlined"
          fullWidth
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Adresa"
          variant="outlined"
          fullWidth
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Omiljene vrste ljubimaca (odvojene zarezima)"
          variant="outlined"
          fullWidth
          name="favoritePets"
          value={formData.favoritePets}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Lozinka"
          type="password"
          variant="outlined"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Potvrdite lozinku"
          type="password"
          variant="outlined"
          fullWidth
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          sx={{ marginBottom: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
          Registruj se
        </Button>
      </Box>
    </div>
  );
};

export default RegisterPage;
