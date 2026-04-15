import React, { memo } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ContactBg from "../../assets/contact-bg.webp";
import HeroSection from "../HeroSection";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);


const ContactHero = () => {
  return (
    <>
      <HeroSection
        image={ContactBg}
        title="Contact Us"
        subtitle="We’re here to help! Reach out to us for support, inquiries, or collaboration. “Cloudix Soft”  Your Trusted IT Partner."
      />
    </>
  );
};

export default memo(ContactHero);
