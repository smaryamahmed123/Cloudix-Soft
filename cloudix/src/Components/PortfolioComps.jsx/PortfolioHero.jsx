// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { motion as Motion } from "framer-motion";
// import PortfolioBg from "../../assets/Portfolio-bg.png";

// const PortfolioHero = () => {
//   return (
//     <Box
//       sx={{
//         position: "relative",
//         height: { xs: "55vh", sm: "60vh", md: "66vh" },
//         overflow: "hidden",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         textAlign: "center",
//         backgroundColor: "#111E2C",

//         borderRadius: {
//           xs: "0 0 36px 36px",
//           sm: "0 0 56px 56px",
//           md: "0 0 77px 77px",
//         },

//         /* ✅ FIX */
//         boxShadow: "inset 0 -12px 24px rgba(0,0,0,0.35)",
//       }}
//     >
//       {/* 🔹 Background Image */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage: `url(${PortfolioBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           zIndex: 1,
//         }}
//       />

//       {/* 🔹 Gradient Overlay (NO grey bleed) */}
//       <Box
//         sx={{
//           position: "absolute",
//           inset: 0,
//           background: `
//       linear-gradient(
//         to bottom,
//         rgba(17,30,44,0.95) 0%,
//         rgba(17,30,44,0.65) 25%,
//         rgba(17,30,44,0.4) 55%,
//         rgba(17,30,44,0.75) 80%,
//         rgba(17,30,44,1) 100%
//       )
//     `,
//           zIndex: 2,
//         }}
//       />

//       {/* 🔹 Content */}
//       <Box
//         sx={{
//           position: "relative",
//           zIndex: 3,
//           px: 2,
//         }}
//       >
//         {/* Animated Title */}
//         <Motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, ease: "easeOut" }}
//         >
//           <Typography
//             sx={{
//               fontWeight: 800,
//               fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem" },
//               color: "#fff",
//             }}
//           >
//             Portfolio
//           </Typography>
//         </Motion.div>

//         {/* Animated Subtitle */}
//         <Motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.25 }}
//         >
//           <Typography
//             sx={{
//               mt: 1,
//               color: "#A9B838",
//               fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
//             }}
//           >
//             Showcasing our creativity through real results
//           </Typography>
//         </Motion.div>
//       </Box>
//     </Box>
//   );
// };

// export default PortfolioHero;



import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PortfolioBg from "../../assets/Portfolio-bg.png";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.8, ease: "easeOut" },
  }),
};

const PortfolioHero = () => {
  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(17,30,44,0.85), rgba(17,30,44,0.85)), url(${PortfolioBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: { xs: "55vh", sm: "60vh", md: "70vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        px: { xs: 2, sm: 4, md: 8 },
        overflow: "hidden",
        width: "100%",
        mx: "auto",
      }}
    >
      {/* Title */}
      <MotionTypography
        variants={fadeUp}
        custom={1}
        initial="hidden"
        animate="visible"
        variant="h2"
        sx={{
          fontWeight: 700,
          mb: { xs: 1, sm: 2 },
          color: "#FFFFFF",
          fontSize: { xs: "2rem", sm: "2.6rem", md: "3rem", lg: "3.5rem" },
          textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        Portfolio
      </MotionTypography>

      {/* Subtitle */}
      <MotionTypography
        variants={fadeUp}
        custom={2}
        initial="hidden"
        animate="visible"
        variant="body1"
        sx={{
          color: "#A9B838",
          maxWidth: "700px",
          lineHeight: 1.6,
          fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem", lg: "1.5rem" },
          px: { xs: 2, sm: 0 },
        }}
      >
        Showcasing our creativity through real results
      </MotionTypography>
    </MotionBox>
  );
};

export default PortfolioHero;
