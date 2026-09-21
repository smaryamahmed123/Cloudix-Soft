// import React from "react";
// import { Box, Typography } from "@mui/material";
// // import { motion } from "framer-motion";
// import AboutBg from "../../assets/about-bg.webp";
// import HeroSection from "../HeroSection";



// const AboutHero = () => {
//   return (
//     <>
//       <HeroSection
//         image={AboutBg}
//         title="About Us"
//         subtitle="Welcome to Cloudix Soft, Pakistan’s first Shariah-compliant IT company."
//       />
//     </>
//   );
// };

// export default AboutHero;


import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AboutBg from "../../assets/about-bg.webp";

const MotionBox = motion(Box);

const AboutHero = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: 430, md: 560 },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(7, 18, 30, 0.96) 0%,
            rgba(7, 18, 30, 0.82) 42%,
            rgba(7, 18, 30, 0.38) 75%,
            rgba(7, 18, 30, 0.55) 100%
          ),
          url(${AboutBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative diagonal shape */}
      <Box
        sx={{
          position: "absolute",
          right: -100,
          top: -50,
          width: 260,
          height: "140%",
          background: "rgba(118, 153, 20, 0.75)",
          transform: "skewX(-20deg)",
          opacity: 0.7,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 15,
          top: -50,
          width: 60,
          height: "140%",
          background: "rgba(212, 225, 87, 0.35)",
          transform: "skewX(-20deg)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <MotionBox
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          sx={{
            maxWidth: { xs: "100%", md: 700 },
          }}
        >
          {/* Small label */}
          <Typography
            sx={{
              color: "#D4E157",
              fontWeight: 700,
              fontSize: { xs: "0.75rem", md: "0.9rem" },
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            About Us
          </Typography>

          {/* Main heading */}
          <Typography
            component="h1"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: {
                xs: "2.8rem",
                sm: "3.6rem",
                md: "5rem",
              },
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              mb: 2,
            }}
          >
            About{" "}
            <Box
              component="span"
              sx={{
                color: "#A9B838",
              }}
            >
              Cloudix Soft
            </Box>
          </Typography>

          {/* Accent line */}
          <Box
            sx={{
              width: 70,
              height: 4,
              backgroundColor: "#BBBF19",
              borderRadius: 5,
              mb: 3,
            }}
          />

          <Typography
            sx={{
              color: "rgba(255,255,255,0.88)",
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              lineHeight: 1.8,
              maxWidth: 620,
              mb: 4,
            }}
          >
            Welcome to Cloudix Soft, Pakistan's first
            Shariah-compliant IT company. We build meaningful
            digital solutions with technology, creativity and trust.
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            href="#about-content"
            sx={{
              backgroundColor: "#A9B838",
              color: "#111E2C",
              borderRadius: "8px",
              px: 3,
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: "0 10px 30px rgba(169,184,56,0.25)",
              "&:hover": {
                backgroundColor: "#BBBF19",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Discover Our Story
          </Button>
        </MotionBox>
      </Container>

      {/* Bottom green line */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 5,
          background:
            "linear-gradient(90deg, #769914, #BBBF19, #A9B838)",
        }}
      />
    </Box>
  );
};

export default AboutHero;