// import React from "react";
// import { Box, Typography, Container } from "@mui/material";
// import GradientButton from "../GradientButton";
// import { useNavigate } from "react-router-dom";
// import { motion as Motion } from "framer-motion"; // 👈 Import framer-motion

// const MissionSection = () => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#fff",
//         py: { xs: 6, md: 10 },
//         textAlign: "center",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <Container maxwidth="lg">
//         {/* ✅ Animated Heading */}
//         <Motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           <Typography
//             variant="h3"
//             sx={{
//               fontWeight: 700,
//               color: "#111E2C",
//               mb: 2,
//               textDecoration: "underline",
//               textDecorationThickness: "3px",
//             }}
//           >
//             Your Growth, Our Mission
//           </Typography>
//         </Motion.div>

//         {/* ✅ Animated Subtitle */}
//         <Motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           viewport={{ once: true }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               color: "#A9B23E",
//               mb: 4,
//             }}
//           >
//             We are Ready to Boost Your Business
//           </Typography>
//         </Motion.div>

//         {/* ✅ Animated Button */}
//         <Motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           <GradientButton
//             text="Contact Us Today!"
//             onClick={() => navigate("/contact")}
//           />
//         </Motion.div>
//       </Container>
//     </Box>
//   );
// };

// export default MissionSection;


import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MissionSection = () => {
  const navigate = useNavigate();
  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 6, md: 8 }, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography variant="subtitle2" sx={{ color: "primary.main", fontWeight: 600, mb: 1 }}>
          Our mission
        </Typography>
        <Typography component="h2" variant="h3" sx={{ color: "primary.dark", fontWeight: 700, mb: 1 }}>
          Your Growth, Our Mission
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 400, mb: 4 }}>
          We are ready to boost your business
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/contact")}
          sx={{ bgcolor: "accent.main", color: "primary.dark", borderRadius: 99, px: 3.5, py: 1.2, boxShadow: "none", "&:hover": { bgcolor: "accent.light", boxShadow: "none" } }}
        >
          Contact us today
        </Button>
      </Container>
    </Box>
  );
};

export default MissionSection;