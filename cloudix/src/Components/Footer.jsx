import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Link, Container
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn
} from "@mui/icons-material";

import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import WhiteLogo from "/logo_white-removebg-preview-removebg-preview.webp";

const MotionBox = motion.create(Box);
const MotionGrid = motion.create(Grid);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const footerTitleStyle = {
  color: "#fff",
  fontWeight: 700,
  mb: 2,
  textAlign: { xs: "center", md: "left" },
};

const footerItemStyle = {
  color: "#fff",
  display: "block",
  mb: 1,
  fontSize: "0.9rem",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    color: "#BBBF19",
  },
};

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Footer = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!backendURL) {
      console.error("VITE_BACKEND_URL is not defined");
      return;
    }

    const controller = new AbortController();

    const fetchInfo = async () => {
      try {
        const res = await axios.get(
          `${backendURL}/api/contact-info`,
          { signal: controller.signal }
        );
        setInfo(res.data);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Footer API error:", err);
        }
      }
    };

    fetchInfo();

    return () => controller.abort();
  }, []);

  if (!info) return null;

  return (
    <MotionBox
      component="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Box
        sx={{
          bgcolor: "#111E2C",
          color: "#fff",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} justifyContent="space-between">

            {/* About */}
            <MotionGrid
              size={{ xs: 12, md: 3 }}
              variants={fadeUp}
              custom={1}
            >
              <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                <Logo src={WhiteLogo} size={60} />
              </Box>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  lineHeight: 1.6,
                  maxWidth: 300,
                  mx: { xs: "auto", md: 0 },
                  textAlign: "justify",
                }}
              >
                {info.description}
              </Typography>

              <Box sx={{ display: { xs: "none", md: "flex" }, mt: 2 }}>
                <SocialIcons circle={false} size="medium" />
              </Box>
            </MotionGrid>

            {/* Links */}
            <MotionGrid
              size={{ xs: 12, md: 4 }}
              variants={fadeUp}
              custom={2}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                gap: { xs: 3, md: 8 },
              }}
            >
              <Box component="nav">
                <Typography variant="h6" sx={footerTitleStyle}>Quick Links</Typography>
                <Link component={RouterLink} to="/" sx={footerItemStyle}>Home</Link>
                <Link component={RouterLink} to="/services" sx={footerItemStyle}>Services</Link>
                <Link component={RouterLink} to="/blogs" sx={footerItemStyle}>Blogs</Link>
                <Link component={RouterLink} to="/portfolio" sx={footerItemStyle}>Portfolio</Link>
                <Link component={RouterLink} to="/contact" sx={footerItemStyle}>Contact</Link>
              </Box>

              <Box component="nav">
                <Typography variant="h6" sx={footerTitleStyle}>About Us</Typography>
                <Link component={RouterLink} to="/about" sx={footerItemStyle}>About Us</Link>
                <Link component={RouterLink} to="/privacy-policy" sx={footerItemStyle}>
                  Privacy Policy
                </Link>
              </Box>
            </MotionGrid>

            {/* Contact */}
            <MotionGrid
              size={{ xs: 12, md: 4 }}
              variants={fadeUp}
              custom={3}
            >
              <Typography variant="h6" sx={footerTitleStyle}>Contact Us</Typography>

              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                  <Phone sx={{ color: "#769914", mr: 1 }} fontSize="small" />
                  <Link href={`tel:${info.phone}`} sx={footerItemStyle}>
                    {info.phone}
                  </Link>
                </Box>

                <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                  <Email sx={{ color: "#769914", mr: 1 }} fontSize="small" />
                  <Link href={`mailto:${info.email}`} sx={footerItemStyle}>
                    {info.email}
                  </Link>
                </Box>

                <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                  <LocationOn sx={{ color: "#769914", mr: 1 }} fontSize="small" />
                  <Typography sx={{ ...footerItemStyle, lineHeight: 1.5 }}>
                    {info.address}
                  </Typography>
                </Box>
              </Box>
            </MotionGrid>
          </Grid>

          {/* Bottom */}
          <MotionBox variants={fadeUp} custom={4} sx={{ mt: 6, pt: 3, borderTop: "1px solid #333" }}>
            <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center", mb: 2 }}>
              <SocialIcons circle={false} size="small" />
            </Box>

            <Typography variant="caption" display="block" align="center">
              © {new Date().getFullYear()} Cloudix Soft. All rights reserved.
            </Typography>
          </MotionBox>
        </Container>
      </Box>
    </MotionBox>
  );
};

export default Footer;
