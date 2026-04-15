import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, useTheme } from '@mui/material';
import bgImg from '../assets/Privicy-bg.webp';
import HeroSection from '../Components/HeroSection';
import { parseRichText } from '../utils/parseRichText'; // ✅ import parser

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
    <Box sx={{ backgroundColor: theme.palette.background.subtle }}>
      <HeroSection
        image={bgImg}
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your personal information."
      />

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, }}>
        {sections.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary">
            No privacy policy available.
          </Typography>
        ) : (
          sections.map((section, index) => (
            <Box key={index} sx={{ mb: 5 }}>
              {/* Section heading — supports **bold** and [links](url) */}
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                }}
              >
                {parseRichText(section.title)}
              </Typography>

              {/*
                Content: split by newlines first so line breaks are preserved,
                then parse each line for bold/links.
              */}
              <Typography
                variant="body1"
                component="div"            // ✅ use div so <p> nesting is valid
                sx={{
                  textAlign: 'justify',
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                }}
              >
                {section.content
                  .split('\n')
                  .map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {parseRichText(line)}
                      {/* Preserve line breaks except after the last line */}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
              </Typography>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default PrivacyPolicyUser;
