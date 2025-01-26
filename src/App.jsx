import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation as useReactLocation } from 'react-router-dom';
import { CssBaseline, Box, AppBar, Toolbar, IconButton, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginSharp from '@mui/icons-material/LoginSharp';
import { getCookie, deleteCookie } from './utils/cookie';

import Home from './components/Home';
import CartPage from './components/CartPage';
import ProfilePage from './components/ProfilePage';
import SearchResults from './components/SearchResults';
import LoginPage from './components/LoginPage';
import PetDetails from './components/PetDetails';
import ReviewPage from './components/ReviewPage';
import Footer from './components/Footer';
import RegisterPage from './components/RegisterPage';
import { getCurrentUsername, setCurrentUserId, setCurrentUsername } from './utils/userUtils';
import SearchBar from './components/SearchBar';

const App = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useReactLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  useEffect(() => {
    localStorage.setItem('previousPath', location.pathname);
    const loggedInStatus = getCookie('isLoggedIn');
    setIsLoggedIn(loggedInStatus);
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    deleteCookie('isLoggedIn');
    setIsLoggedIn(false);
    setCurrentUserId(null)
    setCurrentUsername(null);
    navigate('/');
  };

  const logIn = () => {
    navigate('/login');
  };

  const mainPage = () => {
    navigate('/');
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (open && !e.target.closest('.MuiDrawer-root') && !e.target.closest('.MuiAppBar-root')) {
        setOpen(false);
      }
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{justifyContent: "space-between"}}>
          <IconButton edge="start" color="inherit" onClick={mainPage}>
            <Typography variant="h6">Pet Store</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1000, display: "flex", justifyContent: "center", marginX: 2 , marginY: 4}}>
          <SearchBar />
        </Box>
          <Box sx={{ flexGrow: 1,}} /> {/* Prazan Box za razdvajanje */}
          <Typography variant="h6" sx= {{visibility: isLoggedIn ? "" : "hidden"}}>
            Zdravo, <span style={{ fontWeight: 'bold' }}>{getCurrentUsername()}</span>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        hidden={isLoginPage || isRegisterPage}
        open={true}
        onClose={() => setOpen(false)}
        variant="persistent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            backgroundColor: '#fafafa',
            paddingTop: 10,
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column', // Dodato za poravnanje
          },
        }}
      >
        <List sx={{ flexGrow: 1 }}>
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
        </List>
        <List>
          {!isLoggedIn ? (
            <ListItemButton onClick={logIn}>
              <LoginSharp sx={{ marginRight: 2 }} />
              <ListItemText primary="Prijavi se" />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={handleLogout} sx={{ marginTop: 'auto' }}>
              <ExitToAppIcon sx={{ marginRight: 2 }} />
              <ListItemText>Izloguj se</ListItemText>
            </ListItemButton>
          )}
        </List>
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          marginTop: '80px',
          marginBottom: '50px',
          padding: '20px',
          position: 'relative',
        }}
      >
        <main>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={isLoggedIn ? <CartPage /> : <LoginPage />} />
            <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <LoginPage />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/rate/:id" element={<ReviewPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </Box>
      <Footer />
    </div>
  );
};

export default App;
