import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardMedia, Container } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion"; // ✨ Add Framer Motion

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LogoDesignSection = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    axios.get(`${backendURL}/api/logos`).then((res) => setLogos(res.data));
  }, []);

  // ✨ Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <Box sx={{ bgcolor: "#D9D9D9", position: "relative", zIndex: 2, pb: 10 }}>
      <Container maxWidth="lg" sx={{ pt: 8 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 5, color: "#111E2C" }}
        >
          Logo Design
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {logos.map((logo, index) => (
            <Grid
              key={index}
              sx={{
                gridColumn: { xs: "span 12", sm: "span 6", md: "span 4", lg: "span 3" },
                display: "flex",
                justifyContent: "center",
              }}
              component={motion.div}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  p: 2,
                  boxShadow: "5px 5px 12px rgba(17, 30, 44, 1)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#C6C7C8",
                  width: { xs: 160, sm: 180, md: 200, lg: 220 },
                  height: { xs: 160, sm: 180, md: 200, lg: 220 },
                  "&:hover": {
                    width: { xs: 200, sm: 220, md: 240, lg: 260 },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={logo.image}
                  alt={logo.title}
                  sx={{
                    maxHeight: { xs: 120, sm: 140, md: 160 },
                    maxWidth: { xs: 120, sm: 140, md: 160 },
                    objectFit: "contain",
                    bgcolor: "#C6C7C8",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LogoDesignSection;
