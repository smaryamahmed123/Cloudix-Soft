// import React, { useState } from "react";
// import { Button, useTheme } from "@mui/material";
// import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

// const GradientButton = ({
//   text = "READ MORE",
//   color1 = "#769914",
//   color2 = "#BBBF19",
//   size = "medium", // ✅ new prop: small | medium | large
//   onClick,
//   ...props
// }) => {
//   const theme = useTheme();
//   const [touched, setTouched] = useState(false);

//   // ✅ Define styles for different sizes
//   const sizeStyles = {
//     small: {
//       padding: "6px 14px",
//       fontSize: "0.8rem",
//       iconSize: 20,
//     },
//     medium: {
//       padding: "10px 20px",
//       fontSize: "1rem",
//       iconSize: 26,
//     },
//     large: {
//       padding: "14px 28px",
//       fontSize: "1.2rem",
//       iconSize: 32,
//     },
//   };

//   const { padding, fontSize, iconSize } = sizeStyles[size] || sizeStyles.medium;

//   // Swap gradient colors on press
//   const currentColor1 = touched ? color2 : color1;
//   const currentColor2 = touched ? color1 : color2;
//   const currentBoxShadow = touched
//     ? `0 6px 20px ${color2}80`
//     : `0 4px 15px ${color1}60`;

//   return (
//     <Button
//       onClick={onClick}
//       onTouchStart={() => setTouched(true)}
//       onTouchEnd={() => setTouched(false)}
//       onMouseDown={() => setTouched(true)}
//       onMouseUp={() => setTouched(false)}
//       onMouseLeave={() => setTouched(false)}
//       sx={{
//         px: 0,
//         py: 0,
//         padding,
//         borderRadius: "50px",
//         display: "inline-flex",
//         background: `linear-gradient(to right, ${currentColor1}, ${currentColor2})`,
//         color: "#111E2C",
//         fontWeight: theme.typography.button.fontWeight || "bold",
//         fontFamily: theme.typography.fontFamily,
//         fontSize,
//         boxShadow: currentBoxShadow,
//         transition: "all 0.3s ease-in-out",
//         alignItems: "center",
//         gap: 1,
//         whiteSpace: "nowrap",
//         "&:hover": {
//           transform: "translateY(-2px)",
//           background: `linear-gradient(to right, ${currentColor2}, ${currentColor1})`,
//         },
//         ...props.sx,
//       }}
//       {...props}
//     >
//       {text}
//       <ArrowCircleRightRoundedIcon
//         sx={{
//           fontSize: iconSize,
//           "& path": {
//             fill: "#111E2C",
//           },
//         }}
//       />
//     </Button>
//   );
// };

// export default GradientButton;




import React, { useState } from "react";
import { Button, useTheme } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const GradientButton = ({
  text = "READ MORE",
  color1 = "#769914",
  color2 = "#BBBF19",
  size = "medium", // small | medium | large
  onClick,
  ...props
}) => {
  const theme = useTheme();
  const [touched, setTouched] = useState(false);

  // ✅ Convert text → Title Case (first letter upper, rest lower)
  const formatText = (str) =>
    str
      .toLowerCase()
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

  const displayText = formatText(text);

  // ✅ Size styles
  const sizeStyles = {
    small: { padding: "6px 14px", fontSize: "0.8rem", iconSize: 20 },
    medium: { padding: "10px 20px", fontSize: "1rem", iconSize: 26 },
    large: { padding: "14px 28px", fontSize: "1.2rem", iconSize: 32 },
  };

  const { padding, fontSize, iconSize } = sizeStyles[size] || sizeStyles.medium;

  // ✅ Color swap on press
  const currentColor1 = touched ? color2 : color1;
  const currentColor2 = touched ? color1 : color2;
  const currentBoxShadow = touched
    ? `0 6px 20px ${color2}80`
    : `0 4px 15px ${color1}60`;

  return (
    <Button
      onClick={onClick}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
      onMouseDown={() => setTouched(true)}
      onMouseUp={() => setTouched(false)}
      onMouseLeave={() => setTouched(false)}
      sx={{
        px: 0,
        py: 0,
        padding,
        borderRadius: "50px",
        display: "inline-flex",
        background: `linear-gradient(to right, ${currentColor1}, ${currentColor2})`,
        color: "#111E2C",
        fontWeight: theme.typography.button.fontWeight || "bold",
        fontFamily: theme.typography.fontFamily,
        fontSize,
        boxShadow: currentBoxShadow,
        transition: "all 0.3s ease-in-out",
        alignItems: "center",
        gap: 1,
        whiteSpace: "nowrap",
        textTransform: "none", // ✅ prevents MUI from forcing uppercase
        "&:hover": {
          transform: "translateY(-2px)",
          background: `linear-gradient(to right, ${currentColor2}, ${currentColor1})`,
        },
        ...props.sx,
      }}
      {...props}
    >
      {displayText}
      <ArrowCircleRightRoundedIcon
        sx={{
          fontSize: iconSize,
          "& path": {
            fill: "#111E2C",
          },
        }}
      />
    </Button>
  );
};

export default GradientButton;
