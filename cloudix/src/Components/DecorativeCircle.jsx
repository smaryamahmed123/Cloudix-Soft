// src/components/DecorativeCircle.jsx
import React from "react";
import { Box } from "@mui/material";

const DecorativeCircle = ({
  size = { xs: 250, sm: 400, md: 550 }, // ✅ responsive sizes
  borderColor = "#111e2c22",
  innerSize = { xs: 200, sm: 320, md: 450 }, // ✅ responsive inner circle
  innerBorderColor = "#dadc6961",
  position = {},
  zIndex = 0,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: `2px solid ${borderColor}`,
        zIndex,
        ...position, // allows top/left/right/bottom via props
        "&::after": {
          content: '""',
          position: "absolute",
          width: innerSize,
          height: innerSize,
          borderRadius: "50%",
          border: `2px solid ${innerBorderColor}`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    />
  );
};

export default DecorativeCircle;
