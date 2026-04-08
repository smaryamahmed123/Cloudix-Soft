import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Container } from "@mui/material";
import { motion } from "framer-motion";
import AboutImage from "../../assets/about-team.png";

const MotionBox = motion(Box);
const MotionImg = motion("img");
const AboutContent = ({ intro }) => {
  const theme = useTheme();

  if (!intro) return null;
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        // backgroundColor: theme.palette.background.subtle, // 🔥 Stripe section feel
        background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
        py: { xs: 10, md: 16 }, // 🔥 Apple spacing
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 8, md: 14 }, // 🔥 IMPORTANT
          }}
        >

          {/* LEFT */}
          <Box flex={1}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
              }}
            >
              {intro.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                lineHeight: 1.7,
                maxWidth: "520px", // 🔥 PRO MOVE
              }}
            >
              {intro.description}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              {intro.highlight}
            </Typography>
          </Box>

          {/* RIGHT */}
       <MotionBox
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, delay: 0.7 }}
  viewport={{ once: true }}
  sx={{
    flex: 1,
    maxWidth: { xs: "100%", md: "50%" },
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    padding: "4px", // border thickness
    background: theme.palette.text.primary,
    // Use clip-path to show only top-left and bottom-right borders
    clipPath:
      "polygon(0% 0%, 50% 0%, 50% 4px, 4px 4px, 4px 50%, 0% 50%, 0% 0%, 100% 100%, 100% 50%, 96% 50%, 96% 96%, 50% 96%, 50% 100%, 100% 100%)",
  }}
>
  <MotionImg
    src={imageSrc}
    alt={intro.title}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.4 }}
    loading="lazy"
    style={{
      width: "100%",
      maxHeight: isMobile ? "300px" : "100%",
      objectFit: "cover",
      borderRadius: theme.shape.borderRadius,
      display: "block",
    }}
  />
</MotionBox>
        </Box>
      </Container>
    </MotionBox>
  );
};
export default AboutContent;
