// import React from "react";
// import { Box, Typography, Container, useTheme } from "@mui/material";
// import { motion } from "framer-motion";
// import SectionImage from "../SectionImage";

// const MotionBox = motion(Box);

// const TeamSection = ({ teamIntro }) => {
//   const theme = useTheme();

//   if (!teamIntro) return null;

//   const imageSrc = teamIntro.image?.startsWith("http")
//     ? teamIntro.image
//     : `${teamIntro.image || ""}`;

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: true }}
//       sx={{
//         backgroundColor: theme.palette.primary.dark,
//         color: theme.palette.common.white,
//         py: { xs: theme.custom.sectionSpacing.xs, md: theme.custom.sectionSpacing.md },
//         overflowX: "hidden",
//       }}
//     >
//       <Container
//         maxWidth="lg"
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column-reverse", md: "row" },
//           alignItems: "center",
//           py: { xs: 6, md: 10 },
//           gap: { xs: 5, md: 10 },
//         }}
//       >
//         {/* LEFT: IMAGE */}
//         <SectionImage
//           src={imageSrc}
//           alt={teamIntro.title || "Team Image"}
//           accentColor={theme.palette.primary.light}
//           direction="right"
//           delay={0.5}
//         />

//         {/* RIGHT: TEXT */}
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
//               mb: 3,
//               color: theme.palette.accent.light,
//               // ✅ theme responsiveFontSizes handles size automatically
//             }}
//           >
//             {teamIntro.title}
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               mb: 2,
//               color: theme.palette.common.white,
//               lineHeight: 1.8,
//               maxWidth: "600px",
//               mx: { xs: "auto", md: 0 },
//               textAlign: "justify",
//               // ✅ theme responsiveFontSizes handles size automatically
//             }}
//           >
//             {teamIntro.description}
//           </Typography>
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
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const TeamSection = ({ teamIntro }) => {
  const theme = useTheme();

  if (!teamIntro) return null;

  const imageSrc = teamIntro.image?.startsWith("http")
    ? teamIntro.image
    : teamIntro.image || "";

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        position: "relative",
        background:
          "linear-gradient(135deg, #0B1725 0%, #111E2C 100%)",
        color: "#fff",
        py: { xs: 8, md: 11 },
        overflow: "hidden",
      }}
    >
      {/* Decorative shapes */}
      <Box
        sx={{
          position: "absolute",
          left: -80,
          bottom: -50,
          width: 200,
          height: 100,
          backgroundColor: theme.palette.primary.main,
          opacity: 0.6,
          transform: "skewX(-25deg)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: -60,
          top: 30,
          width: 160,
          height: 70,
          backgroundColor: theme.palette.secondary.main,
          opacity: 0.35,
          transform: "skewX(-25deg)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "0.9fr 1.1fr",
            },
            gap: { xs: 5, md: 9 },
            alignItems: "center",
          }}
        >
          {/* TEXT */}
          <MotionBox
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
            }}
          >
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
              Our Team
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              {teamIntro.title}
            </Typography>

            <Box
              sx={{
                width: 55,
                height: 4,
                borderRadius: 3,
                backgroundColor:
                  theme.palette.secondary.main,
                mb: 3,
              }}
            />

            <Typography
              sx={{
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.8,
                maxWidth: 530,
                mb: 4,
              }}
            >
              {teamIntro.description}
            </Typography>

            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              href="#meet-team"
              sx={{
                backgroundColor:
                  theme.palette.accent.light,
                color: theme.palette.primary.dark,
                borderRadius: "8px",
                px: 3,
                py: 1.3,
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  backgroundColor:
                    theme.palette.secondary.main,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Meet Our Team
            </Button>
          </MotionBox>

          {/* IMAGE */}
          <MotionBox
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            viewport={{
              once: true,
            }}
            sx={{
              position: "relative",
            }}
          >
            <SectionImage
              src={imageSrc}
              alt={teamIntro.title || "Cloudix Soft Team"}
              accentColor={
                theme.palette.accent.light
              }
              direction="right"
              delay={0.2}
            />
          </MotionBox>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default TeamSection;