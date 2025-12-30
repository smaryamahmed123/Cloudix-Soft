import { Box } from "@mui/material";
import { motion as Motion } from "framer-motion";

const WebsitePreview = ({ image, link, index, activeIndex }) => {
  const offset = index - activeIndex;

  if (Math.abs(offset) > 2) return null;

  return (
    <Motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      animate={{
        scale: offset === 0 ? 1 : 0.92,
        opacity: offset === 0 ? 1 : 0.55,
        x: offset * 70,
        y: Math.abs(offset) * 18,
        zIndex: 10 - Math.abs(offset),
      }}
      transition={{ duration: 0.6 }}
      style={{
        position: "absolute",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          width: "680px",
          height: "520px",
          overflow: "hidden",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.15)",
          backgroundColor: "#000",
          boxShadow: "0 25px 45px rgba(0,0,0,0.45)",
        }}
      >
        <Box
          component="img"
          src={image}
          alt="Website Preview"
          sx={{
            width: "100%",
            animation: "autoScroll 12s linear infinite",
          }}
        />
      </Box>

      {/* CSS animation */}
      <style>
        {`
          @keyframes autoScroll {
            0% { transform: translateY(0); }
            100% { transform: translateY(calc(-100% + 520px)); }
          }
        `}
      </style>
    </Motion.a>
  );
};

export default WebsitePreview;
