import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.75 },
  }),
};

const HeroSection = ({ image, title, subtitle }) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  return (
    <MotionBox
      component="header"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: "relative",
        height: { xs: "40vh", sm: "50vh", md: "60vh" },
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* 🌫️ BLUR BACKGROUND (instant load) */}
      <Box
        component="img"
        src={image}
        alt={title}
        loading="eager"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(20px)",
          transform: "scale(1.1)",
          transition: "opacity 0.6s ease",
          opacity: loaded ? 0 : 1,
        }}
      />

      {/* 🚀 MAIN IMAGE */}
      <Box
        component="img"
        src={image}
        alt={title}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* 🌑 OVERLAY */}
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

      {/* ✨ CONTENT */}
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
          variant="h1"
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          sx={{
            fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.2rem" },
            fontWeight: 700,
            mb: 2,
            color: theme.palette.common.white
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
