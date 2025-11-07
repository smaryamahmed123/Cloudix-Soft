import React from "react";
import { Box } from "@mui/material";

const Logo = ({ src, size = { xs: 40, sm: 50, md: 60, lg: 70 } }) => {
  return (
    <Box
      component="img"
      src={src}
      alt="Cloudix Soft Logo"
      sx={{
        height: size,        // 👈 responsive object works here
        width: { xs: 160, sm: 200, md: 220, lg: 250 }, // you can also make width responsive
        objectFit: "contain",
        cursor: "pointer",
        display: "inline-block",
        verticalAlign: "middle",
        ml: 0,
      }}
    />
  );
};

export default Logo;




