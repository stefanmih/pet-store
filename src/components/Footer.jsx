import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#f1f1f1",
        padding: "16px",
        width: "100%",
        position: "fixed",
        verticalAlign: "bottom",
        bottom: "0",
        marginTop: "20px",
        marginBottom: "0px"
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; 2025 Pet Shop
      </Typography>
    </Box>
  );
};

export default Footer;
