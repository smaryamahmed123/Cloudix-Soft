import React from 'react';
import { Box,  } from '@mui/material';
import ContactForm from '../Components/ContactComps/ContactForm';
import ContactInfo from '../Components/ContactComps/ContactInfo';
import SocialIcons from '../Components/SocialIcons';
import HeroSection from '../Components/ContactComps/ContactHero';



const Contact = () => {
  return (
      <>
      <HeroSection />
      <Box sx={{ backgroundColor: "#111E2C",}}>
      <ContactInfo />
      </Box>
      <ContactForm />
      </>
  );
};

export default Contact;
