// import React from "react";
// import { Box, Typography, Container, useTheme } from "@mui/material";
// import { motion } from "framer-motion";
// import SectionImage from "../SectionImage";

// const MotionBox = motion(Box);

// const CommitmentSection = ({ compliance }) => {
//   const theme = useTheme();

//   if (!compliance) return null;

//   const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//   const imageSrc = compliance.image
//     ? compliance.image.startsWith("http")
//       ? compliance.image
//       : `${backendURL}${compliance.image}`
//     : ShariahImage;

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: true }}
//       sx={{
//         py: { xs: 6, md: 10 },
//         backgroundColor: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//         overflowX: "hidden",
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* Paragraph + Image Row */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             alignItems: "center",
//             justifyContent: "center",
//             gap: { xs: 5, md: 10 },
//             width: "100%",
//           }}
//         >
//           {/* Left: Paragraph */}
//           <MotionBox
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.5 }}
//             viewport={{ once: true }}
//             sx={{
//               flex: 1,
//               maxWidth: { xs: "100%", md: "50%" },
//             }}
//           >
//             <Typography
//               variant="h3"
//               sx={{
//                 fontWeight: theme.typography.h3.fontWeight,
//                 lineHeight: 1.3,
//                 textDecoration: "underline",
//                 color: theme.palette.text.primary,
//                 // ✅ theme responsiveFontSizes handles size automatically
//               }}
//             >
//               {compliance.title}
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 lineHeight: 1.8,
//                 color: theme.palette.text.primary,
//                 mb: 4,
//                 textAlign: "justify",
//                 textJustify: "inter-word",
//                 // ✅ theme responsiveFontSizes handles size automatically
//               }}
//             >
//               {compliance.description}
//             </Typography>
//           </MotionBox>

//           {/* Right: Image */}
//           <SectionImage
//             src={imageSrc}
//             alt={compliance.title || "Shariah Compliance Image"}
//             accentColor={theme.palette.primary.dark}
//             direction="right"
//             delay={0.5}
//           />
//         </Box>
//       </Container>
//     </MotionBox>
//   );
// };

// export default CommitmentSection;



import React from "react";
import {
  Box,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const CommitmentSection = ({ compliance }) => {
  const theme = useTheme();

  if (!compliance) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";

  const imageSrc = compliance.image
    ? compliance.image.startsWith("http")
      ? compliance.image
      : `${backendURL}${compliance.image}`
    : "";

  const values = [
    {
      icon: <VerifiedRoundedIcon />,
      title: "Integrity",
      text: "Do what's right.",
    },
    {
      icon: <WorkspacePremiumRoundedIcon />,
      title: "Excellence",
      text: "Always improve.",
    },
    {
      icon: <LightbulbRoundedIcon />,
      title: "Innovation",
      text: "Think ahead.",
    },
    {
      icon: <FavoriteRoundedIcon />,
      title: "Respect",
      text: "Value people.",
    },
  ];

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fff",
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
              Our Values
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
              {compliance.title || "Values Driven"}
            </Typography>

            <Box
              sx={{
                width: 55,
                height: 4,
                borderRadius: 4,
                backgroundColor:
                  theme.palette.secondary.main,
                mb: 3,
              }}
            />

            <Typography
              sx={{
                color: theme.palette.text.primary,
                lineHeight: 1.8,
                maxWidth: 570,
                mb: 5,
              }}
            >
              {compliance.description}
            </Typography>

            {/* Values */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr 1fr",
                  sm: "repeat(4, 1fr)",
                },
                gap: 1,
              }}
            >
              {values.map((value, index) => (
                <MotionBox
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  sx={{
                    textAlign: "center",
                    px: 1,
                    py: 1.5,
                    borderRight: {
                      sm:
                        index !== values.length - 1
                          ? "1px solid #e5e8eb"
                          : "none",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: theme.palette.primary.main,
                      mb: 1,
                      "& svg": {
                        fontSize: 27,
                      },
                    }}
                  >
                    {value.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.dark,
                      fontSize: "0.82rem",
                    }}
                  >
                    {value.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: "0.7rem",
                      mt: 0.5,
                    }}
                  >
                    {value.text}
                  </Typography>
                </MotionBox>
              ))}
            </Box>
          </Box>

          {/* IMAGE */}
          <Box
            sx={{
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 150,
                height: 65,
                right: -25,
                top: -20,
                backgroundColor: "#A9B838",
                opacity: 0.25,
                transform: "skewX(-25deg)",
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <SectionImage
                src={imageSrc}
                alt={
                  compliance.title ||
                  "Cloudix Soft values"
                }
                accentColor={
                  theme.palette.primary.dark
                }
                direction="right"
                delay={0.3}
              />
            </Box>

            {/* Compliance badge */}
            <Box
              sx={{
                position: "absolute",
                zIndex: 2,
                right: { xs: 0, md: -20 },
                bottom: { xs: 15, md: 25 },
                backgroundColor:
                  theme.palette.primary.main,
                color: "#fff",
                px: 2.5,
                py: 1.5,
                borderRadius: "8px",
                boxShadow:
                  "0 12px 30px rgba(0,0,0,0.18)",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                Shariah-Compliant
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.65rem",
                  opacity: 0.85,
                }}
              >
                IT Company
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default CommitmentSection;