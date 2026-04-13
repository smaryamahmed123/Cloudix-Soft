import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import HeroSection from "../Components/HomeComps/HomeHero";
import AboutContent from "../Components/AboutUsComponents/AboutContent";
import WhyChooseUs from "../Components/HomeComps/WhyChoose";
import OurClients from "../Components/HomeComps/OurClients";
import ServicesSection from "../Components/ServicesComponents.jsx/ServicesSection";
import useDevice from "../hooks/useDevice";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const { isLandscapeMobile } = useDevice();
  const [intro, setIntro] = useState(null);

useEffect(() => {
  axios.get(`${backendURL}/api/about`)
    .then(res => setIntro(res.data.intro))
    .catch(err => console.error(err));
}, []);

  return (
    <Box sx={{ position: "relative", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutContent intro={intro} />
        <Box sx={{ backgroundColor: "#111E2C", p: 2 }}>
          <ServicesSection limit={4} />
        </Box>
        <WhyChooseUs />
        <OurClients />
      </Box>
    </Box>
  );
};

export default Home;
