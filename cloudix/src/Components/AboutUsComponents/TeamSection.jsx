// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import { motion as Motion } from "framer-motion";

// const TeamSection = ({ teamIntro }) => {
//   if (!teamIntro) return null;

//   const imageSrc = teamIntro.image?.startsWith("http")
//     ? teamIntro.image
//     : `${teamIntro.image || ""}`;

//   return (
//     <Box
//       component="section"
//       sx={{
//         backgroundColor: "#111E2C",
//         color: "#fff",
//         py: { xs: 8, md: 12 },
//         px: { xs: 3, md: 8 },
//         overflowX: "hidden", // prevent horizontal scroll
//       }}
//     >
//       <Grid
//         container
//         spacing={6}
//         justifyContent="center"
//         alignItems="flex-start"
//       >
//         <Grid item xs={12} md={10}>
//           <Motion.div
//             initial={{ opacity: 0, y: 60 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             viewport={{ once: true }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column-reverse", md: "row" },
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: 6,
//                 width: "100%",
//               }}
//             >
//               {/* ---- Left: Text ---- */}
//               <Motion.div
//                 initial={{ opacity: 0, x: -40 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 viewport={{ once: true }}
//                 style={{ flex: 1, maxWidth: 600 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: { xs: "center", md: "flex-start" },
//                     textAlign: { xs: "center", md: "left" },
//                   }}
//                 >
//                   <Typography
//                     variant="h3"
//                     sx={{
//                       fontWeight: 800,
//                       lineHeight: 1.3,
//                       color: "#A9B838",
//                       mb: 4,
//                       fontSize: { xs: "2rem", md: "2.8rem" },
//                     }}
//                   >
//                     {teamIntro.title}
//                   </Typography>

//                   <Typography
//                     variant="body1"
//                     sx={{
//                       fontSize: { xs: "1rem", md: "1.3rem" },
//                       mb: 6,
//                       color: "#d0d0d0",
//                       lineHeight: 1.8,
//                     }}
//                   >
//                     {teamIntro.description}
//                   </Typography>
//                 </Box>
//               </Motion.div>

//               {/* ---- Right: Image ---- */}
//               <Motion.div
//                 initial={{ opacity: 0, x: 40 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.4 }}
//                 viewport={{ once: true }}
//                 style={{ flex: 1, maxWidth: "600px" }}
//               >
//                 <Box
//                   sx={{
//                     position: "relative",
//                     display: "inline-block",
//                     overflow: "hidden",
//                     width: "100%",
//                     "&::before, &::after": {
//                       content: '""',
//                       position: "absolute",
//                       width: "50%",
//                       height: "50%",
//                       border: "5px solid #A9B838",
//                     },
//                     "&::before": {
//                       top: 0,
//                       left: 0,
//                       borderRight: "none",
//                       borderBottom: "none",
//                     },
//                     "&::after": {
//                       bottom: 0,
//                       right: 0,
//                       borderLeft: "none",
//                       borderTop: "none",
//                     },
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={imageSrc}
//                     alt={teamIntro.title || "Our Team"}
//                     loading="lazy"
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       display: "block",
//                       borderRadius: "8px",
//                       boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
//                     }}
//                   />
//                 </Box>
//               </Motion.div>
//             </Box>
//           </Motion.div>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default TeamSection;



import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

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
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        py: { xs: theme.spacing(6), md: theme.spacing(10) },
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" }, // 👈 SAME AS ABOUT
          alignItems: "center",
          gap: { xs: theme.spacing(5), md: theme.spacing(10) },
        }}
      >
        
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
              textAlign: "justify",
            }}
          >
            {teamIntro.description}
          </Typography>
        </MotionBox>

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
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: "50%",
              height: "100%",
              border: `5px solid ${theme.palette.accent.light}`,
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
          }}
        >
          <Box
            component="img"
            src={imageSrc}
            alt={teamIntro.title || "Our Team"}
            loading="lazy"
            sx={{
              width: "100%",
              maxHeight: isMobile ? "300px" : "100%",
              objectFit: "cover",
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[6],
            }}
          />
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default TeamSection;
