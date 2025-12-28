import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { motion as Motion } from "framer-motion";
import ServicesBg from "../../assets/services-bg.png";

const ServicesHero = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(17,30,44,0.8), rgba(17,30,44,0.8)), url(${ServicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 0 },
        textAlign: "center",
        height: { xs: "60vh", md: "80vh" },

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0px 4px 12px rgba(17, 30, 44, 1)",
        borderBottomLeftRadius: 77,
        borderBottomRightRadius: 77,
      }}
    >
      <Container maxWidth="md">
        {/* Heading with animation */}
        <Motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2rem", md: "3.5rem" },
              color: "#FFFFFF",
            }}
          >
            Our Services
          </Typography>
        </Motion.div>

        {/* Subheading with animation */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#A9B838",
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            At Cloudix Soft, we offer a variety of services <br />
            to help your business grow
          </Typography>
        </Motion.div>
      </Container>
    </Box>
  );
};

export default ServicesHero;
