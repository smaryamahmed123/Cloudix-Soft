import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const TeamSection = ({ teamIntro }) => {
  const theme = useTheme();

  if (!teamIntro) return null;

  const imageSrc = teamIntro.image?.startsWith("http")
    ? teamIntro.image
    : `${teamIntro.image || ""}`;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        py: { xs: theme.custom.sectionSpacing.xs, md: theme.custom.sectionSpacing.md },
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          py: { xs: 6, md: 10 },
          gap: { xs: 5, md: 10 },
        }}
      >
        {/* LEFT: IMAGE */}
        <SectionImage
          src={imageSrc}
          alt={teamIntro.title || "Team Image"}
          accentColor={theme.palette.primary.light}
          direction="right"
          delay={0.5}
        />

        {/* RIGHT: TEXT */}
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
              mb: 3,
              color: theme.palette.accent.light,
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            {teamIntro.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: theme.palette.common.white,
              lineHeight: 1.8,
              maxWidth: "600px",
              mx: { xs: "auto", md: 0 },
              textAlign: "justify",
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            {teamIntro.description}
          </Typography>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default TeamSection;
