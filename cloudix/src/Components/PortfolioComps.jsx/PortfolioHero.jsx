import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PortfolioBg from "../../assets/Portfolio-bg.png";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

/* Animation Variants */
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.25, duration: 0.8, ease: "easeOut" },
  }),
};

const PortfolioHero = () => {
  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: "relative",
        height: { xs: "55vh", sm: "60vh", md: "66vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",

        /* 🔒 Solid base prevents bleed */
        backgroundColor: "#111E2C",

        /* Rounded bottom */
        borderRadius: {
          xs: "0 0 36px 36px",
          sm: "0 0 56px 56px",
          md: "0 0 77px 77px",
        },

        /* 🔒 Bottom pixel lock (artifact fix) */
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: "#111E2C",
          zIndex: 3,
        },
      }}
    >
      {/* 🔹 Background Image */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${PortfolioBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />

      {/* 🔹 Gradient Overlay (depth without artifacts) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(17,30,44,0.95) 0%,
              rgba(17,30,44,0.65) 35%,
              rgba(17,30,44,0.4) 55%,
              rgba(17,30,44,0.75) 80%,
              rgba(17,30,44,1) 100%
            )
          `,
          zIndex: 2,
        }}
      />

      {/* 🔹 Content */}
      <Box sx={{ position: "relative", zIndex: 4, px: 2 }}>
        <MotionTypography
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="visible"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem", lg: "3.5rem" },
            color: "#FFFFFF",
            textShadow: "2px 4px 12px rgba(0,0,0,0.45)",
          }}
        >
          Portfolio
        </MotionTypography>

        <MotionTypography
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="visible"
          sx={{
            mt: 1,
            color: "#A9B838",
            fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
            maxWidth: "720px",
            mx: "auto",
          }}
        >
          Showcasing our creativity through real results
        </MotionTypography>
      </Box>
    </MotionBox>
  );
};

export default PortfolioHero;
