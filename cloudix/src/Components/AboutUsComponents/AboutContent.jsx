// import React from "react";
// import { Box, Typography, useTheme, Container } from "@mui/material";
// import { motion } from "framer-motion";
// import SectionImage from "../SectionImage";

// const MotionBox = motion(Box);

// const AboutContent = ({ intro }) => {
//   const theme = useTheme();

//   if (!intro) return null;

//   const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//   const imageSrc = intro.image
//     ? intro.image.startsWith("http")
//       ? intro.image
//       : `${backendURL}${intro.image}`
//     : "";

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7 }}
//       viewport={{ once: true }}
//       sx={{
//         background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
//         py: { xs: 6, md: 10 },
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             gap: { xs: 5, md: 10 },
//           }}
//         >
//           {/* LEFT TEXT */}
//           <Box flex={1}>
//             <Typography
//               component="h2" // Changed to h2 for proper SEO outline
//               variant="h3"
//               sx={{
//                 mb: { xs: 2, md: 3 },
//                 lineHeight: 1.2,
//                 color: theme.palette.primary.dark,
//                 letterSpacing: "-0.4px",
//                 fontWeight: 700,
//               }}
//             >
//               {intro.title}
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 mb: { xs: 2, md: 3 },
//                 lineHeight: 1.7,
//                 maxWidth: "520px",
//                 textAlign: "justify",
//                 mx: { xs: "auto", md: 0 },
//                 color: "text.primary",
//               }}
//             >
//               {intro.description}
//             </Typography>

//             {intro.highlight && (
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 600,
//                   color: theme.palette.primary.main,
//                   mt: { xs: 1, md: 2 },
//                 }}
//               >
//                 {intro.highlight}
//               </Typography>
//             )}
//           </Box>

//           {/* RIGHT IMAGE */}
//           <SectionImage
//             src={imageSrc}
//             alt={intro.title || "About Cloudix Soft"}
//             accentColor={theme.palette.primary.dark}
//             direction="right"
//             delay={0.5}
//           />
//         </Box>
//       </Container>
//     </MotionBox>
//   );
// };

// export default AboutContent;


import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const AboutContent = ({ intro }) => {
  const theme = useTheme();

  if (!intro) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";

  const imageSrc = intro.image
    ? intro.image.startsWith("http")
      ? intro.image
      : `${backendURL}${intro.image}`
    : "";

  const features = [
    {
      icon: <ShieldRoundedIcon />,
      title: "Secure & Reliable",
      text: "Your data and business are always protected.",
    },
    {
      icon: <GroupsRoundedIcon />,
      title: "Client Focused",
      text: "We listen, understand and deliver.",
    },
    {
      icon: <AutoAwesomeRoundedIcon />,
      title: "Modern Technology",
      text: "Built for performance and future growth.",
    },
    {
      icon: <HandshakeRoundedIcon />,
      title: "Long-Term Partner",
      text: "Your success is our success.",
    },
  ];

  return (
    <MotionBox
      id="about-content"
      component="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: { xs: 6, md: 9 },
            alignItems: "center",
          }}
        >
          {/* TEXT */}
          <Box>
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              Our Foundation
            </Typography>

            <Typography
              component="h2"
              variant="h3"
              sx={{
                color: theme.palette.primary.dark,
                fontWeight: 800,
                lineHeight: 1.15,
                mb: 2,
              }}
            >
              {intro.title}
            </Typography>

            <Box
              sx={{
                width: 55,
                height: 4,
                borderRadius: 3,
                backgroundColor: theme.palette.secondary.main,
                mb: 3,
              }}
            />

            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                maxWidth: 570,
                mb: 4,
              }}
            >
              {intro.description}
            </Typography>

            {intro.highlight && (
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                {intro.highlight}
              </Typography>
            )}

            {/* Feature grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              {features.map((item, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start",
                    p: 1.5,
                    borderLeft: `2px solid ${theme.palette.accent.light}`,
                  }}
                >
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      display: "flex",
                      "& svg": {
                        fontSize: 25,
                      },
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.dark,
                        fontSize: "0.9rem",
                        mb: 0.3,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: "0.78rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </MotionBox>
              ))}
            </Box>
          </Box>

          {/* IMAGE */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 180,
                height: 70,
                right: -20,
                top: -25,
                backgroundColor: "#D4E157",
                opacity: 0.35,
                transform: "skewX(-25deg)",
                zIndex: 0,
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                width: "100%",
              }}
            >
              <SectionImage
                src={imageSrc}
                alt={intro.title || "About Cloudix Soft"}
                accentColor={theme.palette.primary.main}
                direction="right"
                delay={0.3}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default AboutContent;