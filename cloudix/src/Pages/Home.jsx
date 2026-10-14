import React, { lazy, useEffect, useState } from "react";
import Defer from "../Components/Defer";
import axios from "axios";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import HeroSection from "../Components/HomeComps/HomeHero";

const OurClients = lazy(() => import("../Components/HomeComps/OurClients"));
const WhyChooseUs = lazy(() => import("../Components/HomeComps/WhyChoose"));
const FeaturedWork = lazy(() => import("../Components/HomeComps/FeaturedWork"));
const Testimonials = lazy(() => import("../Components/HomeComps/Testimonials"));
const AboutContent = lazy(() => import("../Components/AboutUsComponents/AboutContent"));
const ServicesSection = lazy(() => import("../Components/ServicesComponents.jsx/ServicesSection"));

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
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

      <Box component="main" sx={{ position: "relative", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <HeroSection />
          <Defer minHeight={500}><AboutContent intro={intro} /></Defer>
          <Box sx={{ backgroundColor: "#111E2C", p: 2 }}>
            <Defer minHeight={600}><ServicesSection limit={4} /></Defer>
          </Box>
          <Defer minHeight={1100}><FeaturedWork /></Defer>
          <Defer minHeight={600}><WhyChooseUs /></Defer>
          <Defer minHeight={600}><Testimonials /></Defer>
          <Defer minHeight={400}><OurClients /></Defer>
        </Box>
      </Box>
    </>
  );
};

export default Home;