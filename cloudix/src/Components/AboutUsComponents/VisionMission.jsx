import React, { useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
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
          gap: { xs: 5, md: 10 },
          maxWidth: 1100,
          mx: "auto",
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 6 },
        }}
      >
        {/* Text */}
        <Box sx={{ flex: 1, maxWidth: { md: 520 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: theme.typography.h3.fontWeight,
              lineHeight: 1.15,
              color: theme.palette.accent.light,
              mb: 2.5,
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              color: theme.palette.common.white,
              textAlign: "justify",
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Image */}
        <SectionImage src={image} alt={imageAlt} />
      </Box>
    </Motion.div>
  );
};

const VisionMission = ({ vision, mission }) => {
  if (!vision || !mission) return null;

  return (
    <Box
      sx={{
        bgcolor: "#0a0f1a",
        color: "#fff",
        py: { xs: 10, md: 14 },
        overflow: "hidden",
      }}
    >
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

// import React from "react";
// import { Box, Typography, Container } from "@mui/material";
// import { motion } from "framer-motion";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
// import SectionImage from "../SectionImage";
// import { resolveImage } from "../../utils/Resolveimage";

// const MotionBox = motion(Box);

// const VisionMissionCard = ({ item, icon, tagText }) => (
//   <MotionBox
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6 }}
//     viewport={{ once: true }}
//     sx={{
//       position: "relative",
//       display: "grid",
//       gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
//       gap: { xs: 3, md: 4 },
//       alignItems: "center",
//       p: { xs: 3, md: 4 },
//       border: "1px solid rgba(255,255,255,0.12)",
//       borderRadius: "16px",
//       background: "rgba(11,20,33,0.7)",
//       overflow: "visible", // lets the image break out of the card
//     }}
//   >
//     <Box>
//       <Box sx={{ color: "#829b1b", display: "flex", mb: 1, "& svg": { fontSize: 34 } }}>{icon}</Box>
//       <Typography sx={{ color: "#829b1b", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", mb: 1 }}>
//         {tagText}
//       </Typography>
//       <Typography component="h3" sx={{ color: "#fff", fontWeight: 800, fontSize: { xs: "1.2rem", md: "1.4rem" }, lineHeight: 1.25, mb: 1.5 }}>
//         {item.title}
//       </Typography>
//       <Box sx={{ width: 40, height: 3, backgroundColor: "#829b1b", borderRadius: 2, mb: 2 }} />
//       <Typography sx={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.65, fontSize: "0.85rem" }}>
//         {item.description}
//       </Typography>
//     </Box>

//     <Box sx={{ position: "relative", mr: { md: -6 }, my: { md: -2 } }}>
//       <Box sx={{ position: "absolute", right: -14, bottom: -14, width: 70, height: 70, background: "#829b1b", transform: "skewX(-20deg)", opacity: 0.85 }} />
//       <Box sx={{ position: "relative", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}>
//         <SectionImage src={resolveImage(item.image)} alt={item.title} accentColor="#829b1b" direction="right" />
//       </Box>
//     </Box>
//   </MotionBox>
// );

// const VisionMission = ({ vision, mission }) => {
//   if (!vision || !mission) return null;
//   return (
//     <Box component="section" sx={{ py: { xs: 8, md: 10 }, background: "#07121e", position: "relative", overflow: "hidden" }}>
//       <Box sx={{ position: "absolute", left: -40, bottom: -40, width: 120, height: 120, background: "#829b1b", transform: "skewX(-20deg)", opacity: 0.8 }} />
//       <Box sx={{ position: "absolute", right: -40, top: -40, width: 120, height: 120, background: "#829b1b", transform: "skewX(-20deg)", opacity: 0.8 }} />
//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//         <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 8 } }}>
//           <VisionMissionCard item={vision} icon={<VisibilityOutlinedIcon />} tagText="OUR VISION" />
//           <VisionMissionCard item={mission} icon={<TrackChangesOutlinedIcon />} tagText="OUR MISSION" />
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default VisionMission;