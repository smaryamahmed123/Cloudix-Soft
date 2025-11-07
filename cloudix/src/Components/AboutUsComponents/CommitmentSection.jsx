import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import ShariahImage from "../../assets/Shariah-compliance.png"; // fallback image

const CommitmentSection = ({ compliance }) => {
  if (!compliance) return null;

  // ✅ Ensure proper backend image URL
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const imageSrc = compliance.image?.startsWith("http")
    ? compliance.image
    : `${backendURL}${compliance.image}`;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#fff",
        color: "#111E2C",
        px: { xs: 3, md: 8 },
      }}
    >
      {/* ---- Centered Heading ---- */}
      <Typography
        component={motion.h4}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true }}
        variant="h4"
        sx={{
          fontWeight: 800,
          lineHeight: 1.3,
          color: "#111E2C",
          textAlign: "center",
          mb: 6,
          textDecoration: "underline",
        }}
      >
        {compliance.title}
      </Typography>

      {/* ---- Paragraph + Image in Row ---- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          width: "100%",
          height: "100%",
        }}
      >
        {/* ---- Left: Paragraph ---- */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          sx={{
            flex: 1,
            maxWidth: "600px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.3rem",
              mb: 6,
              color: "#111E2C",
              lineHeight: 1.8,
              textAlign: "justify",
            }}
          >
            {compliance.description}
          </Typography>
        </Box>

        {/* ---- Right: Image ---- */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          sx={{
            position: "relative",
            display: "inline-block",
            overflow: "hidden",
            maxWidth: { xs: "100%", md: "50%", lg: "100%" },
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              width: "50%",
              height: "50%",
              border: "5px solid #111E2C",
            },
            "&::before": {
              top: 0,
              left: 0,
              borderRight: "none",
              borderBottom: "none",
            },
            "&::after": {
              bottom: 0,
              right: 0,
              borderLeft: "none",
              borderTop: "none",
            },
          }}
        >
          <Box
            component={motion.img}
            src={imageSrc || ShariahImage}
            alt="Shariah Compliance"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CommitmentSection;
