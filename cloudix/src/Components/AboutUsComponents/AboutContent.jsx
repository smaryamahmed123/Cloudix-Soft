import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import AboutImage from "../../assets/about-team.png";

const MotionBox = motion(Box);

const AboutContent = ({ intro }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!intro) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";
  const imageSrc = intro.image
    ? intro.image.startsWith("http")
      ? intro.image
      : `${backendURL}${intro.image}`
    : AboutImage;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: "#D9D9D9",
        color: "#111E2C",
        py: { xs: 8, md: 12 },
        px: { xs: 3, md: 8 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center", // center items on xs
        gap: { xs: 4, md: 6 }, // smaller gap on mobile
        overflowX: "hidden", // prevent horizontal scroll
      }}
    >
      {/* Left: Text */}
      <MotionBox
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 4,
            color: "#111E2C",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          {intro.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.3rem" },
            mb: 2,
            color: "#111E2C",
            lineHeight: 1.8,
          }}
        >
          {intro.description}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#A9B838",
            fontSize: { xs: "1.2rem", md: "1.4rem" },
          }}
        >
          {intro.highlight}
        </Typography>
      </MotionBox>

      {/* Right: Image */}
      <MotionBox
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            width: "50%",
            height: "100%",
            border: "5px solid #111E2C",
          },
          "&::before": {
            top: 0,
            left: 0,
            borderRight: "none",
            borderBottom: "none",
          },
          "&::after": {
            bottom: 0,
            right: 0,
            borderLeft: "none",
            borderTop: "none",
          },
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt={intro.title || "About Us"}
          loading="lazy"
          style={{
            width: "100%",
            maxWidth: "100%",
            maxHeight: isMobile ? "300px" : "100%",
            objectFit: "cover",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        />
      </MotionBox>
    </MotionBox>
  );
};

export default AboutContent;
