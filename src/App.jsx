import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import { CssBaseline, Box, AppBar, Toolbar, IconButton, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { getCookie, deleteCookie } from './utils/cookie';

import Home from './components/Home';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import SearchResults from './components/SearchResults';
import LoginPage from './components/LoginPage';
import PetDetails from './components/PetDetails';
import ReviewPage from './components/ReviewPage';
import Footer from './components/Footer';

const App = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // Provera statusa logovanja samo pri inicijalnom učitavanju
  useEffect(() => {
    const loggedInStatus = getCookie('isLoggedIn');
    if (loggedInStatus) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate('/login'); // Preusmeravanje samo ako korisnik nije prijavljen
    }
  }, [navigate]);

  // Funkcija za izlogovanje
  const handleLogout = () => {
    deleteCookie('isLoggedIn'); // Obrisi cookie
    setIsLoggedIn(false);
    navigate('/login'); // Preusmeravanje na login stranicu
  };

  // Funkcija za zatvaranje Drawer-a kada kliknemo izvan njega
  const handleClickOutside = useCallback((e) => {
    if (open && !e.target.closest('.MuiDrawer-root') && !e.target.closest('.MuiAppBar-root')) {
      setOpen(false); // Zatvori Drawer
    }
  }, [open]);

  // Funkcija za otvaranje Drawer-a
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Dodajemo događaj za klik van Drawer-a
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const location = useReactLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar sa z-index za prikaz preko Drawer-a */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1, // Osigurava da bude iznad Drawer-a
        }}
      >
        <Toolbar >
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
          </IconButton>
          <Typography variant="h6">Pet Store</Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer sa ikonicama i animacijama */}
      <Drawer
        hidden={isLoginPage}
        open={true} // Kontrola vidljivosti Drawer-a
        onClose={() => setOpen(false)} // Zatvori Drawer kada se klikne van
        variant="persistent" // Stalni Drawer
        anchor="left"
        sx={{
          width: 240, // Širina Drawer-a
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#fafafa', // Svetlija pozadina
            paddingTop: 8,
            height: '100vh', // Uvek zauzima celu visinu prozora
            position: 'fixed', // Popravi položaj
            top: 0, // Počni od vrha stranice
            left: 0, // Poravnaj na levu stranu
          },
        }}
      >
        <List>
          <ListItemButton onClick={() => navigate('/')}>
            <HomeIcon sx={{ marginRight: 2 }} />
            <ListItemText>Početna</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/search')}>
            <SearchIcon sx={{ marginRight: 2 }} />
            <ListItemText>Pretraga</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/cart')}>
            <ShoppingCartIcon sx={{ marginRight: 2 }} />
            <ListItemText>Korpa</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/profile')}>
            <AccountCircleIcon sx={{ marginRight: 2 }} />
            <ListItemText>Profil</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ExitToAppIcon sx={{ marginRight: 2 }} />
            <ListItemText>Izloguj se</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>


      {/* Glavni sadržaj */}
      <Box
        sx={{
          flexGrow: 1,
          marginTop: '50px',
          marginBottom: '50px',
          marginLeft: open ? 0 : 0, // Ovaj deo neće pomeriti sadržaj
          padding: '20px',
          transition: 'none', // Nema animacije za sadržaj
          position: "relative"
        }}
      >
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={isLoggedIn ? <Home /> : <LoginPage />} />
            <Route path="/search" element={isLoggedIn ? <SearchResults /> : <LoginPage />} />
            <Route path="/cart" element={isLoggedIn ? <CartPage /> : <LoginPage />} />
            <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/rate/:id" element={<ReviewPage />} />
          </Routes>
        </main>
      </Box>
      <Footer />
    </div>
  );
};

export default App;
