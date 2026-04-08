import React from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";

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



const VisionMission = ({ vision, mission }) => {
  if (!vision || !mission) return null;

  const visionImg = vision.image?.startsWith("http") ? vision.image : `${vision.image}`;
  const missionImg = mission.image?.startsWith("http") ? mission.image : `${mission.image}`;

  const sectionStyles = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    gap: { xs: 8, md: 14 }, // 🔥 Apple spacing
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)", // 🔥 Stripe dark
        color: "#fff",
        py: { xs: 10, md: 16 }, // 🔥 BIG spacing
      }}
    >
      {/* ---------------- Vision ---------------- */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Box sx={sectionStyles}>
          
          {/* TEXT */}
          <Box flex={1}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
                color: "#D4E157",
              }}
            >
              {vision.title}
            </Typography>

            <Typography
              sx={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                maxWidth: "520px", // 🔥 PRO readability
              }}
            >
              {vision.description}
            </Typography>
          </Box>

          {/* IMAGE */}
          <Box flex={1} display="flex" justifyContent="center">
            <Box
              component="img"
              src={visionImg}
              alt={vision.title}
              sx={{
                width: "100%",
                maxWidth: "520px",
                borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)", // 🔥 soft depth
                transition: "0.4s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            />
          </Box>
        </Box>
      </Motion.div>

      {/* ---------------- Mission ---------------- */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <Box sx={{ ...sectionStyles, mt: { xs: 12, md: 20 } }}>
          
          {/* IMAGE */}
          <Box flex={1} display="flex" justifyContent="center">
            <Box
              component="img"
              src={missionImg}
              alt={mission.title}
              sx={{
                width: "100%",
                maxWidth: "520px",
                borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
                transition: "0.4s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            />
          </Box>

          {/* TEXT */}
          <Box flex={1}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
                color: "#D4E157",
              }}
            >
              {mission.title}
            </Typography>

            <Typography
              sx={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              {mission.description}
            </Typography>
          </Box>

        </Box>
      </Motion.div>
    </Box>
  );
};
export default VisionMission;
