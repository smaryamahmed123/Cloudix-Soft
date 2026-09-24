// import React from "react";
// import { Box, Typography, Container, useTheme } from "@mui/material";
// import { motion } from "framer-motion";
// import SectionImage from "../SectionImage";
// import WorkTogetherImg from "../../assets/workTogether.png";

// const MotionBox = motion(Box);

// const WorkTogether = () => {
//   const theme = useTheme();

//   return (
//     <MotionBox
//       component="section"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.7 }}
//       viewport={{ once: true }}
//       sx={{
//         backgroundColor: "#111E2C",
//         color: "#fff",
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
//           {/* LEFT */}
//           <Box flex={1}>
//             <Typography
//               variant="h3"
//               sx={{
//                 mb: { xs: 2, md: 3 },
//                 lineHeight: 1.2,
//                 fontWeight: 800,
//                 color: "#d0d0d0",
//               }}
//             >
//               Let’s Work Together
//             </Typography>

//             <Typography
//               variant="body1"
//               sx={{
//                 mb: { xs: 3, md: 4 },
//                 lineHeight: 1.7,
//                 maxWidth: "520px",
//                 textAlign: "justify",
//                 color: "#d0d0d0",
//               }}
//             >
//               At Cloudix Soft, we’re passionate about helping businesses grow in
//               the digital world. Whether you need a modern website, a stronger
//               digital marketing strategy, or a custom software solution, our team
//               has the skills and experience to make it happen.
//             </Typography>

//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 700,
//                 color: "#A9B838",
//                 lineHeight: 1.6,
//               }}
//             >
//               Ready to take your business to the next level? <br />
//               Let’s connect and make it happen together.
//             </Typography>
//           </Box>

//           {/* RIGHT */}
//           <SectionImage
//             src={WorkTogetherImg}
//             alt="Work Together"
//             accentColor={theme.palette.primary.light}
//             direction="right"
//             delay={0.5}
//           />
//         </Box>
//       </Container>
//     </MotionBox>
//   );
// };

// export default WorkTogether;


import React from "react";
import { Box, Container, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkTogetherImg from "../../assets/workTogether.png";

const WorkTogether = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 6, md: 9 } }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" }, gap: { xs: 4, md: 8 }, alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}>
              Let's talk
            </Typography>
            <Typography component="h2" variant="h3" sx={{ color: "primary.dark", fontWeight: 700, mb: 2 }}>
              Let's Work Together
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 440, lineHeight: 1.8 }}>
              Ready to bring your ideas to life? Let's create something amazing together.
              Get in touch today and take the first step towards your digital success.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/contact")}
              sx={{ bgcolor: "accent.main", color: "primary.dark", borderRadius: 99, px: 3.5, py: 1.2, boxShadow: "none", "&:hover": { bgcolor: "accent.light", boxShadow: "none" } }}
            >
              Contact us today
            </Button>
          </Box>

          <Box
            component="img"
            src={WorkTogetherImg}
            alt="Team working together on a laptop"
            loading="lazy"
            sx={{ width: "100%", height: { xs: 240, md: 320 }, objectFit: "cover", borderRadius: 3, boxShadow: "0 12px 32px rgba(17,30,44,0.18)" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default WorkTogether;