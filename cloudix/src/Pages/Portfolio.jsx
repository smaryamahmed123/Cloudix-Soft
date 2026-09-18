import React, { useEffect } from "react";
import { Helmet } from 'react-helmet-async';
import PortfolioHero from '../Components/PortfolioComps.jsx/PortfolioHero';
import PostDesignSection from '../Components/PortfolioComps.jsx/PostDesignSection';
import LogoDesignSection from '../Components/PortfolioComps.jsx/LogoDesignSection';
import WebsiteDesignSection from '../Components/PortfolioComps.jsx/WebsiteDesignSection';
import PortfolioSection3 from '../Components/PortfolioComps.jsx/PortfolioSection3';
import ContactForm from '../Components/ContactComps/ContactForm';

export default function MarketingAgencyPortfolio() {

  useEffect(() => {
    // If there is no hash, start at the top
    if (!window.location.hash) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });

      return;
    }

    const sectionId = window.location.hash.substring(1);

    // Wait for the portfolio sections to render
    setTimeout(() => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Portfolio | Web Design, Logos & Graphics - Cloudix Soft</title>
        <meta
          name="description"
          content="Explore Cloudix Soft's portfolio showcasing e-commerce websites, custom web applications, social media post designs, and brand logos."
        />
        <meta property="og:title" content="Our Portfolio | Cloudix Soft" />
        <meta
          property="og:description"
          content="Real-world digital solutions: website development, branding, and graphic design showcase."
        />
        <link rel="canonical" href="https://cloudixsoft.com/portfolio" />
      </Helmet>

      <PortfolioHero />
      <LogoDesignSection />
      <WebsiteDesignSection />
      <PostDesignSection />
      <PortfolioSection3 />
      <ContactForm />
    </>
  );
}