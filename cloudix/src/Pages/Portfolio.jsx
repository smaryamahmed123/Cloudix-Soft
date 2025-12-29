// import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import PortfolioHero from '../Components/PortfolioComps.jsx/PortfolioHero';
import PostDesignSection from '../Components/PortfolioComps.jsx/PostDesignSection';
import LogoDesignSection from '../Components/PortfolioComps.jsx/LogoDesignSection';
import WebsiteDesignSection from '../Components/PortfolioComps.jsx/WebsiteDesignSection';
import PortfolioSection3 from '../Components/PortfolioComps.jsx/PortfolioSection3';
import ContactForm from '../Components/ContactComps/ContactForm';

export default function MarketingAgencyPortfolio() {
  return (
    <>
    <PortfolioHero />
    <LogoDesignSection />
    <WebsiteDesignSection />
    <PostDesignSection />
    <PortfolioSection3 />
    <ContactForm />
    </>
  );
}
