import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../utils/cookie';
import { setCurrentUserId, setCurrentUsername } from '../utils/userUtils';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Dohvatanje prethodne putanje iz localStorage
  let previousPath = localStorage.getItem('previousPath') || '/';

  const login = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []; // Dohvata korisnike iz localStorage
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCookie('isLoggedIn', 'true', 1); // Postavlja cookie
      setCurrentUsername(user);
      setCurrentUserId(user.id); // Postavlja trenutni ID korisnika
      localStorage.removeItem('previousPath'); // Briše prethodnu putanju nakon prijave
      if (previousPath === '/login') {
        previousPath = '/';
      }
      // Preusmeravanje i osvežavanje
      navigate(previousPath, { replace: true });
      window.location.reload(); // Osvežava stranicu kako bi učitala novo stanje
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
        {error && (
          <Typography color="error" className="error-message" sx={{ marginBottom: '10px' }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={login} fullWidth>
          Prijavi se
        </Button>
        <Typography variant="body2" align="center" sx={{ marginTop: '10px' }}>
          Nemate nalog?{' '}
          <Link onClick={() => navigate('/register')} style={{ cursor: 'pointer' }}>
            Registrujte se
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default LoginPage;
