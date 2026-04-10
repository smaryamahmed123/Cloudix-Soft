import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion, useInView } from "framer-motion";
import SectionImage from "../SectionImage";

const Section = ({ eyebrow, title, description, image, imageAlt, reverse = false }) => {
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
          gap: { xs: 4, md: 8 },
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
            sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 500, lineHeight: 1.15, color: "#fff", mb: 2.5 }}
          >
            {title}
          </Typography>
          <Typography sx={{ fontSize: 16, lineHeight: 1.75, color: "#8a9ab0" }}>
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
        eyebrow="Our vision"
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
        eyebrow="Our mission"
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
