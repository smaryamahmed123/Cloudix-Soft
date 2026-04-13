import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Container } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const AboutContent = ({ intro }) => {
  const theme = useTheme();

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
        py: { xs: 8, md: 14 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 5, md: 10 },
          }}
        >
          {/* LEFT */}
          <Box flex={1}>
            {/* Title — theme handles responsive size */}
            <Typography
              variant="h3"
              sx={{
                mb: { xs: 2, md: 3 },
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
              }}
            >
              {intro.title}
            </Typography>

            {/* Description — theme handles responsive size */}
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 3 },
                lineHeight: 1.7,
                maxWidth: "520px",
                textAlign: "justify",
                mx: { xs: "auto", md: 0 },
              }}
            >
              {intro.description}
            </Typography>

            {/* Highlight — theme handles responsive size */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
                mt: { xs: 1, md: 2 },
              }}
            >
              {intro.highlight}
            </Typography>
          </Box>

          {/* RIGHT */}
          <SectionImage
            src={imageSrc}
            alt={intro.title || "About Image"}
            accentColor={theme.palette.primary.dark}
            direction="right"
            delay={0.5}
          />
        </Box>
      </Container>
    </MotionBox>
  );
};

export default AboutContent;
