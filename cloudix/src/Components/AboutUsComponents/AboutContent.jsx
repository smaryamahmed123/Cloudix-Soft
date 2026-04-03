import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Container } from "@mui/material";
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
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        py: { xs: theme.spacing(8), md: theme.spacing(12) },
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: { xs: theme.spacing(4), md: theme.spacing(6) } }}>
        
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
              fontWeight: theme.typography.h3.fontWeight,
              mb: theme.spacing(4),
              color: theme.palette.text.primary,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            {intro.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.3rem" },
              mb: theme.spacing(2),
              color: theme.palette.text.primary,
              lineHeight: 1.8,
              textAlign: "justify",
              textJustify: "inter-word"
            }}
          >
            {intro.description}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              color: theme.palette.accent.light,
              fontSize: { xs: "1.2rem", md: "1.4rem" },
              textAlign: "justify",
              textJustify: "inter-word"
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
              border: `5px solid ${theme.palette.text.primary}`,
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
              borderRadius: theme.shape.borderRadius,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            }}
          />
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default AboutContent;
