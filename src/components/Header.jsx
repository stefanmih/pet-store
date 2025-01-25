import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Pet Shop
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Početna
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Korpa
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
