import React, { memo } from "react";
import { Box } from "@mui/material";
import HeroSection from "../HeroSection"; // adjust path to match your actual folder structure
import ContactBg from "../../assets/contact-bg.webp";

const ContactHero = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroSection
      image={ContactBg}
      eyebrow="Let's Work Together"
      title={
        <>
          Let&apos;s Build
          <Box component="span" sx={{ display: "block", color: (theme) => theme.palette.secondary.main }}>
            Something Great.
          </Box>
        </>
      }
      description="Have an idea, a business challenge, or a project in mind? Tell us about it and let's turn your vision into a digital solution."
      buttonText="Start Your Project"
      onButtonClick={scrollToForm}
      decorations={
        <>
          <Box
            sx={{
              position: "absolute",
              width: { xs: 180, md: 350 },
              height: { xs: 180, md: 350 },
              right: { xs: -80, md: 80 },
              top: { xs: 50, md: 80 },
              border: "1px solid rgba(187,191,25,0.25)",
              transform: "rotate(45deg)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              width: { xs: 100, md: 200 },
              height: { xs: 100, md: 200 },
              right: { xs: 20, md: 260 },
              bottom: { xs: -50, md: 40 },
              background:
                "linear-gradient(135deg, rgba(118,153,20,0.25), rgba(187,191,25,0.05))",
              transform: "rotate(45deg)",
              borderRadius: 2,
            }}
          />
        </>
      }
    />
  );
};

export default memo(ContactHero);