import { Box, Typography } from "@mui/material";
import { motion as Motion } from "framer-motion"; // ✨ Import Framer Motion
import WebsitePreview from "./WebsitePreview";
import site1 from "src/assets/modified_image.png";
import site2 from "../../assets/modified_image (1).png";
import site3 from "../../assets/modified_image (2).png";
import site4 from "../../assets/modified_image (3).png";
import site5 from "../../assets/modified_image (4).png";


const WebsiteDesignSection = () => {
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
        animate={{ scale: [0.8, 1.1, 0.8], opacity: 1 }}
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
        }}
      />

      {/* 🟡 Heading */}
      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 10,
            letterSpacing: "0.5px",
            color: "#FFFFFF",
          }}
        >
          Website Development & Designing
        </Typography>
      </Motion.div>

      {/* ✨ Outlined Texts with stagger effect */}
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
        <Box
          sx={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <WebsitePreview
            image={site1}
            link="https://company-website-1.com"
          />

          <WebsitePreview
            image={site2}
            link="https://company-website-2.com"
          />

          <WebsitePreview
            image={site3}
            link="https://company-website-2.com"
          />

          <WebsitePreview
            image={site4}
            link="https://company-website-2.com"
          />

          <WebsitePreview
            image={site5}
            link="https://company-website-2.com"
          />
        </Box>

      </Motion.div>
    </Box>
  );
};

export default WebsiteDesignSection;
