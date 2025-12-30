import { Box, Typography, IconButton } from "@mui/material";
import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import WebsitePreview from "./WebsitePreview";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WebsiteDesignSection = () => {
  const [websites, setWebsites] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${backendURL}/api/websites`)
      .then((res) => res.json())
      .then((data) => setWebsites(data))
      .catch((err) => console.error("Failed to fetch websites:", err));
  }, []);

  const next = () => {
    setActiveIndex((prev) =>
      prev === websites.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? websites.length - 1 : prev - 1
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#111E2C",
        py: 12,
        color: "#fff",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
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

      {/* Background Ghost Text */}
      <Typography
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: { xs: "4rem", md: "9rem" },
          fontWeight: 800,
          color: "rgba(255,255,255,0.03)",
          whiteSpace: "nowrap",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        E-COMMERCE WEBSITE
      </Typography>

      {/* Foreground Title */}
      <Typography
        variant="h2"
        sx={{
          position: "relative",
          zIndex: 1,
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "transparent",
          WebkitTextStroke: "1px #D9D9D980",
          mb: 10,
        }}
      >
        E-commerce Website
      </Typography>

      {/* Website Stack */}
      <Box
        sx={{
          position: "relative",
          height: 460,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {websites.map((site, index) => (
          <WebsitePreview
            key={site._id}
            image={site.image}
            link={site.link}
            index={index}
            activeIndex={activeIndex}
          />
        ))}
      </Box>

      {/* Arrow Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          mt: 6,
        }}
      >
        <IconButton
          onClick={prev}
          sx={{
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={next}
          sx={{
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default WebsiteDesignSection;
