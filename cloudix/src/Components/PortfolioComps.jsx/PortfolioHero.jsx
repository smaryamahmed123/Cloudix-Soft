import React from "react";
import HeroSection from "../HeroSection";
import PortfolioBg from "../../assets/Portfolio-bg.webp";

const PortfolioPage = () => {
  return (
    <>
      <HeroSection
        image={PortfolioBg}
        title="Our Portfolio"
        subtitle="Showcasing our creativity through real-world digital solutions."
      />
      {/* Other content */}
    </>
  );
};

export default PortfolioPage;
