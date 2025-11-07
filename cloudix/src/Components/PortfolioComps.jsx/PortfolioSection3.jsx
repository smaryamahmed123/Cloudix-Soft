import { Box, Typography } from "@mui/material";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion"; // 🪄 Import Framer Motion

const PortfolioSection3 = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "#111E2C",
        color: "#fff",
        textAlign: "center",
        py: 10,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🌕 Animated Background Circle */}
      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 0.8], opacity: 0.2 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "300px",
          height: "300px",
          border: "1px solid rgba(169,184,56,0.2)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* ✨ Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            letterSpacing: "0.5px",
            color: "#FFFFFF",
          }}
        >
          WE ARE WAITING TO HEAR FROM YOU!
        </Typography>
      </Motion.div>

      {/* ✨ Subheading */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 10,
            letterSpacing: "0.5px",
            color: "#A9B838",
          }}
        >
          Don’t beat around the bush. Tell us about your project.
        </Typography>
      </Motion.div>

      {/* ✨ Button Animation */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ zIndex: 1 }}
      >
        <GradientButton text="Contact Us Today!" onClick={() => navigate("/contact")} />
      </Motion.div>
    </Box>
  );
};

export default PortfolioSection3;
