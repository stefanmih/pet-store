import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ padding: 2, textAlign: "center", backgroundColor: "#f1f1f1" }}>
      <Typography variant="body2" color="textSecondary">
        &copy; 2025 Pet Shop
      </Typography>
    </Box>
  );
};

export default Footer;
