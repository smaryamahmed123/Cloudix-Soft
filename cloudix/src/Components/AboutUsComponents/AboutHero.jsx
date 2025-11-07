import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import AboutBg from "../../assets/aboutus-bg.png";

const AboutHero = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      sx={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(17,30,44,0.8), rgba(17,30,44,0.8)), url(${AboutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: { xs: "70vh", sm: "80vh", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        width: "100%",
        mx: "auto",
        boxShadow: "0px 4px 12px rgba(17, 30, 44, 1)",
        bgcolor: "rgba(217, 217, 217, 1)",
      }}
    >
      {/* Heading with animation */}
      <Typography
        component={motion.h2}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: { xs: 1, sm: 2 },
          color: "#FFFFFF",
          fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem", lg: "4rem" },
          textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        About Us
      </Typography>

      {/* Subheading with delay animation */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        variant="body1"
        sx={{
          color: "#A9B838",
          maxWidth: "700px",
          lineHeight: 1.6,
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem", lg: "1.75rem" },
          px: { xs: 2, sm: 0 },
        }}
      >
        Welcome to Cloudix Soft, Pakistan’s first <br />{" "}
        <span style={{ color: "#D4E157" }}>Shariah-compliant IT company</span>
      </Typography>
    </Box>
  );
};

export default AboutHero;
