import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../Components/HomeComps/HomeHero";
import WhyChooseUs from "../Components/HomeComps/WhyChoose";
import OurClients from "../Components/HomeComps/OurClients";
import DecorativeCircle from "../Components/DecorativeCircle";
import ServicesSection from "../Components/ServicesComponents.jsx/ServicesSection";
import useDevice from "../hooks/useDevice";

const Home = () => {
  const { isLandscapeMobile } = useDevice();

  return (
    <Box sx={{ position: "relative", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
      {/* Decorative Circles — desktop & tablet only */}
      {!isLandscapeMobile && (
        <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <DecorativeCircle
            size={{ xs: 200, sm: 350, md: 550 }}
            innerSize={{ xs: 150, sm: 280, md: 450 }}
            position={{ top: 350, left: -230 }}
          />
          <DecorativeCircle
            size={{ xs: 250, sm: 400, md: 650 }}
            innerSize={{ xs: 200, sm: 330, md: 550 }}
            position={{ top: "50%", right: -450, transform: "translateY(-50%)" }}
          />
          <DecorativeCircle
            size={{ xs: 220, sm: 400, md: 600 }}
            innerSize={{ xs: 180, sm: 330, md: 550 }}
            position={{ bottom: -160, left: -160 }}
          />
        </Box>
      )}

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <WhyChooseUs />
        <Box sx={{ backgroundColor: "#111E2C", p: 5 }}>
          <ServicesSection limit={4} />
        </Box>
        <OurClients />
      </Box>
    </Box>
  );
};

export default Home;
