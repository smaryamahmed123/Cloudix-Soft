// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";
// import ShariahImage from "../../assets/Shariah-compliance.png"; // local fallback image

// const MotionBox = motion(Box);
// const MotionImg = motion("img");

// const CommitmentSection = ({ compliance }) => {
//   if (!compliance) return null;

//   // ✅ Determine image source: absolute URL or backend relative
//   const backendURL = import.meta.env.VITE_BACKEND_URL || "";
//   const imageSrc = compliance.image
//     ? compliance.image.startsWith("http")
//       ? compliance.image
//       : `${backendURL}${compliance.image}`
//     : ShariahImage; // fallback if missing

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       viewport={{ once: true }}
//       sx={{
//         py: { xs: 8, md: 12 },
//         px: { xs: 3, md: 8 },
//         backgroundColor: "#fff",
//         color: "#111E2C",
//       }}
//     >
//       {/* ---- Section Heading ---- */}
     

//       {/* ---- Paragraph + Image Row ---- */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: "center",
//           justifyContent: "center",
//           gap: 6,
//           width: "100%",
//         }}
//       >
//         {/* ---- Left: Paragraph ---- */}
//         <MotionBox
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
//           viewport={{ once: true }}
//           sx={{ flex: 1, maxWidth: "600px" }}
//         >
//            <Typography
//         component={motion.h4}
//         initial={{ opacity: 0, scale: 0.8 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
//         viewport={{ once: true }}
//         variant="h4"
//         sx={{
//           fontWeight: 800,
//           lineHeight: 1.3,
//           textAlign: "center",
//           mb: 6,
//           textDecoration: "underline",
//           color: "#111E2C",
//         }}
//       >
//         {compliance.title}
//       </Typography>
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: { xs: "1rem", md: "1.3rem" },
//               lineHeight: 1.8,
//               color: "#111E2C",
//               mb: 6,
//               textAlign: "justify",
//               textJustify: "inter-word",
//             }}
//           >
//             {compliance.description}
//           </Typography>
//         </MotionBox>

//         {/* ---- Right: Image ---- */}
//         <MotionBox
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
//           viewport={{ once: true }}
//           sx={{
//             flex: 1,
//             maxWidth: { xs: "100%", md: "50%" },
//             position: "relative",
//             display: "inline-block",
//             overflow: "hidden",
//             borderRadius: 2,
//             "&::before, &::after": {
//               content: '""',
//               position: "absolute",
//               width: "50%",
//               height: "50%",
//               border: "5px solid #111E2C",
//             },
//             "&::before": { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
//             "&::after": { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
//           }}
//         >
//           <MotionImg
//             src={imageSrc}
//             alt={compliance.title || "Shariah Compliance"}
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.4 }}
//             loading="lazy"
//             style={{
//               width: "100%",
//               height: "auto",
//               display: "block",
//               boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//               borderRadius: "4px",
//             }}
//           />
//         </MotionBox>
//       </Box>
//     </MotionBox>
//   );
// };

// export default CommitmentSection;




import React from "react";
import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ShariahImage from "../../assets/Shariah-compliance.png"; // fallback

const MotionBox = motion(Box);
const MotionImg = motion("img");

const CommitmentSection = ({ compliance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!compliance) return null;

  const backendURL = import.meta.env.VITE_BACKEND_URL || "";
  const imageSrc = compliance.image
    ? compliance.image.startsWith("http")
      ? compliance.image
      : `${backendURL}${compliance.image}`
    : ShariahImage;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        py: { xs: theme.spacing(8), md: theme.spacing(12) },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Section Heading */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          sx={{ mb: theme.spacing(6), textAlign: "center" }}
        >
          <Typography
            component={motion.h4}
            variant="h4"
            sx={{
              fontWeight: theme.typography.fontWeightBold,
              lineHeight: 1.3,
              textDecoration: "underline",
              color: theme.palette.text.primary,
            }}
          >
            {compliance.title}
          </Typography>
        </MotionBox>

        {/* Paragraph + Image Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing(6),
            width: "100%",
          }}
        >
          {/* Left: Paragraph */}
          <MotionBox
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            sx={{
              flex: 1,
              maxWidth: { xs: "100%", md: "50%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", md: "1.3rem" },
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                mb: theme.spacing(4),
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              {compliance.description}
            </Typography>
          </MotionBox>

          {/* Right: Image */}
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
              borderRadius: 2,
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                width: "50%",
                height: "50%",
                border: `5px solid ${theme.palette.text.primary}`,
              },
              "&::before": { top: 0, left: 0, borderRight: "none", borderBottom: "none" },
              "&::after": { bottom: 0, right: 0, borderLeft: "none", borderTop: "none" },
            }}
          >
            <MotionImg
              src={imageSrc}
              alt={compliance.title || "Shariah Compliance"}
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

export default CommitmentSection;
