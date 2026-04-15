// src/components/WhyChooseUs.jsx
import React, { memo } from "react";
import { Box, Container, Grid, Typography, useTheme, } from "@mui/material";
import { motion as Motion, useReducedMotion } from "framer-motion";

import Check from "../../assets/Mask group.png";
import Light from "../../assets/Mask group (1).png";
import HandIcon from "../../assets/partnership.png";
import Integrity from "../../assets/Intigrity.png";
import Rocket from "../../assets/Together.png";

/* ---------------- FEATURES DATA ---------------- */

const FEATURES = [
  {
    icon: Check,
    alt: "Smart discovery icon",
    title: "Smart Discovery",
    description:
      "We take time to understand your goals and challenges so every solution is tailored to your needs not just off the shelf software.",
  },
  {
    icon: Light,
    alt: "Smart solutions icon",
    title: "Smart Solutions",
    description:
      "Our focus is on solving problems, not just writing code. Every project is designed to create measurable value for your business.",
  },
  {
    icon: HandIcon,
    alt: "Strong partnership icon",
    title: "Strong Partnership",
    description:
      "We don’t disappear after delivery. Our team stays by your side with ongoing support and improvements whenever you need us.",
  },
  {
    icon: Integrity,
    alt: "Integrity icon",
    title: "Strong Integrity",
    description:
      "As a Shariah-compliant company, we believe in honesty, transparency, and fairness. Trust is the foundation of every project we deliver.",
  },
  {
    icon: Rocket,
    alt: "Growing together icon",
    title: "Growing Together",
    description:
      "Your success is our success. We aim to build lasting relationships that help your business grow today and in the future.",
  },
];

/* ---------------- ANIMATIONS ---------------- */

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ---------------- COMPONENT ---------------- */

function WhyChooseUs() {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Container maxWidth="lg">
    <Box
      component="section"
      aria-labelledby="why-choose-us-heading"
      sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}
    >
      {/* Heading */}
      <Motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Typography
          id="why-choose-us-heading"
          variant="h3"
          sx={{ mb: 2, color: theme.palette.primary.dark }}
        >
          
          Why Choose Us?
        </Typography>

        <Typography
          sx={{
            maxWidth: 720,
            mx: "auto",
            mb: 6,
            color: "text.secondary",
          }}
        >
          Choosing the right IT partner is crucial to your business success.
          Cloudix Soft delivers innovative, reliable, and ethical digital
          solutions tailored to your growth.
        </Typography>
      </Motion.div>

      {/* Features */}
      <Motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Grid container spacing={4} justifyContent="center">
          {FEATURES.map((feature) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={feature.title}
              display="flex"
              justifyContent="center"
            >
              <Motion.div
                variants={cardVariants}
                whileHover={!prefersReducedMotion ? { scale: 1.05 } : undefined}
                transition={{ type: "spring", stiffness: 180 }}
              >
                <Box
                  sx={{
                    p: 3,
                    maxWidth: 260,
                    textAlign: "center",
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      mb: 2,
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(#BBBF19, #BBBF19) padding-box, linear-gradient(to bottom, #111E2C, #A9B838) border-box",
                      border: "4px solid transparent",
                    }}
                  >
                    <Box
                      component="img"
                      src={feature.icon}
                      alt={feature.alt}
                      loading="lazy"
                      decoding="async"
                      width={70}
                      height={70}
                      sx={{ objectFit: "contain" }}
                    />
                  </Box>

                  {/* Title */}
                  <Typography
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      color: "#A9B838",
                      mb: 1,
                      fontSize: "1.1rem",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", lineHeight: 1.6, fontWeight: 600, }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Motion.div>
            </Grid>
          ))}
        </Grid>
      </Motion.div>
    </Box>
      </Container> 
  );
}

export default memo(WhyChooseUs);

