// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { motion as Motion } from "framer-motion";

// const VisionMission = ({ vision, mission }) => {
//   if (!vision || !mission) return null;

//   const visionImg = vision.image?.startsWith("http") ? vision.image : `${vision.image}`;
//   const missionImg = mission.image?.startsWith("http") ? mission.image : `${mission.image}`;

//   const sectionStyles = {
//     display: "flex",
//     flexDirection: { xs: "column", md: "row" },
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 4,
//     mb: 8,
//     px: { xs: 3, md: 8 },
//     overflowX: "hidden",
//   };

//   const textBoxStyles = {
//     flex: 1,
//     maxWidth: "600px",
//     textAlign: { xs: "center", md: "left" },
//   };

//   const imageBoxStyles = {
//     flex: 1,
//     maxWidth: "100%",
//     position: "relative",
//     display: "inline-block",
//     overflow: "hidden",
//     "&::before, &::after": {
//       content: '""',
//       position: "absolute",
//       width: "50%",
//       height: "50%",
//       border: "4px solid #A9B838",
//     },
//     "&::before": { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
//     "&::after": { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
//   };

//   const imageStyles = {
//     width: "100%",
//     height: "auto",
//     display: "block",
//     borderRadius: "8px",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
//   };

//   return (
//     <Box sx={{ bgcolor: "#111E2C", color: "#fff", py: 8, px: { xs: 2, md: 8 }, mx: "auto", overflowX: "hidden" }}>
      
//       {/* ---------------- Vision Section ---------------- */}
//       <Motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Box sx={sectionStyles}>
//           {/* Text Left */}
//           <Motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             style={textBoxStyles}
//           >
//             <Typography variant="h3" sx={{ fontWeight: "bold", color: "#A9B838", mb: 2 }}>
//               {vision.title}
//             </Typography>
//             <Typography sx={{ lineHeight: 1.8, color: "#d1d5db", fontSize: "1.1rem", textAlign: "justify" }}>
//               {vision.description}
//             </Typography>
//           </Motion.div>

//           {/* Image Right */}
//           <Motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             viewport={{ once: true }}
//             style={imageBoxStyles}
//           >
//             <Box component="img" src={visionImg} alt={vision.title || "Vision"} sx={imageStyles} loading="lazy" />
//           </Motion.div>
//         </Box>
//       </Motion.div>

//       {/* ---------------- Mission Section ---------------- */}
//       <Motion.div
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         viewport={{ once: true }}
//       >
//         <Box sx={sectionStyles}>
//           {/* Image Left */}
//           <Motion.div
//             initial={{ opacity: 0, x: -40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             viewport={{ once: true }}
//             style={imageBoxStyles}
//           >
//             <Box component="img" src={missionImg} alt={mission.title || "Mission"} sx={imageStyles} loading="lazy" />
//           </Motion.div>

//           {/* Text Right */}
//           <Motion.div
//             initial={{ opacity: 0, x: 40 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             style={textBoxStyles}
//           >
//             <Typography variant="h3" sx={{ fontWeight: "bold", color: "#A9B838", mb: 2 }}>
//               {mission.title}
//             </Typography>
//             <Typography sx={{ lineHeight: 1.8, color: "#d1d5db", fontSize: "1.1rem", textAlign: "justify" }}>
//               {mission.description}
//             </Typography>
//           </Motion.div>
//         </Box>
//       </Motion.div>
//     </Box>
//   );
// };


// export default VisionMission;









import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion, useInView } from "framer-motion";

const CornerAccents = () => (
  <>
    {[
      { top: 12, left: 12, borderTop: "1.5px solid #A9B838", borderLeft: "1.5px solid #A9B838", borderRadius: "4px 0 0 0" },
      { bottom: 12, right: 12, borderBottom: "1.5px solid #A9B838", borderRight: "1.5px solid #A9B838", borderRadius: "0 0 4px 0" },
    ].map((style, i) => (
      <Box key={i} sx={{ position: "absolute", width: 28, height: 28, zIndex: 3, ...style }} />
    ))}
  </>
);

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
            sx={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#A9B838",
              mb: 2,
            }}
          >
            {eyebrow}
          </Typography>
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
        <Box
          sx={{
            flex: 1,
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              border: "0.5px solid rgba(169,184,56,0.25)",
              pointerEvents: "none",
              zIndex: 2,
            },
          }}
        >
          <CornerAccents />
          <Box
            component="img"
            src={image}
            alt={imageAlt}
            loading="lazy"
            sx={{ width: "100%", height: "auto", display: "block" }}
          />
        </Box>
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
