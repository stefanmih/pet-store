import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { setCookie } from '../utils/cookie';
import { users } from '../data/users'; // Pretpostavljamo da postoji fajl sa korisnicima
import { setCurrentUserId } from '../utils/userUtils';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCookie('isLoggedIn', 'true', 1);
      setCurrentUserId(user.id); // Postavljamo trenutni ID korisnika
      window.location.href = '/';
    } else {
      setError('Neispravno korisničko ime ili lozinka');
    }
  };

  return (
    <div className="login-container" style={{ paddingTop: '80px' }}>
      <Box className="login-form" sx={{ maxWidth: '400px', margin: '0 auto' }}>
        <Typography variant="h4">Prijava</Typography>
        <TextField
          label="Korisničko ime"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <TextField
          label="Lozinka"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        {error && <Typography className="error-message">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={login} fullWidth>
          Prijavi se
        </Button>
      </Box>
    </div>
  );
};

export default LoginPage;
