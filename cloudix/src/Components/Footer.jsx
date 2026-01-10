import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, Typography, Link } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import WhiteLogo from '/logo_white-removebg-preview-removebg-preview.webp';

import Logo from './Logo';
import SocialIcons from './SocialIcons';
const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const footerTitleStyle = {
  color: '#FFFFFF',
  fontWeight: 'bold',
  mb: 2,
  textAlign: { xs: 'center', md: 'left' },
};

const footerItemStyle = {
  color: '#FFFFFF',
  display: 'block',
  mb: 1,
  textDecoration: 'none',
  fontSize: '0.9rem',
  textAlign: 'center',
  '&:hover': {
    color: '#BBBF19',
    textDecoration: 'none',
  },
};

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Footer = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios.get(`${backendURL}/api/contact-info`)
      .then((res) => setInfo(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!info) return null;

  return (
    <MotionBox component="footer" initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Box sx={{ bgcolor: '#111E2C', color: '#fff', px: { xs: 3, md: 8 }, py: 6 }}>
        <Grid container spacing={6} justifyContent="space-between">

          {/* Column 1 - About */}
          <MotionGrid
            size={
              {
                xs: 12,
                md: 3
              }
            }
            variants={fadeUp}
            custom={1}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
              <Logo src={WhiteLogo} size={60} />
            </Box>

            <Typography
              variant="body2"
              sx={{ mb: 2, lineHeight: 1.6, maxWidth: 300, mx: { xs: "auto", md: 0 }, textAlign: "justify" }}
            >
              {info.description}
            </Typography>

            {/* Show Social icons only on desktop here */}
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "flex-start" }}>
              <SocialIcons circle={false} size="medium" />
            </Box>
          </MotionGrid>

          {/* Column 2 & 3 merged for mobile */}
          <MotionGrid
            size={{
              xs: 12,
              md: 4
            }}
            variants={fadeUp}
            custom={2}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: { xs: "center", md: "space-between" },
              gap: { xs: 3, md: 8 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            <Box>
              <Typography variant="h6" sx={footerTitleStyle}>Quick Links</Typography>
              <Link component={RouterLink} to="/" sx={footerItemStyle}>Home</Link>
              <Link component={RouterLink} to="/services" sx={footerItemStyle}>Services</Link>
              <Link component={RouterLink} to="/blogs" sx={footerItemStyle}>Blogs</Link>
              <Link component={RouterLink} to="/portfolio" sx={footerItemStyle}>Portfolio</Link>
              <Link component={RouterLink} to="/contact" sx={footerItemStyle}>Contact</Link>


            </Box>

            <Box>
              <Typography variant="h6" sx={footerTitleStyle}>About Us</Typography>
              <Link component={RouterLink} to="/about" sx={footerItemStyle}>About Us</Link>
              <Link component={RouterLink} to="/privacy-policy" sx={footerItemStyle}>Privacy Policy</Link>
            </Box>
          </MotionGrid>

          {/* Column 4 - Contact */}
          <MotionGrid
            size={{
              xs: 12,
              md: 4
            }}
            variants={fadeUp}
            custom={3}
            sx={{ textAlign: { xs: 'left', md: 'left' } }}
          >
            <Typography variant="h6" sx={footerTitleStyle}>Contact Us</Typography>

            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
                <Phone sx={{ color: "#BBBF19", mr: 1 }} fontSize="small" />
                <Link href={`tel:${info.phone}`} sx={footerItemStyle}>{info.phone}</Link>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
                <Email sx={{ color: "#BBBF19", mr: 1 }} fontSize="small" />
                <Link href={`mailto:${info.email}`} sx={footerItemStyle}>{info.email}</Link>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: { xs: "center", md: "flex-start" } }}>
                <LocationOn sx={{ color: "#BBBF19", mr: 1, mt: "2px" }} fontSize="small" />
                <Typography component="span" sx={{ ...footerItemStyle, lineHeight: 1.5 }}>
                  {info.address}
                </Typography>
              </Box>
            </Box>
          </MotionGrid>
        </Grid>

        {/* Bottom Line & Social icons on mobile */}
        <MotionBox
          variants={fadeUp}
          custom={4}
          sx={{
            mt: 6,
            borderTop: '1px solid #333',
            pt: 2,
            textAlign: 'center',
          }}
        >
          {/* Social icons moved to bottom for mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", mb: 2 }}>
            <SocialIcons circle={false} size="small" />
          </Box>

          <Typography variant="caption">
            © {new Date().getFullYear()} . All rights reserved by Cloudix Soft
          </Typography>
        </MotionBox>
      </Box>
    </MotionBox>
  );
};

export default Footer;

