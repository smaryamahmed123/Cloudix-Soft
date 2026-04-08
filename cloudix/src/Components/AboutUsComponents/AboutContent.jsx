// import React from "react";
// import { Box, Typography, useTheme, useMediaQuery, Container } from "@mui/material";
// import { motion } from "framer-motion";
// import AboutImage from "../../assets/about-team.png";

// const MotionBox = motion(Box);

// const AboutContent = ({ intro }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   if (!intro) return null;

//   const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//   const imageSrc = intro.image
//     ? intro.image.startsWith("http")
//       ? intro.image
//       : `${backendURL}${intro.image}`
//     : AboutImage;

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: true }}
//       sx={{
//         backgroundColor: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//         py: { xs: theme.spacing(2), md: theme.spacing(6) },
//         overflowX: "hidden",
//       }}
//     >
//       <Container maxWidth="lg"  sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: { xs: theme.spacing(5), md: theme.spacing(10) } }}>
        
//         {/* Left: Text */}
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
//               color: theme.palette.text.primary,
//               fontSize: { xs: "1.8rem", md: "2.5rem" },
//             }}
//           >
//             {intro.title}
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: { xs: "1rem", md: "1.3rem" },
//               mb: theme.spacing(1),
//               color: theme.palette.text.primary,
//               lineHeight: 1.8,
//               textAlign: "justify",
//               textJustify: "inter-word"
//             }}
//           >
//             {intro.description}
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: theme.typography.fontWeightBold,
//               color: theme.palette.accent.light,
//               fontSize: { xs: "1.2rem", md: "1.4rem" },
//               textAlign: "justify",
//               textJustify: "inter-word"
//             }}
//           >
//             {intro.highlight}
//           </Typography>
//         </MotionBox>

//         {/* Right: Image */}
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
//               border: `5px solid ${theme.palette.text.primary}`,
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
//             alt={intro.title || "About Us"}
//             loading="lazy"
//             style={{
//               width: "100%",
//               maxWidth: "100%",
//               maxHeight: isMobile ? "300px" : "100%",
//               objectFit: "cover",
//               borderRadius: theme.shape.borderRadius,
//               boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//             }}
//           />
//         </MotionBox>
//       </Container>
//     </MotionBox>
//   );
// };

// export default AboutContent;




import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Container } from "@mui/material";
import { motion } from "framer-motion";
import AboutImage from "../../assets/about-team.png";

const MotionBox = motion(Box);
const MotionImg = motion("img");
// const AboutContent = ({ intro }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   if (!intro) return null;

//   const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//   const imageSrc = intro.image
//     ? intro.image.startsWith("http")
//       ? intro.image
//       : `${backendURL}${intro.image}`
//     : AboutImage;

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: true }}
//       sx={{
//         backgroundColor: "blue",
//         color: theme.palette.text.primary,
//         py: { xs: theme.spacing(4), md: theme.spacing(10) },
//         overflowX: "hidden",
//       }}
//     >
//       <Container
//         maxWidth="xl"
//         sx={{
//           backgroundColor: "red",
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           gap: { xs: theme.spacing(5), md: theme.spacing(10) },
//         }}
//       >
//         {/* Left: Text */}
//         <Box
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
//               color: theme.palette.text.primary,
//               fontSize: { xs: "1.8rem", md: "2.5rem" },
//             }}
//           >
//             {intro.title}
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: { xs: "1rem", md: "1.3rem" },
//               mb: theme.spacing(1),
//               color: theme.palette.text.primary,
//               lineHeight: 1.8,
//               textAlign: "justify",
//               textJustify: "inter-word",
//             }}
//           >
//             {intro.description}
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: theme.typography.fontWeightBold,
//               color: theme.palette.accent.light,
//               fontSize: { xs: "1.2rem", md: "1.4rem" },
//               textAlign: "justify",
//               textJustify: "inter-word",
//             }}
//           >
//             {intro.highlight}
//           </Typography>
//         </Box>

//         {/* Right: Image */}
//         <Box
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
//               border: `5px solid ${theme.palette.text.primary}`,
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
//             alt={intro.title || "About Us"}
//             loading="lazy"
//             sx={{
//               width: "100%",
//               maxWidth: "100%",
//               maxHeight: isMobile ? "300px" : "100%",
//               objectFit: "cover",
//               borderRadius: theme.shape.borderRadius,
//               boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//             }}
//           />
//         </Box>
//       </Container>
//     </MotionBox>
//   );
// };


const AboutContent = ({ intro }) => {
  const theme = useTheme();

  if (!intro) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";
  const imageSrc = intro.image
    ? intro.image.startsWith("http")
      ? intro.image
      : `${backendURL}${intro.image}`
    : AboutImage;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        // backgroundColor: theme.palette.background.subtle, // 🔥 Stripe section feel
        background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
        py: { xs: 10, md: 16 }, // 🔥 Apple spacing
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 8, md: 14 }, // 🔥 IMPORTANT
          }}
        >

          {/* LEFT */}
          <Box flex={1}>
            <Typography
              variant="h3"
              sx={{
                mb: 3,
                lineHeight: 1.2,
                letterSpacing: "-0.4px",
              }}
            >
              {intro.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: theme.palette.text.secondary,
                lineHeight: 1.7,
                maxWidth: "520px", // 🔥 PRO MOVE
              }}
            >
              {intro.description}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              {intro.highlight}
            </Typography>
          </Box>

          {/* RIGHT */}
          <MotionBox
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: "50%" },
              position: "relative",
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              borderRadius: theme.shape.borderRadius,
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                width: "50%",
                height: "50%",
                border: `5px solid ${theme.palette.text.primary}`,
                borderRadius: theme.shape.borderRadius,
              },
              "&::before": { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
              "&::after": { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
            }}
          >
            <MotionImg
              src={imageSrc}
              alt={intro.title}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              loading="lazy"
              style={{
                width: "100%",
                maxHeight: isMobile ? "300px" : "100%",
                objectFit: "cover",
                borderRadius: theme.shape.borderRadius,
                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              }}
            />
          </MotionBox>

        </Box>
      </Container>
    </MotionBox>
  );
};
export default AboutContent;
