import { Box, Typography, IconButton } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WebsitePreview from "./WebsitePreview";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WebsiteDesignSection = () => {
  const [staticWebsites, setStaticWebsites] = useState([]);
  const [ecommerceWebsites, setEcommerceWebsites] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => {
        setStaticWebsites(data.filter((w) => w.category === "static"));
      setEcommerceWebsites(data.filter((w) => w.category === "ecommerce"));
      });
  }, []);

  const next = (list) => {
    setActiveIndex((prev) =>
      prev === list.length - 1 ? 0 : prev + 1
    );
  };

  const prev = (list) => {
    setActiveIndex((prev) =>
      prev === 0 ? list.length - 1 : prev - 1
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#111E2C",
        py: 14,
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 10 }}>
          Website Design & Development
        </Typography>
      </Motion.div>

      {/* ================= STATIC WEBSITES ================= */}
      <Typography
        variant="h2"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "transparent",
          WebkitTextStroke: "1px #A9B83880",
          mb: 6,
        }}
      >
        Static Websites
      </Typography>

      <Box sx={{ position: "relative", height: 460 }}>
        {staticWebsites.map((site, index) => (
          <WebsitePreview
            key={site._id}
            image={site.image}
            link={site.link}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 5 }}>
        <IconButton onClick={() => prev(staticWebsites)} sx={{ color: "#fff" }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={() => next(staticWebsites)} sx={{ color: "#fff" }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* ================= E-COMMERCE WEBSITES ================= */}
      <Typography
        variant="h2"
        sx={{
          mt: 14,
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "transparent",
          WebkitTextStroke: "1px #D9D9D980",
          mb: 6,
        }}
      >
        E-Commerce Websites
      </Typography>

      <Box sx={{ position: "relative", height: 460 }}>
        {ecommerceWebsites.map((site, index) => (
          <WebsitePreview
            key={site._id}
            image={site.image}
            link={site.link}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 5 }}>
        <IconButton onClick={() => prev(ecommerceWebsites)} sx={{ color: "#fff" }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={() => next(ecommerceWebsites)} sx={{ color: "#fff" }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default WebsiteDesignSection;
