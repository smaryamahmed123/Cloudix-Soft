import React, { useRef } from "react";
import { Box, Typography, useTheme,  } from "@mui/material";
import { motion as Motion, useInView } from "framer-motion";
import SectionImage from "../SectionImage";

const Section = ({ title, description, image, imageAlt, reverse = false }) => {
  const theme = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
          alignItems: "center",
          // gap: { xs: 4, md: 8 },
          gap: { xs: theme.spacing(5), md: theme.spacing(10) },
          maxWidth: 1100,
          mx: "auto",
          mb: { xs: 9, md: 12 },
          px: { xs: 3, md: 6 },
        }}
      >
        {/* Text */}
        <Box sx={{ flex: 1, maxWidth: { md: 520 } }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: theme.typography.h3.fontWeight, lineHeight: 1.15, color: theme.palette.accent.light, mb: 2.5 }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: { xs: "1rem", md: "1.3rem" }, lineHeight: 1.7, color: theme.palette.common.white }}>
            {description}
          </Typography>
        </Box>

        {/* Image */}
        <SectionImage
          src={image}
          alt={imageAlt}
        />
      </Box>
    </Motion.div>
  );
};

const VisionMission = ({ vision, mission }) => {
  if (!vision || !mission) return null;

  return (
    <Box sx={{ bgcolor: "#0a0f1a", color: "#fff", py: { xs: 10, md: 14 }, overflow: "hidden" }}>
      <Section
        title={vision.title}
        description={vision.description}
        image={vision.image}
        imageAlt={vision.title}
      />

      {/* Divider */}
      <Box sx={{ maxWidth: 1100, mx: "auto", px: 6, mb: { xs: 9, md: 12 } }}>
        <Box sx={{ height: "0.5px", bgcolor: "rgba(255,255,255,0.07)" }} />
      </Box>

      <Section
        title={mission.title}
        description={mission.description}
        image={mission.image}
        imageAlt={mission.title}
        reverse
      />
    </Box>
  );
};

export default VisionMission;
