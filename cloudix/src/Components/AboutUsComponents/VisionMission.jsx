// import React, { useRef } from "react";
// import { Box, Typography, useTheme } from "@mui/material";
// import { motion as Motion, useInView } from "framer-motion";
// import SectionImage from "../SectionImage";

// const Section = ({ title, description, image, imageAlt, reverse = false }) => {
//   const theme = useTheme();
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <Motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 32 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
//           alignItems: "center",
//           gap: { xs: 5, md: 10 },
//           maxWidth: 1100,
//           mx: "auto",
//           py: { xs: 6, md: 10 },
//           px: { xs: 3, md: 6 },
//         }}
//       >
//         {/* Text */}
//         <Box sx={{ flex: 1, maxWidth: { md: 520 } }}>
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: theme.typography.h3.fontWeight,
//               lineHeight: 1.15,
//               color: theme.palette.accent.light,
//               mb: 2.5,
//               // ✅ theme responsiveFontSizes handles size automatically
//             }}
//           >
//             {title}
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               lineHeight: 1.7,
//               color: theme.palette.common.white,
//               textAlign: "justify",
//               // ✅ theme responsiveFontSizes handles size automatically
//             }}
//           >
//             {description}
//           </Typography>
//         </Box>

//         {/* Image */}
//         <SectionImage src={image} alt={imageAlt} />
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
//         py: { xs: 10, md: 14 },
//         overflow: "hidden",
//       }}
//     >
//       <Section
//         title={vision.title}
//         description={vision.description}
//         image={vision.image}
//         imageAlt={vision.title}
//       />

//       {/* Divider */}
//       <Box sx={{ maxWidth: 1100, mx: "auto", px: 6, mb: { xs: 9, md: 12 } }}>
//         <Box sx={{ height: "0.5px", bgcolor: "rgba(255,255,255,0.07)" }} />
//       </Box>

//       <Section
//         title={mission.title}
//         description={mission.description}
//         image={mission.image}
//         imageAlt={mission.title}
//         reverse
//       />
//     </Box>
//   );
// };

// export default VisionMission;


import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const VisionMissionCard = ({
  item,
  icon,
  reverse = false,
}) => {
  const theme = useTheme();

  const imageSrc = item.image?.startsWith("http")
    ? item.image
    : item.image || "";

  return (
    <MotionBox
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      viewport={{
        once: true,
      }}
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 0.9fr",
        },
        gap: { xs: 4, md: 6 },
        alignItems: "center",
        p: { xs: 3, md: 5 },
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: "18px",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015))",
        overflow: "hidden",
        direction: reverse ? "rtl" : "ltr",
      }}
    >
      {/* Decorative corner */}
      <Box
        sx={{
          position: "absolute",
          width: 90,
          height: 90,
          backgroundColor: theme.palette.primary.main,
          opacity: 0.18,
          top: -40,
          right: reverse ? "auto" : -35,
          left: reverse ? -35 : "auto",
          transform: "rotate(25deg)",
        }}
      />

      {/* TEXT */}
      <Box
        sx={{
          direction: "ltr",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 45,
              height: 45,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.accent.light,
              backgroundColor: "rgba(169,184,56,0.12)",
              border:
                "1px solid rgba(169,184,56,0.3)",
            }}
          >
            {icon}
          </Box>

          <Typography
            sx={{
              color: theme.palette.accent.light,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {item.title}
          </Typography>
        </Box>

        <Typography
          component="h2"
          sx={{
            color: "#fff",
            fontWeight: 800,
            fontSize: {
              xs: "1.8rem",
              md: "2.4rem",
            },
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          {item.title}
        </Typography>

        <Box
          sx={{
            width: 50,
            height: 3,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 3,
            mb: 3,
          }}
        />

        <Typography
          sx={{
            color: "rgba(255,255,255,0.72)",
            lineHeight: 1.8,
            fontSize: "0.92rem",
            maxWidth: 560,
          }}
        >
          {item.description}
        </Typography>
      </Box>

      {/* IMAGE */}
      <Box
        sx={{
          direction: "ltr",
          position: "relative",
        }}
      >
        <SectionImage
          src={imageSrc}
          alt={item.title}
          accentColor={theme.palette.accent.light}
          direction={reverse ? "left" : "right"}
          delay={0.2}
        />
      </Box>
    </MotionBox>
  );
};

const VisionMission = ({ vision, mission }) => {
  if (!vision || !mission) return null;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, #08111D 0%, #0B1421 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background accents */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: "#769914",
          opacity: 0.04,
          top: -100,
          left: -100,
          filter: "blur(20px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          backgroundColor: "#BBBF19",
          opacity: 0.035,
          bottom: -100,
          right: -80,
          filter: "blur(20px)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              color: "#A9B838",
              fontWeight: 700,
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            What Drives Us
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#fff",
              fontWeight: 800,
              fontSize: {
                xs: "2rem",
                md: "3rem",
              },
            }}
          >
            Purpose With Direction
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <VisionMissionCard
            item={vision}
            icon={<VisibilityRoundedIcon />}
          />

          <VisionMissionCard
            item={mission}
            icon={<TrackChangesRoundedIcon />}
            reverse
          />
        </Box>
      </Container>
    </Box>
  );
};

export default VisionMission;