import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, useTheme } from '@mui/material';
import bgImg from '../assets/Privicy-bg.png';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PrivacyPolicyUser = () => {
  const theme = useTheme();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/privacy-policy`);
        setSections(data.sections || []);
      } catch (error) {
        console.error('Error fetching policy:', error);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.subtle, minHeight: '100vh' }}>

      {/* ✅ Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(17,30,44,0.85), rgba(17,30,44,0.3) 70%), url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: { xs: '50vh', md: '60vh' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 0 40px 40px',
          mb: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1,
          }}
        />

        {/* Hero Text */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.accent.light,
              fontWeight: 600,
              letterSpacing: '0.15em',
              mb: 1,
              display: 'block',
            }}
          >
            Cloudix Soft
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.common.white,
              mb: 2,
              // ✅ theme responsiveFontSizes handles size
            }}
          >
            Privacy Policy
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.75)',
              maxWidth: 520,
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Learn how we collect, use, and protect your personal information.
          </Typography>
        </Container>
      </Box>

      {/* Policy Content */}
      <Container maxWidth="md" sx={{ pb: { xs: 8, md: 12 } }}>
        {sections.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary">
            No privacy policy available.
          </Typography>
        ) : (
          sections.map((section, index) => (
            <Box key={index} sx={{ mb: 5 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                  // ✅ theme handles size
                }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  textAlign: 'justify',
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                }}
              >
                {section.content}
              </Typography>
            </Box>
          ))
        )}
      </Container>

    </Box>
  );
};

export default PrivacyPolicyUser;
