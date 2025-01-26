import React, { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Box, Typography, Avatar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPets, setFilteredPets] = useState([]); 
  const dropdownRef = useRef(null); 
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const filtered = pets.filter(
      (pet) =>
        pet.name.toLowerCase().includes(query) ||
        pet.type.toLowerCase().includes(query) ||
        String(pet.age).toLowerCase().includes(query) ||
        pet.size.toLowerCase().includes(query) ||
        String(pet.price).toLowerCase().includes(query) ||
        pet.origin.toLowerCase().includes(query) ||
        pet.description.toLowerCase().includes(query) ||
        pet.reviews.some((review) => review.text.toLowerCase().includes(query))
    );

    setFilteredPets(filtered);
  };

  const handlePetSelect = (petId) => {
    setFilteredPets([]);
    navigate(`/pets/${petId}`); 
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredPets([]); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      position="relative"
      sx={{ height: "1vh", width: "80vh", marginLeft: "150px", visibility: isLoginPage || isRegisterPage ? "hidden" : "" }}
      ref={dropdownRef}
    >
      <TextField
        label="Pretraži ljubimce"
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        autoComplete="off"
        InputProps={{
          style: {
            color: "white", 
            borderRadius: "8px", 
          },
        }}
        InputLabelProps={{
          style: { color: "white" }, 
        }}
        sx={{
          marginBottom: "10px",
          marginTop: "-25px",
          width: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
      />
      {filteredPets.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "30px",
            left: 0,
            right: 0,
            background: "white",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px 0",
          }}
        >
          {filteredPets.map((pet) => (
            <MenuItem
              key={pet.id}
              onClick={() => handlePetSelect(pet.id)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
                display: "flex",
                alignItems: "center",
                padding: "10px",
                gap: "10px",
              }}
            >
              <Avatar
                src={pet.image}
                alt={pet.name}
                sx={{ width: 50, height: 50 }}
              />
              <Box>
                <Typography variant="body1" color="textPrimary">
                  <strong>{pet.name}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Vrsta: {pet.type} | Cena: {pet.price} RSD | Starost: {pet.age} godina
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
