import React from "react";
import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";
import AboutBg from "../../assets/about-bg.webp";
import HeroSection from "../HeroSection";



const AboutHero = () => {
  return (
    <>
      <HeroSection
        image={AboutBg}
        title="About Us"
        subtitle="Welcome to Cloudix Soft, Pakistan’s first Shariah-compliant IT company."
      />
    </>
  );
};

export default AboutHero;


// import React from "react";
// import { Box, Container, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import AboutBg from "../../assets/about-bg.webp";

// const MotionBox = motion(Box);

// const AboutHero = () => {
//   return (
//     <Box
//       component="section"
//       sx={{
//         position: "relative",
//         minHeight: { xs: 450, md: 560 },
//         display: "flex",
//         alignItems: "center",
//         overflow: "hidden",
//         backgroundImage: `
//           linear-gradient(
//             90deg,
//             rgba(7, 18, 30, 0.96) 0%,
//             rgba(7, 18, 30, 0.85) 45%,
//             rgba(7, 18, 30, 0.45) 75%,
//             rgba(7, 18, 30, 0.2) 100%
//           ),
//           url(${AboutBg})
//         `,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Skewed Green Accent Shapes (Right Side) */}
//       {/* <Box
//         sx={{
//           position: "absolute",
//           right: -80,
//           top: -50,
//           width: 220,
//           height: "140%",
//           background: "#829b1b",
//           transform: "skewX(-22deg)",
//           opacity: 0.85,
//         }}
//       /> */}
//       <Box sx={{ position: "absolute", left: -40, top: 20, width: 90, height: 120, background: "#829b1b", transform: "skewX(-22deg)", opacity: 0.85 }} />
//       <Box
//         sx={{
//           position: "absolute",
//           right: 30,
//           top: -50,
//           width: 45,
//           height: "140%",
//           background: "#a3c428",
//           transform: "skewX(-22deg)",
//           opacity: 0.7,
//         }}
//       />

//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
//         <MotionBox
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           sx={{ maxWidth: { xs: "100%", md: 620 } }}
//         >
//           {/* Section Tag */}
//           <Typography
//             sx={{
//               color: "#829b1b",
//               fontWeight: 700,
//               fontSize: "0.8rem",
//               letterSpacing: "0.2em",
//               textTransform: "uppercase",
//               mb: 1.5,
//             }}
//           >
//             ABOUT US
//           </Typography>

//           {/* Heading */}
//           <Typography
//             component="h1"
//             sx={{
//               color: "#fff",
//               fontWeight: 800,
//               fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
//               lineHeight: 1.1,
//               letterSpacing: "-0.02em",
//               mb: 1.5,
//             }}
//           >
//             About{" "}
//             <Box component="span" sx={{ color: "#829b1b" }}>
//               Us
//             </Box>
//           </Typography>

//           {/* Horizontal Accent Line */}
//           <Box
//             sx={{
//               width: 50,
//               height: 4,
//               backgroundColor: "#829b1b",
//               borderRadius: 2,
//               mb: 3,
//             }}
//           />

//           <Typography
//             sx={{
//               color: "rgba(255, 255, 255, 0.85)",
//               fontSize: { xs: "0.95rem", md: "1.05rem" },
//               lineHeight: 1.7,
//               maxWidth: 520,
//             }}
//           >
//             We are a team of passionate developers, designers and digital experts, building modern solutions for a better tomorrow.
//           </Typography>
//         </MotionBox>
//       </Container>
//     </Box>
//   );
// };

// export default AboutHero;