import React, { memo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContactBg from "../../assets/contact-bg.webp";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const ContactHero = () => {
  const scrollToForm = () => {
    document
      .getElementById("contact-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: {
          xs: "75vh",
          md: "78vh",
        },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#111E2C",
        backgroundImage: `
          linear-gradient(
            90deg,
            rgba(17,30,44,0.96) 0%,
            rgba(17,30,44,0.88) 45%,
            rgba(17,30,44,0.55) 100%
          ),
          url(${ContactBg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Decorative Windows-style shapes */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: 180, md: 350 },
          height: { xs: 180, md: 350 },
          right: { xs: -80, md: 80 },
          top: { xs: 50, md: 80 },
          border: "1px solid rgba(187,191,25,0.25)",
          transform: "rotate(45deg)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: { xs: 100, md: 200 },
          height: { xs: 100, md: 200 },
          right: { xs: 20, md: 260 },
          bottom: { xs: -50, md: 40 },
          background:
            "linear-gradient(135deg, rgba(118,153,20,0.25), rgba(187,191,25,0.05))",
          transform: "rotate(45deg)",
          borderRadius: 2,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          sx={{
            maxWidth: 850,
          }}
        >
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              px: 2,
              py: 0.8,
              mb: 3,
              borderRadius: 50,
              border: "1px solid rgba(187,191,25,0.4)",
              color: "#BBBF19",
              fontSize: {
                xs: "0.75rem",
                md: "0.85rem",
              },
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
              backgroundColor: "rgba(187,191,25,0.08)",
            }}
          >
            Let's Work Together
          </Typography>

          <MotionTypography
            component="h1"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: {
                xs: "2.6rem",
                sm: "3.5rem",
                md: "5rem",
              },
              lineHeight: 1.05,
              mb: 3,
            }}
          >
            Let's Build
            <Box
              component="span"
              sx={{
                display: "block",
                color: "#BBBF19",
              }}
            >
              Something Great.
            </Box>
          </MotionTypography>

          <Typography
            sx={{
              maxWidth: 650,
              color: "rgba(255,255,255,0.78)",
              fontSize: {
                xs: "1rem",
                md: "1.2rem",
              },
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Have an idea, a business challenge, or a project in mind?
            Tell us about it and let's turn your vision into a digital
            solution.
          </Typography>

          <Button
            onClick={scrollToForm}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 3.5,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 700,
              backgroundColor: "#769914",
              color: "#fff",
              boxShadow: "0 10px 30px rgba(118,153,20,0.25)",
              "&:hover": {
                backgroundColor: "#8aa91b",
                transform: "translateY(-2px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Start Your Project
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default memo(ContactHero);