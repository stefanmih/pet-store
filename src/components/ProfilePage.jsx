import React, { useState } from 'react';
import { Typography, TextField, Button, Divider } from '@mui/material';
import { useNotification } from './NotificationProvider';
import { getCurrentUserId, updateUser } from '../utils/userUtils';

const ProfilePage = () => {
  const userId = getCurrentUserId(); // Pretpostavka da imate ovu funkciju
  const user = JSON.parse(localStorage.getItem('users')).find((u) => u.id === userId);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [favoritePets, setFavoritePets] = useState(user?.favoritePets || []);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { showInfo } = useNotification();

  const handleSaveProfile = () => {
    const updatedUser = { ...user, name, email, phone, address, favoritePets };
    updateUser(userId, updatedUser); // Funkcija koja ažurira korisnika u localStorage
    showInfo('Profil je uspešno ažuriran!', 'success');
  };

  const handleChangePassword = () => {
    if (oldPassword !== user.password) {
      showInfo('Stara lozinka nije tačna.', 'error');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      showInfo('Nova lozinka mora imati najmanje 6 karaktera.', 'error');
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    updateUser(userId, updatedUser); // Funkcija koja ažurira korisnika u localStorage
    showInfo('Lozinka je uspešno promenjena.', 'success');
    setOldPassword('');
    setNewPassword('');
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
      <TextField
        label="Telefon"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Adresa"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Omiljene vrste ljubimaca"
        variant="outlined"
        fullWidth
        value={favoritePets.join(', ')}
        onChange={(e) => setFavoritePets(e.target.value.split(',').map((v) => v.trim()))}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveProfile}
        style={{ marginTop: '20px' }}
      >
        Sačuvaj
      </Button>
      <Divider sx={{ marginY: 4 }} />
      <Typography variant="h5" gutterBottom>
        Promena Lozinke
      </Typography>
      <TextField
        label="Stara Lozinka"
        type="password"
        variant="outlined"
        fullWidth
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Nova Lozinka"
        type="password"
        variant="outlined"
        fullWidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleChangePassword}
        style={{ marginTop: '20px' }}
      >
        Promeni Lozinku
      </Button>
    </div>
  );
};

export default ProfilePage;
