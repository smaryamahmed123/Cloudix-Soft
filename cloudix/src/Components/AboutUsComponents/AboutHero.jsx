import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AboutBg from "../../assets/aboutus-bg.webp";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const AboutHero = () => {
  return (
    <MotionBox
      component="section"
      aria-label="About Cloudix Soft"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: "relative",
        minHeight: { xs: "70vh", sm: "80vh", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: { xs: 2, sm: 4, md: 8 },
        color: "common.white",
        backgroundImage: `
          linear-gradient(rgba(17,30,44,0.8), rgba(17,30,44,0.8)),
          url(${AboutBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <MotionTypography
        variant="h1"
        component="h1"
        variants={textVariants}
        sx={{
          fontWeight: 700,
          mb: 2,
          textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
          fontSize: {
            xs: "2.2rem",
            sm: "3rem",
            md: "3.75rem",
            lg: "4.2rem",
          },
        }}
      >
        About Us
      </MotionTypography>

      <MotionTypography
        variant="body1"
        variants={textVariants}
        sx={{
          maxWidth: 760,
          lineHeight: 1.7,
          fontSize: {
            xs: "1rem",
            sm: "1.1rem",
            md: "1.25rem",
            lg: "1.5rem",
          },
          color: "accent.light",
        }}
      >
        Welcome to Cloudix Soft, Pakistan’s first{" "}
        <Typography
          component="span"
          sx={{ color: "accent.main", fontWeight: 600 }}
        >
          Shariah-compliant IT company
        </Typography>
      </MotionTypography>
    </MotionBox>
  );
};

export default AboutHero;
