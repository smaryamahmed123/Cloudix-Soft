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

  // Split the title so the last word gets the accent color
  // (e.g. "Our Team" -> "Our " in white, "Team" in olive-green)
  const titleWords = (teamIntro.title || "").trim().split(" ");
  const titleLead = titleWords.slice(0, -1).join(" ");
  const titleAccent = titleWords.slice(-1).join(" ");

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
          {/* Eyebrow / kicker line */}
            {/* {teamIntro.eyebrow && (
              <Typography
                variant="overline"
                sx={{
                  display: "block",
                  letterSpacing: 2,
                  fontWeight: 600,
                  color: theme.palette.primary.light,
                  mb: 1,
                }}
              >
                {teamIntro.eyebrow}
              </Typography>
            )} */}

          {/* Two-tone heading */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: theme.typography.h3.fontWeight,
              mb: 3,
            }}
          >
            {titleLead && (
              <Box component="span" sx={{ color: theme.palette.common.white }}>
                {titleLead}{" "}
              </Box>
            )}
            <Box component="span" sx={{ color: theme.palette.primary.light }}>
              {titleAccent}
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: theme.palette.common.white,
              lineHeight: 1.8,
              maxWidth: "600px",
              mx: { xs: "auto", md: 0 },
              textAlign: { xs: "center", md: "left" },
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