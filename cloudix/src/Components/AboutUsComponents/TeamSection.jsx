// import React from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { motion } from "framer-motion";

// const MotionBox = motion(Box);

// const TeamSection = ({ teamIntro }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   if (!teamIntro) return null;

//   const imageSrc = teamIntro.image?.startsWith("http")
//     ? teamIntro.image
//     : `${teamIntro.image || ""}`;

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//       sx={{
//         backgroundColor: theme.palette.primary.dark,
//         color: theme.palette.common.white,
//         py: { xs: theme.spacing(2), md: theme.spacing(6) },
//         overflowX: "hidden",
//       }}
//     >
//       <Container
//         maxWidth="lg"
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column-reverse", md: "row" }, // 👈 SAME AS ABOUT
//           alignItems: "center",
//           gap: { xs: theme.spacing(5), md: theme.spacing(10) },
//         }}
//       >
        
//         {/* LEFT: TEXT */}
//         <MotionBox
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           viewport={{ once: true }}
//           sx={{
//             flex: 1,
//             maxWidth: { xs: "100%", md: "50%" },
//             textAlign: { xs: "center", md: "left" },
//           }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: theme.typography.h3.fontWeight,
//               mb: theme.spacing(3),
//               color: theme.palette.accent.light,
//               fontSize: { xs: "1.8rem", md: "2.5rem" },
//             }}
//           >
//             {teamIntro.title}
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: { xs: "1rem", md: "1.3rem" },
//               mb: theme.spacing(2),
//               color: theme.palette.common.white,
//               lineHeight: 1.8,
//               textAlign: "justify",
//             }}
//           >
//             {teamIntro.description}
//           </Typography>
//         </MotionBox>

//         {/* RIGHT: IMAGE */}
//         <MotionBox
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.5 }}
//           viewport={{ once: true }}
//           sx={{
//             flex: 1,
//             maxWidth: { xs: "100%", md: "50%" },
//             display: "flex",
//             justifyContent: "center",
//             position: "relative",
//             overflow: "hidden",
//             "&::before, &::after": {
//               content: '""',
//               position: "absolute",
//               width: "50%",
//               height: "100%",
//               border: `5px solid ${theme.palette.accent.light}`,
//             },
//             "&::before": {
//               top: 0,
//               left: 0,
//               borderRight: "none",
//               borderBottom: "none",
//             },
//             "&::after": {
//               bottom: 0,
//               right: 0,
//               borderLeft: "none",
//               borderTop: "none",
//             },
//           }}
//         >
//           <Box
//             component="img"
//             src={imageSrc}
//             alt={teamIntro.title || "Our Team"}
//             loading="lazy"
//             sx={{
//               width: "100%",
//               maxHeight: isMobile ? "300px" : "100%",
//               objectFit: "cover",
//               borderRadius: theme.shape.borderRadius,
//               boxShadow: theme.shadows[6],
//             }}
//           />
//         </MotionBox>
//       </Container>
//     </MotionBox>
//   );
// };

// export default TeamSection;



import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const VisionMission = ({ vision, mission }) => {
  const theme = useTheme();

  if (!vision || !mission) return null;

  const visionImg = vision.image?.startsWith("http")
    ? vision.image
    : `${vision.image || ""}`;

  const missionImg = mission.image?.startsWith("http")
    ? mission.image
    : `${mission.image || ""}`;

  const sectionStyles = {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    gap: { xs: theme.spacing(5), md: theme.spacing(10) },
  };

  const textBoxStyles = {
    flex: 1,
    maxWidth: { xs: "100%", md: "500px" },
    textAlign: { xs: "center", md: "left" },
  };

  const imageBoxStyles = {
    flex: 1,
    maxWidth: { xs: "100%", md: "50%" },
    position: "relative",
    overflow: "hidden",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      width: "50%",
      height: "100%",
      border: `4px solid ${theme.palette.accent.light}`,
    },
    "&::before": {
      top: 0,
      left: 0,
      borderRight: "none",
      borderBottom: "none",
    },
    "&::after": {
      bottom: 0,
      right: 0,
      borderLeft: "none",
      borderTop: "none",
    },
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        py: { xs: theme.spacing(6), md: theme.spacing(10) },
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">

        {/* 🔹 VISION */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          sx={{ mb: theme.spacing(10) }}
        >
          <Box sx={sectionStyles}>
            
            {/* TEXT */}
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              sx={textBoxStyles}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: theme.typography.h3.fontWeight,
                  color: theme.palette.accent.light,
                  mb: theme.spacing(3),
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                {vision.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: theme.palette.common.white,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  textAlign: "justify",
                }}
              >
                {vision.description}
              </Typography>
            </MotionBox>

            {/* IMAGE */}
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              sx={imageBoxStyles}
            >
              <Box
                component="img"
                src={visionImg}
                alt={vision.title || "Vision"}
                loading="lazy"
                sx={{
                  width: "100%",
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[6],
                }}
              />
            </MotionBox>
          </Box>
        </MotionBox>

        {/* 🔹 MISSION */}
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              ...sectionStyles,
              flexDirection: { xs: "column-reverse", md: "row" }, // 👈 reverse
            }}
          >
            
            {/* IMAGE */}
            <MotionBox
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              sx={imageBoxStyles}
            >
              <Box
                component="img"
                src={missionImg}
                alt={mission.title || "Mission"}
                loading="lazy"
                sx={{
                  width: "100%",
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[6],
                }}
              />
            </MotionBox>

            {/* TEXT */}
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              sx={textBoxStyles}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: theme.typography.h3.fontWeight,
                  color: theme.palette.accent.light,
                  mb: theme.spacing(3),
                  fontSize: { xs: "1.8rem", md: "2.5rem" },
                }}
              >
                {mission.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  color: theme.palette.common.white,
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  textAlign: "justify",
                }}
              >
                {mission.description}
              </Typography>
            </MotionBox>

          </Box>
        </MotionBox>

      </Container>
    </Box>
  );
};

export default VisionMission;
