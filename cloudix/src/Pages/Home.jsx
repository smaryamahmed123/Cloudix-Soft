import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import useDevice from "../hooks/useDevice";
import HeroSection from "../Components/HomeComps/HomeHero";
import WhyChooseUs from "../Components/HomeComps/WhyChoose";
import OurClients from "../Components/HomeComps/OurClients";
import Testimonials from "../Components/HomeComps/Testimonials";
import FeaturedWork from "../Components/HomeComps/FeaturedWork";
import AboutContent from "../Components/AboutUsComponents/AboutContent";
import ServicesSection from "../Components/ServicesComponents.jsx/ServicesSection";

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
        <FeaturedWork />
        <WhyChooseUs />
        <Testimonials />
        <OurClients />
      </Box>
    </Box>
  );
};

export default Home;
