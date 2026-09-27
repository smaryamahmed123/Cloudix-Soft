import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Cloudix Soft | Web Development, Mobile Apps & Digital Marketing</title>
        <meta
          name="description"
          content="Cloudix Soft provides custom web development, mobile apps, e-commerce solutions, and ethical digital marketing to grow your business. Request a quote!"
        />
        <meta property="og:title" content="Cloudix Soft | Web & Mobile App Development Company" />
        <meta
          property="og:description"
          content="Custom web development, mobile apps, e-commerce, and digital marketing services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cloudixsoft.com/og-image.jpg" />
        <meta property="og:url" content="https://cloudixsoft.com/" />
        <link rel="canonical" href="https://cloudixsoft.com/" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Cloudix Soft",
            url: "https://cloudixsoft.com/",
            logo: "https://cloudixsoft.com/logo.png",
            description:
              "Cloudix Soft offers custom web development, mobile app creation, e-commerce, and digital marketing services.",
            priceRange: "$$",
          })}
        </script>
      </Helmet>

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
    </>
  );
};

export default Home;