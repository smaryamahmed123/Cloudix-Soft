import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, useTheme } from '@mui/material';
import bgImg from '../assets/Privicy-bg.png';
import HeroSection from '../Components/HeroSection'; // ✅ import

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
    <Box sx={{ backgroundColor: theme.palette.background.subtle,}}>

      {/* ✅ Reusable Hero Section */}
      <HeroSection
        image={bgImg}
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your personal information."
      />

      {/* Policy Content */}
      <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
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
