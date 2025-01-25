import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className="search-bar">
      <TextField
        label="Pretraži ljubimce"
        variant="outlined"
        fullWidth
        sx={{marginBottom:"10px"}}
        value={searchQuery}
        onChange={handleSearch}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
