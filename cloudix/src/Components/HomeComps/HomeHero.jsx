// import React, { memo } from "react";
// import { Box, Typography, useTheme } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import GradientButton from "../GradientButton";
// import BgImage from "../../assets/home-bg.webp";
// import DiagonalStrip from "./DiagonalStrip";
// import useDevice from "../../hooks/useDevice";

// function HeroSection() {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const { isMobile, isDesktop, isLandscapeMobile } = useDevice();

//   const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

//   return (
//     <Box
//       component="section"
//       sx={{
//         position: "relative",
//         height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
//         overflow: "hidden",
//       }}
//     >
//       {/* LCP Optimized Image */}
//       <Box
//         component="img"
//         src={BgImage}
//         alt="Cloudix Soft digital marketing services"
//         width="1600"
//         height="900"
//         loading="eager"
//         decoding="async"
//         fetchpriority="high"
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//         }}
//       />

//       {/* Overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: `linear-gradient(90deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.dark}D9 40%, ${theme.palette.primary.dark}66 100%)`,  // ✅ D9 = 85%, 66 = 40% opacity
//           zIndex: 0,
//         }}
//       />

//       {/* Content */}
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 2,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           height: "100%",
//           px: { xs: 2, md: 4 },
//           maxWidth: 900,
//           gap: 3,
//           alignItems: "flex-start",
//         }}
//       >
//         <Typography
//           variant="h2"
//           sx={{
//             fontSize: isLandscapeMobile
//               ? 22
//               : { sm: 30, md: 40, lg: 60, xl: 70 },
//             lineHeight: 1.5,
//             color: theme.palette.common.white,         // ✅
//             textAlign: isLandscapeMobile ? "left" : "justify",
//           }}
//         >
//           <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//             Make Your Brand Stand
//           </Box>
//           <br />
//           <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//             Out Through{" "}
//             <Box
//               component="span"
//               sx={{
//                 bgcolor: theme.palette.secondary.main,  // ✅ #BBBF19
//                 color: theme.palette.primary.dark,       // ✅ #111E2C
//                 px: 1,
//                 borderRadius: 1.5,
//                 display: "inline-block",
//                 mb: 0.5,
//                 lineHeight: 1.3,
//               }}
//             >
//               Social Media
//             </Box>
//           </Box>
//           <br />
//           <Box
//             component="span"
//             sx={{
//               bgcolor: theme.palette.secondary.main,    // ✅
//               color: theme.palette.primary.dark,         // ✅
//               px: 1,
//               borderRadius: 1.5,
//               display: "inline-block",
//               lineHeight: 1.3,
//             }}
//           >
//             Marketing
//           </Box>
//         </Typography>

//         <GradientButton
//           aria-label="Contact Cloudix Soft"
//           text="Let's Talk"
//           size={buttonSize}
//           onClick={() => navigate("/contact")}
//         />
//       </Box>

//       {/* Decorative strips – desktop only */}
//       {!isMobile && !isLandscapeMobile && (
//         <>
//           <DiagonalStrip
//             texts={["Development", "Branding", "E-Commerce", "Animation"]}
//             bgColor={theme.palette.accent.main}         // ✅ #D4E157
//             borderColor={theme.palette.primary.dark}    // ✅ #111E2C
//             angle={40}
//             position="90%"
//           />
//           <DiagonalStrip
//             texts={["UI/UX", "Marketing", "Motion", "Branding"]}
//             bgColor={theme.palette.primary.dark}        // ✅ #111E2C
//             borderColor="#d9d9d9"
//             textColor={theme.palette.common.white}      // ✅
//             angle={-10}
//             position="30%"
//           />
//         </>
//       )}
//     </Box>
//   );
// }

// export default memo(HeroSection);











import React, { memo } from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import BgImage from "../../assets/home-bg.webp";
import DiagonalStrip from "./DiagonalStrip";
import SectionImage from "../SectionImage";
import useDevice from "../../hooks/useDevice";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isMobile, isDesktop, isLandscapeMobile } = useDevice();
  const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
        overflow: "hidden",
        backgroundColor: theme.palette.primary.dark,  // ✅ fallback while image loads
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* LCP Background Image */}
      <Box
        component="img"
        src={BgImage}
        alt=""
        aria-hidden="true"
        width="1600"
        height="900"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg,
            ${theme.palette.primary.dark} 0%,
            ${theme.palette.primary.dark}E6 35%,
            ${theme.palette.primary.dark}99 60%,
            ${theme.palette.primary.dark}33 100%)`,
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, py: { xs: 12, md: 0 } }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: theme.spacing(6), md: theme.spacing(10) },
          }}
        >
          {/* LEFT — Text */}
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            sx={{ flex: 1 }}
          >
            {/* Eyebrow */}
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: theme.palette.accent.light,
                mb: 2,
              }}
            >
              Digital Marketing Agency
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontWeight: 700,
                fontSize: isLandscapeMobile
                  ? 22
                  : { xs: 32, sm: 38, md: 44, lg: 58, xl: 68 },
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: theme.palette.common.white,
                mb: 3,
              }}
            >
              Make Your Brand{" "}
              <Box
                component="span"
                sx={{
                  color: theme.palette.secondary.main,
                }}
              >
                Stand Out
              </Box>
              <br />
              Through Social Media
              <br />
              <Box
                component="span"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.dark,
                  px: 1.5,
                  py: 0.2,
                  borderRadius: 1.5,
                  display: "inline-block",
                  lineHeight: 1.4,
                }}
              >
                Marketing
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "rgba(255,255,255,0.65)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                lineHeight: 1.75,
                maxWidth: 480,
                mb: 4,
              }}
            >
              We help businesses grow with modern websites, digital strategies,
              and custom software solutions that deliver real results.
            </Typography>

            <GradientButton
              aria-label="Contact Cloudix Soft"
              text="Let's Talk"
              size={buttonSize}
              onClick={() => navigate("/contact")}
            />
          </MotionBox>

          {/* RIGHT — Image (hidden on mobile) */}
          {!isMobile && !isLandscapeMobile && (
            <Box sx={{ flex: 1 }}>
              <SectionImage
                src={BgImage}
                alt="Cloudix Soft team at work"
                accentColor={theme.palette.accent.light}
                direction="right"
                delay={0.4}
              />
            </Box>
          )}
        </Box>
      </Container>

      {/* Decorative strips — desktop only */}
      {!isMobile && !isLandscapeMobile && (
        <>
          <DiagonalStrip
            texts={["Development", "Branding", "E-Commerce", "Animation"]}
            bgColor={theme.palette.accent.main}
            borderColor={theme.palette.primary.dark}
            angle={40}
            position="90%"
          />
          <DiagonalStrip
            texts={["UI/UX", "Marketing", "Motion", "Branding"]}
            bgColor={theme.palette.primary.dark}
            borderColor="#d9d9d9"
            textColor={theme.palette.common.white}
            angle={-10}
            position="30%"
          />
        </>
      )}
    </Box>
  );
}

export default memo(HeroSection);
