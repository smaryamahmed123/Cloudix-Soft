import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = ({ src, size = { xs: 40, sm: 50, md: 60, lg: 70 } }) => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{ display: "inline-flex", alignItems: "center" }}
    >
      <Box
        component="img"
        src={src}
        alt="Cloudix Soft Logo"
        sx={{
          height: size,
          width: { xs: 160, sm: 200, md: 220, lg: 250 },
          objectFit: "contain",
          cursor: "pointer",
        }}
      />
    </Box>
  );
};

export default Logo;
