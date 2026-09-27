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


// import React, { useRef } from "react";
// import { Box, Typography, useTheme } from "@mui/material";
// import { motion as Motion, useInView } from "framer-motion";
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
// import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";

// // Diagonal green accent stripes clipped to the image corners
// const AccentStripes = () => (
//   <>
//     <Box
//       sx={{
//         position: "absolute",
//         top: -14,
//         left: -14,
//         width: 40,
//         height: 70,
//         background: "linear-gradient(135deg, #8fd13f 0%, #2f6d1f 100%)",
//         transform: "rotate(20deg)",
//         zIndex: 0,
//       }}
//     />
//     <Box
//       sx={{
//         position: "absolute",
//         bottom: -16,
//         right: -10,
//         width: 46,
//         height: 90,
//         background: "linear-gradient(135deg, #8fd13f 0%, #2f6d1f 100%)",
//         transform: "rotate(20deg)",
//         zIndex: 0,
//       }}
//     />
//   </>
// );

// const Panel = ({ icon, eyebrow, title, description, image, imageAlt }) => {
//   const theme = useTheme();
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <Motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 24 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
//       style={{ flex: 1, minWidth: 0 }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: { xs: 3, md: 4 },
//           flexDirection: { xs: "column", sm: "row" },
//         }}
//       >
//         {/* Bordered text card */}
//         <Box
//           sx={{
//             flex: "1 1 260px",
//             minWidth: 0,
//             border: "1px solid rgba(255,255,255,0.1)",
//             borderRadius: 2,
//             bgcolor: "rgba(255,255,255,0.02)",
//             p: { xs: 3, md: 3.5 },
//             alignSelf: "stretch",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <Box sx={{ color: theme.palette.accent.light, mb: 1.5, fontSize: 28, display: "flex" }}>
//             {icon}
//           </Box>

//           <Typography
//             variant="overline"
//             sx={{
//               color: theme.palette.accent.light,
//               letterSpacing: 1.5,
//               fontWeight: 700,
//               mb: 1,
//               display: "block",
//             }}
//           >
//             {eyebrow}
//           </Typography>

//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: 700,
//               lineHeight: 1.2,
//               color: theme.palette.common.white,
//               mb: 1.5,
//             }}
//           >
//             {title}
//           </Typography>

//           <Typography
//             variant="body2"
//             sx={{
//               lineHeight: 1.7,
//               color: "rgba(255,255,255,0.65)",
//             }}
//           >
//             {description}
//           </Typography>
//         </Box>

//         {/* Image with accent stripes */}
//         <Box
//           sx={{
//             position: "relative",
//             flex: "0 0 auto",
//             width: { xs: "100%", sm: 170, md: 190 },
//             height: { xs: 220, sm: 190, md: 210 },
//           }}
//         >
//           <AccentStripes />
//           <Box
//             component="img"
//             src={image}
//             alt={imageAlt}
//             sx={{
//               position: "relative",
//               zIndex: 1,
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: 2,
//               display: "block",
//             }}
//           />
//         </Box>
//       </Box>
//     </Motion.div>
//   );
// };

// const VisionMission = ({ vision, mission }) => {
//   if (!vision || !mission) return null;

//   return (
//     <Box
//       sx={{
//         bgcolor: "#0a0f1a",
//         color: "#fff",
//         py: { xs: 8, md: 10 },
//         px: { xs: 2, md: 5 },
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//           display: "flex",
//           flexDirection: { xs: "column", lg: "row" },
//           gap: { xs: 6, lg: 5 },
//         }}
//       >
//         <Panel
//           icon={<VisibilityOutlinedIcon fontSize="inherit" />}
//           eyebrow="OUR VISION"
//           title={vision.title}
//           description={vision.description}
//           image={vision.image}
//           imageAlt={vision.title}
//         />
//         <Panel
//           icon={<GpsFixedOutlinedIcon fontSize="inherit" />}
//           eyebrow="OUR MISSION"
//           title={mission.title}
//           description={mission.description}
//           image={mission.image}
//           imageAlt={mission.title}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default VisionMission;