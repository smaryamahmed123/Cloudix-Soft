import React from "react";
import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ShariahImage from "../../assets/Shariah-compliance.png"; // fallback
import SectionImage from "../SectionImage";
const MotionBox = motion(Box);
const MotionImg = motion("img");

const CommitmentSection = ({ compliance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        py: { xs: theme.spacing(2), md: theme.spacing(6) },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          sx={{ mb: theme.spacing(3), textAlign: "center" }}
        >
          <Typography
            component={motion.h3}
            variant="h3"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: 1.3,
              textDecoration: "underline",
              color: theme.palette.text.primary,
            }}
          >
            {compliance.title}
          </Typography>
        </MotionBox>

        {/* Paragraph + Image Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing(6),
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
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.3rem" },
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                mb: theme.spacing(4),
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {compliance.description}
            </Typography>
          </MotionBox>

                 {/* ---- Right: Image ---- */}
        <SectionImage
            src={imageSrc}
            alt={compliance.title || "About Image"}
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
