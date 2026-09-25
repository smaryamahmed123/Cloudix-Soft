import React, { useState } from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import GradientButton from "./GradientButton"; // adjust path to match your actual folder structure

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

/**
 * Reusable hero, styled after the Services page hero:
 * photo bleeding in from the right and fading into the dark background,
 * a lime clip-path accent shape, and left-aligned content.
 *
 * Only `image` and `title` are required — eyebrow, highlight, description
 * and the button are all optional, so pages that only ever passed
 * `title`/`subtitle` (the old API) still render without empty gaps.
 */
const HeroSection = ({
  image,
  eyebrow,
  title,
  subtitle,        // kept for backward compatibility with the old 2-line API
  highlight,        // the lime sub-heading line (e.g. "At Cloudix Soft, we offer...")
  description,
  buttonText,
  onButtonClick,
  maxContentWidth = 520,
  decorations,      // optional page-specific decorative shapes, ReactNode(s).
  children,                   // Rendered inside the hero's own clipped container so
                     // they can't overflow it, same as the built-in lime accent.
}) => {
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);
  const { dark } = theme.palette.primary;
  const lime = theme.palette.accent.main;

  // `highlight` is the new name for this line; `subtitle` is kept as a
  // fallback so existing callers passing only `title`/`subtitle` still work.
  const highlightLine = highlight ?? subtitle;

  return (
    <MotionBox
      component="header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{ position: "relative", overflow: "hidden", bgcolor: dark, color: "#fff" }}
    >
      {/* Photo bleeding in from the right, fading into navy on the left */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          left: { xs: 0, md: "45%" },
          overflow: "hidden",
          opacity: { xs: 0.25, md: 1 },
        }}
      >
        {/* Blur placeholder, shown until the full-res image loads */}
        <Box
          component="img"
          src={image}
          alt=""
          aria-hidden="true"
          loading="eager"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(20px)",
            transform: "scale(1.1)",
            transition: "opacity 0.6s ease",
            opacity: loaded ? 0 : 1,
          }}
        />

        {/* Full-res image */}
        <Box
          component="img"
          src={image}
          alt={title}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.6s ease",
            opacity: loaded ? 1 : 0,
          }}
        />

        {/* Gradient fade into the dark background, desktop only */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: {
              xs: "none",
              md: `linear-gradient(90deg, ${dark} 0%, transparent 40%)`,
            },
          }}
        />
      </Box>

      {/* Lime angled accent */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 0,
          right: "28%",
          width: 90,
          height: 120,
          bgcolor: theme.palette.primary.main,
          opacity: 0.85,
          clipPath: "polygon(35% 0, 100% 0, 65% 100%, 0 100%)",
        }}
      />

      {/* Optional page-specific decorative shapes */}
      {decorations}

      <Container maxWidth="lg" sx={{ position: "relative", py: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: maxContentWidth }}>
          {eyebrow && (
            <MotionTypography
              variant="subtitle2"
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              sx={{ color: lime, fontWeight: 600, mb: 2 }}
            >
              {eyebrow}
            </MotionTypography>
          )}

          <MotionTypography
            component="h1"
            variant="h2"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {title}
          </MotionTypography>

          {highlightLine && (
            <MotionTypography
              variant="h6"
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              sx={{ color: lime, mb: 2, lineHeight: 1.4 }}
            >
              {highlightLine}
            </MotionTypography>
          )}

          {description && (
            <MotionTypography
              variant="body1"
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
              sx={{ color: "rgba(255,255,255,0.85)", mb: 4 }}
            >
              {description}
            </MotionTypography>
          )}

          {buttonText && onButtonClick && (
            <MotionBox
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="visible"
            >
              <GradientButton text={buttonText} onClick={onButtonClick} />
            </MotionBox>
          )}
          {children}
        </Box>
      </Container>
    </MotionBox>
  );
};

export default HeroSection;