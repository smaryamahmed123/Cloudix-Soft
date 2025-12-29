import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import WebsitePreview from "./WebsitePreview";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const WebsiteDesignSection = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    fetch(`${backendURL}/api/websites`) // Replace with actual backend URL
      .then(res => res.json())
      .then(data => setWebsites(data))
      .catch(err => console.error("Failed to fetch websites:", err));
  }, []);

  return (
    <Box sx={{ bgcolor: "#111E2C", py: 10, color: "#fff", textAlign: "center" }}>
      {/* Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 10 }}>
          Website Development & Designing
        </Typography>
      </Motion.div>

      {/* Categories */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <Typography
          variant="h2"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "transparent",
            WebkitTextStroke: "1px #A9B83880",
            mb: 4,
          }}
        >
          Static Website
        </Typography>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <Typography
          variant="h2"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "transparent",
            WebkitTextStroke: "1px #D9D9D980",
            mb: 8,
          }}
        >
          E-commerce Website
        </Typography>

        {/* Website Previews */}
        <Box
          sx={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {websites.map(site => (
            <WebsitePreview key={site._id} image={site.image} link={site.link} />
          ))}
        </Box>
      </Motion.div>
    </Box>
  );
};

export default WebsiteDesignSection;
