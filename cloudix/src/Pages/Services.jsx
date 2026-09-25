import React from "react";
import { Helmet } from "react-helmet-async";

import ServicesHero from "../Components/ServicesComponents.jsx/ServicesHero";
import ServicesShowcase from "../Components/ServicesComponents.jsx/ServicesShowcase";
import ProcessSection from "../Components/ServicesComponents.jsx/ProcessSection";
import WhyChoose from "../Components/ServicesComponents.jsx/WhyChoose";
import WorkTogether from "../Components/ServicesComponents.jsx/WorkTogether";
import MissionSection from "../Components/ServicesComponents.jsx/MissionSection";

const Services = () => (
  <>
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

    <ServicesHero />
    <ServicesShowcase />
    <ProcessSection />
    <WhyChoose />
    <WorkTogether />
    <MissionSection />
  </>
);

export default Services;