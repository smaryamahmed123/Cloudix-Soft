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
            overflow: "hidden",
            borderRadius: theme.shape.borderRadius,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)", // subtle floating effect
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
