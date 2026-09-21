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
import { Box, Typography, useTheme, Container } from "@mui/material";
import { motion } from "framer-motion";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
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
      icon: <ShieldOutlinedIcon />,
      title: "Secure & Reliable",
      text: "Your data and business are always protected.",
    },
    {
      icon: <PeopleOutlinedIcon />,
      title: "Client Focused",
      text: "We listen, understand and deliver.",
    },
    {
      icon: <SettingsOutlinedIcon />,
      title: "Modern Technology",
      text: "Built for performance and future growth.",
    },
    {
      icon: <HandshakeOutlinedIcon />,
      title: "Long-Term Partner",
      text: "Your success is our success.",
    },
  ];

  return (
    <MotionBox
      id="about-content"
      component="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#ffffff",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
          }}
        >
          {/* TEXT CONTENT */}
          <Box>
            <Typography
              sx={{
                color: "#829b1b",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                mb: 1,
              }}
            >
              OUR FOUNDATION
            </Typography>

            <Typography
              component="h2"
              sx={{
                color: "#08111D",
                fontWeight: 800,
                fontSize: { xs: "1.8rem", md: "2.4rem" },
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Technology Built on Trust
            </Typography>

            <Box
              sx={{
                width: 45,
                height: 3,
                backgroundColor: "#829b1b",
                borderRadius: 2,
                mb: 3,
              }}
            />

            <Typography
              sx={{
                lineHeight: 1.7,
                color: "#4A5568",
                fontSize: "0.95rem",
                mb: 4,
              }}
            >
              {intro.description ||
                "At Cloudix Soft, we believe technology should create real value. That's why we build secure, scalable and user-friendly digital solutions, backed by transparency, clear communication and a long-term commitment to our clients."}
            </Typography>

            {/* 2x2 Feature Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              {features.map((item, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      color: "#829b1b",
                      mt: "2px",
                      "& svg": { fontSize: 26 },
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#08111D",
                        fontSize: "0.88rem",
                        mb: 0.3,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#718096",
                        fontSize: "0.78rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* IMAGE WITH GREEN ACCENTS & OVERLAY BANNER */}
          <Box sx={{ position: "relative" }}>
            {/* Background Light Green Skew Accent */}
            <Box
              sx={{
                position: "absolute",
                left: -35,
                bottom: -35,
                width: "80%",
                height: "80%",
                backgroundColor: "#dbe898",
                transform: "skewX(-15deg)",
                zIndex: 0,
                borderRadius: "16px",
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1, borderRadius: "16px", overflow: "hidden" }}>
              <SectionImage
                src={imageSrc}
                alt={intro.title || "Technology Built on Trust"}
                accentColor="#829b1b"
                direction="right"
              />

              {/* Green Overlay Card on Image Top-Right */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  backgroundColor: "#829b1b",
                  color: "#fff",
                  px: 2.5,
                  py: 1.8,
                  borderRadius: "8px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.3 }}>
                  Your Vision
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.3 }}>
                  Our Technology
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", lineHeight: 1.3, color: "#eef7b5" }}>
                  Real Results
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default AboutContent;