import React from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion"; // ✨ Import Framer Motion
import PortfolioBg from "../../assets/Portfolio-bg.png";

const PortfolioHero = () => {
  return (
    <Box
      sx={{
        color: "#D9D9D9",
        alignContent: "center",
        textAlign: "center",
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(17, 30, 44, 1) 0%,
            rgba(17, 30, 44, 0.54) 15%,
            rgba(17, 30, 44, 0.52) 30%,
            rgba(17, 30, 44, 0.49) 45%,
            rgba(17, 30, 44, 0.55) 60%,
            rgba(17, 30, 44, 0.34) 75%,
            rgba(17, 30, 44, 0) 85%,
            rgba(17, 30, 44, 0.26) 100%
          ),
          url(${PortfolioBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        borderRadius: {
          xs: "0 0 40px 40px",
          sm: "0 0 60px 60px",
          md: "0 0 77px 77px",
        },
        height: "66vh",
        boxShadow: "0px 4px 12px rgba(17, 30, 44, 0.8)",
        position: "relative",
        zIndex: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ✨ Animated Title */}
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "3rem" },
            color: "#FFFFFF",
          }}
        >
          Portfolio
        </Typography>
      </Motion.div>

      {/* ✨ Animated Subtitle */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: "#A9B838",
            mt: 1,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Showcasing our creativity through real results
        </Typography>
      </Motion.div>
    </Box>
  );
};

export default PortfolioHero;
