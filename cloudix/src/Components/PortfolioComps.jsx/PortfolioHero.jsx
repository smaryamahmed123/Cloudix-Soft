import React from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import PortfolioBg from "../../assets/Portfolio-bg.png";

const PortfolioHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "55vh", sm: "60vh", md: "66vh" },
        overflow: "hidden",

        backgroundColor: "#111E2C",

        borderRadius: {
          xs: "0 0 36px 36px",
          sm: "0 0 56px 56px",
          md: "0 0 77px 77px",
        },

        /* ✅ FIX */
        boxShadow: "inset 0 -12px 24px rgba(0,0,0,0.35)",
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

      {/* 🔹 Gradient Overlay (NO grey bleed) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(17,30,44,0.95) 0%,
              rgba(17,30,44,0.65) 25%,
              rgba(17,30,44,0.4) 55%,
              rgba(17,30,44,0.15) 75%,
              rgba(17,30,44,0) 100%
            )
          `,
          zIndex: 2,
        }}
      />

      {/* 🔹 Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          px: 2,
        }}
      >
        {/* Animated Title */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
              color: "#fff",
            }}
          >
            Portfolio
          </Typography>
        </Motion.div>

        {/* Animated Subtitle */}
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <Typography
            sx={{
              mt: 1,
              color: "#A9B838",
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
            }}
          >
            Showcasing our creativity through real results
          </Typography>
        </Motion.div>
      </Box>
    </Box>
  );
};

export default PortfolioHero;
