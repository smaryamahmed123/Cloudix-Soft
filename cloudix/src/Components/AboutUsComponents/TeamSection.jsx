import React from "react";
import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionImg = motion("img");

const TeamSection = ({ teamIntro }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
          gap: { xs: theme.spacing(5), md: theme.spacing(10) },
        }}
      >
       
        {/* RIGHT: IMAGE */}
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
    overflow: "visible", // changed from "hidden" to show corner borders
    borderRadius: theme.shape.borderRadius,

    // Top-left corner border
    "&::before": {
      content: '""',
      position: "absolute",
      top: -10,
      left: -10,
      width: 60,
      height: 60,
      borderTop: "3px solid",
      borderLeft: "3px solid",
      borderColor: "primary.main",
      borderTopLeftRadius: "12px",
      zIndex: 1,
      pointerEvents: "none",
    },

    // Bottom-right corner border
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: -10,
      right: -10,
      width: 60,
      height: 60,
      borderBottom: "3px solid",
      borderRight: "3px solid",
      borderColor: "primary.main",
      borderBottomRightRadius: "12px",
      zIndex: 1,
      pointerEvents: "none",
    },
  }}
>
  <MotionImg
    src={imageSrc}
    alt={teamIntro.title || "Our Team"}
    whileHover={{ scale: 1.03, boxShadow: "0 16px 50px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.4 }}
    loading="lazy"
    style={{
      width: "100%",
      maxWidth: isMobile ? "90%" : "500px",
      objectFit: "cover",
      borderRadius: theme.shape.borderRadius,
      boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
    }}
  />
</MotionBox>
               {/* LEFT: TEXT */}
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
              mb: theme.spacing(3),
              color: theme.palette.accent.light,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
            }}
          >
            {teamIntro.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.3rem" },
              mb: theme.spacing(2),
              color: theme.palette.common.white,
              lineHeight: 1.8,
              maxWidth: "600px",
              margin: { xs: "0 auto", md: "0" },
              textAlign: { xs: "center", md: "justify" },
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
