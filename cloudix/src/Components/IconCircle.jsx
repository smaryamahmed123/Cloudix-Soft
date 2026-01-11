import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCircle = styled(Box)(({ size }) => ({
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundColor: "#BBBF19", // inner fill
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: "0px 6px 10px rgba(0,0,0,0.25)",

  // gradient border
  "&::after": {
    content: '""',
    position: "absolute",
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #A9B838, #111E2C)",
    zIndex: -1,
  },
}));

const IconCircle = ({ children, size = 120 }) => {
  return <StyledCircle size={size}>{children}</StyledCircle>;
};

export default IconCircle;
