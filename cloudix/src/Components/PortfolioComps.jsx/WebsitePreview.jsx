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
      initial={false}
      animate={{
        scale: offset === 0 ? 1 : 0.92,
        opacity: offset === 0 ? 1 : 0.6,
        x: offset * 60,
        y: Math.abs(offset) * 15,
        zIndex: 10 - Math.abs(offset),
      }}
      transition={{ duration: 0.5 }}
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
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          "& img": {
            width: "100%",
            transition: "transform 8s linear",
          },
          "&:hover img": {
            transform: "translateY(calc(-100% + 420px))",
          },
        }}
      >
        <img src={image} alt="Website Preview" />
      </Box>
    </Motion.a>
  );
};

export default WebsitePreview;
