// import React, { useState, memo } from "react";
// import { Button, useTheme } from "@mui/material";
// import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

// const GradientButton = ({
//   text = "READ MORE",
//   size = "medium",
//   onClick,
//   ...props
// }) => {
//   const theme = useTheme();
//   const [touched, setTouched] = useState(false);

//   const formatText = (str) =>
//     str
//       .toLowerCase()
//       .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

//   const displayText = formatText(text);

//   const sizeStyles = {
//     small:  { padding: "6px 14px",   fontSize: "1rem",   iconSize: 20 },
//     medium: { padding: "10px 20px",  fontSize: "1.2rem", iconSize: 26 },
//     large:  { padding: "14px 28px",  fontSize: "1.4rem", iconSize: 32 },
//   };

//   const { padding, fontSize, iconSize } = sizeStyles[size] || sizeStyles.medium;

//   const bgColor = theme.palette.secondary.main; // ✅ #BBBF19 from theme

//   return (
//     <Button
//       onClick={onClick}
//       onTouchStart={() => setTouched(true)}
//       onTouchEnd={() => setTouched(false)}
//       onMouseDown={() => setTouched(true)}
//       onMouseUp={() => setTouched(false)}
//       onMouseLeave={() => setTouched(false)}
//       aria-label={text}
//       sx={{
//         px: 0,
//         py: 0,
//         padding,
//         borderRadius: "50px",
//         display: "inline-flex",
//         alignItems: "center",
//         gap: 1,
//         whiteSpace: "nowrap",
//         background: bgColor,                              // ✅ solid color, no gradient
//         color: theme.palette.primary.dark,                // ✅ #111E2C from theme
//         fontWeight: theme.typography.button.fontWeight,
//         fontFamily: theme.typography.fontFamily,
//         fontSize,
//         boxShadow: touched
//           ? `0 6px 20px ${bgColor}80`
//           : `0 4px 15px ${bgColor}60`,
//         transition: "all 0.3s ease-in-out",
//         textTransform: "none",
//         cursor: "pointer",
//         "&:hover": {
//           transform: "translateY(-2px)",
//           background: theme.palette.secondary.main,       // ✅ stays same color on hover
//           opacity: 0.9,                                   // ✅ subtle hover feedback
//           boxShadow: `0 6px 20px ${bgColor}90`,
//         },
//         ...props.sx,
//       }}
//       {...props}
//     >
//       {displayText}
//       <ArrowCircleRightRoundedIcon
//         sx={{
//           fontSize: iconSize,
//           "& path": {
//             fill: theme.palette.primary.dark,             // ✅ from theme
//           },
//         }}
//       />
//     </Button>
//   );
// };

// export default memo(GradientButton);









import React, { useState, memo } from "react";
import { Button, useTheme } from "@mui/material";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const GradientButton = ({
  text = "READ MORE",
  size = "medium",
  onClick,
  sx: sxProp,
  ...props
}) => {
  const theme = useTheme();
  const [touched, setTouched] = useState(false);

  const formatText = (str) =>
    str
      .toLowerCase()
      .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

  const displayText = formatText(text);

  // Responsive sizes using clamp() — fluid scaling between breakpoints
  // small:  xs/mobile      ~375–600px
  // medium: sm/tablet      ~600–900px
  // large:  md/desktop     900px+
  const sizeStyles = {
    small: {
      padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
      fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
      iconSize: "clamp(18px, 4vw, 22px)",
    },
    medium: {
      padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
      fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
      iconSize: "clamp(22px, 3.5vw, 26px)",
    },
    large: {
      padding: `${theme.spacing(1.5)} ${theme.spacing(3.5)}`,
      fontSize: "clamp(1rem, 1.5vw, 1.35rem)",
      iconSize: "clamp(26px, 3vw, 32px)",
    },
  };

  const { padding, fontSize, iconSize } =
    sizeStyles[size] ?? sizeStyles.medium;

  const bgColor = theme.palette.secondary.main; // #BBBF19

  return (
    <Button
      onClick={onClick}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
      onMouseDown={() => setTouched(true)}
      onMouseUp={() => setTouched(false)}
      onMouseLeave={() => setTouched(false)}
      aria-label={text}
      sx={{
        px: 0,
        py: 0,
        padding,
        borderRadius: "50px",
        display: "inline-flex",
        alignItems: "center",
        gap: { xs: 0.75, md: 1 },
        whiteSpace: "nowrap",
        background: bgColor,
        color: theme.palette.primary.dark,
        fontWeight: theme.typography.button.fontWeight,
        fontFamily: theme.typography.fontFamily,
        fontSize,
        // Fluid shadow
        boxShadow: touched
          ? `0 6px 20px ${bgColor}80`
          : `0 4px 15px ${bgColor}60`,
        transition: "all 0.3s ease-in-out",
        textTransform: "none",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-2px)",
          background: bgColor,
          opacity: 0.9,
          boxShadow: `0 6px 20px ${bgColor}90`,
        },
        ...sxProp,
      }}
      {...props}
    >
      {displayText}
      <ArrowCircleRightRoundedIcon
        sx={{
          fontSize: iconSize,
          flexShrink: 0,
          "& path": {
            fill: theme.palette.primary.dark,
          },
        }}
      />
    </Button>
  );
};

export default memo(GradientButton);
