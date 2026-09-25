import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const CommitmentSection = ({ compliance }) => {
  const theme = useTheme();

  if (!compliance) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";
  const imageSrc = compliance.image
    ? compliance.image.startsWith("http")
      ? compliance.image
      : `${backendURL}${compliance.image}`
    : ShariahImage;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Paragraph + Image Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 5, md: 10 },
            width: "100%",
          }}
        >
          {/* Left: Paragraph */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: theme.typography.h3.fontWeight,
                lineHeight: 1.3,
                textDecoration: "underline",
                color: theme.palette.text.primary,
                // ✅ theme responsiveFontSizes handles size automatically
              }}
            >
              {compliance.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                mb: 4,
                textAlign: "justify",
                textJustify: "inter-word",
                // ✅ theme responsiveFontSizes handles size automatically
              }}
            >
              {compliance.description}
            </Typography>
          </MotionBox>

          {/* Right: Image */}
          <SectionImage
            src={imageSrc}
            alt={compliance.title || "Shariah Compliance Image"}
            accentColor={theme.palette.primary.dark}
            direction="right"
            delay={0.5}
          />
        </Box>
      </Container>
    </MotionBox>
  );
};

export default CommitmentSection;

