import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Container, Typography, Box, useTheme, Skeleton } from "@mui/material";
import bgImg from "../assets/Privicy-bg.webp";
import HeroSection from "../Components/HeroSection";
import { parseRichText } from "../utils/parseRichText";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PrivacyPolicyUser = () => {
  const theme = useTheme();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/privacy-policy`);
        setSections(data.sections || []);
      } catch (error) {
        console.error("Error fetching policy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <Box sx={{ backgroundColor: theme.palette.background.subtle, minHeight: "100vh" }}>
      {/* 1. Page SEO Metadata */}
      <Helmet>
        <title>Privacy Policy | Cloudix Soft</title>
        <meta
          name="description"
          content="Read Cloudix Soft's Privacy Policy to understand how we collect, use, and protect your personal data and privacy."
        />
        <meta property="og:title" content="Privacy Policy | Cloudix Soft" />
        <meta
          property="og:description"
          content="Learn about Cloudix Soft's data privacy practices and commitment to user security."
        />
        <link rel="canonical" href="https://cloudixsoft.com/privacy-policy" />
      </Helmet>

      {/* 2. Hero Banner */}
      <HeroSection
        image={bgImg}
        title="Privacy Policy"
        subtitle="Learn how we collect, use, and protect your personal information."
      />

      {/* 3. Policy Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {loading ? (
          <Box sx={{ py: 4 }}>
            <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={120} sx={{ mb: 4, borderRadius: 2 }} />
            <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 2 }} />
          </Box>
        ) : sections.length === 0 ? (
          <Typography variant="body1" align="center" color="text.secondary">
            No privacy policy sections available at this time.
          </Typography>
        ) : (
          sections.map((section, index) => (
            <Box key={section._id || index} sx={{ mb: 5 }}>
              {/* Semantic H2 Section Title */}
              <Typography
                component="h2"
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.dark,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                {parseRichText(section.title)}
              </Typography>

              {/* Rich Paragraph Text */}
              <Typography
                variant="body1"
                component="div"
                sx={{
                  textAlign: "justify",
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                }}
              >
                {section.content.split("\n").map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {parseRichText(line)}
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