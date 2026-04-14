// // import React, { memo } from "react";
// // import { Box, Typography, Container, useTheme } from "@mui/material";  // ✅ add Container
// // import { useNavigate } from "react-router-dom";
// // import GradientButton from "../GradientButton";
// // import BgImage from "../../assets/home-bg.webp";
// // import DiagonalStrip from "./DiagonalStrip";
// // import useDevice from "../../hooks/useDevice";

// // function HeroSection() {
// //   const navigate = useNavigate();
// //   const theme = useTheme();
// //   const { isMobile, isDesktop, isLandscapeMobile } = useDevice();
// //   const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

// //   return (
// //     <Box
// //       component="section"
// //       sx={{
// //         position: "relative",
// //         height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
// //         overflow: "hidden",
// //         display: "flex",          // ✅ needed to center Container vertically
// //         alignItems: "center",
// //       }}
// //     >
// //       {/* LCP Optimized Image */}
// //       <Box
// //         component="img"
// //         src={BgImage}
// //         alt="Cloudix Soft digital marketing services"
// //         width="1600"
// //         height="900"
// //         loading="eager"
// //         decoding="async"
// //         fetchpriority="high"
// //         style={{
// //           position: "absolute",
// //           inset: 0,
// //           width: "100%",
// //           height: "100%",
// //           objectFit: "cover",
// //         }}
// //       />

// //       {/* Overlay */}
// //       <Box
// //         sx={{
// //           position: "absolute",
// //           inset: 0,
// //           background: `linear-gradient(90deg, ${theme.palette.primary.dark} 10%, ${theme.palette.primary.dark}D9 40%, ${theme.palette.primary.dark}66 100%)`,
// //           zIndex: 0,
// //         }}
// //       />

// //       {/* ✅ Container for consistent width */}
// //       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
// //         <Box
// //           sx={{
// //             display: "flex",
// //             flexDirection: "column",
// //             justifyContent: "center",
// //             gap: 3,
// //             alignItems: "flex-start",
// //             // maxWidth: { xs: "100%", md: 700 },  // ✅ text doesn't stretch full width on desktop
// //             maxWidth: { xs: "100%", sm: "85%", md: 600, lg: 700 },
// //             pb: { xs: 8, md: 0 },
// //           }}
// //         >
// //           <Typography
// //             variant="h3"
// //             sx={{
// //               fontSize: isLandscapeMobile
// //                 ? 22
// //                 : { sm: 30, md: 40, lg: 60, xl: 70 },
// //               lineHeight: 1.5,
// //               color: theme.palette.common.white,
// //               textAlign: isLandscapeMobile ? "left" : "justify",
// //             }}
// //           >
// //             <Box component="span" sx={{ whiteSpace: "nowrap" }}>
// //               Make Your Brand Stand
// //             </Box>
// //             <br />
// //             <Box component="span" sx={{ whiteSpace: "nowrap" }}>
// //               Out Through{" "}
// //               <Box
// //                 component="span"
// //                 sx={{
// //                   bgcolor: theme.palette.secondary.main,
// //                   color: theme.palette.primary.dark,
// //                   px: 1,
// //                   borderRadius: 1.5,
// //                   display: "inline-block",
// //                   mb: 0.5,
// //                   lineHeight: 1.3,
// //                 }}
// //               >
// //                 Social Media
// //               </Box>
// //             </Box>
// //             <br />
// //             <Box
// //               component="span"
// //               sx={{
// //                 bgcolor: theme.palette.secondary.main,
// //                 color: theme.palette.primary.dark,
// //                 px: 1,
// //                 borderRadius: 1.5,
// //                 display: "inline-block",
// //                 lineHeight: 1.3,
// //               }}
// //             >
// //               Marketing
// //             </Box>
// //           </Typography>

// //           <GradientButton
// //             aria-label="Contact Cloudix Soft"
// //             text="Let's Talk"
// //             size={buttonSize}
// //             onClick={() => navigate("/contact")}
// //           />
// //         </Box>
// //       </Container>

// //       {/* Decorative strips — desktop only */}
// //       {!isMobile && !isLandscapeMobile && (
// //           <>
// //           <DiagonalStrip
// //             texts={["Development", "Branding", "E-Commerce", "Animation"]}
// //             bgColor={theme.palette.accent.main}
// //             borderColor={theme.palette.primary.dark}
// //             angle={40}
// //             position="90%"
// //           />
// //           <DiagonalStrip
// //             texts={["UI/UX", "Marketing", "Motion", "Branding"]}
// //             bgColor={theme.palette.primary.dark}
// //             borderColor="#d9d9d9"
// //             textColor={theme.palette.common.white}
// //             angle={-10}
// //             position="30%"
// //           />
// //         </>
// //       )}
// //     </Box>
// //   );
// // }

// // export default memo(HeroSection);









// import React, { memo } from "react";
// import { Box, Typography, Container, useTheme } from "@mui/material";
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
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       {/* LCP Optimized Background Image */}
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

//       {/* Dark gradient overlay */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: `linear-gradient(105deg,
//             ${theme.palette.primary.dark}F8 0%,
//             ${theme.palette.primary.dark}DD 38%,
//             ${theme.palette.primary.dark}88 60%,
//             ${theme.palette.primary.dark}22 100%)`,
//           zIndex: 0,
//         }}
//       />

     

//       {/* Main content */}
//        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3 }}>
//           {/* Vertical side labels — desktop only */}
//       {!isMobile && !isLandscapeMobile && (
//         <Box
//           aria-hidden
//           sx={{
//             position: "absolute",
//             left: { md: 14, lg: 18 },
//             top: "50%",
//             transform: "translateY(-50%)",
//             display: "flex",
//             flexDirection: "column",
//             gap: 2.5,
//             zIndex: 15,
//           }}
//         >
//           {["Marketing", "UI/UX", "Creative Design"].map((label) => (
//             <Typography
//               key={label}
//               sx={{
//                 writingMode: "vertical-rl",
//                 transform: "rotate(180deg)",
//                 fontSize: { md: 9, lg: 10 },
//                 fontWeight: 600,
//                 letterSpacing: "2.5px",
//                 textTransform: "uppercase",
//                 color: "rgba(255,255,255,0.3)",
//                 userSelect: "none",
//               }}
//             >
//               {label}
//             </Typography>
//           ))}
//         </Box>
//       )}
//          <Box
//            sx={{
//              display: "flex",
//              flexDirection: "column",
//              justifyContent: "center",
//              gap: 3,
//              alignItems: "flex-start",
//              // maxWidth: { xs: "100%", md: 700 },  // ✅ text doesn't stretch full width on desktop
//              maxWidth: { xs: "100%", sm: "85%", md: 600, lg: 700 },
//              pb: { xs: 8, md: 0 },
//            }}
//          >
//            <Typography
//              variant="h3"
//              sx={{
//                fontSize: isLandscapeMobile
//                  ? 22
//                  : { sm: 30, md: 40, lg: 60, xl: 70 },
//                lineHeight: 1.5,
//                color: theme.palette.common.white,
//                textAlign: isLandscapeMobile ? "left" : "justify",
//              }}
//            >
//              <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//                Make Your Brand Stand
//              </Box>
//              <br />
//              <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//                Out Through{" "}
//                <Box
//                  component="span"
//                  sx={{
//                    bgcolor: theme.palette.secondary.main,
//                    color: theme.palette.primary.dark,
//                    px: 1,
//                    borderRadius: 1.5,
//                    display: "inline-block",
//                    mb: 0.5,
//                    lineHeight: 1.3,
//                  }}
//                >
//                  Social Media
//                </Box>
//              </Box>
//              <br />
//              <Box
//                component="span"
//                sx={{
//                  bgcolor: theme.palette.secondary.main,
//                  color: theme.palette.primary.dark,
//                  px: 1,
//                  borderRadius: 1.5,
//                  display: "inline-block",
//                  lineHeight: 1.3,
//                }}
//              >
//                Marketing
//              </Box>
//            </Typography>

//            <GradientButton
//              aria-label="Contact Cloudix Soft"
//              text="Let's Talk"
//              size={buttonSize}
//              onClick={() => navigate("/contact")}
//            />
//          </Box>
//        </Container>
//       {/* Diagonal strips — desktop only */}
//       {!isMobile && !isLandscapeMobile && (
//         <>
//           {/* Yellow strip — steep angle, top-right */}
//           <DiagonalStrip
//             texts={["Development", "Branding", "Animation", "E-Commerce", "Editing"]}
//             bgColor={theme.palette.accent.main}
//             borderColor={theme.palette.primary.dark}
//             angle={40}
//             position="86%"
//           />
//           {/* Dark strip — shallow angle, bottom */}
//           <DiagonalStrip
//             texts={["Creative Design", "UI/UX", "Marketing", "Motion", "Animation", "Editing"]}
//             bgColor={theme.palette.primary.dark}
//             borderColor="rgba(200,242,58,0.25)"
//             textColor={theme.palette.common.white}
//             angle={-12}
//             position="22%"
//             reverse
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
import useDevice from "../../hooks/useDevice";

function HeroSection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { isMobile, isDesktop, isLandscapeMobile } = useDevice();
  const buttonSize = isMobile ? "small" : isDesktop ? "large" : "medium";

  // Strips and side labels only on lg+ to prevent overflow on tablets/landscape
  const showStrips = isDesktop;
  const showSideLabels = isDesktop;

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: isLandscapeMobile ? "65vh" : { xs: "85vh", md: "100vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* LCP Optimized Background Image */}
      <Box
        component="img"
        src={BgImage}
        alt="Cloudix Soft digital marketing services"
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
        }}
      />

      {/* Dark gradient overlay — uses theme colors */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(105deg,
            ${theme.palette.primary.dark}F8 0%,
            ${theme.palette.primary.dark}DD 38%,
            ${theme.palette.primary.dark}88 60%,
            ${theme.palette.primary.dark}22 100%)`,
          zIndex: 0,
        }}
      />

      {/* Content — pt on xs/sm so it clears the fixed navbar */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 3,
          pt: { xs: 10, sm: 11, md: 0 },
        }}
      >
        {/* Vertical side labels — lg+ only */}
        {showSideLabels && (
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: { lg: -6, xl: -10 },
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: { lg: 1.5, xl: 2 },
              zIndex: 15,
            }}
          >
            {["Marketing", "UI/UX", "Creative Design"].map((label) => (
              <Typography
                key={label}
                sx={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  // Tied to theme breakpoints — no magic numbers
                  fontSize: {
                    lg: theme.typography.body2.fontSize
                      ? `calc(${theme.typography.body2.fontSize} * 0.6)`
                      : "0.52rem",
                    xl: "0.58rem",
                  },
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
        )}

        {/* Hero text + CTA */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // Use theme spacing — gap scales with theme
            gap: { xs: theme.spacing(2), md: theme.spacing(3) },
            alignItems: "flex-start",
            // Width: full on mobile, constrained on larger screens
            maxWidth: { xs: "100%", sm: "82%", md: "56%", lg: 600, xl: 680 },
            pb: { xs: 4, md: 0 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              // Let theme h3 handle font-size via responsiveFontSizes
              // Only override for landscape where it must be smaller
              ...(isLandscapeMobile && { fontSize: "1.2rem" }),
              lineHeight: 1.25,
              color: theme.palette.common.white,
              fontWeight: 800,
            }}
          >
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              Make Your Brand Stand
            </Box>
            <br />
            {/* Allow wrap on very small screens so text doesn't overflow */}
            <Box
              component="span"
              sx={{ whiteSpace: { xs: "normal", sm: "nowrap" } }}
            >
              Out Through{" "}
              <Box
                component="span"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.primary.dark,
                  px: { xs: 0.75, md: 1 },
                  borderRadius: 1.5,
                  display: "inline-block",
                  mb: 0.5,
                  lineHeight: 1.3,
                }}
              >
                Social Media
              </Box>
            </Box>
            <br />
            <Box
              component="span"
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.dark,
                px: { xs: 0.75, md: 1 },
                borderRadius: 1.5,
                display: "inline-block",
                lineHeight: 1.3,
              }}
            >
              Marketing
            </Box>
          </Typography>

          <GradientButton
            aria-label="Contact Cloudix Soft"
            text="Let's Talk"
            size={buttonSize}
            onClick={() => navigate("/contact")}
          />
        </Box>
      </Container>

      {/* Diagonal strips — desktop lg+ only */}
      {showStrips && (
        <>
          {/* Yellow strip — steep angle, top-right area */}
          <DiagonalStrip
            texts={["Development", "Branding", "Animation", "E-Commerce", "Editing"]}
            bgColor={theme.palette.accent.main}
            borderColor={theme.palette.primary.dark}
            textColor={theme.palette.primary.dark}
            angle={38}
            position="86%"
          />
          {/* Dark strip — shallow angle, lower area */}
          <DiagonalStrip
            texts={["Creative Design", "UI/UX", "Marketing", "Motion", "Animation", "Editing"]}
            bgColor={theme.palette.primary.dark}
            borderColor={`${theme.palette.accent.main}44`}
            textColor={theme.palette.common.white}
            angle={-12}
            position="22%"
            reverse
          />
        </>
      )}
    </Box>
  );
}

export default memo(HeroSection);



