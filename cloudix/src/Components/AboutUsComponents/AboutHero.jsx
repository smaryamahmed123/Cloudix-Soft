import React from "react";
import { Box, Typography } from "@mui/material";
// import { motion } from "framer-motion";
import AboutBg from "../../assets/aboutus-bg.webp";
import HeroSection from "../HeroSection";



const AboutHero = () => {
  return (
      <HeroSection
        image={AboutBg}
        title="About Us"
        subtitle="Welcome to Cloudix Soft, Pakistan’s first Shariah-compliant IT company."
      />
      {/* Other content */}
    </>
  );
};

export default AboutHero;
