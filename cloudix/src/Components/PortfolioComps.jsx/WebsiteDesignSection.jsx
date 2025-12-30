import { Box, Typography, Grid } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import WebsitePreview from "./WebsitePreview";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WebsiteDesignSection = () => {
  const [staticWebsites, setStaticWebsites] = useState([]);
  const [ecommerceWebsites, setEcommerceWebsites] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => {
        setStaticWebsites(data.filter(w => w.category === "static"));
        setEcommerceWebsites(data.filter(w => w.category === "ecommerce"));
      });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#0b1220",
        py: 14,
        color: "#fff",
      }}
    >
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" align="center" fontWeight={700} mb={2}>
          Website Design & Development
        </Typography>

        <Typography align="center" color="rgba(255,255,255,0.7)" mb={10}>
          Modern, responsive, and high-performance websites built with React & MERN stack.
        </Typography>
      </Motion.div>

      {/* STATIC WEBSITES */}
      <Typography variant="h5" align="center" mb={5}>
        Static Websites
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {staticWebsites.map(site => (
          <Grid item xs={12} md={4} key={site._id}>
            <WebsitePreview image={site.image} link={site.link} />
          </Grid>
        ))}
      </Grid>

      {/* E-COMMERCE WEBSITES */}
      <Typography variant="h5" align="center" mt={12} mb={5}>
        E-Commerce Websites
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {ecommerceWebsites.map(site => (
          <Grid item xs={12} md={4} key={site._id}>
            <WebsitePreview image={site.image} link={site.link} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WebsiteDesignSection;
