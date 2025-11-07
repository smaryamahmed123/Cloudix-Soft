import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box } from '@mui/material';
import bgImg from '../assets/Privicy-bg.png'; // ✅ Import image properly

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PrivacyPolicyUser = () => {
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
    <Box sx={{ backgroundColor: '#f9fafc', minHeight: '100vh', }}>
      {/* Header Section with Background Image */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to right, rgba(17,30,44,0.8), rgba(17,30,44,0) 70%), url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',
          py: { xs: 10, md: 14 },
          height: '100vh',
          textAlign: 'center',
          borderRadius: '0 0 40px 40px',
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            zIndex: 1,
          }}
        />
        {/* Header Text */}
        <Box sx={{ position: 'relative', zIndex: 2, }}>
          <Typography variant="h3" sx={{ fontWeight: 600, color: 'white', }}>
            Privacy Policy
          </Typography>
        </Box>
      </Box>

      {/* Policy Content */}
      <Container maxWidth="md">
        {sections.length === 0 ? (
          <Typography variant="body1" align="center">
            No privacy policy available.
          </Typography>
        ) : (
          sections.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 600, color: '#111E2C' }}
              >
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  textAlign: 'justify',
                  color: '#333',
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
