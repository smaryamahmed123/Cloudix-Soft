// src/components/DiagonalStrip.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion";

/**
 * DiagonalStrip Component
 * A reusable animated diagonal strip with scrolling text using Framer Motion.
 *
 * Props:
 * - texts: array of strings to scroll (e.g. ["Development", "Branding", "E-Commerce"])
 * - bgColor: background color of the strip (default: "#A9B838")
 * - textColor: color of the text (default: "#111E2C")
 * - dotColor: color of the separator dot (default: same as textColor)
 * - borderColor: border color (default: same as bgColor)
 * - angle: diagonal rotation angle (default: 40)
 * - duration: animation duration (default: 15 seconds)
 * - position: vertical position ("top", "center", "bottom") or custom (default: "50%")
 * - zIndex: layering control (default: 3)
 */
export default function DiagonalStrip({
  texts = ["Development", "Branding", "E-Commerce", "Editing", "App Development"],
  bgColor = "#A9B838",
  textColor = "#111E2C",
  dotColor,
  borderColor,
  angle = 40,
  duration = 15,
  position = "50%",
  zIndex = 3,
}) {
  const finalDotColor = dotColor || textColor;
  const finalBorderColor = borderColor || bgColor;

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: position,
        left: "-10%",
        transform: `rotate(${angle}deg)`,
        width: "130%",
        bgcolor: bgColor,
        border: `1px solid ${finalBorderColor}`,
        // py: 1,
        py: {
          xs: 0.5,  // mobile
          sm: 0.8,  // small tablets
          md: 1.2,  // tablets
          lg: 1.8,  // desktop
        },
        overflow: "hidden",
        zIndex,
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      }}
    >
      <Motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration, ease: "linear" }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          // fontSize: "1rem",
          fontSize: "inherit",
          fontWeight: 500,
        }}
      >
        {texts.concat(texts).map((text, index) => (
          <Typography
            key={index}
            sx={{
              color: textColor,
              mx: 4,
              fontSize: {
                xs: "0.7rem",
                sm: "0.85rem",
                md: "1rem",
                lg: "1.1rem",
              },
              display: "flex",
              alignItems: "center",
              "&::before": {
                content: '"•"',
                color: finalDotColor,
                // fontSize: "1.5rem",
                fontSize: {
                  xs: "1rem",
                  md: "1.5rem",
                },
                mr: 2,
              },
            }}
          >
            {text}
          </Typography>
        ))}
      </Motion.div>
    </Box>
  );
}
