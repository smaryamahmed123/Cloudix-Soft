// import React from "react";
// import { Box } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const IconCircleWrapper = styled(Box)(() => ({
//   width: 110,
//   height: 110,
//   borderRadius: "50%",
//   backgroundColor: "#BBBF19",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: "#111E2C",
//   fontSize: 40,
//   position: "absolute",
//   top: -50, // half outside parent
//   left: "50%",
//   transform: "translateX(-50%)",
//   background:
//     "linear-gradient(#BBBF19, #BBBF19) padding-box, linear-gradient(to bottom, #111E2C, #A9B838) border-box",
//   border: "4px solid transparent",
//   boxShadow: "0 6px 15px rgba(0,0,0,0.2)", // optional subtle shadow
// }));

// const IconCircle = ({ children }) => {
//   return <IconCircleWrapper>{children}</IconCircleWrapper>;
// };

// export default IconCircle;


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
