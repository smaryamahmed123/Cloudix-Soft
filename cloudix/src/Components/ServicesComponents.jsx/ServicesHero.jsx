// import HeroSection from "../HeroSection";
// import ServicesBg from "../../assets/services-bg.webp";

// const ServicesHero = () => {
//   return (
//     <HeroSection
//       image={ServicesBg}
//       title="Our Services"
//       subtitle="At Cloudix Soft, we offer a variety of services to help your business grow."
//     />
//   );
// };

// export default ServicesHero;


import React from "react";
import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HeroImg from "../../assets/services-hero.webp"; // laptop / desk photo from new design

const ServicesHero = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { dark } = theme.palette.primary;
  const lime = theme.palette.accent.main;

  return (
    <Box sx={{ position: "relative", overflow: "hidden", bgcolor: dark, color: "#fff" }}>
      {/* Photo on the right, fading into navy on the left */}
      <Box
        sx={{
          position: "absolute", inset: 0, left: { xs: 0, md: "45%" },
          backgroundImage: `url(${HeroImg})`, backgroundSize: "cover", backgroundPosition: "center",
          opacity: { xs: 0.25, md: 1 },
          "&::after": {
            content: '""', position: "absolute", inset: 0,
            background: { xs: "none", md: `linear-gradient(90deg, ${dark} 0%, transparent 40%)` },
          },
        }}
      />
      {/* Lime angled accent */}
      <Box
        sx={{
          display: { xs: "none", md: "block" }, position: "absolute", top: 0, right: "28%",
          width: 90, height: 120, bgcolor: theme.palette.primary.main, opacity: 0.85,
          clipPath: "polygon(35% 0, 100% 0, 65% 100%, 0 100%)",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 8, md: 12 } }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ maxWidth: 520 }}
        >
          <Typography variant="subtitle2" sx={{ color: lime, fontWeight: 600, mb: 2 }}>
            Digital solutions for a brighter tomorrow
          </Typography>
          <Typography component="h1" variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Our Services
          </Typography>
          <Typography variant="h6" sx={{ color: lime, mb: 2, lineHeight: 1.4 }}>
            At Cloudix Soft, we offer a variety of services to help your business grow.
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}>
            From creative campaigns to powerful digital solutions, we help brands build,
            engage and grow in the digital world.
          </Typography>
          <Button
            variant="contained"
            onClick={() => document.getElementById("what-we-offer")?.scrollIntoView({ behavior: "smooth" })}
            sx={{
              bgcolor: lime, color: dark, borderRadius: 99, px: 3.5, py: 1.2, boxShadow: "none",
              "&:hover": { bgcolor: theme.palette.accent.light, boxShadow: "none" },
            }}
          >
            Explore our services
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesHero;