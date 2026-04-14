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
  const theme = useTheme();

  return (
    // <MotionBox
    //   component="header"
    //   variants={containerVariants}
    //   initial="hidden"
    //   animate="visible"
    //   sx={{
    //     position: "relative",
    //     isolation: "isolate",
    //     backgroundImage: `
    //       linear-gradient(
    //         ${theme.palette.primary.dark}80,
    //         ${theme.palette.primary.dark}80
    //       ),
    //       url(${image})
    //     `,
    //     backgroundSize: "cover",          // ✅ always fills box regardless of image size
    //     backgroundPosition: "center",     // ✅ centers image in box
    //     backgroundRepeat: "no-repeat",
    //     height: { xs: "50vh", md: "70vh" }, // ✅ fixed height — not minHeight
    //     width: "100%",                    // ✅ full width always
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     px: { xs: 2, md: 12 },
    //     color: theme.palette.common.white,
    //     textAlign: "center",
    //     overflow: "hidden",               // ✅ clips any image overflow
    //     flexShrink: 0,                    // ✅ prevents height collapsing
    //     mb: 0,
    //     borderRadius: 0,
    //   }}
    // >
    //   <Box sx={{ maxWidth: 620 }}>
    //     <MotionTypography
    //       component="h1"
    //       variants={fadeUp}
    //       custom={1}
    //       initial="hidden"
    //       animate="visible"
    //       sx={{
    //         fontWeight: theme.typography.h1.fontWeight,
    //         fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.2rem" },
    //         lineHeight: 1.15,
    //         color: theme.palette.common.white,
    //         mb: 2,
    //       }}
    //     >
    //       {title}
    //     </MotionTypography>

    //     <MotionTypography
    //       component="p"
    //       variants={fadeUp}
    //       custom={2}
    //       initial="hidden"
    //       animate="visible"
    //       sx={{
    //         fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
    //         fontWeight: 600,
    //         color: theme.palette.accent.light,
    //         mb: buttonText ? 3 : 0,
    //       }}
    //     >
    //       {subtitle}
    //     </MotionTypography>
    //   </Box>
    // </MotionBox>
    


<MotionBox
  component="header"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  sx={{
    position: "relative",
    // height: { xs: "50vh", md: "70vh" },
    height: {
  xs: "40vh",  // smaller for contain
  sm: "50vh",
  md: "70vh",
},
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>
  {/* ✅ Background Image (LCP Optimized like Home Hero) */}
<Box
  component="img"
  src={image}
  alt={title}
  loading="lazy"
  decoding="async"
  fetchpriority="low"
  sx={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",

    // ✅ KEY PART (like post section behavior)
    objectFit: {
      xs: "contain",   // mobile → show full image (no crop)
      sm: "cover",     // tablet+
    },

    backgroundColor: "#000", // fills empty space when contain
  }}
/>

  {/* ✅ Overlay (same as home hero) */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background: `linear-gradient(
        ${theme.palette.primary.dark}80,
        ${theme.palette.primary.dark}80
      )`,
      zIndex: 1,
    }}
  />

  {/* ✅ Content */}
  <Box
    sx={{
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      px: { xs: 2, md: 6 },
      maxWidth: 620,
      color: theme.palette.common.white,
    }}
  >
    <MotionTypography
      component="h1"
      variants={fadeUp}
      custom={1}
      initial="hidden"
      animate="visible"
      sx={{
        fontWeight: theme.typography.h1.fontWeight,
        fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.2rem" },
        lineHeight: 1.15,
        mb: 2,
        color: theme.palette.common.white,
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
        fontWeight: 600,
        color: theme.palette.accent.light,
      }}
    >
      {subtitle}
    </MotionTypography>
  </Box>
</MotionBox>

  );
};

export default HeroSection;












