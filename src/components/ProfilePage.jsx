import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSaveProfile = () => {
    alert('Profil je uspešno ažuriran!');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Moj Profil
      </Typography>
      <TextField
        label="Ime"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        style={{ marginTop: '20px' }}
      >
        Spasi Profil
      </Button>
    </div>
  );
};

export default ProfilePage;
