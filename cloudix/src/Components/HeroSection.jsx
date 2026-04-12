// // HeroSection.jsx
// import React from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { motion } from "framer-motion";

// // Motion wrappers
// const MotionBox = motion(Box);
// const MotionTypography = motion(Typography);
// const MotionButton = motion(Button);

// /* Animation Variants */
// const containerVariants = {
//   hidden: { opacity: 0, scale: 0.98 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   visible: (i = 1) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.25, duration: 0.75, ease: "easeOut" },
//   }),
// };

// /**
//  * Reusable HeroSection component
//  * @param {string} image - Background image URL
//  * @param {string} title - Hero title
//  * @param {string} subtitle - Hero subtitle
//  * @param {string} buttonText - Optional button text
//  * @param {string} buttonLink - Optional button link
//  */
// const HeroSection = ({ image, title, subtitle, buttonText, buttonLink }) => {
//   return (
//     <MotionBox
//       component="header"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       sx={{
//         position: "relative",
//         isolation: "isolate",
//         backgroundColor: "#FFFFFF",

//         backgroundImage: `
//       linear-gradient(
//         to right,
//         rgba(17,30,44,0.85),
//         rgba(17,30,44,0.55) 40%,
//         rgba(17,30,44,0.15) 70%
//       ),
//       url(${image})
//     `,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",

//         height: { xs: "55vh", md: "75vh" },
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         px: { xs: 2, md: 12 },
//         color: "#fff",

//         // borderRadius: {
//         //   xs: "0 0 36px 36px",
//         //   sm: "0 0 56px 56px",
//         //   md: "0 0 77px 77px",
//         // },

//         textAlign: "center",
//         overflow: "hidden",

//         "&::after": {
//           content: '""',
//           position: "absolute",
//           left: 0,
//           right: 0,
//           bottom: 0,
//           height: "2px",
//           backgroundColor: "#111E2C",
//           zIndex: 5,
//         },
//       }}
//     >
//       <Box sx={{ maxWidth: 620 }}>
//         {/* Title */}
//         <MotionTypography
//           component="h1"
//           variants={fadeUp}
//           custom={1}
//           initial="hidden"
//           animate="visible"
//           sx={{
//             fontWeight: 800,
//             fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.2rem" },
//             lineHeight: 1.15,
//             color: "#FFFFFF",
//             mb: 2,
//           }}
//         >
//           {title}
//         </MotionTypography>

//         {/* Subtitle */}
//         <MotionTypography
//           component="p"
//           variants={fadeUp}
//           custom={2}
//           initial="hidden"
//           animate="visible"
//           sx={{
//             fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
//             color: "#A9B838",
//             mb: buttonText ? 3 : 0,
//           }}
//         >
//           {subtitle}
//         </MotionTypography>
//       </Box>
//     </MotionBox>
//   );
// };

// export default HeroSection;








import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.75, ease: "easeOut" },
  }),
};

const HeroSection = ({ image, title, subtitle, buttonText, buttonLink }) => {
  const theme = useTheme();  // ✅

  return (
    <MotionBox
      component="header"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: "relative",
        isolation: "isolate",
        backgroundColor: theme.palette.background.default,          // ✅
        backgroundImage: `
          linear-gradient(
            to right,
            ${theme.palette.primary.dark}D9,
            ${theme.palette.primary.dark}8C 40%,
            ${theme.palette.primary.dark}26 70%
          ),
          url(${image})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: { xs: "55vh", md: "75vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 12 },
        color: theme.palette.common.white,                          // ✅
        textAlign: "center",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: theme.palette.primary.dark,             // ✅
          zIndex: 5,
        },
      }}
    >
      <Box sx={{ maxWidth: 620 }}>
        <MotionTypography
          component="h1"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          sx={{
            fontWeight: theme.typography.h1.fontWeight,             // ✅
            fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.2rem" },
            lineHeight: 1.15,
            color: theme.palette.common.white,                      // ✅
            mb: 2,
          }}
        >
          {title}
        </MotionTypography>

        <MotionTypography
          component="p"
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          sx={{
            fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
            fontWeight: 600,                                         // ✅ bold subtitle
            color: theme.palette.accent.light,                      // ✅ #A9B838 from theme
            mb: buttonText ? 3 : 0,
          }}
        >
          {subtitle}
        </MotionTypography>
      </Box>
    </MotionBox>
  );
};

export default HeroSection;
