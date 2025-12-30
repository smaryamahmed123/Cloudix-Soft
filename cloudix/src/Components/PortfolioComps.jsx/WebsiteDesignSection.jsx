import { Box, Typography, Grid, IconButton } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WebsitePreview from "./WebsitePreview";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WebsiteDesignSection = () => {
  const [staticWebsites, setStaticWebsites] = useState([]);
  const [ecommerceWebsites, setEcommerceWebsites] = useState([]);

  // Track current index for each category
  const [staticIndex, setStaticIndex] = useState(0);
  const [ecommerceIndex, setEcommerceIndex] = useState(0);

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => {
        setStaticWebsites(data.filter((w) => w.category === "static"));
        setEcommerceWebsites(data.filter((w) => w.category === "ecommerce"));
      });
  }, []);

  const handlePrev = (category) => {
    if (category === "static") {
      setStaticIndex((prev) => (prev === 0 ? staticWebsites.length - 1 : prev - 1));
    } else {
      setEcommerceIndex((prev) => (prev === 0 ? ecommerceWebsites.length - 1 : prev - 1));
    }
  };

  const handleNext = (category) => {
    if (category === "static") {
      setStaticIndex((prev) => (prev === staticWebsites.length - 1 ? 0 : prev + 1));
    } else {
      setEcommerceIndex((prev) => (prev === ecommerceWebsites.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <Box sx={{ bgcolor: "#0b1220", py: 14, color: "#fff" }}>
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
      {staticWebsites.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={10}>
          <IconButton onClick={() => handlePrev("static")} sx={{ color: "#fff" }}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <WebsitePreview
            image={staticWebsites[staticIndex].image}
            link={staticWebsites[staticIndex].link}
          />

          <IconButton onClick={() => handleNext("static")} sx={{ color: "#fff" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}

      {/* E-COMMERCE WEBSITES */}
      <Typography variant="h5" align="center" mb={5}>
        E-Commerce Websites
      </Typography>
      {ecommerceWebsites.length > 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
          <IconButton onClick={() => handlePrev("ecommerce")} sx={{ color: "#fff" }}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <WebsitePreview
            image={ecommerceWebsites[ecommerceIndex].image}
            link={ecommerceWebsites[ecommerceIndex].link}
          />

          <IconButton onClick={() => handleNext("ecommerce")} sx={{ color: "#fff" }}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default WebsiteDesignSection;
