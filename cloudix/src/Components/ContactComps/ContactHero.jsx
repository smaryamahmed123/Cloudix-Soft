import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import heroBg from "../../assets/BGcontact.webp"; // 👉 Contact hero background

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const ContactHero = () => {
  return (
    <MotionBox
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        position: "relative",
        backgroundImage: `linear-gradient(rgba(17,30,44,0.8), rgba(17,30,44,0.8)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: { xs: "70vh", sm: "80vh", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        px: { xs: 2, sm: 4, md: 8 },
        overflowX: "hidden",
        width: "100%",
        mx: "auto",
        boxShadow: "0px 4px 12px rgba(17, 30, 44, 1)",
      }}
    >
      {/* Heading */}
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
          fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem", lg: "4rem" },
          textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
        }}
      >
        Contact Us
      </MotionTypography>

      {/* Subheading */}
      <MotionTypography
        variants={fadeUp}
        custom={2}
        initial="hidden"
        animate="visible"
        variant="body1"
        sx={{
          color: "#D4E157",
          maxWidth: "700px",
          lineHeight: 1.6,
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem", lg: "1.75rem" },
          px: { xs: 2, sm: 0 },
        }}
      >
        We’re here to help! Reach out to us for support, inquiries, or collaboration. <br />
        <span style={{ color: "#A9B838" }}>"Cloudix Soft" Your Trusted IT Partner.</span>
      </MotionTypography>
    </MotionBox>
  );
};

export default ContactHero;
