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

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      sx={{
        background: "linear-gradient(180deg, #ffffff 0%, #f7f9fb 100%)",
        py: { xs: 6, md: 10 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* LEFT TEXT */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                mb: 1.5,
                color: theme.palette.primary.main,
                fontSize: { xs: "0.75rem", md: "0.8rem" },
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {intro.label || "About Us"}
            </Typography>

            <Typography
              component="h2"
              variant="h3"
              sx={{
                mb: { xs: 2, md: 2.5 },
                lineHeight: 1.2,
                color: theme.palette.primary.dark,
                letterSpacing: "-0.4px",
                fontWeight: 700,
              }}
            >
              {intro.title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mb: { xs: 3, md: 4 },
                lineHeight: 1.75,
                maxWidth: 520,
                color: "text.primary",
              }}
            >
              {intro.description}
            </Typography>

            {intro.highlight && (
              <Typography
                sx={{
                  maxWidth: 520,
                  pl: 2.5,
                  py: 0.5,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  color: theme.palette.primary.main,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 600,
                  lineHeight: 1.6,
                }}
              >
                {intro.highlight}
              </Typography>
            )}
          </Box>

          {/* RIGHT IMAGE */}
          {imageSrc && (
            <SectionImage
              src={imageSrc}
              alt={intro.title || "About Cloudix Soft"}
              variant="offset"
              accentColor={theme.palette.accent.light}
              direction="right"
              delay={0.4}
            />
          )}
        </Box>
      </Container>
    </MotionBox>
  );
};

export default AboutContent;