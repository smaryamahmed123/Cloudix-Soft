import React from "react";
import HeroSection from "../HeroSection"; // adjust path to match your actual folder structure
import HeroImg from "../../assets/services-bg.webp"; // laptop / desk photo from new design

const ServicesHero = () => {
  return (
    <HeroSection
      image={HeroImg}
      eyebrow="Digital solutions for a brighter tomorrow"
      title="Our Services"
      highlight="At Cloudix Soft, we offer a variety of services to help your business grow."
      description="From creative campaigns to powerful digital solutions, we help brands build, engage and grow in the digital world."
      buttonText="Explore our services"
      onButtonClick={() =>
        document.getElementById("what-we-offer")?.scrollIntoView({ behavior: "smooth" })
      }
    />
  );
};

export default ServicesHero;