import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
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
    : ShariahImage;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Paragraph + Image Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 5, md: 10 },
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
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: theme.typography.h3.fontWeight,
                lineHeight: 1.3,
                textDecoration: "underline",
                color: theme.palette.text.primary,
                // ✅ theme responsiveFontSizes handles size automatically
              }}
            >
              {compliance.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: theme.palette.text.primary,
                mb: 4,
                textAlign: "justify",
                textJustify: "inter-word",
                // ✅ theme responsiveFontSizes handles size automatically
              }}
            >
              {compliance.description}
            </Typography>
          </MotionBox>

          {/* Right: Image */}
          <SectionImage
            src={imageSrc}
            alt={compliance.title || "Shariah Compliance Image"}
            accentColor={theme.palette.primary.dark}
            direction="right"
            delay={0.5}
          />
        </Box>
      </Container>
    </MotionBox>
  );
};

export default CommitmentSection;



// import React from "react";
// import { Box, Typography, useTheme, Container } from "@mui/material";
// import { motion } from "framer-motion";
// import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
// import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
// import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
// import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
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
//     : "";

//   const values = [
//     {
//       icon: <ShieldOutlinedIcon />,
//       title: "Integrity",
//       text: "Do what's right.",
//     },
//     {
//       icon: <GroupsOutlinedIcon />,
//       title: "Excellence",
//       text: "Always improve.",
//     },
//     {
//       icon: <EnergySavingsLeafOutlinedIcon />,
//       title: "Innovation",
//       text: "Think ahead.",
//     },
//     {
//       icon: <FavoriteBorderOutlinedIcon />,
//       title: "Respect",
//       text: "Value people.",
//     },
//   ];

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7 }}
//       viewport={{ once: true }}
//       sx={{
//         py: { xs: 8, md: 12 },
//         backgroundColor: "#ffffff",
//         overflow: "hidden",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             display: "grid",
//             gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
//             gap: { xs: 6, md: 8 },
//             alignItems: "center",
//           }}
//         >
//           {/* TEXT */}
//           <Box>
//             <Typography
//               sx={{
//                 color: "#829b1b",
//                 fontWeight: 700,
//                 fontSize: "0.78rem",
//                 letterSpacing: "0.2em",
//                 textTransform: "uppercase",
//                 mb: 1,
//               }}
//             >
//               OUR VALUES
//             </Typography>

//             <Typography
//               component="h2"
//               sx={{
//                 color: "#08111D",
//                 fontWeight: 800,
//                 fontSize: { xs: "1.8rem", md: "2.4rem" },
//                 lineHeight: 1.2,
//                 mb: 1.5,
//               }}
//             >
//               Values Driven
//             </Typography>

//             <Box
//               sx={{
//                 width: 45,
//                 height: 3,
//                 backgroundColor: "#829b1b",
//                 borderRadius: 2,
//                 mb: 3,
//               }}
//             />

//             <Typography
//               sx={{
//                 color: "#4A5568",
//                 lineHeight: 1.7,
//                 fontSize: "0.95rem",
//                 mb: 5,
//               }}
//             >
//               {compliance.description ||
//                 "Our values guide everything we do — from how we work with clients to how we build our products. We are committed to ethical practices, honest communication and delivering excellence in all that we do."}
//             </Typography>

//             {/* 4 Columns Horizontal Values Bar */}
//             <Box
//               sx={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(4, 1fr)",
//                 gap: 1,
//               }}
//             >
//               {values.map((val, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     textAlign: "center",
//                     borderRight: index !== values.length - 1 ? "1px solid #E2E8F0" : "none",
//                     pr: 1,
//                   }}
//                 >
//                   <Box sx={{ color: "#829b1b", mb: 0.8, "& svg": { fontSize: 26 } }}>
//                     {val.icon}
//                   </Box>
//                   <Typography
//                     sx={{
//                       fontWeight: 700,
//                       color: "#08111D",
//                       fontSize: "0.82rem",
//                       mb: 0.3,
//                     }}
//                   >
//                     {val.title}
//                   </Typography>
//                   <Typography
//                     sx={{
//                       color: "#718096",
//                       fontSize: "0.7rem",
//                     }}
//                   >
//                     {val.text}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>

//           {/* RIGHT IMAGE WITH SHARIAH COMPLIANT BADGE */}
//           <Box sx={{ position: "relative" }}>
//             <Box sx={{ borderRadius: "16px", overflow: "hidden" }}>
//               <SectionImage
//                 src={imageSrc}
//                 alt={compliance.title || "Values Driven"}
//                 accentColor="#829b1b"
//                 direction="right"
//               />
//             </Box>

//             {/* Shariah Banner on Top Right */}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 20,
//                 right: 20,
//                 backgroundColor: "#829b1b",
//                 color: "#fff",
//                 px: 2,
//                 py: 1.2,
//                 borderRadius: "8px",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1.2,
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
//               }}
//             >
//               <VerifiedUserOutlinedIcon sx={{ fontSize: 28, color: "#fff" }} />
//               <Box>
//                 <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, lineHeight: 1.2 }}>
//                   Shariah-Compliant
//                 </Typography>
//                 <Typography sx={{ fontSize: "0.68rem", opacity: 0.9, lineHeight: 1.2 }}>
//                   IT Company
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </MotionBox>
//   );
// };

// export default CommitmentSection;