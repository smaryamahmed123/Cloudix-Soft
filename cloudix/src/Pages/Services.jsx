import React from "react";
import { Helmet } from "react-helmet-async";
import { Container, Paper, Typography, useTheme } from "@mui/material";

import ServicesHero from "../Components/ServicesComponents.jsx/ServicesHero";
import WorkTogether from "../Components/ServicesComponents.jsx/WorkTogether";
import MissionSection from "../Components/ServicesComponents.jsx/MissionSection";
import ServicesSection from "../Components/ServicesComponents.jsx/ServicesSection";

const Services = () => {
  const theme = useTheme();

  return (
    <>
      {/* 1. Page SEO Metadata */}
      <Helmet>
        <title>Our Services | Web & Mobile App Development - Cloudix Soft</title>
        <meta
          name="description"
          content="Explore Cloudix Soft's full range of custom web development, mobile app development, e-commerce solutions, and ethical digital marketing services."
        />
        <meta property="og:title" content="Our Services | Cloudix Soft" />
        <meta
          property="og:description"
          content="Custom web development, mobile apps, e-commerce, and digital marketing services."
        />
        <link rel="canonical" href="https://cloudixsoft.com/services" />
      </Helmet>

      {/* 2. Hero & Core Services */}
      <ServicesHero />
      <ServicesSection limit="all" />

      {/* 3. Ethical Guarantee Banner */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 2,
            backgroundColor: "#111E2C",
            color: "#fff",
            textAlign: "center",
            border: "1px solid #A9B838",
          }}
        >
          <Typography
            component="h3"
            variant="h5"
            sx={{ fontWeight: 700, mb: 1, color: "#A9B838" }}
          >
            Transparent & Ethical Delivery Guaranteed
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 750, mx: "auto", opacity: 0.9, lineHeight: 1.6 }}
          >
            All projects delivered by Cloudix Soft operate under clear, fixed-price contracts with zero hidden charges, full data ownership, and strict adherence to Shariah-compliant business ethics.
          </Typography>
        </Paper>
      </Container>

      {/* 4. Conversion & Mission Sections */}
      <WorkTogether />
      <MissionSection />
    </>
  );
};

export default Services;