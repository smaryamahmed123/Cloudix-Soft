import React from "react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import SectionImage from "../SectionImage";

const MotionBox = motion(Box);

const TeamSection = ({ teamIntro }) => {
  const theme = useTheme();

  if (!teamIntro) return null;

  const imageSrc = teamIntro.image?.startsWith("http")
    ? teamIntro.image
    : `${teamIntro.image || ""}`;

  return (
    <MotionBox
      component="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        py: { xs: theme.custom.sectionSpacing.xs, md: theme.custom.sectionSpacing.md },
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          py: { xs: 6, md: 10 },
          gap: { xs: 5, md: 10 },
        }}
      >
        {/* LEFT: IMAGE */}
        <SectionImage
          src={imageSrc}
          alt={teamIntro.title || "Team Image"}
          accentColor={theme.palette.primary.light}
          direction="right"
          delay={0.5}
        />

        {/* RIGHT: TEXT */}
        <MotionBox
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          sx={{
            flex: 1,
            maxWidth: { xs: "100%", md: "50%" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: theme.typography.h3.fontWeight,
              mb: 3,
              color: theme.palette.accent.light,
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            {teamIntro.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: theme.palette.common.white,
              lineHeight: 1.8,
              maxWidth: "600px",
              mx: { xs: "auto", md: 0 },
              textAlign: "justify",
              // ✅ theme responsiveFontSizes handles size automatically
            }}
          >
            {teamIntro.description}
          </Typography>
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default TeamSection;


// import React from "react";
// import { Box, Typography, Container, Button } from "@mui/material";
// import { motion } from "framer-motion";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import SectionImage from "../SectionImage";
// import { resolveImage } from "../../utils/Resolveimage";

// const MotionBox = motion(Box);

// const TeamSection = ({ teamIntro }) => {
//   if (!teamIntro) return null;

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7 }}
//       viewport={{ once: true }}
//       sx={{ position: "relative", background: "#07121e", color: "#fff", py: { xs: 8, md: 10 }, overflow: "hidden" }}
//     >
//       <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
//         <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "0.9fr 1.1fr" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
//           <Box>
//             <Typography sx={{ color: "#829b1b", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", mb: 1 }}>
//               OUR TEAM
//             </Typography>
//             <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "2rem", md: "2.4rem" }, lineHeight: 1.15, mb: 1.5 }}>
//               Our Team
//             </Typography>
//             <Box sx={{ width: 45, height: 3, backgroundColor: "#829b1b", borderRadius: 2, mb: 3 }} />
//             <Typography sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.7, fontSize: "0.92rem", mb: 4 }}>
//               {teamIntro.description ||
//                 "We are a diverse team of developers, designers, marketers and strategists, working together to turn ideas into powerful digital experiences. With a shared passion for technology and a commitment to excellence, we help businesses grow in the digital world."}
//             </Typography>
//             <Button
//               variant="contained"
//               endIcon={<ArrowForwardRoundedIcon />}
//               href="#meet-team"
//               sx={{ backgroundColor: "#829b1b", color: "#fff", borderRadius: "6px", px: 3, py: 1.2, fontWeight: 700, textTransform: "none", fontSize: "0.88rem", "&:hover": { backgroundColor: "#96b320" } }}
//             >
//               Work With Us
//             </Button>
//           </Box>

//           <Box sx={{ position: "relative" }}>
//             {/* top-right skew */}
//             <Box sx={{ position: "absolute", right: -30, top: -28, width: 130, height: 60, background: "#829b1b", transform: "skewX(-25deg)", opacity: 0.85 }} />
//             {/* bottom-left skew, overlapping the image edge */}
//             <Box sx={{ position: "absolute", left: -45, bottom: -30, width: 110, height: 150, background: "#829b1b", transform: "skewX(-25deg)", opacity: 0.85 }} />
//             <Box sx={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}>
//               <SectionImage src={resolveImage(teamIntro.image)} alt={teamIntro.title || "Cloudix Soft Team"} accentColor="#829b1b" direction="right" />
//             </Box>
//           </Box>
//         </Box>
//       </Container>
//     </MotionBox>
//   );
// };

// export default TeamSection;