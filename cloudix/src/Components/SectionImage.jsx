// import { Box, useTheme, } from "@mui/material";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);
// const SectionImage = ({
//   src,
//   alt = "",
//   accentColor = "#A9B838",
//   direction = "right",
//   delay = 0.5,
// }) => {
// const theme = useTheme();
//   return (
//     <MotionBox
//       initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8, delay, ease: "easeOut" }}
//       viewport={{ once: true }}
//       sx={{
//         flex: 1,
//         maxWidth: { xs: "100%", md: "50%" },
//         position: "relative",
//         display: "inline-block",
//         width: "100%",
//         borderRadius: `${theme.shape.borderRadius}px`,  // ✅ added
//         // overflow: "hidden",  

//         "&::before, &::after": {
//           content: '""',
//           position: "absolute",
//           width: '50%',
//           height: '50%',
//           border: `5px solid ${accentColor}`,
//           zIndex: 2,
//           pointerEvents: "none",
//         },
//         "&::before": {
//           top: -10,
//           left: -10,
//           borderRight: "none",
//           borderBottom: "none",
//           borderRadius: `35px 0 0 0`,
//         },
//         "&::after": {
//           bottom: -10,
//           right: -10,
//           borderLeft: "none",
//           borderTop: "none",
//           borderRadius: `0 0 35px 0`,
//         },
//       }}
//     >
//       <MotionBox
//         component="img"
//         src={src}
//         alt={alt}
//         loading="lazy"
//         whileHover={{ scale: 1.04 }}
//         transition={{ duration: 0.4 }}
//         sx={{
//           width: "100%",
//           height: "auto",
//           display: "block",
//           radius: theme.shape.borderRadius,
//           borderRadius: theme.shape.borderRadius,
//           // boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//         }}
//       />
//     </MotionBox>
//   );
// };

// export default SectionImage;







import React from "react";
import { Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SectionImage = ({
  src,
  alt = "",
  accentColor = "#A9B838",
  direction = "right",
  delay = 0.5,
}) => {
  const theme = useTheme();

  return (
    <MotionBox
      initial={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        flex: 1,
        maxWidth: { xs: "100%", md: "50%" },
        width: "100%",
      }}
    >
      <MotionBox
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 100 }}
        sx={{
          position: "relative",
          display: "inline-block",
          width: "100%",
          borderRadius: "35px",
          overflow: "hidden",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            width: "50%",
            height: "50%",
            border: `5px solid ${accentColor}`,
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            top: 0,
            left: 0,
            borderRight: "none",
            borderBottom: "none",
            borderRadius: "35px 0 0 0",
          },
          "&::after": {
            bottom: 0,
            right: 0,
            borderLeft: "none",
            borderTop: "none",
            borderRadius: "0 0 35px 0",
          },
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          sx={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </MotionBox>
    </MotionBox>
  );
};

export default SectionImage;
